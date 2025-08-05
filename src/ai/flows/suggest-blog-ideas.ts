'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating blog post ideas.
 *
 * - suggestBlogIdeas - A function that takes a topic and returns a list of blog post ideas.
 * - SuggestBlogIdeasInput - The input type for the suggestBlogIdeas function.
 * - SuggestBlogIdeasOutput - The return type for the suggestBlogIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBlogIdeasInputSchema = z.object({
  topic: z.string().describe('The central topic or domain to generate blog ideas for.'),
});
export type SuggestBlogIdeasInput = z.infer<typeof SuggestBlogIdeasInputSchema>;

const SuggestBlogIdeasOutputSchema = z.object({
  ideas: z.array(z.object({
    title: z.string().describe('The catchy title of the blog post.'),
    description: z.string().describe('A brief description of what the blog post would cover.'),
  })).describe('A list of blog post ideas with titles and descriptions.'),
});
export type SuggestBlogIdeasOutput = z.infer<typeof SuggestBlogIdeasOutputSchema>;

export async function suggestBlogIdeas(input: SuggestBlogIdeasInput): Promise<SuggestBlogIdeasOutput> {
  return suggestBlogIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBlogIdeasPrompt',
  input: {schema: SuggestBlogIdeasInputSchema},
  output: {schema: SuggestBlogIdeasOutputSchema},
  prompt: `You are an expert content strategist. Based on the following topic, generate a list of 5 engaging and SEO-friendly blog post ideas. For each idea, provide a catchy title and a short description.

Topic: {{{topic}}}
`,
});

const suggestBlogIdeasFlow = ai.defineFlow(
  {
    name: 'suggestBlogIdeasFlow',
    inputSchema: SuggestBlogIdeasInputSchema,
    outputSchema: SuggestBlogIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
