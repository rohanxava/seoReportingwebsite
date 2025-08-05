
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
  countryDistributionData: z.array(z.object({
      country: z.string().min(1, 'Country is required'),
      share: z.coerce.number().min(0).max(100),
      traffic: z.string().min(1, 'Traffic is required'),
      keywords: z.string().min(1, 'Keywords are required')
  })),
  keywordsByIntentData: z.array(z.object({
      intent: z.string().min(1, 'Intent is required'),
      percentage: z.coerce.number().min(0).max(100),
      keywords: z.coerce.number(),
      traffic: z.coerce.number(),
      color: z.string().min(1, 'Color is required')
  })),
  topOrganicKeywordsData: z.array(z.object({
      keyword: z.string().min(1, 'Keyword is required'),
      intent: z.string(),
      position: z.coerce.number().nullable(),
      serp: z.boolean(),
      volume: z.coerce.number(),
      cpc: z.coerce.number(),
      traffic: z.coerce.number(),
  })),
  mainOrganicCompetitorsData: z.array(z.object({
      competitor: z.string().min(1, 'Competitor is required'),
      comLevel: z.coerce.number().min(0).max(100),
      comKeywords: z.coerce.number(),
      seKeywords: z.coerce.number()
  })),
  competitivePositioningData: z.array(z.object({
      name: z.string().min(1, 'Name is required'),
      organicKeywords: z.coerce.number(),
      organicSearchTraffic: z.coerce.number(),
      z: z.coerce.number()
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
      countryDistributionData: [
        { country: "Worldwide", share: 100, traffic: "3.6K", keywords: "1K" },
        { country: "🇺🇸 US", share: 58, traffic: "2.1K", keywords: "689" },
      ],
      keywordsByIntentData: [
         { intent: 'Commercial', percentage: 50, keywords: 9, traffic: 1, color: 'bg-yellow-400' },
         { intent: 'Transactional', percentage: 16.7, keywords: 3, traffic: 0, color: 'bg-teal-500' },
      ],
      topOrganicKeywordsData: [
        { keyword: "police brand wat...", intent: "C", position: null, serp: true, volume: 90, cpc: 0.23, traffic: 100.00 },
        { keyword: "watch tel", intent: "C", position: 64, serp: false, volume: 320, cpc: 0.57, traffic: 0.00 },
      ],
      mainOrganicCompetitorsData: [
        { competitor: "cajeestimezone.c...", comLevel: 80, comKeywords: 3, seKeywords: 43 },
        { competitor: "timeshop24.co.uk", comLevel: 20, comKeywords: 1, seKeywords: 48 },
      ],
      competitivePositioningData: [
        { name: 'cajeestimezone.c...', organicKeywords: 45, organicSearchTraffic: 50, z: 2.4 },
        { name: 'timeshop24.co.uk', organicKeywords: 60, organicSearchTraffic: 40, z: 2.4 },
      ]
    },
  });

  const { fields: trafficFields, append: appendTraffic, remove: removeTraffic } = useFieldArray({ control: form.control, name: "trafficOverviewData" });
  const { fields: countryFields, append: appendCountry, remove: removeCountry } = useFieldArray({ control: form.control, name: "countryDistributionData" });
  const { fields: intentFields, append: appendIntent, remove: removeIntent } = useFieldArray({ control: form.control, name: "keywordsByIntentData" });
  const { fields: keywordFields, append: appendKeyword, remove: removeKeyword } = useFieldArray({ control: form.control, name: "topOrganicKeywordsData" });
  const { fields: competitorFields, append: appendCompetitor, remove: removeCompetitor } = useFieldArray({ control: form.control, name: "mainOrganicCompetitorsData" });
  const { fields: positioningFields, append: appendPositioning, remove: removePositioning } = useFieldArray({ control: form.control, name: "competitivePositioningData" });


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
      topOrganicKeywordsData: data.topOrganicKeywordsData.map(k => ({...k, intent: k.intent.split(',').map(i => i.trim())}))
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
                            <h4 className="font-semibold text-lg mb-2">Traffic Overview</h4>
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
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Traffic Data
                            </Button>
                        </div>

                         {/* Country Distribution Data */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Country Distribution</h4>
                            <div className="space-y-4">
                                {countryFields.map((field, index) => (
                                    <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md">
                                        <div className="grid grid-cols-4 gap-2 flex-1">
                                            <Input placeholder="Country" {...form.register(`countryDistributionData.${index}.country`)} />
                                            <Input type="number" placeholder="Share %" {...form.register(`countryDistributionData.${index}.share`)} />
                                            <Input placeholder="Traffic" {...form.register(`countryDistributionData.${index}.traffic`)} />
                                            <Input placeholder="Keywords" {...form.register(`countryDistributionData.${index}.keywords`)} />
                                        </div>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeCountry(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                             <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendCountry({ country: '', share: 0, traffic: '', keywords: '' })}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Country
                            </Button>
                        </div>
                        
                         {/* Keywords by Intent */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Keywords by Intent</h4>
                            <div className="space-y-4">
                                {intentFields.map((field, index) => (
                                    <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md">
                                        <div className="grid grid-cols-5 gap-2 flex-1">
                                            <Input placeholder="Intent" {...form.register(`keywordsByIntentData.${index}.intent`)} />
                                            <Input type="number" placeholder="Percentage %" {...form.register(`keywordsByIntentData.${index}.percentage`)} />
                                            <Input type="number" placeholder="Keywords" {...form.register(`keywordsByIntentData.${index}.keywords`)} />
                                            <Input type="number" placeholder="Traffic" {...form.register(`keywordsByIntentData.${index}.traffic`)} />
                                            <Input placeholder="Color (e.g. bg-blue-500)" {...form.register(`keywordsByIntentData.${index}.color`)} />
                                        </div>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeIntent(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendIntent({ intent: '', percentage: 0, keywords: 0, traffic: 0, color: '' })}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Intent
                            </Button>
                        </div>

                        {/* Top Organic Keywords */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Top Organic Keywords</h4>
                            <div className="space-y-4">
                                {keywordFields.map((field, index) => (
                                    <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md">
                                        <div className="grid grid-cols-4 gap-2 flex-1">
                                            <Input placeholder="Keyword" {...form.register(`topOrganicKeywordsData.${index}.keyword`)} />
                                            <Input placeholder="Intent (C, I, T...)" {...form.register(`topOrganicKeywordsData.${index}.intent`)} />
                                            <Input type="number" placeholder="Position" {...form.register(`topOrganicKeywordsData.${index}.position`)} />
                                            <Input type="number" placeholder="Volume" {...form.register(`topOrganicKeywordsData.${index}.volume`)} />
                                            <Input type="number" placeholder="CPC" step="0.01" {...form.register(`topOrganicKeywordsData.${index}.cpc`)} />
                                            <Input type="number" placeholder="Traffic %" step="0.01" {...form.register(`topOrganicKeywordsData.${index}.traffic`)} />
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" {...form.register(`topOrganicKeywordsData.${index}.serp`)} />
                                                <Label>SERP Feature</Label>
                                            </div>
                                        </div>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeKeyword(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendKeyword({ keyword: '', intent: "", position: 0, serp: false, volume: 0, cpc: 0, traffic: 0 })}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Keyword
                            </Button>
                        </div>

                         {/* Main Organic Competitors */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Main Organic Competitors</h4>
                            <div className="space-y-4">
                                {competitorFields.map((field, index) => (
                                    <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md">
                                        <div className="grid grid-cols-4 gap-2 flex-1">
                                            <Input placeholder="Competitor" {...form.register(`mainOrganicCompetitorsData.${index}.competitor`)} />
                                            <Input type="number" placeholder="Com. Level" {...form.register(`mainOrganicCompetitorsData.${index}.comLevel`)} />
                                            <Input type="number" placeholder="Com. Keywords" {...form.register(`mainOrganicCompetitorsData.${index}.comKeywords`)} />
                                            <Input type="number" placeholder="SE Keywords" {...form.register(`mainOrganicCompetitorsData.${index}.seKeywords`)} />
                                        </div>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeCompetitor(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendCompetitor({ competitor: '', comLevel: 50, comKeywords: 0, seKeywords: 0 })}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Competitor
                            </Button>
                        </div>

                        {/* Competitive Positioning */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Competitive Positioning</h4>
                            <div className="space-y-4">
                                {positioningFields.map((field, index) => (
                                    <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md">
                                        <div className="grid grid-cols-4 gap-2 flex-1">
                                            <Input placeholder="Name" {...form.register(`competitivePositioningData.${index}.name`)} />
                                            <Input type="number" placeholder="Organic Keywords" {...form.register(`competitivePositioningData.${index}.organicKeywords`)} />
                                            <Input type="number" placeholder="Organic Traffic" {...form.register(`competitivePositioningData.${index}.organicSearchTraffic`)} />
                                            <Input type="number" placeholder="Z-Index" {...form.register(`competitivePositioningData.${index}.z`)} />
                                        </div>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removePositioning(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendPositioning({ name: '', organicKeywords: 0, organicSearchTraffic: 0, z: 0 })}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Positioning Data
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
