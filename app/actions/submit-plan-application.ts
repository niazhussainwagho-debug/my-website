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

  let databaseSaved = false;
  let emailSent = false;

  if (supabaseUrl && serviceRoleKey) {
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
      databaseSaved = true;
    } catch (error) {
      console.error('Plan application database save failed:', error instanceof Error ? error.message : 'Unknown database error');
    }
  } else {
    console.error('Plan application database save skipped: Supabase server configuration is missing.');
  }

  if (gmailUser && gmailAppPassword && ownerEmail) {
    try {
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
      emailSent = true;
    } catch (error) {
      console.error('Plan application email failed:', error instanceof Error ? error.message : 'Unknown email error');
    }
  } else {
    console.error('Plan application email skipped: Gmail or OWNER_EMAIL configuration is missing.');
  }

  if (databaseSaved || emailSent) return { success: true, planName };
  return { success: false, error: 'Application save aur email dono fail ho gaye. Baraye meherbani dobara try karein.' };
}
