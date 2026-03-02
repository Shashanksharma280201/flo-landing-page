"use client";

import Link from "next/link";
import Image from "next/image";

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
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/flomobility" },
    { name: "Instagram", href: "https://www.instagram.com/flomobility/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/flomobility/" },
    { name: "Youtube", href: "https://www.youtube.com/@flomobility" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#fdfcf0] border-t border-neutral-200 overflow-hidden flex flex-col">
      {/* Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          {/* Left Side - Logo & Copyright */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Flo Mobility"
                width={180}
                height={60}
                unoptimized
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-neutral-500">
              © copyright Flo Mobility {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>

          {/* Right Side - Four Column Grid */}
          <div className="grid grid-cols-2 items-start gap-10 lg:grid-cols-4 lg:-mt-2">
            {/* Column 1: Offerings */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-neutral-900">
                Offerings
              </h3>
              <div className="flex flex-col gap-2">
                {FOOTER_LINKS.offerings.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-neutral-900">
                Company
              </h3>
              <div className="flex flex-col gap-2">
                {FOOTER_LINKS.company.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Legal */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-neutral-900">
                Legal
              </h3>
              <div className="flex flex-col gap-2">
                {FOOTER_LINKS.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4: Socials */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-neutral-900">
                Socials
              </h3>
              <div className="flex flex-col gap-2">
                {FOOTER_LINKS.socials.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div
        className="pointer-events-none relative inset-x-0 bottom-0 select-none overflow-hidden flex items-end justify-center pb-4 sm:pb-8 lg:-mt-12"
        style={{ perspective: "1000px" }}
      >
        <p
          className="text-center font-bold leading-none"
          style={{
            fontSize: "clamp(4rem, 15vw, 18rem)",
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 900,
            transform: "rotateX(15deg)",
            transformOrigin: "center bottom",
          }}
        >
          <span className="bg-linear-to-t from-[#a8e68f] via-[#c5e8b7] to-transparent bg-clip-text text-transparent">
            Flo
          </span>
          <span className="bg-linear-to-t from-gray-400 via-gray-300 to-transparent bg-clip-text text-transparent">
            Mobility
          </span>
        </p>
      </div>
    </footer>
  );
}
