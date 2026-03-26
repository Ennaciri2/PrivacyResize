import { getApp, getApps, initializeApp } from "firebase/app";

import { getClientFirebaseConfig } from "@/lib/env";

export function getFirebaseClientApp() {
  const config = getClientFirebaseConfig();

  if (!config) {
    return null;
  }

  return getApps().length ? getApp() : initializeApp(config);
}
