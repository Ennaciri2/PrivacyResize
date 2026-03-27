"use client";

import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthButtonProps {
  className?: string;
  layout?: "desktop" | "mobile";
  onAction?: () => void;
}

export function AuthButton({ className, layout = "desktop", onAction }: AuthButtonProps) {
  const { isConfigured, loading, signInWithGoogle, signOut, user } = useAuth();
  const mobile = layout === "mobile";
  const buttonClassName = cn(mobile ? "w-full justify-center" : "hidden sm:inline-flex", className);

  if (!isConfigured) {
    return (
      <Button className={buttonClassName} variant="secondary">
        Firebase setup required
      </Button>
    );
  }

  if (loading) {
    return (
      <Button className={buttonClassName} variant="secondary">
        Loading session...
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        className={buttonClassName}
        onClick={() => {
          onAction?.();
          void signInWithGoogle();
        }}
        variant="secondary"
      >
        Sign in with Google
      </Button>
    );
  }

  if (mobile) {
    return (
      <div className="flex flex-col gap-2">
        <Link
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong bg-white/86 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/40"
          href="/dashboard"
          onClick={onAction}
        >
          <UserRound className="size-4" />
          Dashboard
        </Link>
        <Button
          className="w-full justify-center"
          onClick={() => {
            onAction?.();
            void signOut();
          }}
          variant="ghost"
        >
          <LogOut className="mr-2 size-4" />
          Sign out
        </Button>
      </div>
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
