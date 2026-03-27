"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const FOOTER_LINKS = {
  offerings: [
    { name: "Material Movement", href: "/offerings/material-movement" },
    { name: "Lawn Maintenance", href: "/offerings/lawn-maintenance" },
    { name: "Fleet Control", href: "/offerings/fleet-control" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blogs" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
  socials: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/flomobility",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/flomobility/",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/flomobility/",
      icon: Linkedin,
    },
    {
      name: "Youtube",
      href: "https://www.youtube.com/@flomobility",
      icon: Youtube,
    },
  ],
};

const CONTACT_INFO = {
  email: "contact@flomobility.ai",
  phone: "+91 (080) 1234-5678",
  address: "HSR Layout, Bengaluru, Karnataka, India",
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Basic email validation
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="relative flex flex-col overflow-hidden border-t border-neutral-200 bg-gradient-to-b from-white via-neutral-50/50 to-white">
      {/* Newsletter Section */}
      <div className="relative border-b border-neutral-200/80 bg-gradient-to-r from-[#7ccd54]/5 via-white to-[#7ccd54]/5">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 sm:py-16 w-full">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left max-w-[1600px] mx-auto">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Stay Updated with Flo
              </h2>
              <p className="mt-2 text-base text-neutral-600">
                Get the latest news on autonomous solutions, product updates, and industry insights delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="w-full max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-[#7ccd54] focus:outline-none focus:ring-2 focus:ring-[#7ccd54]/20 transition-all"
                    disabled={status === "loading"}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group h-12 flex items-center justify-center gap-2 rounded-lg bg-[#7ccd54] px-6 text-sm font-semibold text-white transition-all hover:bg-[#6bbd44] hover:shadow-lg hover:shadow-[#7ccd54]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    "Subscribing..."
                  ) : status === "success" ? (
                    "Subscribed!"
                  ) : (
                    <>
                      Subscribe
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </motion.button>
              </div>
              {status === "error" && (
                <p className="mt-2 text-xs text-red-600">Please enter a valid email address</p>
              )}
              {status === "success" && (
                <p className="mt-2 text-xs text-green-600">Thanks for subscribing!</p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 max-w-[1600px] mx-auto">
          {/* Brand & Contact Section */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.webp"
                alt="Flo Mobility"
                width={180}
                height={60}
                unoptimized
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 max-w-sm">
              Pioneering autonomous solutions for material movement, lawn maintenance, and fleet control. Building the future of mobility, one robot at a time.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group flex items-start gap-3 text-sm text-neutral-600 transition-colors hover:text-[#7ccd54]"
              >
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 transition-colors group-hover:text-[#7ccd54]" />
                <span>{CONTACT_INFO.email}</span>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                className="group flex items-start gap-3 text-sm text-neutral-600 transition-colors hover:text-[#7ccd54]"
              >
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 transition-colors group-hover:text-[#7ccd54]" />
                <span>{CONTACT_INFO.phone}</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-neutral-600">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-neutral-400" />
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {FOOTER_LINKS.socials.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-all hover:bg-[#7ccd54] hover:text-white hover:shadow-lg hover:shadow-[#7ccd54]/20"
                  >
                    <link.icon className="h-4 w-4" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12">
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Offerings
                </h3>
                <div className="flex flex-col gap-3">
                  {FOOTER_LINKS.offerings.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-[#7ccd54]"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 transition-all group-hover:opacity-100 group-hover:ml-0" />
                      <span className="transition-transform group-hover:translate-x-1">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Company
                </h3>
                <div className="flex flex-col gap-3">
                  {FOOTER_LINKS.company.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-[#7ccd54]"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 transition-all group-hover:opacity-100 group-hover:ml-0" />
                      <span className="transition-transform group-hover:translate-x-1">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Legal
                </h3>
                <div className="flex flex-col gap-3">
                  {FOOTER_LINKS.legal.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-[#7ccd54]"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 transition-all group-hover:opacity-100 group-hover:ml-0" />
                      <span className="transition-transform group-hover:translate-x-1">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Flo Mobility. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-500">
            <Link href="/privacy" className="transition-colors hover:text-neutral-900">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-neutral-900">
              Terms
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-neutral-900">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
