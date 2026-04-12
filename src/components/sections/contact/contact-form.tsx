"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Truck, LayoutDashboard, Leaf, MessageSquare, CheckCircle2 } from "lucide-react";
import { submitFormAction } from "@/app/actions/form-actions";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const GREEN = "#7ccd54";
const TEXT  = "#191c1a";
const MUTED = "rgba(25,28,26,0.55)";
const DIM   = "rgba(25,28,26,0.15)";
const BG    = "#ffffff";

// ─── Enquiry options ───────────────────────────────────────────────────────────
const ENQUIRY_OPTIONS = [
  {
    id: "mmr",
    label: "Material Mover",
    desc: "AMR for construction & mining",
    icon: Truck,
    placeholder: "Tell us about your site, payload requirements, or use case…",
  },
  {
    id: "fleet",
    label: "Fleet Control",
    desc: "Robot fleet management platform",
    icon: LayoutDashboard,
    placeholder: "Tell us about your fleet size, robots, or integration needs…",
  },
  {
    id: "lawn",
    label: "Lawn Mower",
    desc: "Autonomous grounds care robot",
    icon: Leaf,
    placeholder: "Tell us about your grounds, area size, or deployment requirements…",
  },
  {
    id: "other",
    label: "Other",
    desc: "Something else entirely",
    icon: MessageSquare,
    placeholder: "How can we help you?",
  },
];

interface FormState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

// ─── Field style helpers ───────────────────────────────────────────────────────
const inputBase =
  "w-full h-12 rounded-xl border px-4 text-base outline-none transition-colors duration-200";
const inputStyle = { borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" };
const labelBase = "block text-xs font-bold uppercase tracking-[0.18em] mb-2";
const labelStyle = { color: DIM };

function InputField({
  id, name, type = "text", placeholder, required, autoComplete,
}: {
  id: string; name: string; type?: string; placeholder: string;
  required?: boolean; autoComplete?: string;
}) {
  return (
    <input
      id={id} name={name} type={type} placeholder={placeholder}
      required={required} autoComplete={autoComplete}
      className={inputBase}
      style={inputStyle}
      onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
    />
  );
}

// ─── Submit button ─────────────────────────────────────────────────────────────
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-14 rounded-full text-base font-black uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
      style={{ background: GREEN, color: "#fff", fontFamily: "var(--font-dm-sans)" }}
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

// ─── Main form ─────────────────────────────────────────────────────────────────
export function ContactForm() {
  const [state, formAction] = useActionState(submitFormAction, {
    success: false,
    message: "",
  } as FormState);

  const [enquiry, setEnquiry] = useState("");
  const [enquiryError, setEnquiryError] = useState(false);

  const selectedOption = ENQUIRY_OPTIONS.find((o) => o.id === enquiry);

  // Client-side guard: require enquiry selection
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!enquiry) {
      e.preventDefault();
      setEnquiryError(true);
      (e.currentTarget.querySelector("[data-enquiry-section]") as HTMLElement)?.scrollIntoView({
        behavior: "smooth", block: "center",
      });
    } else {
      setEnquiryError(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────────────────
  if (state.success) {
    return (
      <div
        className="rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
        style={{ background: "rgba(124,205,84,0.06)", border: `1px solid ${DIM}` }}
      >
        <CheckCircle2 className="w-10 h-10 mb-6" style={{ color: GREEN }} />
        <h3
          className="text-2xl font-black mb-3 tracking-[-0.02em]"
          style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
        >
          Message Sent
        </h3>
        <p className="text-base leading-[1.85] max-w-sm mx-auto mb-8" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
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

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-7">
      <input type="hidden" name="formType" value="contact" />
      <input type="hidden" name="enquiryType" value={enquiry} />

      {/* ── Name ────────────────────────────────────────────────────────────── */}
      <div>
        <label htmlFor="name" className={labelBase} style={labelStyle}>
          Name <span style={{ color: GREEN }}>*</span>
        </label>
        <InputField id="name" name="name" placeholder="Your full name" required autoComplete="name" />
      </div>

      {/* ── Email + Phone ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelBase} style={labelStyle}>
            Email <span style={{ color: GREEN }}>*</span>
          </label>
          <InputField id="email" name="email" type="email" placeholder="you@company.com" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="phone" className={labelBase} style={labelStyle}>
            Phone <span style={{ color: MUTED, fontWeight: 500, textTransform: "none", letterSpacing: "normal" }}>(optional)</span>
          </label>
          <InputField id="phone" name="phone" type="tel" placeholder="+91 00000 00000" autoComplete="tel" />
        </div>
      </div>

      {/* ── Enquiry type chips ───────────────────────────────────────────────── */}
      <div data-enquiry-section>
        <label className={labelBase} style={enquiryError ? { color: "#ef4444" } : labelStyle}>
          I&apos;m enquiring about <span style={{ color: enquiryError ? "#ef4444" : GREEN }}>*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {ENQUIRY_OPTIONS.map((opt) => {
            const active = enquiry === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => { setEnquiry(opt.id); setEnquiryError(false); }}
                className="relative flex flex-col items-start gap-1.5 p-4 rounded-xl text-left transition-all duration-200 hover:shadow-sm"
                style={{
                  border: active ? `2px solid ${GREEN}` : `1.5px solid ${enquiryError ? "rgba(239,68,68,0.5)" : DIM}`,
                  background: active ? `${GREEN}10` : BG,
                  outline: "none",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                  style={{ background: active ? `${GREEN}25` : "rgba(25,28,26,0.06)" }}
                >
                  <opt.icon className="w-4 h-4" style={{ color: active ? GREEN : MUTED }} />
                </div>
                <span
                  className="text-sm font-black leading-tight"
                  style={{ color: active ? TEXT : TEXT, fontFamily: "var(--font-dm-sans)" }}
                >
                  {opt.label}
                </span>
                <span
                  className="text-xs leading-snug"
                  style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
                >
                  {opt.desc}
                </span>
                {/* Active indicator dot */}
                {active && (
                  <span
                    className="absolute top-3 right-3 w-2 h-2 rounded-full"
                    style={{ background: GREEN }}
                  />
                )}
              </button>
            );
          })}
        </div>
        {enquiryError && (
          <p className="mt-2 text-xs font-semibold" style={{ color: "#ef4444", fontFamily: "var(--font-dm-sans)" }}>
            Please select what you&apos;re enquiring about.
          </p>
        )}
      </div>

      {/* ── Message ──────────────────────────────────────────────────────────── */}
      <div>
        <label htmlFor="message" className={labelBase} style={labelStyle}>
          Message{enquiry === "other" || !enquiry
            ? <span style={{ color: GREEN }}> *</span>
            : <span style={{ color: MUTED, fontWeight: 500, textTransform: "none", letterSpacing: "normal" }}> (optional)</span>
          }
        </label>
        <textarea
          id="message" name="message"
          required={enquiry === "other" || !enquiry}
          placeholder={
            enquiry && enquiry !== "other"
              ? "Any additional details? (optional)"
              : (selectedOption?.placeholder ?? "How can we help you?")
          }
          className="w-full rounded-xl border px-4 py-3.5 text-base outline-none transition-colors duration-200 resize-none"
          style={{ ...inputStyle, minHeight: "140px" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
        />
      </div>

      {/* ── Server error ─────────────────────────────────────────────────────── */}
      {state.message && !state.success && (
        <p
          className="text-sm rounded-xl px-4 py-3"
          style={{ color: "#ef4444", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", fontFamily: "var(--font-dm-sans)" }}
        >
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
