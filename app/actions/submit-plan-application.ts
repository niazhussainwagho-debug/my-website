'use server';

import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export type PlanApplicationState = {
  success: boolean;
  planName?: string;
  error?: string;
};

const textValue = (value: FormDataEntryValue | null) =>
  typeof value === 'string' ? value.trim() : '';

export async function submitPlanApplication(
  _previousState: PlanApplicationState,
  formData: FormData,
): Promise<PlanApplicationState> {
  const planName = textValue(formData.get('plan_name')) || textValue(formData.get('planName'));
  const fullName = textValue(formData.get('name')) || textValue(formData.get('fullName'));
  const phone = textValue(formData.get('phone'));
  const cnicOrAge = textValue(formData.get('cnicOrAge'));
  const consent = formData.get('consent') === 'on';

  if (!planName || !fullName || !phone || !consent) {
    return { success: false, error: 'Plan, naam, phone aur consent zaroori hain.' };
  }

  if (fullName.length > 100 || phone.length > 40 || cnicOrAge.length > 80) {
    return { success: false, error: 'Di hui maloomat ka format check karein.' };
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!supabaseUrl || !serviceRoleKey) {
    return { success: false, error: 'Application service abhi available nahi hai.' };
  }

  if (!gmailUser || !gmailAppPassword || !ownerEmail) {
    return { success: false, error: 'Email notification service abhi configure nahi hai.' };
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error: databaseError } = await supabase.from('plan_applications').insert({
      plan_name: planName,
      full_name: fullName,
      phone,
      cnic_or_age: cnicOrAge || null,
      consent: true,
    });

    if (databaseError) throw databaseError;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailAppPassword },
    });
    const subject = `New Plan Order: ${planName}`;
    const body = `A new customer has applied for a plan.\nName: ${fullName}\nPhone: ${phone}\nPlan: ${planName}.`;

    await transporter.sendMail({
      from: gmailUser,
      to: ownerEmail,
      subject,
      text: body,
    });

    return { success: true, planName };
  } catch (error) {
    console.error('Plan application failed:', error instanceof Error ? error.message : 'Unknown error');
    return { success: false, error: 'Application submit nahi ho saki. Baraye meherbani dobara try karein.' };
  }
}
