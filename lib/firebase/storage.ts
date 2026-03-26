"use client";

import { getStorage } from "firebase/storage";

import { getFirebaseClientApp } from "@/lib/firebase/client";

export function getFirebaseStorageClient() {
  const app = getFirebaseClientApp();

  return app ? getStorage(app) : null;
}
