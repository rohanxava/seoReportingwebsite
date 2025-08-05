
import type { ChartConfig } from "@/components/ui/chart";

export const clients = [
  { id: "1", name: "Innovate Inc.", logo: "https://placehold.co/32x32.png" },
  { id: "2", name: "Quantum Leap", logo: "https://placehold.co/32x32.png" },
  { id: "3", name: "Stellar Solutions", logo: "https://placehold.co/32x32.png" },
];

export const projects = [
  { id: "p1", name: "Innovate Website", clientId: "1", domain: "innovate.com" },
  { id: "p2", name: "Quantum Blog", clientId: "2", domain: "quantumleap.blog" },
  { id: "p3", name: "Stellar E-commerce", clientId: "3", domain: "shopstellar.com" },
];

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
  { date: "2024-08-01", organic: 3633, paid: 400 },
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
