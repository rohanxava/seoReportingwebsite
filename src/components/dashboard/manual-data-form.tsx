
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AuditData, ManualReport } from '@/lib/types';
import { ChevronsUpDown, PlusCircle, Trash2, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useActionState, useEffect } from 'react';
import { saveManualReport } from '@/app/actions/report';
import { useFormStatus } from 'react-dom';

const formSchema = z.object({
  reportName: z.string().min(3, "Report name is required."),
  authorityScore: z.coerce.number().min(0).max(100),
  organicSearchTraffic: z.coerce.number().min(0),
  paidSearchTraffic: z.coerce.number().min(0),
  backlinks: z.coerce.number().min(0),
  referringDomains: z.coerce.number().min(0),
  organicKeywords: z.coerce.number().min(0),
  paidKeywords: z.coerce.number().min(0),
  trafficOverviewData: z.array(z.object({
      date: z.string().min(1, 'Date is required'),
      organic: z.coerce.number(),
      paid: z.coerce.number()
  })),
  topOrganicKeywordsData: z.array(z.object({
      keyword: z.string().min(1, 'Keyword is required'),
      position: z.coerce.number().nullable(),
      volume: z.coerce.number(),
      cpc: z.coerce.number(),
      traffic: z.coerce.number(),
  }))
});

type FormSchemaType = z.infer<typeof formSchema>;


interface ManualDataFormProps {
  projectId: string | null;
  onDataUpdate: (data: Partial<AuditData>) => void;
  onReportSave: (newReport: ManualReport) => void;
}

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
         <Button type="submit" disabled={pending}>
            {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Save Report
        </Button>
    )
}

