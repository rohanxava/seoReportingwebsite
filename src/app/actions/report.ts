
'use server';

import clientPromise from '@/lib/mongodb';
import { getAuditData } from '@/lib/seo';
import type { Project, User, AuditData } from '@/lib/types';
import { ObjectId } from 'mongodb';

export interface ReportData {
    project: Project;
    client: User;
    auditData: AuditData;
    generatedAt: string;
}

export async function getProjectForReport(projectId: string): Promise<ReportData | null> {
    if (!ObjectId.isValid(projectId)) {
        return null;
    }

    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');

        const project = await db.collection<Project>('projects').findOne({ _id: new ObjectId(projectId) });

        if (!project) {
            return null;
        }

        const projectClient = await db.collection<User>('users').findOne({ _id: new ObjectId(project.clientId) });

        if (!projectClient) {
            return null;
        }

        const auditData = await getAuditData();

        return {
            project: JSON.parse(JSON.stringify(project)),
            client: JSON.parse(JSON.stringify(projectClient)),
            auditData,
            generatedAt: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        };

    } catch (error) {
        console.error('Failed to fetch project for report:', error);
        return null;
    }
}
