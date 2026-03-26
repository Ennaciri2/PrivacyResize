"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Clock3, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import { getUserProfile, listSavedPresets, listToolUsage } from "@/lib/firebase/firestore";
import type { SavedPreset, ToolUsageEvent, UserProfile } from "@/types";

export function DashboardShell() {
  const { continueAsGuest, isConfigured, loading, signInWithGoogle, user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([]);
  const [toolUsage, setToolUsage] = useState<ToolUsageEvent[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    Promise.all([getUserProfile(user.uid), listSavedPresets(user.uid), listToolUsage(user.uid)])
      .then(([nextProfile, nextPresets, nextUsage]) => {
        setProfile(nextProfile);
        setSavedPresets(nextPresets);
        setToolUsage(nextUsage);
      })
      .catch((error) => {
        setStatus(error instanceof Error ? error.message : "Could not load dashboard data.");
      });
  }, [user?.uid]);

  const visibleProfile = user ? profile : null;
  const visibleSavedPresets = user ? savedPresets : [];
  const visibleToolUsage = user ? toolUsage : [];

  if (!isConfigured) {
    return (
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm leading-7 text-foreground/68">
          Add your Firebase configuration to unlock saved presets, usage history, and anonymous guest persistence.
        </p>
      </Card>
    );
  }

  if (loading) {
    return <Card className="text-sm text-foreground/68">Loading your dashboard...</Card>;
  }

  if (!user) {
    return (
      <Card className="space-y-5">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Save presets and review usage</h1>
        <p className="text-sm leading-7 text-foreground/68">
          Use Google sign-in for a named account, or continue as an anonymous guest if you want lightweight saved
          presets without the extra step.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => void signInWithGoogle()}>Sign in with Google</Button>
          <Button onClick={() => void continueAsGuest()} variant="secondary">
            Continue as guest
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Account overview</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {visibleProfile?.displayName ?? (user.isAnonymous ? "Guest workspace" : "PrivacyResize dashboard")}
        </h1>
        <p className="text-sm leading-7 text-foreground/68">
          Save configurations you reuse often, review your recent tool activity, and keep favorite presets close by.
        </p>
        {status ? <p className="text-sm text-danger">{status}</p> : null}
      </Card>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Saved presets</p>
              <h2 className="mt-1 text-2xl font-semibold text-foreground">{visibleSavedPresets.length} saved</h2>
            </div>
            <Link
              className="inline-flex min-h-11 items-center rounded-full border border-border-strong bg-white/85 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/30"
              href="/tool"
            >
              <ChevronRight className="mr-2 size-4" />
              Open tool
            </Link>
          </div>
          <div className="grid gap-3">
            {visibleSavedPresets.length ? (
              visibleSavedPresets.map((preset) => (
                <div className="rounded-[1.3rem] border border-border bg-white/80 px-4 py-4" key={preset.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{preset.name}</p>
                      <p className="mt-1 text-xs text-foreground/58">
                        {preset.config.width} x {preset.config.height} • {preset.config.resizeMode} •{" "}
                        {preset.config.outputFormat.replace("image/", "").toUpperCase()}
                      </p>
                    </div>
                    {preset.isFavorite ? <Heart className="size-4 fill-current text-accent" /> : null}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-foreground/62">
                No saved presets yet. Open the tool, tune a configuration, and use the save action to store it here.
              </p>
            )}
          </div>
        </Card>
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Usage history</p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground">Recent activity</h2>
          </div>
          <div className="grid gap-3">
            {visibleToolUsage.length ? (
              visibleToolUsage.map((entry) => (
                <div className="rounded-[1.3rem] border border-border bg-white/80 px-4 py-4" key={entry.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold capitalize text-foreground">
                        {entry.action.replace("-", " ")}
                      </p>
                      <p className="mt-1 text-xs text-foreground/58">
                        Source: {entry.source} • {entry.itemCount} item(s)
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/56">
                      <Clock3 className="size-3.5" />
                      {new Date(entry.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-foreground/62">
                Usage history appears after you process, download, or save presets while signed in or using anonymous
                guest mode.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
