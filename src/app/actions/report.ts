
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


const reportSchema = z.object({
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
  
  const validatedFields = reportSchema.safeParse(rawData);

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
    
    const result = await collection.insertOne({
      ...validatedFields.data,
      projectId: new ObjectId(validatedFields.data.projectId),
      createdAt: new Date(),
    });

    revalidatePath('/dashboard');
    
    const newReport = await collection.findOne({ _id: result.insertedId });

    return { 
        success: true, 
        message: 'Report saved successfully!',
        newReport: JSON.parse(JSON.stringify(newReport)),
    };

  } catch (error) {
    console.error('Failed to save manual report:', error);
    return { message: 'Database error: Failed to save report.' };
  }
}


const updateReportSchema = z.object({
  reportId: z.string().refine(val => ObjectId.isValid(val)),
  reportName: z.string().min(3, "Report name must be at least 3 characters."),
  auditData: z.any(),
});

export async function updateManualReport(prevState: any, formData: FormData) {
  const rawData = {
    reportId: formData.get('reportId'),
    reportName: formData.get('reportName'),
    auditData: JSON.parse(formData.get('auditData') as string),
  };

  const validatedFields = updateReportSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.'
    };
  }
  
  try {
    const client = await clientPromise;
    const db = client.db('seoAudit');
    const collection = db.collection<ManualReport>('manualReports');

    const { reportId, ...updateData } = validatedFields.data;

    const result = await collection.updateOne(
      { _id: new ObjectId(reportId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return { message: "Report not found." };
    }

    revalidatePath('/dashboard');
    
    const updatedReport = await collection.findOne({_id: new ObjectId(reportId) });

    return { 
        success: true, 
        message: 'Report updated successfully!',
        updatedReport: JSON.parse(JSON.stringify(updatedReport)),
    };
  } catch(error) {
    console.error('Failed to update manual report:', error);
    return { message: 'Database error: Failed to update report.' };
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

export async function getManualReportById(reportId: string): Promise<ManualReport | null> {
    if (!ObjectId.isValid(reportId)) {
        return null;
    }
    try {
        const client = await clientPromise;
        const db = client.db('seoAudit');
        const report = await db.collection<ManualReport>('manualReports').findOne({ _id: new ObjectId(reportId) });
        
        return report ? JSON.parse(JSON.stringify(report)) : null;
    } catch (error) {
        console.error('Failed to fetch manual report:', error);
        return null;
    }
}
