
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
import { Textarea } from '@/components/ui/textarea';
import type { AuditData } from '@/lib/types';
import { ChevronsUpDown, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  authorityScore: z.coerce.number().min(0).max(100),
  organicSearchTraffic: z.coerce.number().min(0),
  paidSearchTraffic: z.coerce.number().min(0),
  backlinks: z.coerce.number().min(0),
  referringDomains: z.coerce.number().min(0),
  organicKeywords: z.coerce.number().min(0),
  paidKeywords: z.coerce.number().min(0),
  trafficOverviewData: z.array(z.object({
      date: z.string(),
      organic: z.coerce.number(),
      paid: z.coerce.number()
  })),
  topOrganicKeywordsData: z.array(z.object({
      keyword: z.string(),
      position: z.coerce.number().nullable(),
      volume: z.coerce.number(),
      cpc: z.coerce.number(),
      traffic: z.coerce.number(),
  }))
});

interface ManualDataFormProps {
  onDataUpdate: (data: Partial<AuditData>) => void;
}

export function ManualDataForm({ onDataUpdate }: ManualDataFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const preparedData: Partial<AuditData> = {
        ...data,
        topOrganicKeywordsData: data.topOrganicKeywordsData.map(k => ({...k, intent: ['C'], serp: false})) // Adding mock data for missing fields
    }
    onDataUpdate(preparedData);
    toast({
        title: "Report Updated",
        description: "The dashboard has been updated with the new data.",
    })
  };

  return (
    <Card>
        <Collapsible>
            <CollapsibleTrigger asChild>
                <CardHeader className="flex-row items-center justify-between cursor-pointer">
                    <div>
                        <CardTitle className="font-headline">Manual Report Data</CardTitle>
                        <CardDescription>Click to expand and enter data to generate a custom report.</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                        <Button type="submit">Generate Report</Button>
                    </form>
                </CardContent>
            </CollapsibleContent>
        </Collapsible>
    </Card>
  );
}
