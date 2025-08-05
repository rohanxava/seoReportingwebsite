

import { ObjectId } from "mongodb";

export type User = {
    _id: ObjectId;
    name: string;
    email: string;
    logoUrl?: string;
    role: 'admin' | 'client';
    password?: string;
    createdBy?: ObjectId;
    otp?: string;
    otpExpires?: Date;
    resetToken?: string;
    resetTokenExpires?: Date;
};

export type Project = {
    _id: ObjectId;
    name: string;
    domain: string;
    clientId: ObjectId;
    createdBy: ObjectId;
};

export type TrafficOverviewDataPoint = { date: string; organic: number; paid: number };
export type CountryDistributionDataPoint = { country: string; share: number; traffic: string; keywords: string };
export type KeywordsByIntentDataPoint = { intent: string; percentage: number; keywords: number; traffic: number; color: string; };
export type TopOrganicKeywordsDataPoint = { keyword: string; intent: string[]; position: number | null; serp: boolean; volume: number; cpc: number; traffic: number; };
export type MainOrganicCompetitorsDataPoint = { competitor: string; comLevel: number; comKeywords: number; seKeywords: number; };
export type CompetitivePositioningDataPoint = { name: string; organicKeywords: number; organicSearchTraffic: number; z: number; };


export type AuditData = {
    authorityScore: number;
    organicSearchTraffic: number;
    paidSearchTraffic: number;
    backlinks: number;
    referringDomains: number;
    organicKeywords: number;
    paidKeywords: number;
    trafficOverviewData: TrafficOverviewDataPoint[];
    countryDistributionData: CountryDistributionDataPoint[];
    keywordsByIntentData: KeywordsByIntentDataPoint[];
    topOrganicKeywordsData: TopOrganicKeywordsDataPoint[];
    mainOrganicCompetitorsData: MainOrganicCompetitorsDataPoint[];
    competitivePositioningData: CompetitivePositioningDataPoint[];
};
