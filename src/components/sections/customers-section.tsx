"use client";

import Image from "next/image";
import { CUSTOMERS } from "@/lib/constants";

const LOGOS = [...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS];

export function CustomersSection() {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      <div className="w-full">
        <div className="mb-5 text-center sm:mb-6 lg:mb-8">
          <div className="inline-block">
            <span
              className="font-bold tracking-[0.22em] text-black"
              style={{ fontSize: "clamp(1.65rem, 3vw + 1rem, 2rem)" }}
            >
              Our Customers
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee-reverse items-center gap-4 whitespace-nowrap py-0 sm:gap-5">
            {LOGOS.map((customer, index) => (
              <div
                key={`${customer.name}-${index}`}
                className="relative flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm sm:h-24 sm:w-52"
              >
                <Image
                  src={customer.logo}
                  alt={`${customer.name} logo`}
                  fill
                  quality={100}
                  className="object-cover p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
