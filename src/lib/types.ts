

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
};

export type AuditData = {
    authorityScore: number;
    organicSearchTraffic: number;
    paidSearchTraffic: number;
    backlinks: number;
    referringDomains: number;
    organicKeywords: number;
    paidKeywords: number;
};
    
