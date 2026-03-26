"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback } from "@/lib/firebase/firestore";
import { feedbackSchema } from "@/lib/validators";
import type { FeedbackFormData } from "@/types";

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      page: "/contact",
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (values) => {
        setStatus(null);

        try {
          await submitFeedback(values);
          setStatus("Thanks. Your note has been saved and will show up in the feedback collection.");
          reset();
        } catch (error) {
          setStatus(
            error instanceof Error
              ? `${error.message} You can also email hello@privacyresize.com directly.`
              : "Feedback could not be sent right now. You can still email hello@privacyresize.com directly.",
          );
        }
      })}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-foreground/68">
          <span className="font-semibold text-foreground">Name</span>
          <Input placeholder="Jane Founder" {...register("name")} />
          {errors.name ? <span className="text-danger">{errors.name.message}</span> : null}
        </label>
        <label className="space-y-2 text-sm text-foreground/68">
          <span className="font-semibold text-foreground">Email</span>
          <Input placeholder="jane@company.com" type="email" {...register("email")} />
          {errors.email ? <span className="text-danger">{errors.email.message}</span> : null}
        </label>
      </div>
      <label className="space-y-2 text-sm text-foreground/68">
        <span className="font-semibold text-foreground">Message</span>
        <Textarea
          placeholder="Tell us what preset, workflow, or integration would make PrivacyResize more useful."
          {...register("message")}
        />
        {errors.message ? <span className="text-danger">{errors.message.message}</span> : null}
      </label>
      <Button disabled={isSubmitting} fullWidth type="submit">
        {isSubmitting ? "Sending..." : "Send feedback"}
      </Button>
      {status ? (
        <p className="rounded-[1.3rem] border border-border bg-white/75 px-4 py-3 text-sm leading-7 text-foreground/68">
          {status}
        </p>
      ) : null}
    </form>
  );
}
