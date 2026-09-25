import crypto from "node:crypto";

export const ADMIN_SESSION_COOKIE_NAME = "admin_session";
export const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function compareSecrets(candidate: string, actual: string) {
  const candidateBuffer = Buffer.from(candidate);
  const actualBuffer = Buffer.from(actual);

  if (candidateBuffer.length !== actualBuffer.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(candidateBuffer, actualBuffer);
  } catch {
    return false;
  }
}

export function createAdminSessionToken() {
  const password = getAdminPassword();

  if (!password) {
    return "";
  }

  const issuedAt = Date.now().toString();
  const signature = crypto.createHmac("sha256", password).update(issuedAt).digest("hex");

  return `${issuedAt}.${signature}`;
}

export function isValidAdminSessionCookie(value?: string) {
  if (!value) {
    return false;
  }

  const password = getAdminPassword();

  if (!password) {
    return false;
  }

  const [issuedAt, signature] = value.split(".");

  if (!issuedAt || !signature) {
    return false;
  }

  const timestamp = Number(issuedAt);
  const now = Date.now();

  if (!Number.isFinite(timestamp) || now - timestamp > ADMIN_SESSION_TTL_MS) {
    return false;
  }

  const expectedSignature = crypto.createHmac("sha256", password).update(issuedAt).digest("hex");
  return compareSecrets(signature, expectedSignature);
}
