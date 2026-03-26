"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/providers/auth-provider";
import { listAdminSeoPresets, upsertAdminSeoPreset } from "@/lib/firebase/firestore";
import { seoPresetFormSchema } from "@/lib/validators";
import type { AdminSeoPresetInput } from "@/types";

interface AdminPresetFormValues {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  useCase: string;
  bestFor: string;
  stepsInput: string;
  faqInput: string;
  width: number;
  height: number;
  category: string;
  relatedSlugsInput: string;
  tagsInput: string;
}

function mapPresetToForm(preset: AdminSeoPresetInput): AdminPresetFormValues {
  return {
    slug: preset.slug,
    title: preset.title,
    h1: preset.h1,
    metaTitle: preset.metaTitle,
    metaDescription: preset.metaDescription,
    intro: preset.intro,
    useCase: preset.useCase,
    bestFor: preset.bestFor,
    stepsInput: preset.steps.join("\n"),
    faqInput: preset.faq.map((item) => `${item.question} | ${item.answer}`).join("\n"),
    width: preset.width,
    height: preset.height,
    category: preset.category,
    relatedSlugsInput: preset.relatedSlugs.join(", "),
    tagsInput: preset.tags.join(", "),
  };
}

export function AdminPresetManager() {
  const { isAdmin, isConfigured, loading, user } = useAuth();
  const [presets, setPresets] = useState<AdminSeoPresetInput[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<AdminPresetFormValues>({
    defaultValues: {
      slug: "",
      title: "",
      h1: "",
      metaTitle: "",
      metaDescription: "",
      intro: "",
      useCase: "",
      bestFor: "",
      stepsInput: "",
      faqInput: "",
      width: 1080,
      height: 1080,
      category: "social",
      relatedSlugsInput: "",
      tagsInput: "",
    },
  });

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    listAdminSeoPresets()
      .then((items) => setPresets(items))
      .catch((error) => setStatus(error instanceof Error ? error.message : "Could not load admin presets."));
  }, [isAdmin]);

  if (!isConfigured) {
    return <Card>Add Firebase config and an admin claim to manage shared SEO presets here.</Card>;
  }

  if (loading) {
    return <Card>Checking your session...</Card>;
  }

  if (!user || !isAdmin) {
    return (
      <Card className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Admin SEO manager</h1>
        <p className="text-sm leading-7 text-foreground/68">
          This area is protected by Firebase custom claims. Sign in with an admin-marked account to edit shared preset
          content.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Shared preset form</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Create or update SEO content</h1>
        </div>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (values) => {
            setStatus(null);

            try {
              const payload = seoPresetFormSchema.parse({
                slug: values.slug,
                title: values.title,
                h1: values.h1,
                metaTitle: values.metaTitle,
                metaDescription: values.metaDescription,
                intro: values.intro,
                useCase: values.useCase,
                bestFor: values.bestFor,
                steps: values.stepsInput
                  .split("\n")
                  .map((line: string) => line.trim())
                  .filter(Boolean),
                faq: values.faqInput
                  .split("\n")
                  .map((line: string) => line.trim())
                  .filter(Boolean)
                  .map((line: string) => {
                    const [question, ...answerParts] = line.split("|");
                    return {
                      question: question?.trim() ?? "",
                      answer: answerParts.join("|").trim(),
                    };
                  }),
                width: values.width,
                height: values.height,
                category: values.category,
                relatedSlugs: values.relatedSlugsInput
                  .split(",")
                  .map((item: string) => item.trim())
                  .filter(Boolean),
                tags: values.tagsInput
                  .split(",")
                  .map((item: string) => item.trim())
                  .filter(Boolean),
              });
              await upsertAdminSeoPreset(payload);
              setStatus(`Saved ${payload.slug} to Firestore.`);
              const refreshed = await listAdminSeoPresets();
              setPresets(refreshed);
            } catch (error) {
              setStatus(error instanceof Error ? error.message : "Could not save the preset.");
            }
          })}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-foreground/68">
              <span className="font-semibold text-foreground">Slug</span>
              <Input placeholder="instagram-post" {...register("slug")} />
              {errors.slug ? <span className="text-danger">{errors.slug.message}</span> : null}
            </label>
            <label className="space-y-2 text-sm text-foreground/68">
              <span className="font-semibold text-foreground">Category</span>
              <Input placeholder="social" {...register("category")} />
              {errors.category ? <span className="text-danger">{errors.category.message}</span> : null}
            </label>
          </div>
          <label className="space-y-2 text-sm text-foreground/68">
            <span className="font-semibold text-foreground">Title</span>
            <Input {...register("title")} />
          </label>
          <label className="space-y-2 text-sm text-foreground/68">
            <span className="font-semibold text-foreground">H1</span>
            <Input {...register("h1")} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-foreground/68">
              <span className="font-semibold text-foreground">Meta title</span>
              <Input {...register("metaTitle")} />
            </label>
            <label className="space-y-2 text-sm text-foreground/68">
              <span className="font-semibold text-foreground">Meta description</span>
              <Input {...register("metaDescription")} />
            </label>
          </div>
          <label className="space-y-2 text-sm text-foreground/68">
            <span className="font-semibold text-foreground">Intro</span>
            <Textarea {...register("intro")} />
          </label>
          <label className="space-y-2 text-sm text-foreground/68">
            <span className="font-semibold text-foreground">Use case</span>
            <Textarea {...register("useCase")} />
          </label>
          <label className="space-y-2 text-sm text-foreground/68">
            <span className="font-semibold text-foreground">Best for</span>
            <Textarea {...register("bestFor")} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-foreground/68">
              <span className="font-semibold text-foreground">Width</span>
              <Input type="number" {...register("width", { valueAsNumber: true })} />
            </label>
            <label className="space-y-2 text-sm text-foreground/68">
              <span className="font-semibold text-foreground">Height</span>
              <Input type="number" {...register("height", { valueAsNumber: true })} />
            </label>
          </div>
          <label className="space-y-2 text-sm text-foreground/68">
            <span className="font-semibold text-foreground">Steps</span>
            <Textarea placeholder="One step per line" {...register("stepsInput")} />
          </label>
          <label className="space-y-2 text-sm text-foreground/68">
            <span className="font-semibold text-foreground">FAQ</span>
            <Textarea placeholder="Question | Answer" {...register("faqInput")} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-foreground/68">
              <span className="font-semibold text-foreground">Related slugs</span>
              <Input placeholder="instagram-story, facebook-ad" {...register("relatedSlugsInput")} />
            </label>
            <label className="space-y-2 text-sm text-foreground/68">
              <span className="font-semibold text-foreground">Tags</span>
              <Input placeholder="instagram post size, 1080x1080" {...register("tagsInput")} />
            </label>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Saving..." : "Save preset"}
            </Button>
            <Button
              onClick={() =>
                reset({
                  slug: "",
                  title: "",
                  h1: "",
                  metaTitle: "",
                  metaDescription: "",
                  intro: "",
                  useCase: "",
                  bestFor: "",
                  stepsInput: "",
                  faqInput: "",
                  width: 1080,
                  height: 1080,
                  category: "social",
                  relatedSlugsInput: "",
                  tagsInput: "",
                })
              }
              variant="secondary"
            >
              Reset form
            </Button>
          </div>
          {status ? <p className="text-sm leading-7 text-foreground/68">{status}</p> : null}
        </form>
      </Card>
      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Firestore presets</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{presets.length} shared entries</h2>
        </div>
        <div className="grid gap-3">
          {presets.length ? (
            presets.map((preset) => (
              <button
                className="rounded-[1.3rem] border border-border bg-white/80 px-4 py-4 text-left transition hover:border-accent/30"
                key={String(preset.slug)}
                onClick={() => reset(mapPresetToForm(preset))}
                type="button"
              >
                <p className="text-sm font-semibold text-foreground">{String(preset.title)}</p>
                <p className="mt-1 text-xs text-foreground/58">
                  {String(preset.slug)} • {String(preset.width)} x {String(preset.height)}
                </p>
              </button>
            ))
          ) : (
            <p className="text-sm leading-7 text-foreground/62">
              No shared presets saved in Firestore yet. The local seed data still powers the public landing pages.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
