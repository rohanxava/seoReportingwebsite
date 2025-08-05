

import { ObjectId } from "mongodb";

export type User = {
    _id: ObjectId;
    name: string;
    email: string;
    logoUrl?: string;
    role: 'admin' | 'client';
    password?: string;
    createdBy?: ObjectId;
};

export type Project = {
    _id: ObjectId;
    name: string;
    domain: string;
    clientId: ObjectId;
    createdBy?: ObjectId;
}
