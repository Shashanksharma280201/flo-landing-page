"use client";

import Image from "next/image";
import { CUSTOMERS, BELIEVERS } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

export function CustomersSection() {
  const customersCol1Ref = useRef<HTMLDivElement>(null);
  const customersCol2Ref = useRef<HTMLDivElement>(null);
  const customersCol3Ref = useRef<HTMLDivElement>(null);
  const believersCol1Ref = useRef<HTMLDivElement>(null);
  const believersCol2Ref = useRef<HTMLDivElement>(null);

  const [customersHovered, setCustomersHovered] = useState(false);
  const [believersHovered, setBelieversHovered] = useState(false);

  // Create staggered layout - alternate card heights for masonry effect
  const customersCol1 = CUSTOMERS.filter((_, i) => i % 2 === 0);
  const customersCol2 = CUSTOMERS.filter((_, i) => i % 2 === 1);

  // Duplicate for infinite scroll
  const duplicatedCustomersCol1 = [...customersCol1, ...customersCol1, ...customersCol1, ...customersCol1];
  const duplicatedCustomersCol2 = [...customersCol2, ...customersCol2, ...customersCol2, ...customersCol2];

  // Create staggered layout for believers
  const believersCol1 = BELIEVERS.filter((_, i) => i % 2 === 0);
  const believersCol2 = BELIEVERS.filter((_, i) => i % 2 === 1);

  // Duplicate for infinite scroll
  const duplicatedBelieversCol1 = [...believersCol1, ...believersCol1, ...believersCol1, ...believersCol1];
  const duplicatedBelieversCol2 = [...believersCol2, ...believersCol2, ...believersCol2, ...believersCol2];

  // Customers Column 1 - Scroll Down
  useEffect(() => {
    const container = customersCol1Ref.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = customersHovered ? 0.3 : 0.6;

    const scroll = () => {
      const firstChild = container.children[0];
      const cardHeight = firstChild ? firstChild.getBoundingClientRect().height : 0;
      const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
      const singleSetHeight = customersCol1.length * (cardHeight + gap);

      container.scrollTop += speed;

      if (container.scrollTop >= singleSetHeight) {
        container.scrollTop -= singleSetHeight;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [customersHovered, customersCol1.length]);

  // Customers Column 2 - Scroll Up
  useEffect(() => {
    const container = customersCol2Ref.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = customersHovered ? 0.3 : 0.6;

    const scroll = () => {
      const firstChild = container.children[0];
      const cardHeight = firstChild ? firstChild.getBoundingClientRect().height : 0;
      const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
      const singleSetHeight = customersCol2.length * (cardHeight + gap);

      container.scrollTop -= speed;

      if (container.scrollTop <= 0) {
        container.scrollTop += singleSetHeight;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [customersHovered, customersCol2.length]);

  // Customers Column 3 - Scroll Down (Slower)
  useEffect(() => {
    const container = customersCol3Ref.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = customersHovered ? 0.25 : 0.5;

    const scroll = () => {
      const firstChild = container.children[0];
      const cardHeight = firstChild ? firstChild.getBoundingClientRect().height : 0;
      const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
      const totalCards = customersCol1.length + customersCol2.length;
      const singleSetHeight = totalCards * (cardHeight + gap);

      container.scrollTop += speed;

      if (container.scrollTop >= singleSetHeight) {
        container.scrollTop -= singleSetHeight;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [customersHovered, customersCol1.length, customersCol2.length]);

  // Believers Column 1 - Scroll Down
  useEffect(() => {
    const container = believersCol1Ref.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = believersHovered ? 0.3 : 0.6;

    const scroll = () => {
      const firstChild = container.children[0];
      const cardHeight = firstChild ? firstChild.getBoundingClientRect().height : 0;
      const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
      const singleSetHeight = believersCol1.length * (cardHeight + gap);

      container.scrollTop += speed;

      if (container.scrollTop >= singleSetHeight) {
        container.scrollTop -= singleSetHeight;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [believersHovered, believersCol1.length]);

  // Believers Column 2 - Scroll Up
  useEffect(() => {
    const container = believersCol2Ref.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = believersHovered ? 0.3 : 0.6;

    const scroll = () => {
      const firstChild = container.children[0];
      const cardHeight = firstChild ? firstChild.getBoundingClientRect().height : 0;
      const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
      const singleSetHeight = believersCol2.length * (cardHeight + gap);

      container.scrollTop -= speed;

      if (container.scrollTop <= 0) {
        container.scrollTop += singleSetHeight;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [believersHovered, believersCol2.length]);

  return (
    <section className="relative overflow-hidden bg-[#f5e6b3] py-16 sm:py-20 lg:py-24">
      <div className="w-full h-full">
        <div className="flex flex-col gap-0">

          {/* TOP - CUSTOMERS */}
          <div
            className="relative w-full bg-[#f5e6b3] py-20 lg:py-28"
            onMouseEnter={() => setCustomersHovered(true)}
            onMouseLeave={() => setCustomersHovered(false)}
          >
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0">

              {/* LEFT SIDE - Text Content - Full Height */}
              <div className="lg:col-span-5 flex items-center justify-center lg:justify-end px-8 sm:px-12 lg:px-16 xl:px-20 py-12 lg:py-0">
                <div className="max-w-xl">
                  <div className="inline-block mb-6">
                    <div className="h-1 w-16 bg-primary mb-4"></div>
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-600">
                      Trusted Worldwide
                    </span>
                  </div>

                  <h2
                    className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-8 leading-[1.1]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Our
                    <br />
                    <span className="text-primary">Customers</span>
                  </h2>

                  <p className="text-xl text-gray-700 font-normal leading-relaxed mb-8">
                    Industry leaders who trust our autonomous robotics solutions to transform their operations.
                  </p>

                  <div className="flex items-center gap-4">
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
              </div>

              {/* RIGHT SIDE - Scrolling Cards - 2 Columns */}
              <div
                className="lg:col-span-7 relative h-[500px] lg:h-[700px] px-8 lg:px-12"
                onMouseEnter={() => setCustomersHovered(true)}
                onMouseLeave={() => setCustomersHovered(false)}
              >
                {/* Top Fade */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#f5e6b3] via-[#f5e6b3]/80 to-transparent z-10" />
                {/* Bottom Fade */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f5e6b3] via-[#f5e6b3]/80 to-transparent z-10" />

                <style>
                  {`
                    .no-scrollbar::-webkit-scrollbar {
                      display: none;
                    }
                  `}
                </style>

                <div className="flex gap-6 h-full justify-center">
                  {/* Column 1 - Scrolling Down */}
                  <div
                    ref={customersCol1Ref}
                    className="no-scrollbar flex flex-col gap-5 overflow-y-scroll h-full"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      width: "250px",
                    }}
                  >
                    {duplicatedCustomersCol1.map((customer, index) => (
                      <div
                        key={`customers-col1-${customer.name}-${index}`}
                        className="group flex-shrink-0"
                        style={{ width: "250px", height: "250px" }}
                      >
                        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105">
                          <Image
                            src={customer.logo}
                            alt={`${customer.name} logo`}
                            fill
                            quality={100}
                            className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Column 2 - Scrolling Up with Offset */}
                  <div
                    ref={customersCol2Ref}
                    className="no-scrollbar flex flex-col gap-5 overflow-y-scroll h-full pt-16"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      width: "250px",
                    }}
                  >
                    {duplicatedCustomersCol2.map((customer, index) => (
                      <div
                        key={`customers-col2-${customer.name}-${index}`}
                        className="group flex-shrink-0"
                        style={{ width: "250px", height: "250px" }}
                      >
                        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105">
                          <Image
                            src={customer.logo}
                            alt={`${customer.name} logo`}
                            fill
                            quality={100}
                            className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* BOTTOM - BELIEVERS */}
          <div
            className="relative w-full bg-[#f5e6b3] py-20 lg:py-28 border-t-2 border-white/30"
            onMouseEnter={() => setBelieversHovered(true)}
            onMouseLeave={() => setBelieversHovered(false)}
          >
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">

              {/* LEFT SIDE - Scrolling Cards - 1 Column - Far Left */}
              <div
                className="relative h-[500px] lg:h-[700px] pl-8 sm:pl-12 lg:pl-16 xl:pl-20"
                onMouseEnter={() => setBelieversHovered(true)}
                onMouseLeave={() => setBelieversHovered(false)}
              >
                {/* Top Fade */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#f5e6b3] via-[#f5e6b3]/80 to-transparent z-10" />
                {/* Bottom Fade */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f5e6b3] via-[#f5e6b3]/80 to-transparent z-10" />

                <div className="flex h-full">
                  {/* Single Column - Scrolling Down */}
                  <div
                    ref={believersCol1Ref}
                    className="no-scrollbar flex flex-col gap-5 overflow-y-scroll h-full"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      width: "250px",
                    }}
                  >
                    {duplicatedBelieversCol1.map((believer, index) => (
                      <div
                        key={`believers-col1-${believer.name}-${index}`}
                        className="group flex-shrink-0"
                        style={{ width: "250px", height: "250px" }}
                      >
                        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105">
                          <Image
                            src={believer.logo}
                            alt={`${believer.name} logo`}
                            fill
                            quality={100}
                            className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Text Content - Far Right */}
              <div className="flex items-center pr-8 sm:pr-12 lg:pr-16 xl:pr-20 py-12 lg:py-0">
                <div className="max-w-xl">
                  <div className="inline-block mb-6">
                    <div className="h-1 w-16 bg-primary mb-4"></div>
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-600">
                      Backed By
                    </span>
                  </div>

                  <h2
                    className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-8 leading-[1.1]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Our
                    <br />
                    <span className="text-primary">Believers</span>
                  </h2>

                  <p className="text-xl text-gray-700 font-normal leading-relaxed mb-8">
                    Leading investors and partners who believe in our vision to transform the future of autonomous robotics.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
