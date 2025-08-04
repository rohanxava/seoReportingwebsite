'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting keywords to target based on SEO metrics.
 *
 * - suggestKeywords - A function that suggests keywords to target.
 * - SuggestKeywordsInput - The input type for the suggestKeywords function.
 * - SuggestKeywordsOutput - The return type for the suggestKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestKeywordsInputSchema = z.object({
  domain: z.string().describe('The domain to analyze.'),
  currentKeywords: z.array(z.string()).describe('The list of keywords the client is currently targeting.'),
  trafficData: z.string().describe('Traffic data for the domain.'),
  rankingData: z.string().describe('Ranking data for the domain.'),
  projectGoals: z.string().describe('The SEO project goals.'),
});
export type SuggestKeywordsInput = z.infer<typeof SuggestKeywordsInputSchema>;

const SuggestKeywordsOutputSchema = z.object({
  suggestedKeywords: z.array(z.string()).describe('A list of suggested keywords to target.'),
  reasoning: z.string().describe('The reasoning behind the keyword suggestions.'),
});
export type SuggestKeywordsOutput = z.infer<typeof SuggestKeywordsOutputSchema>;

export async function suggestKeywords(input: SuggestKeywordsInput): Promise<SuggestKeywordsOutput> {
  return suggestKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestKeywordsPrompt',
  input: {schema: SuggestKeywordsInputSchema},
  output: {schema: SuggestKeywordsOutputSchema},
  prompt: `You are an expert SEO consultant. You will analyze the provided SEO metrics and suggest a list of keywords to target to improve the client's SEO performance, taking into account the project goals.

Analyze the following information to provide strategic keyword suggestions:

Domain: {{{domain}}}
Current Keywords: {{#each currentKeywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Traffic Data: {{{trafficData}}}
Ranking Data: {{{rankingData}}}
Project Goals: {{{projectGoals}}}

Based on this data, what keywords should the client target to improve their SEO?
Ensure that you explain the reasoning behind your keyword suggestions.

Output the keywords in JSON format, along with the reasoning for choosing each keyword.`,
});

const suggestKeywordsFlow = ai.defineFlow(
  {
    name: 'suggestKeywordsFlow',
    inputSchema: SuggestKeywordsInputSchema,
    outputSchema: SuggestKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
