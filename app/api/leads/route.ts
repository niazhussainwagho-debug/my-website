import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { cleanPhone } from "../../../lib/phone";

type LeadType = "contact" | "plan_enquiry" | "agent_prereg" | "health_enquiry";

type LeadPayload = {
  type: LeadType;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  city?: unknown;
  age?: unknown;
  plan?: unknown;
  education?: unknown;
  experience?: unknown;
  best_time?: unknown;
  family_members?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
};

type Lead = {
  type: LeadType;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  age: string | null;
  plan: string | null;
  education: string | null;
  experience: string | null;
  best_time: string | null;
  family_members: string | null;
  message: string | null;
  consent: boolean;
};

type RateEntry = {
  count: number;
  resetAt: number;
};

const rateLimit = new Map<string, RateEntry>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const textValue = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const nullableText = (value: unknown) => {
  const valueAsText = textValue(value);
  return valueAsText || null;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const whatsappUrl = (phone: string) => {
  const normalizedPhone = phone.startsWith("03") ? `92${phone.slice(1)}` : phone;
  return `https://wa.me/${normalizedPhone}`;
};

const successResponse = () => NextResponse.json({ success: true });

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT) return true;

  current.count += 1;
  return false;
}

function validatePayload(payload: LeadPayload): Lead | string {
  const type = payload.type;
  const name = textValue(payload.name);
  const phoneInput = textValue(payload.phone);
  const phone = cleanPhone(phoneInput);
  const email = textValue(payload.email);
  const message = textValue(payload.message);

  if (!["contact", "plan_enquiry", "agent_prereg", "health_enquiry"].includes(type)) return "Invalid lead type.";
  if (!name) return "Name is required.";
  if (name.length > 100) return "Name is too long.";
  if (!phone) return "A valid phone number is required.";
  if (email && (email.length > 320 || !emailPattern.test(email))) return "Email is invalid.";
  if (message.length > 1000) return "Message is too long.";
  if (payload.consent !== true) return "Consent is required.";

  return {
    type,
    name,
    phone,
    email: email || null,
    city: nullableText(payload.city),
    age: nullableText(payload.age),
    plan: nullableText(payload.plan),
    education: nullableText(payload.education),
    experience: nullableText(payload.experience),
    best_time: nullableText(payload.best_time),
    family_members: nullableText(payload.family_members),
    message: message || null,
    consent: true,
  };
}

function fieldRows(lead: Lead) {
  const fields: Array<[string, string]> = [
    ["Type", lead.type],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "-"],
    ["City", lead.city || "-"],
    ["Age", lead.age || "-"],
    ["Plan", lead.plan || "-"],
    ["Education", lead.education || "-"],
    ["Experience", lead.experience || "-"],
    ["Best time", lead.best_time || "-"],
    ["Family members", lead.family_members || "-"],
    ["Message", lead.message || "-"],
    ["Consent", lead.consent ? "Yes" : "No"],
    ["WhatsApp", whatsappUrl(lead.phone)],
  ];

  return fields;
}

async function sendOwnerEmail(lead: Lead) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!gmailUser || !gmailAppPassword || !ownerEmail) {
    throw new Error("Owner email configuration is missing.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });
  const subject = `Nayi enquiry: ${lead.type} - ${lead.name}`;
  const rows = fieldRows(lead)
    .map(([label, value]) => `<tr><td style="padding:6px 10px;font-weight:bold">${escapeHtml(label)}</td><td style="padding:6px 10px">${escapeHtml(value)}</td></tr>`)
    .join("");

  await transporter.sendMail({
    from: gmailUser,
    to: ownerEmail,
    subject,
    text: fieldRows(lead).map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<h2>${escapeHtml(subject)}</h2><table>${rows}</table>`,
  });
}

async function sendCustomerEmail(lead: Lead) {
  if (!lead.email) return;

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    throw new Error("Customer email configuration is missing.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });
  const message = "Shukriya! Sukkur Area Office ne aap ki enquiry receive kar li hai, hum jald rabta karenge.";

  await transporter.sendMail({
    from: gmailUser,
    to: lead.email,
    subject: "Aap ki enquiry receive ho gayi",
    text: message,
    html: `<p>${escapeHtml(message)}</p>`,
  });
}

async function sendTelegramMessage(lead: Lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) throw new Error("Telegram configuration is missing.");

  const summary = [
    `Nayi enquiry: ${lead.type}`,
    `Naam: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Plan/Shehar: ${lead.plan || "-"} / ${lead.city || "-"}`,
    `WhatsApp: ${whatsappUrl(lead.phone)}`,
  ].join("\n");
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: summary }),
  });

  if (!response.ok) throw new Error(`Telegram request failed with status ${response.status}.`);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (textValue(payload.website)) return successResponse();

  const result = validatePayload(payload);
  if (typeof result === "string") {
    return NextResponse.json({ error: result }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Lead save failed: Supabase server configuration is missing.");
    return NextResponse.json({ error: "Lead service is unavailable." }, { status: 503 });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await supabase.from("leads").insert(result);
    if (error) throw error;
  } catch (error) {
    console.error("Lead save failed:", error instanceof Error ? error.message : "Unknown database error");
    return NextResponse.json({ error: "Lead service is unavailable." }, { status: 503 });
  }

  const notificationResults = await Promise.allSettled([
    sendOwnerEmail(result),
    sendTelegramMessage(result),
    sendCustomerEmail(result),
  ]);
  notificationResults.forEach((notificationResult) => {
    if (notificationResult.status === "rejected") {
      console.error("Lead notification failed:", notificationResult.reason instanceof Error ? notificationResult.reason.message : "Unknown notification error");
    }
  });

  return successResponse();
}