export function ManualDataForm({ projectId, onDataUpdate, onReportSave }: ManualDataFormProps) {
  const { toast } = useToast();
  const [state, formAction] = useActionState(saveManualReport, null);
  
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportName: `Report ${new Date().toLocaleDateString()}`,
      authorityScore: 30,
      organicSearchTraffic: 3600,
      paidSearchTraffic: 126,
      backlinks: 7000,
      referringDomains: 731,
      organicKeywords: 1000,
      paidKeywords: 8,
      trafficOverviewData: [
        { date: "2024-03-01", organic: 5200, paid: 500 },
        { date: "2024-04-01", organic: 5100, paid: 550 },
        { date: "2024-05-01", organic: 4800, paid: 600 },
      ],
      topOrganicKeywordsData: [
        { keyword: "police brand wat...", position: null, volume: 90, cpc: 0.23, traffic: 100.00 },
        { keyword: "watch tel", position: 64, volume: 320, cpc: 0.57, traffic: 0.00 },
      ]
    },
  });

  const { fields: trafficFields, append: appendTraffic, remove: removeTraffic } = useFieldArray({
    control: form.control,
    name: "trafficOverviewData"
  });

  const { fields: keywordFields, append: appendKeyword, remove: removeKeyword } = useFieldArray({
    control: form.control,
    name: "topOrganicKeywordsData"
  });

  useEffect(() => {
    if (state?.success) {
        toast({
            title: "Report Saved",
            description: "The manual report has been saved successfully.",
        });
    } else if (state?.message) {
         toast({
            variant: "destructive",
            title: "Save Failed",
            description: state.message,
        });
    }
  }, [state, toast])

  const onSubmit = (data: FormSchemaType) => {
    if (!projectId) {
        toast({ variant: "destructive", title: "Error", description: "No project selected." });
        return;
    }

    const { reportName, ...auditDataValues } = data;
    const preparedAuditData: AuditData = {
      ...auditDataValues,
      // Add any missing static fields here if needed
      countryDistributionData: [], 
      keywordsByIntentData: [],
      mainOrganicCompetitorsData: [],
      competitivePositioningData: [],
      topOrganicKeywordsData: data.topOrganicKeywordsData.map(k => ({...k, intent: ['C'], serp: false}))
    };

    onDataUpdate(preparedAuditData);
    
    const formData = new FormData();
    formData.append('reportName', reportName);
    formData.append('projectId', projectId);
    formData.append('auditData', JSON.stringify(preparedAuditData));

    formAction(formData);
  };

  return (
    <Card className="w-full">
        <Collapsible>
            <CollapsibleTrigger asChild>
                <CardHeader className="flex-row items-center justify-between cursor-pointer">
                    <div>
                        <CardTitle className="font-headline">Manual Report Data</CardTitle>
                        <CardDescription>Click to enter data and generate a custom report.</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="reportName">Report Name</Label>
                            <Input id="reportName" {...form.register('reportName')} />
                            {form.formState.errors.reportName && <p className="text-sm font-medium text-destructive">{form.formState.errors.reportName.message}</p>}
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <Label htmlFor="authorityScore">Authority Score</Label>
                                <Input id="authorityScore" type="number" {...form.register('authorityScore')} />
                            </div>
                             <div>
                                <Label htmlFor="organicSearchTraffic">Organic Traffic</Label>
                                <Input id="organicSearchTraffic" type="number" {...form.register('organicSearchTraffic')} />
                            </div>
                             <div>
                                <Label htmlFor="paidSearchTraffic">Paid Traffic</Label>
                                <Input id="paidSearchTraffic" type="number" {...form.register('paidSearchTraffic')} />
                            </div>
                             <div>
                                <Label htmlFor="backlinks">Backlinks</Label>
                                <Input id="backlinks" type="number" {...form.register('backlinks')} />
                            </div>
                             <div>
                                <Label htmlFor="referringDomains">Referring Domains</Label>
                                <Input id="referringDomains" type="number" {...form.register('referringDomains')} />
                            </div>
                            <div>
                                <Label htmlFor="organicKeywords">Organic Keywords</Label>
                                <Input id="organicKeywords" type="number" {...form.register('organicKeywords')} />
                            </div>
                             <div>
                                <Label htmlFor="paidKeywords">Paid Keywords</Label>
                                <Input id="paidKeywords" type="number" {...form.register('paidKeywords')} />
                            </div>
                        </div>
                        
                        {/* Traffic Overview Data */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Traffic Overview Data</h4>
                            <div className="space-y-4">
                                {trafficFields.map((field, index) => (
                                    <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md">
                                        <div className="grid grid-cols-3 gap-2 flex-1">
                                            <Input type="date" {...form.register(`trafficOverviewData.${index}.date`)} />
                                            <Input type="number" placeholder="Organic" {...form.register(`trafficOverviewData.${index}.organic`)} />
                                            <Input type="number" placeholder="Paid" {...form.register(`trafficOverviewData.${index}.paid`)} />
                                        </div>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeTraffic(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                             <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendTraffic({ date: '', organic: 0, paid: 0 })}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Traffic Data Point
                            </Button>
                        </div>
                        
                        {/* Top Organic Keywords */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Top Organic Keywords</h4>
                            <div className="space-y-4">
                                {keywordFields.map((field, index) => (
                                    <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md">
                                        <div className="grid grid-cols-5 gap-2 flex-1">
                                            <Input placeholder="Keyword" {...form.register(`topOrganicKeywordsData.${index}.keyword`)} />
                                            <Input type="number" placeholder="Position" {...form.register(`topOrganicKeywordsData.${index}.position`)} />
                                            <Input type="number" placeholder="Volume" {...form.register(`topOrganicKeywordsData.${index}.volume`)} />
                                            <Input type="number" placeholder="CPC" step="0.01" {...form.register(`topOrganicKeywordsData.${index}.cpc`)} />
                                            <Input type="number" placeholder="Traffic %" step="0.01" {...form.register(`topOrganicKeywordsData.${index}.traffic`)} />
                                        </div>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeKeyword(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendKeyword({ keyword: '', position: 0, volume: 0, cpc: 0, traffic: 0 })}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Keyword
                            </Button>
                        </div>

                        <SubmitButton />
                    </form>
                </CardContent>
            </CollapsibleContent>
        </Collapsible>
    </Card>
  );
}
