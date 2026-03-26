"use client";

import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const { isConfigured, loading, signInWithGoogle, signOut, user } = useAuth();

  if (!isConfigured) {
    return (
      <Button className="hidden sm:inline-flex" variant="secondary">
        Firebase setup required
      </Button>
    );
  }

  if (loading) {
    return (
      <Button className="hidden sm:inline-flex" variant="secondary">
        Loading session...
      </Button>
    );
  }

  if (!user) {
    return (
      <Button className="hidden sm:inline-flex" variant="secondary" onClick={() => void signInWithGoogle()}>
        Sign in with Google
      </Button>
    );
  }

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Link
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong bg-white/80 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/40"
        href="/dashboard"
      >
        <UserRound className="size-4" />
        Dashboard
      </Link>
      <Button onClick={() => void signOut()} variant="ghost">
        <LogOut className="mr-2 size-4" />
        Sign out
      </Button>
    </div>
  );
}
