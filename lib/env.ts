import { z } from "zod";

const clientFirebaseSchema = z.object({
  apiKey: z.string().min(1),
  authDomain: z.string().min(1),
  projectId: z.string().min(1),
  storageBucket: z.string().min(1),
  messagingSenderId: z.string().min(1),
  appId: z.string().min(1),
  measurementId: z.string().optional(),
});

const adminFirebaseSchema = z.object({
  projectId: z.string().min(1),
  clientEmail: z.string().min(1),
  privateKey: z.string().min(1),
});

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

export function adsEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
}

export function getClientFirebaseConfig() {
  const parsed = clientFirebaseSchema.safeParse({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  });

  return parsed.success ? parsed.data : null;
}

export function hasClientFirebaseConfig() {
  return Boolean(getClientFirebaseConfig());
}

export function getAdminFirebaseConfig() {
  const parsed = adminFirebaseSchema.safeParse({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  });

  if (!parsed.success) {
    return null;
  }

  return {
    projectId: parsed.data.projectId,
    clientEmail: parsed.data.clientEmail,
    privateKey: parsed.data.privateKey.replace(/\\n/g, "\n"),
  };
}

export function hasAdminFirebaseConfig() {
  return Boolean(getAdminFirebaseConfig());
}
