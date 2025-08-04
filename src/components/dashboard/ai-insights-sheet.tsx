"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  suggestKeywords,
  SuggestKeywordsInput,
  SuggestKeywordsOutput,
} from "@/ai/flows/suggest-keywords-to-target";
import {
  suggestContentImprovements,
  SuggestContentImprovementsInput,
  SuggestContentImprovementsOutput,
} from "@/ai/flows/suggest-content-improvements";
import { Card, CardContent } from "../ui/card";

const keywordSchema = z.object({
  domain: z.string().min(1, "Domain is required."),
  currentKeywords: z.string().min(1, "Keywords are required."),
  projectGoals: z.string().min(1, "Goals are required."),
});

const contentSchema = z.object({
  content: z.string().min(50, "Content must be at least 50 characters."),
  targetKeyword: z.string().min(1, "Target keyword is required."),
});

export function AiInsightsSheet() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [keywordResult, setKeywordResult] = useState<SuggestKeywordsOutput | null>(null);
  const [contentResult, setContentResult] = useState<SuggestContentImprovementsOutput | null>(null);

  const keywordForm = useForm<z.infer<typeof keywordSchema>>({
    resolver: zodResolver(keywordSchema),
    defaultValues: {
      domain: "innovate.com",
      currentKeywords: "AI-powered CRM, Cloud solutions, Data analytics",
      projectGoals: "Increase organic traffic by 20% in Q3.",
    },
  });

  const contentForm = useForm<z.infer<typeof contentSchema>>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      content: "Our CRM uses the latest AI to help your sales team succeed. We provide tools for data analysis and cloud integration.",
      targetKeyword: "AI-powered CRM",
    },
  });

  async function onKeywordSubmit(values: z.infer<typeof keywordSchema>) {
    setLoading(true);
    setKeywordResult(null);
    try {
      const input: SuggestKeywordsInput = {
        ...values,
        currentKeywords: values.currentKeywords.split(",").map((k) => k.trim()),
        trafficData: "Sample traffic data", // Using mock data as per instructions
        rankingData: "Sample ranking data",
      };
      const result = await suggestKeywords(input);
      setKeywordResult(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate keyword suggestions.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onContentSubmit(values: z.infer<typeof contentSchema>) {
    setLoading(true);
    setContentResult(null);
    try {
      const result = await suggestContentImprovements(values);
      setContentResult(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate content improvements.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          AI Insights
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-headline">AI-Powered SEO Insights</SheetTitle>
          <SheetDescription>
            Get suggestions for keywords and content improvements.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <Tabs defaultValue="keywords">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="keywords">
              <Card>
                <CardContent className="pt-6">
                  <Form {...keywordForm}>
                    <form
                      onSubmit={keywordForm.handleSubmit(onKeywordSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={keywordForm.control}
                        name="domain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Domain</FormLabel>
                            <FormControl>
                              <Input placeholder="example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={keywordForm.control}
                        name="currentKeywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Keywords (comma-separated)</FormLabel>
                            <FormControl>
                              <Input placeholder="seo, marketing" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={keywordForm.control}
                        name="projectGoals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Goals</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe your goals" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={loading} className="w-full">
                        {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Suggest Keywords
                      </Button>
                    </form>
                  </Form>
                  {keywordResult && (
                    <div className="mt-6">
                      <h3 className="font-semibold font-headline">Suggestions:</h3>
                      <p className="text-sm text-muted-foreground mb-2">{keywordResult.reasoning}</p>
                      <ul className="list-disc list-inside space-y-1 rounded-md border p-4 text-sm">
                        {keywordResult.suggestedKeywords.map((kw) => (
                          <li key={kw}>{kw}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="content">
              <Card>
                <CardContent className="pt-6">
                   <Form {...contentForm}>
                    <form
                      onSubmit={contentForm.handleSubmit(onContentSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={contentForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Content</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Paste your content here..." {...field} rows={8} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={contentForm.control}
                        name="targetKeyword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Keyword</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., sustainable fashion" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={loading} className="w-full">
                        {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Suggest Improvements
                      </Button>
                    </form>
                  </Form>
                  {contentResult && (
                    <div className="mt-6">
                      <h3 className="font-semibold font-headline">Suggestions:</h3>
                      <ul className="list-disc list-inside space-y-1 rounded-md border p-4 text-sm">
                        {contentResult.suggestions.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
