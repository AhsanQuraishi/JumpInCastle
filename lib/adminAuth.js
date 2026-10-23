import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "jic_admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sign(value) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET env var");
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionToken() {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function isValidSessionToken(token) {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;
  if (sign(issuedAt) !== signature) return false;
  const age = Date.now() - Number(issuedAt);
  return age >= 0 && age <= ADMIN_COOKIE_MAX_AGE * 1000;
}

// Server Components / Route Handlers only — reads the incoming request's cookies.
export function getIsAdmin() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}
