"use client";

import Image from "next/image";
import { CUSTOMERS } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

export function CustomersSection() {
  const customersCol1Ref = useRef<HTMLDivElement>(null);
  const [customersHovered, setCustomersHovered] = useState(false);

  // Duplicate all customers for infinite horizontal scroll
  const duplicatedCustomers = [...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS];

  // Customers - Horizontal Scroll (Left to Right)
  useEffect(() => {
    const container = customersCol1Ref.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = customersHovered ? 0.15 : 0.8; // Slower on hover, never stops

    const scroll = () => {
      const firstChild = container.children[0];
      const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 0;
      const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
      const singleSetWidth = CUSTOMERS.length * (cardWidth + gap);

      container.scrollLeft += speed;

      if (container.scrollLeft >= singleSetWidth) {
        container.scrollLeft -= singleSetWidth;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [customersHovered]);

  return (
    <section className="relative overflow-hidden bg-[#f5e6b3] py-20 lg:py-28">
      <div className="w-full h-full">

          {/* CUSTOMERS */}
          <div className="relative w-full bg-[#f5e6b3]">
            <div className="w-full">

              {/* Text Content - Centered */}
              <div className="text-center px-8 sm:px-12 lg:px-16 xl:px-20 mb-12 lg:mb-16">
                <div className="inline-block mb-6">
                  <div className="h-1 w-16 bg-primary mb-4 mx-auto"></div>
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-600">
                    Trusted Worldwide
                  </span>
                </div>

                <h2
                  className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-6 leading-[1.1]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Our <span className="text-primary">Customers</span>
                </h2>

                <p className="text-xl text-gray-700 font-normal leading-relaxed mb-8 max-w-3xl mx-auto">
                  Industry leaders who trust our autonomous robotics solutions to transform their operations.
                </p>

                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900" style={{ fontFamily: "var(--font-dm-sans)" }}>15+</div>
                    <div className="text-sm text-gray-600 font-medium">Partners</div>
                  </div>
                  <div className="h-12 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900" style={{ fontFamily: "var(--font-dm-sans)" }}>50+</div>
                    <div className="text-sm text-gray-600 font-medium">Robots</div>
                  </div>
                  <div className="h-12 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900" style={{ fontFamily: "var(--font-dm-sans)" }}>200+</div>
                    <div className="text-sm text-gray-600 font-medium">Projects</div>
                  </div>
                </div>
              </div>

              {/* Horizontal Scrolling Cards */}
              <div className="relative w-full">
                {/* Left Fade */}
                <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#f5e6b3] via-[#f5e6b3]/80 to-transparent z-10" />
                {/* Right Fade */}
                <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#f5e6b3] via-[#f5e6b3]/80 to-transparent z-10" />

                <style>
                  {`
                    .no-scrollbar::-webkit-scrollbar {
                      display: none;
                    }
                  `}
                </style>

                <div
                  ref={customersCol1Ref}
                  className="no-scrollbar flex gap-6 overflow-x-scroll py-8"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  onMouseEnter={() => setCustomersHovered(true)}
                  onMouseLeave={() => setCustomersHovered(false)}
                >
                  {duplicatedCustomers.map((customer, index) => (
                    <div
                      key={`customer-${customer.name}-${index}`}
                      className="flex-shrink-0"
                      style={{ width: "250px", height: "250px" }}
                    >
                      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300">
                        <Image
                          src={customer.logo}
                          alt={`${customer.name} logo`}
                          fill
                          quality={100}
                          className="object-contain p-8"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

      </div>
    </section>
  );
}
