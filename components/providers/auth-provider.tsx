"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { User } from "firebase/auth";

import {
  continueAsGuest,
  listenToAuth,
  signInWithGooglePopup,
  signOutUser,
} from "@/lib/firebase/auth";
import { hasClientFirebaseConfig } from "@/lib/env";
import { syncUserProfile } from "@/lib/firebase/firestore";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<User | null>;
  continueAsGuest: () => Promise<User | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const isConfigured = hasClientFirebaseConfig();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isConfigured);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isConfigured) {
      return;
    }

    return listenToAuth((nextUser) => {
      setUser(nextUser);

      if (!nextUser) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      syncUserProfile(nextUser).catch(() => undefined);
      nextUser
        .getIdTokenResult()
        .then((tokenResult) => {
          setIsAdmin(Boolean(tokenResult.claims.admin));
        })
        .finally(() => setLoading(false));
    });
  }, [isConfigured]);

  const value: AuthContextValue = {
    user,
    loading,
    isAdmin,
    isConfigured,
    async signInWithGoogle() {
      if (!isConfigured) {
        return null;
      }

      const nextUser = await signInWithGooglePopup();
      await syncUserProfile(nextUser);
      return nextUser;
    },
    async continueAsGuest() {
      if (!isConfigured) {
        return null;
      }

      const nextUser = await continueAsGuest();
      await syncUserProfile(nextUser);
      return nextUser;
    },
    async signOut() {
      await signOutUser();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
