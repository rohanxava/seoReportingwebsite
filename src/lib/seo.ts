
import type { AuditData } from "./types";

// This is a simulated API call. In a real application, you would
// fetch this data from a third-party SEO service.
export async function getAuditData(): Promise<AuditData> {
  console.log("Fetching SEO audit data...");

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const auditData: AuditData = {
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
      { date: "2024-06-01", organic: 3500, paid: 450 },
      { date: "2024-07-01", organic: 3800, paid: 500 },
      { date: "2024-08-01", organic: 3633, paid: 400 },
    ],
    countryDistributionData: [
        { country: "Worldwide", share: 100, traffic: "3.6K", keywords: "1K" },
        { country: "🇺🇸 US", share: 58, traffic: "2.1K", keywords: "689" },
        { country: "🇮🇳 IN", share: 12, traffic: "429", keywords: "23" },
        { country: "🇦🇺 AU", share: 1, traffic: "1", keywords: "16" },
        { country: "Other", share: 30, traffic: "1.1K", keywords: "318" },
    ],
    keywordsByIntentData: [
      { intent: 'Informational', percentage: 27.8, keywords: 5, traffic: 0, color: 'bg-blue-500' },
      { intent: 'Navigational', percentage: 5.6, keywords: 1, traffic: 0, color: 'bg-purple-500' },
      { intent: 'Commercial', percentage: 50, keywords: 9, traffic: 1, color: 'bg-yellow-400' },
      { intent: 'Transactional', percentage: 16.7, keywords: 3, traffic: 0, color: 'bg-teal-500' },
    ],
    topOrganicKeywordsData: [
        { keyword: "police brand wat...", intent: ["C"], position: null, serp: true, volume: 90, cpc: 0.23, traffic: 100.00 },
        { keyword: "watch tel", intent: ["C"], position: 64, serp: false, volume: 320, cpc: 0.57, traffic: 0.00 },
        { keyword: "police wtch", intent: ["C"], position: null, serp: true, volume: 50, cpc: 0.22, traffic: 0.00 },
        { keyword: "mens infinity bra...", intent: ["I", "T"], position: 37, serp: false, volume: 70, cpc: 0.92, traffic: 0.00 },
        { keyword: "father and son o...", intent: ["I"], position: 36, serp: false, volume: 50, cpc: 0.00, traffic: 0.00 },
    ],
    mainOrganicCompetitorsData: [
      { competitor: "cajeestimezone.c...", comLevel: 80, comKeywords: 3, seKeywords: 43 },
      { competitor: "timeshop24.co.uk", comLevel: 20, comKeywords: 1, seKeywords: 48 },
      { competitor: "customworksaus...", comLevel: 10, comKeywords: 1, seKeywords: 146 },
      { competitor: "style-old-money...", comLevel: 15, comKeywords: 1, seKeywords: 67 },
      { competitor: "laphont.com", comLevel: 12, comKeywords: 1, seKeywords: 47 },
    ],
    competitivePositioningData: [
        { name: 'cajeestimezone.c...', organicKeywords: 45, organicSearchTraffic: 50, z: 2.4 },
        { name: 'timeshop24.co.uk', organicKeywords: 60, organicSearchTraffic: 40, z: 2.4 },
        { name: 'customworksaus...', organicKeywords: 145, organicSearchTraffic: 30, z: 2.4 },
        { name: 'style-old-money...', organicKeywords: 70, organicSearchTraffic: 20, z: 2.4 },
        { name: 'laphont.com', organicKeywords: 50, organicSearchTraffic: 350, z: 2.4 },
        { name: 'egardwatches.com', organicKeywords: 20, organicSearchTraffic: 10, z: 2.4 },
    ],
  };
  
  console.log("SEO audit data fetched successfully.");
  return auditData;
}
