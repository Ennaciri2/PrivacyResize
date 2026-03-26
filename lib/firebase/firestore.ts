"use client";

import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import type { User } from "firebase/auth";

import type {
  AdminSeoPresetInput,
  FeedbackFormData,
  SavedPreset,
  ToolConfig,
  ToolUsageEvent,
  UserProfile,
} from "@/types";
import { getFirebaseClientApp } from "@/lib/firebase/client";

function toIsoString(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "object" && value !== null && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  return new Date().toISOString();
}

export function getFirebaseDb() {
  const app = getFirebaseClientApp();

  return app ? getFirestore(app) : null;
}

export async function syncUserProfile(user: User) {
  const db = getFirebaseDb();

  if (!db) {
    return;
  }

  await setDoc(
    doc(db, "users", user.uid),
    {
      displayName: user.displayName ?? null,
      email: user.email ?? null,
      photoURL: user.photoURL ?? null,
      isAnonymous: user.isAnonymous,
      favoritePresetSlugs: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const db = getFirebaseDb();

  if (!db) {
    return null;
  }

  const snapshot = await getDoc(doc(db, "users", userId));

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    displayName: (data.displayName as string | null | undefined) ?? null,
    email: (data.email as string | null | undefined) ?? null,
    photoURL: (data.photoURL as string | null | undefined) ?? null,
    isAnonymous: Boolean(data.isAnonymous),
    favoritePresetSlugs: Array.isArray(data.favoritePresetSlugs)
      ? (data.favoritePresetSlugs as string[])
      : [],
    createdAt: toIsoString(data.createdAt),
    updatedAt: toIsoString(data.updatedAt),
  };
}

export async function toggleFavoritePreset(userId: string, slug: string, isFavorite: boolean) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  await updateDoc(doc(db, "users", userId), {
    favoritePresetSlugs: isFavorite ? arrayUnion(slug) : arrayRemove(slug),
    updatedAt: serverTimestamp(),
  });
}

export async function savePresetForUser(userId: string, name: string, config: ToolConfig) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  await addDoc(collection(db, "savedPresets"), {
    userId,
    name,
    isFavorite: false,
    config,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function listSavedPresets(userId: string): Promise<SavedPreset[]> {
  const db = getFirebaseDb();

  if (!db) {
    return [];
  }

  const savedPresetsQuery = query(
    collection(db, "savedPresets"),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc"),
  );

  const snapshots = await getDocs(savedPresetsQuery);

  return snapshots.docs.map((snapshot) => {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      name: String(data.name),
      userId: String(data.userId),
      isFavorite: Boolean(data.isFavorite),
      config: data.config as ToolConfig,
      createdAt: toIsoString(data.createdAt),
      updatedAt: toIsoString(data.updatedAt),
    };
  });
}

export async function trackToolUsage(
  userId: string,
  action: ToolUsageEvent["action"],
  source: string,
  itemCount: number,
) {
  const db = getFirebaseDb();

  if (!db) {
    return;
  }

  await addDoc(collection(db, "toolUsage"), {
    userId,
    action,
    source,
    itemCount,
    createdAt: serverTimestamp(),
  });
}

export async function listToolUsage(userId: string): Promise<ToolUsageEvent[]> {
  const db = getFirebaseDb();

  if (!db) {
    return [];
  }

  const usageQuery = query(
    collection(db, "toolUsage"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );
  const snapshots = await getDocs(usageQuery);

  return snapshots.docs.map((snapshot) => {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      userId: String(data.userId),
      action: data.action as ToolUsageEvent["action"],
      source: String(data.source),
      itemCount: Number(data.itemCount ?? 0),
      createdAt: toIsoString(data.createdAt),
    };
  });
}

export async function submitFeedback(payload: FeedbackFormData) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  await addDoc(collection(db, "feedback"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export async function listAdminSeoPresets() {
  const db = getFirebaseDb();

  if (!db) {
    return [];
  }

  const snapshots = await getDocs(query(collection(db, "seoPresets"), orderBy("title", "asc")));

  return snapshots.docs.map((snapshot) => snapshot.data() as AdminSeoPresetInput);
}

export async function upsertAdminSeoPreset(payload: AdminSeoPresetInput) {
  const db = getFirebaseDb();

  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  await setDoc(
    doc(db, "seoPresets", payload.slug),
    {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}
