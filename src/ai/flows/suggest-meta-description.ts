'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting an SEO-friendly meta description.
 *
 * - suggestMetaDescription - A function that suggests a meta description.
 * - SuggestMetaDescriptionInput - The input type for the suggestMetaDescription function.
 * - SuggestMetaDescriptionOutput - The return type for the suggestMetaDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMetaDescriptionInputSchema = z.object({
  content: z.string().describe('The main content of the web page.'),
  keyword: z.string().describe('The primary keyword to focus on.'),
});
export type SuggestMetaDescriptionInput = z.infer<typeof SuggestMetaDescriptionInputSchema>;

const SuggestMetaDescriptionOutputSchema = z.object({
  metaDescription: z.string().describe('The generated meta description, optimized for SEO and click-through rate. It should be between 150 and 160 characters.'),
});
export type SuggestMetaDescriptionOutput = z.infer<typeof SuggestMetaDescriptionOutputSchema>;

export async function suggestMetaDescription(input: SuggestMetaDescriptionInput): Promise<SuggestMetaDescriptionOutput> {
  return suggestMetaDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMetaDescriptionPrompt',
  input: {schema: SuggestMetaDescriptionInputSchema},
  output: {schema: SuggestMetaDescriptionOutputSchema},
  prompt: `You are an expert SEO copywriter. Write a compelling and SEO-friendly meta description based on the provided page content and primary keyword.

The meta description must:
- Be between 150 and 160 characters.
- Include the primary keyword: {{{keyword}}}
- Be engaging and encourage users to click.

Page Content:
{{{content}}}
`,
});

const suggestMetaDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestMetaDescriptionFlow',
    inputSchema: SuggestMetaDescriptionInputSchema,
    outputSchema: SuggestMetaDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
