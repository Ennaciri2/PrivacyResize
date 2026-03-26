"use client";

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

import { getFirebaseClientApp } from "@/lib/firebase/client";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export function getFirebaseAuth() {
  const app = getFirebaseClientApp();

  return app ? getAuth(app) : null;
}

export function listenToAuth(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();

  if (!auth) {
    callback(null);
    return () => undefined;
  }

  return onAuthStateChanged(auth, callback);
}

export async function continueAsGuest() {
  const auth = getFirebaseAuth();

  if (!auth) {
    throw new Error("Firebase Auth is not configured.");
  }

  const result = await signInAnonymously(auth);
  return result.user;
}

export async function signInWithGooglePopup() {
  const auth = getFirebaseAuth();

  if (!auth) {
    throw new Error("Firebase Auth is not configured.");
  }

  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutUser() {
  const auth = getFirebaseAuth();

  if (!auth) {
    return;
  }

  await signOut(auth);
}
