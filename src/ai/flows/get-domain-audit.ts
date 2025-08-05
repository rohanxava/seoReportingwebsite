
'use server';
/**
 * @fileOverview This file defines a Genkit flow for performing an SEO domain audit.
 *
 * - getDomainAudit - A function that takes a domain name and returns a comprehensive SEO audit.
 * - DomainAuditInput - The input type for the getDomainAudit function.
 * - DomainAuditOutput - The return type for the getDomainAudit function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DomainAuditInputSchema = z.object({
  domain: z.string().describe('The domain name to audit.'),
});
export type DomainAuditInput = z.infer<typeof DomainAuditInputSchema>;

const DomainAuditOutputSchema = z.object({
  authorityScore: z.number().describe('The domain authority score.'),
  organicSearchTraffic: z.number().describe('The monthly organic search traffic.'),
  paidSearchTraffic: z.number().describe('The monthly paid search traffic.'),
  backlinks: z.number().describe('The total number of backlinks.'),
  referringDomains: z.number().describe('The total number of referring domains.'),
  organicKeywords: z.number().describe('The total number of organic keywords.'),
  paidKeywords: z.number().describe('The total number of paid keywords.'),
});
export type DomainAuditOutput = z.infer<typeof DomainAuditOutputSchema>;

export async function getDomainAudit(input: DomainAuditInput): Promise<DomainAuditOutput> {
  return getDomainAuditFlow(input);
}

const getDomainAuditFlow = ai.defineFlow(
  {
    name: 'getDomainAuditFlow',
    inputSchema: DomainAuditInputSchema,
    outputSchema: DomainAuditOutputSchema,
  },
  async (input) => {
    const apiKey = process.env.SEO_API_KEY;

    if (!apiKey) {
      throw new Error('SEO_API_KEY is not configured in the environment.');
    }

    // In a real application, you would make an API call to a service like Semrush or Ahrefs here.
    // For this prototype, we'll return mock data.
    console.log(`Auditing domain: ${input.domain} with API key: ${apiKey.substring(0, 4)}...`);

    // Mock data structure matching the output schema
    return {
      authorityScore: 30,
      organicSearchTraffic: 3600,
      paidSearchTraffic: 126,
      backlinks: 7000,
      referringDomains: 731,
      organicKeywords: 1000,
      paidKeywords: 8,
    };
  }
);
