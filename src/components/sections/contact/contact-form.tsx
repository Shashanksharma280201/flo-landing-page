'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Truck, LayoutDashboard, Leaf, MessageSquare, CheckCircle2 } from 'lucide-react';
import { trackLead } from '@/lib/analytics';

// ─── Design tokens ─────────────────────────────────────────────────────────────
const GREEN = '#7ccd54';
const TEXT = '#191c1a';
const MUTED = 'rgba(25,28,26,0.55)';
const DIM = 'rgba(25,28,26,0.55)';
const BG = '#ffffff';

// ─── Enquiry options ───────────────────────────────────────────────────────────
const ENQUIRY_OPTIONS = [
  {
    id: 'mmr',
    label: 'Material Mover',
    desc: 'AMR for construction & mining',
    icon: Truck,
    placeholder: 'Tell us about your site, payload requirements, or use case…',
  },
  {
    id: 'fleet',
    label: 'Fleet Control',
    desc: 'Robot fleet management platform',
    icon: LayoutDashboard,
    placeholder: 'Tell us about your fleet size, robots, or integration needs…',
  },
  {
    id: 'other',
    label: 'Other',
    desc: 'Something else entirely',
    icon: MessageSquare,
    placeholder: 'How can we help you?',
  },
] as const;

// ─── Field style helpers ───────────────────────────────────────────────────────
const inputBase =
  'w-full h-12 rounded-xl border px-4 text-base outline-none transition-colors duration-200';
const inputStyle = {
  borderColor: DIM,
  background: BG,
  color: TEXT,
  fontFamily: 'var(--font-dm-sans)',
};
const labelBase = 'block text-xs font-bold uppercase tracking-[0.18em] mb-2';
const labelStyle = { color: DIM };

function InputField({
  id,
  name,
  type = 'text',
  placeholder,
  required,
  autoComplete,
}: {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className={inputBase}
      style={inputStyle}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = GREEN;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = DIM;
      }}
    />
  );
}

// ─── Main form ─────────────────────────────────────────────────────────────────
export function ContactForm() {
  const [enquiry, setEnquiry] = useState('');
  const [enquiryError, setEnquiryError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const apiBase = (process.env.NEXT_PUBLIC_MISSION_CONTROL_API_URL ?? '').replace(
    /\/$/,
    '',
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!enquiry) {
      setEnquiryError(true);
      (
        event.currentTarget.querySelector('[data-enquiry-section]') as HTMLElement | null
      )?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      formType: 'contact',
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      enquiryType: String(formData.get('enquiryType') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    setEnquiryError(false);
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`${apiBase || ''}/api/public/forms/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: { success?: boolean; message?: string } = await response
        .json()
        .catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      form.reset();
      setEnquiry('');
      trackLead('contact');
      setSuccessMessage(
        data.message ||
          'Thank you. Our team will get back to you within one business day.',
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div
        className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl p-12 text-center"
        style={{
          background: 'rgba(124,205,84,0.06)',
          border: `1px solid ${DIM}`,
        }}
      >
        <CheckCircle2 className="mb-6 h-10 w-10" style={{ color: GREEN }} />
        <h3
          className="mb-3 text-2xl font-black tracking-[-0.02em]"
          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
        >
          Message Sent
        </h3>
        <p
          className="mx-auto mb-8 max-w-sm text-base leading-[1.85]"
          style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
        >
          {successMessage}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-bold underline underline-offset-4 transition-colors"
          style={{ color: GREEN, fontFamily: 'var(--font-dm-sans)' }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <input type="hidden" name="formType" value="contact" />
      <input type="hidden" name="enquiryType" value={enquiry} />

      <div>
        <label htmlFor="name" className={labelBase} style={labelStyle}>
          Name <span style={{ color: GREEN }}>*</span>
        </label>
        <InputField
          id="name"
          name="name"
          placeholder="Your full name"
          required
          autoComplete="name"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelBase} style={labelStyle}>
            Email <span style={{ color: GREEN }}>*</span>
          </label>
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelBase} style={labelStyle}>
            Phone <span style={{ color: GREEN }}>*</span>
          </label>
          <InputField
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 00000 00000"
            required
            autoComplete="tel"
          />
        </div>
      </div>

      <div data-enquiry-section>
        <label
          className={labelBase}
          style={enquiryError ? { color: '#ef4444' } : labelStyle}
        >
          I&apos;m enquiring about{' '}
          <span style={{ color: enquiryError ? '#ef4444' : GREEN }}>*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {ENQUIRY_OPTIONS.map((opt) => {
            const active = enquiry === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setEnquiry(opt.id);
                  setEnquiryError(false);
                }}
                className="relative flex flex-col items-start gap-1.5 rounded-xl p-4 text-left transition-colors duration-200"
                style={{
                  border: active
                    ? `1.5px solid ${GREEN}`
                    : `1.5px solid ${enquiryError ? 'rgba(239,68,68,0.5)' : DIM}`,
                  background: active ? `${GREEN}10` : BG,
                  outline: 'none',
                }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                  style={{
                    background: active ? `${GREEN}25` : 'rgba(25,28,26,0.06)',
                  }}
                >
                  <opt.icon
                    className="h-4 w-4"
                    style={{ color: active ? GREEN : MUTED }}
                  />
                </div>
                <span
                  className="text-sm leading-tight font-black"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {opt.label}
                </span>
                <span
                  className="text-xs leading-snug"
                  style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {opt.desc}
                </span>
                {active && (
                  <span
                    className="absolute top-3 right-3 h-2 w-2 rounded-full"
                    style={{ background: GREEN }}
                  />
                )}
              </button>
            );
          })}
        </div>
        {enquiryError && (
          <p
            className="mt-2 text-xs font-semibold"
            style={{ color: '#ef4444', fontFamily: 'var(--font-dm-sans)' }}
          >
            Please select what you&apos;re enquiring about.
          </p>
        )}
      </div>

      {enquiry === 'other' && (
        <div>
          <label htmlFor="message" className={labelBase} style={labelStyle}>
            Message <span style={{ color: GREEN }}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="How can we help you?"
            className="w-full resize-none rounded-xl border px-4 py-3.5 text-base transition-colors duration-200 outline-none"
            style={{ ...inputStyle, minHeight: '140px' }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = GREEN;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = DIM;
            }}
          />
        </div>
      )}

      {errorMessage && (
        <p
          className="rounded-xl px-4 py-3 text-sm"
          style={{
            color: '#ef4444',
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.2)',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-black tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:opacity-60"
        style={{
          background: GREEN,
          color: '#fff',
          fontFamily: 'var(--font-dm-sans)',
        }}
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>

      <p
        className="text-center text-xs"
        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
      >
        By submitting, you agree to our{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-2"
          style={{ color: TEXT }}
        >
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
