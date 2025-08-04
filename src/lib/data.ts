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
  sessions: { value: "12,450", change: "+15.2%", changeType: "positive" },
  bounceRate: { value: "48.3%", change: "-3.1%", changeType: "positive" },
  conversions: { value: "620", change: "+8.9%", changeType: "positive" },
  ranking: { value: "#8", change: "+2", changeType: "positive" },
};

export const trafficOverviewData = [
  { date: "2024-05-01", organic: 1200, paid: 800 },
  { date: "2024-05-02", organic: 1300, paid: 850 },
  { date: "2024-05-03", organic: 1250, paid: 900 },
  { date: "2024-05-04", organic: 1400, paid: 950 },
  { date: "2024-05-05", organic: 1550, paid: 1000 },
  { date: "2024-05-06", organic: 1600, paid: 1100 },
  { date: "2024-05-07", organic: 1750, paid: 1150 },
];

export const trafficChartConfig = {
  organic: {
    label: "Organic",
    color: "hsl(var(--chart-1))",
  },
  paid: {
    label: "Paid",
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
