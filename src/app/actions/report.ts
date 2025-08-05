
'use server';

import clientPromise from '@/lib/mongodb';
import { getAuditData } from '@/lib/seo';
import type { Project, User, AuditData, ManualReport } from '@/lib/types';
import { sendReportEmail } from '@/lib/mail';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export interface ReportData {
    project: Project;
    client: User;
    auditData: AuditData;
    generatedAt: string;
}

export async function getProjectForReport(projectId: string, reportId?: string): Promise<ReportData | null> {
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

        let auditData: AuditData;

        if (reportId && ObjectId.isValid(reportId)) {
            const manualReport = await db.collection<ManualReport>('manualReports').findOne({ _id: new ObjectId(reportId) });
             if (manualReport) {
                auditData = manualReport.auditData;
            } else {
                auditData = await getAuditData();
            }
        } else {
             auditData = await getAuditData();
        }


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


export async function emailReportToClient(reportData: ReportData) {
    try {
        await sendReportEmail(reportData.client.email, reportData);
        return { success: true, message: `Report sent successfully to ${reportData.client.email}` };
    } catch (error) {
        console.error('Failed to send report email:', error);
        return { success: false, message: 'An unexpected error occurred while sending the email.' };
    }
}


const manualReportSchema = z.object({
  reportName: z.string().min(3, "Report name must be at least 3 characters."),
  projectId: z.string().refine(val => ObjectId.isValid(val)),
  auditData: z.any(),
});

export async function saveManualReport(prevState: any, formData: FormData) {
  const rawData = {
    reportName: formData.get('reportName'),
    projectId: formData.get('projectId'),
    auditData: JSON.parse(formData.get('auditData') as string),
  };
  
  const validatedFields = manualReportSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.'
    };
  }

  try {
    const client = await clientPromise;
    const db = client.db('seoAudit');
    const collection = db.collection('manualReports');
    
    await collection.insertOne({
      ...validatedFields.data,
      projectId: new ObjectId(validatedFields.data.projectId),
      createdAt: new Date(),
    });

    revalidatePath('/dashboard');
    return { success: true, message: 'Report saved successfully!' };

  } catch (error) {
    console.error('Failed to save manual report:', error);
    return { message: 'Database error: Failed to save report.' };
  }
}


export async function getManualReportsForProject(projectId: string): Promise<ManualReport[]> {
    if (!ObjectId.isValid(projectId)) {
        return [];
    }
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const reports = await db.collection('manualReports')
            .find({ projectId: new ObjectId(projectId) })
            .sort({ createdAt: -1 })
            .toArray();

        return JSON.parse(JSON.stringify(reports));
    } catch (error) {
        console.error('Failed to fetch manual reports:', error);
        return [];
    }
}

export async function getManualReportById(reportId: string): Promise<AuditData | null> {
    if (!ObjectId.isValid(reportId)) {
        return null;
    }
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const report = await db.collection<ManualReport>('manualReports').findOne({ _id: new ObjectId(reportId) });
        
        return report ? report.auditData : null;
    } catch (error) {
        console.error('Failed to fetch manual report:', error);
        return null;
    }
}
