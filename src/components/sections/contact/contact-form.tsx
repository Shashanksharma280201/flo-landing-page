"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { submitFormAction } from "@/app/actions/form-actions";

// ─── Design tokens (matches offering / about / contact pages) ─────────────────
const GREEN = "#7ccd54";
const TEXT  = "#191c1a";
const MUTED = "rgba(25,28,26,0.55)";
const DIM   = "rgba(25,28,26,0.15)";
const BG    = "#ffffff";

interface FormState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-12 rounded-full text-sm font-black uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
      style={{ background: GREEN, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitFormAction, {
    success: false,
    message: "",
  } as FormState);

  if (state.success) {
    return (
      <div
        className="rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
        style={{ background: "rgba(124,205,84,0.06)", border: `1px solid ${DIM}` }}
      >
        <div className="w-10 h-0.5 mb-6" style={{ background: GREEN }} />
        <h3
          className="text-2xl font-black mb-3 tracking-[-0.02em]"
          style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
        >
          Message Sent
        </h3>
        <p className="text-sm leading-[1.85] max-w-sm mx-auto mb-8" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
          {state.message || "Thank you. Our team will get back to you within one business day."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-bold underline underline-offset-4 transition-colors"
          style={{ color: GREEN, fontFamily: "var(--font-dm-sans)" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="formType" value="contact" />

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { id: "firstName", name: "firstName", label: "First Name", placeholder: "John",  required: true },
          { id: "lastName",  name: "lastName",  label: "Last Name",  placeholder: "Doe",   required: true },
        ].map((field) => (
          <div key={field.id} className="space-y-2">
            <label
              htmlFor={field.id}
              className="block text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: DIM }}
            >
              {field.label} {field.required && <span style={{ color: GREEN }}>*</span>}
            </label>
            <input
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
              style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
            />
          </div>
        ))}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
          Work Email <span style={{ color: GREEN }}>*</span>
        </label>
        <input
          id="email" name="email" type="email" placeholder="john@company.com" required
          className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
          style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
          Phone Number
        </label>
        <input
          id="phone" name="phone" type="tel" placeholder="+91 00000 00000"
          className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
          style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
          Message <span style={{ color: GREEN }}>*</span>
        </label>
        <textarea
          id="message" name="message" required
          placeholder="How can we help you?"
          className="w-full min-h-[140px] rounded-xl border px-4 py-3 text-sm outline-none transition-colors resize-none"
          style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
        />
      </div>

      {state.message && !state.success && (
        <p className="text-sm rounded-xl px-4 py-3" style={{ color: "#ef4444", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
          {state.message}
        </p>
      )}

      <SubmitButton />

      <p className="text-xs text-center" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
        By submitting, you agree to our{" "}
        <Link href="/privacy" className="underline underline-offset-2" style={{ color: TEXT }}>
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
