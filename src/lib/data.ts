

import type { ChartConfig } from "@/components/ui/chart";

export const kpiData = {
  sessions: { value: "12,450", change: "+15.2%", changeType: "positive" as const },
  bounceRate: { value: "48.3%", change: "-3.1%", changeType: "positive" as const },
  conversions: { value: "620", change: "+8.9%", changeType: "positive" as const },
  ranking: { value: "#8", change: "+2", changeType: "positive" as const },
};

export const trafficOverviewData = [
  { date: "2024-03-01", organic: 5200, paid: 500 },
  { date: "2024-04-01", organic: 5100, paid: 550 },
  { date: "2024-05-01", organic: 4800, paid: 600 },
  { date: "2024-06-01", organic: 3500, paid: 450 },
  { date: "2024-07-01", organic: 3800, paid: 500 },
  { date: "2024-8-01", organic: 3633, paid: 400 },
];

export const trafficChartConfig = {
  organic: {
    label: "Organic Traffic",
    color: "hsl(var(--chart-1))",
  },
  paid: {
    label: "Paid Traffic",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const siteAuditData = {
  score: 88,
  coreWebVitals: { lcp: 2.1, fid: 25, cls: 0.08 },
  errors: 5,
  warnings: 12,
};

export const keywordRankingsData = [
  { keyword: "AI-powered CRM", position: 3, change: 1, trend: [5, 4, 3, 3] },
  { keyword: "Cloud solutions for startups", position: 5, change: -1, trend: [3, 4, 4, 5] },
  { keyword: "Data analytics tools", position: 8, change: 0, trend: [8, 8, 8, 8] },
  { keyword: "Best project management software", position: 12, change: 3, trend: [18, 15, 15, 12] },
  { keyword: "Enterprise SaaS platform", position: 15, change: -2, trend: [11, 12, 13, 15] },
];

export const topPagesData = [
  { path: "/features/ai-crm", sessions: 2890, conversionRate: "5.2%" },
  { path: "/blog/future-of-cloud", sessions: 1980, conversionRate: "3.1%" },
  { path: "/pricing", sessions: 1520, conversionRate: "8.5%" },
  { path: "/case-studies/quantum-leap", sessions: 980, conversionRate: "2.5%" },
  { path: "/integrations", sessions: 750, conversionRate: "1.8%" },
];

export const backlinksData = {
  new: 24,
  lost: 8,
  toxic: 3,
};

export const competitorData = [
    { name: "Competitor A", avgRanking: 5, domain: "competitor-a.com" },
    { name: "Competitor B", avgRanking: 10, domain: "competitor-b.com" },
    { name: "Competitor C", avgRanking: 12, domain: "competitor-c.com" },
    { name: "Competitor D", avgRanking: 18, domain: "competitor-d.com" },
];

export const countryDistributionData = [
    { country: "Worldwide", share: 100, traffic: "3.6K", keywords: "1K" },
    { country: "🇺🇸 US", share: 58, traffic: "2.1K", keywords: "689" },
    { country: "🇮🇳 IN", share: 12, traffic: "429", keywords: "23" },
    { country: "🇦🇺 AU", share: 1, traffic: "1", keywords: "16" },
    { country: "Other", share: 30, traffic: "1.1K", keywords: "318" },
];

export const organicKeywordsData = [
  { month: "Mar 1", top3: 150, '4-10': 200, '11-20': 250, '21-50': 200, '51-100': 150, serp: 50 },
  { month: "Apr 1", top3: 160, '4-10': 210, '11-20': 260, '21-50': 210, '51-100': 160, serp: 55 },
  { month: "May 1", top3: 170, '4-10': 220, '11-20': 270, '21-50': 220, '51-100': 170, serp: 60 },
  { month: "Jun 1", top3: 180, '4-10': 230, '11-20': 280, '21-50': 230, '51-100': 180, serp: 65 },
  { month: "Jul 1", top3: 190, '4-10': 240, '11-20': 290, '21-50': 240, '51-100': 190, serp: 70 },
  { month: "Aug 1", top3: 200, '4-10': 250, '11-20': 300, '21-50': 250, '51-100': 200, serp: 75 },
];

export const organicKeywordsChartConfig = {
  top3: { label: "Top 3", color: "hsl(var(--chart-1))" },
  '4-10': { label: "4-10", color: "hsl(var(--chart-2))" },
  '11-20': { label: "11-20", color: "hsl(var(--chart-3))" },
  '21-50': { label: "21-50", color: "hsl(var(--chart-4))" },
  '51-100': { label: "51-100", color: "hsl(var(--chart-5))" },
  serp: { label: "SERP Features", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export const topOrganicKeywordsData = [
    { keyword: "police brand wat...", intent: ["C"], position: null, serp: true, volume: 90, cpc: 0.23, traffic: 100.00 },
    { keyword: "watch tel", intent: ["C"], position: 64, serp: false, volume: 320, cpc: 0.57, traffic: 0.00 },
    { keyword: "police wtch", intent: ["C"], position: null, serp: true, volume: 50, cpc: 0.22, traffic: 0.00 },
    { keyword: "mens infinity bra...", intent: ["I", "T"], position: 37, serp: false, volume: 70, cpc: 0.92, traffic: 0.00 },
    { keyword: "father and son o...", intent: ["I"], position: 36, serp: false, volume: 50, cpc: 0.00, traffic: 0.00 },
];

export const mainOrganicCompetitorsData = [
  { competitor: "cajeestimezone.c...", comLevel: 80, comKeywords: 3, seKeywords: 43 },
  { competitor: "timeshop24.co.uk", comLevel: 20, comKeywords: 1, seKeywords: 48 },
  { competitor: "customworksaus...", comLevel: 10, comKeywords: 1, seKeywords: 146 },
  { competitor: "style-old-money...", comLevel: 15, comKeywords: 1, seKeywords: 67 },
  { competitor: "laphont.com", comLevel: 12, comKeywords: 1, seKeywords: 47 },
];

export const competitivePositioningData = [
    { name: 'cajeestimezone.c...', organicKeywords: 45, organicSearchTraffic: 50, z: 2.4 },
    { name: 'timeshop24.co.uk', organicKeywords: 60, organicSearchTraffic: 40, z: 2.4 },
    { name: 'customworksaus...', organicKeywords: 145, organicSearchTraffic: 30, z: 2.4 },
    { name: 'style-old-money...', organicKeywords: 70, organicSearchTraffic: 20, z: 2.4 },
    { name: 'laphont.com', organicKeywords: 50, organicSearchTraffic: 350, z: 2.4 },
    { name: 'egardwatches.com', organicKeywords: 20, organicSearchTraffic: 10, z: 2.4 },
];

export const competitivePositioningChartConfig = {
    cajeestimezone: { label: "cajeestimezone.c...", color: "hsl(var(--chart-1))" },
    timeshop24: { label: "timeshop24.co.uk", color: "hsl(var(--chart-2))" },
    customworksa: { label: "customworksaus...", color: "hsl(var(--chart-3))" },
    styleoldmone: { label: "style-old-money...", color: "hsl(var(--chart-4))" },
    laphont: { label: "laphont.com", color: "hsl(var(--chart-5))" },
    egardwatches: { label: "egardwatches.com", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;


export const keywordsByIntentData = [
  { intent: 'Informational', percentage: 27.8, keywords: 5, traffic: 0, color: 'bg-blue-500' },
  { intent: 'Navigational', percentage: 5.6, keywords: 1, traffic: 0, color: 'bg-purple-500' },
  { intent: 'Commercial', percentage: 50, keywords: 9, traffic: 1, color: 'bg-yellow-400' },
  { intent: 'Transactional', percentage: 16.7, keywords: 3, traffic: 0, color: 'bg-teal-500' },
];
