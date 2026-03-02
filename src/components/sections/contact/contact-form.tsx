"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { submitFormAction } from "@/app/actions/form-actions";

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
      className="w-full h-12 rounded-lg bg-[#7ccd54] text-gray-900 text-sm font-semibold tracking-wide hover:bg-[#6bbf44] transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending…
        </>
      ) : (
        "Send Message"
      )}
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
      <div className="bg-[#1a3a1f] border border-[#7ccd54]/20 rounded-2xl p-12 text-center flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-0.5 bg-[#7ccd54] mx-auto mb-6" />
        <h3
          className="text-2xl font-medium text-white mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Message Sent
        </h3>
        <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
          {state.message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-medium text-[#7ccd54] underline underline-offset-4 hover:text-[#6bbf44] transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#1a3a1f] rounded-2xl p-8 flex-1">
      <form action={formAction} className="space-y-5 h-full flex flex-col">
        <input type="hidden" name="formType" value="contact" />

        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="firstName"
              className="block text-xs font-semibold uppercase tracking-widest text-gray-400"
            >
              First Name <span className="text-[#7ccd54]">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              placeholder="John"
              required
              className="w-full h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7ccd54]/50 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="lastName"
              className="block text-xs font-semibold uppercase tracking-widest text-gray-400"
            >
              Last Name <span className="text-[#7ccd54]">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              required
              className="w-full h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7ccd54]/50 transition-colors"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Work Email <span className="text-[#7ccd54]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@company.com"
            required
            className="w-full h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7ccd54]/50 transition-colors"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="block text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 00000 00000"
            className="w-full h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7ccd54]/50 transition-colors"
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5 flex-1 flex flex-col">
          <label
            htmlFor="message"
            className="block text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Message <span className="text-[#7ccd54]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="How can we help you?"
            required
            className="flex-1 min-h-[140px] w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7ccd54]/50 transition-colors resize-none"
          />
        </div>

        {state.message && !state.success && (
          <p className="text-sm text-red-400 border border-red-400/20 bg-red-400/5 rounded-lg px-4 py-3">
            {state.message}
          </p>
        )}

        <SubmitButton />

        <p className="text-xs text-center text-gray-500">
          By submitting this form, you agree to our{" "}
          <Link href="/privacy" className="text-[#7ccd54] hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
