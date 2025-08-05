
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
import type {
  SuggestKeywordsInput,
  SuggestKeywordsOutput,
} from "@/ai/flows/suggest-keywords-to-target";
import type {
  SuggestContentImprovementsInput,
  SuggestContentImprovementsOutput,
} from "@/ai/flows/suggest-content-improvements";
import type {
  SuggestMetaDescriptionInput,
  SuggestMetaDescriptionOutput,
} from "@/ai/flows/suggest-meta-description";
import type {
    SuggestBlogIdeasInput,
    SuggestBlogIdeasOutput,
} from "@/ai/flows/suggest-blog-ideas";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

const keywordSchema = z.object({
  domain: z.string().min(1, "Domain is required."),
  currentKeywords: z.string().min(1, "Keywords are required."),
  projectGoals: z.string().min(1, "Goals are required."),
});

const contentSchema = z.object({
  content: z.string().min(50, "Content must be at least 50 characters."),
  targetKeyword: z.string().min(1, "Target keyword is required."),
});

const metaSchema = z.object({
  content: z.string().min(50, "Content must be at least 50 characters."),
  keyword: z.string().min(1, "Primary keyword is required."),
});

const blogSchema = z.object({
  topic: z.string().min(3, "Topic is required."),
});


interface AiInsightsSheetProps {
    suggestKeywords: (input: SuggestKeywordsInput) => Promise<SuggestKeywordsOutput>;
    suggestContentImprovements: (input: SuggestContentImprovementsInput) => Promise<SuggestContentImprovementsOutput>;
    suggestMetaDescription: (input: SuggestMetaDescriptionInput) => Promise<SuggestMetaDescriptionOutput>;
    suggestBlogIdeas: (input: SuggestBlogIdeasInput) => Promise<SuggestBlogIdeasOutput>;
}

export function AiInsightsSheet({ suggestKeywords, suggestContentImprovements, suggestMetaDescription, suggestBlogIdeas }: AiInsightsSheetProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [keywordResult, setKeywordResult] = useState<SuggestKeywordsOutput | null>(null);
  const [contentResult, setContentResult] = useState<SuggestContentImprovementsOutput | null>(null);
  const [metaResult, setMetaResult] = useState<SuggestMetaDescriptionOutput | null>(null);
  const [blogResult, setBlogResult] = useState<SuggestBlogIdeasOutput | null>(null);


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

  const metaForm = useForm<z.infer<typeof metaSchema>>({
    resolver: zodResolver(metaSchema),
    defaultValues: {
        content: "Our CRM uses the latest AI to help your sales team succeed. We provide tools for data analysis and cloud integration, making your business more efficient and profitable. Explore our features today to see how we can help you grow.",
        keyword: "AI-powered CRM",
    },
  });

  const blogForm = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
        topic: "The future of AI in sales",
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

  async function onMetaSubmit(values: z.infer<typeof metaSchema>) {
    setLoading(true);
    setMetaResult(null);
    try {
      const result = await suggestMetaDescription(values);
      setMetaResult(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate meta description.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onBlogSubmit(values: z.infer<typeof blogSchema>) {
    setLoading(true);
    setBlogResult(null);
    try {
      const result = await suggestBlogIdeas(values);
      setBlogResult(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate blog ideas.",
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
          <span className="hidden md:inline">AI Insights</span>
          <span className="md:hidden">AI</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-headline">AI-Powered SEO Insights</SheetTitle>
          <SheetDescription>
            Get suggestions for keywords, content, meta descriptions, and blog ideas.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="py-4 pr-6">
            <Tabs defaultValue="keywords">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="meta">Meta</TabsTrigger>
                <TabsTrigger value="blog-ideas">Blog Ideas</TabsTrigger>
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
               <TabsContent value="meta">
                <Card>
                  <CardContent className="pt-6">
                    <Form {...metaForm}>
                      <form
                        onSubmit={metaForm.handleSubmit(onMetaSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={metaForm.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Page Content</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Paste your page content here..." {...field} rows={8} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={metaForm.control}
                          name="keyword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Keyword</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., AI-powered CRM" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={loading} className="w-full">
                          {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                          Generate Meta Description
                        </Button>
                      </form>
                    </Form>
                    {metaResult && (
                      <div className="mt-6">
                        <h3 className="font-semibold font-headline">Generated Meta Description:</h3>
                        <div className="rounded-md border p-4 text-sm bg-muted">
                          {metaResult.metaDescription}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="blog-ideas">
                <Card>
                  <CardContent className="pt-6">
                    <Form {...blogForm}>
                      <form
                        onSubmit={blogForm.handleSubmit(onBlogSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={blogForm.control}
                          name="topic"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Topic / Domain</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., The future of AI" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={loading} className="w-full">
                          {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                          Generate Blog Ideas
                        </Button>
                      </form>
                    </Form>
                    {blogResult && (
                      <div className="mt-6">
                        <h3 className="font-semibold font-headline">Blog Ideas:</h3>
                        <div className="space-y-4">
                          {blogResult.ideas.map((idea, i) => (
                            <div key={i} className="rounded-md border p-4 text-sm">
                              <h4 className="font-semibold mb-1">{idea.title}</h4>
                              <p className="text-muted-foreground">{idea.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
