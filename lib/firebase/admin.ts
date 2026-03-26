import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import type { SeoPreset } from "@/types";
import { getAdminFirebaseConfig } from "@/lib/env";

function getFirebaseAdminApp() {
  const config = getAdminFirebaseConfig();

  if (!config) {
    return null;
  }

  if (getApps().length) {
    return getApp();
  }

  return initializeApp({
    credential: cert({
      projectId: config.projectId,
      clientEmail: config.clientEmail,
      privateKey: config.privateKey,
    }),
  });
}

export function getFirebaseAdminDb() {
  const app = getFirebaseAdminApp();

  return app ? getFirestore(app) : null;
}

export function getFirebaseAdminAuth() {
  const app = getFirebaseAdminApp();

  return app ? getAuth(app) : null;
}

export async function getRemoteSeoPreset(slug: string): Promise<SeoPreset | null> {
  const db = getFirebaseAdminDb();

  if (!db) {
    return null;
  }

  const snapshot = await db.collection("seoPresets").doc(slug).get();

  return snapshot.exists ? (snapshot.data() as SeoPreset) : null;
}

export async function listRemoteSeoPresets(): Promise<SeoPreset[]> {
  const db = getFirebaseAdminDb();

  if (!db) {
    return [];
  }

  const snapshots = await db.collection("seoPresets").get();
  return snapshots.docs.map((snapshot) => snapshot.data() as SeoPreset);
}
