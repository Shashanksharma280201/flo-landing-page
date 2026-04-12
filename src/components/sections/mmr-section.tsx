import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const MMR_IMAGES = [
  {
    src: "/mmr-images/mmr-images-1.webp",
    alt: "MMR Image 1",
    text: "Autonomous Material Movement Bot designed for factory floors and warehouses.",
  },
  {
    src: "/mmr-images/mmr-images-2.webp",
    alt: "MMR Image 2",
    text: "Precision navigation in dynamic environments with zero infrastructure changes.",
  },
  {
    src: "/mmr-images/mmr-images-3.webp",
    alt: "MMR Image 3",
    text: "Robust payload capacity and all-day operation with smart charging.",
  },
  {
    src: "/mmr-images/mmr-images-1.webp",
    alt: "MMR Image 4",
    text: "Fleet-ready architecture that scales from one robot to hundreds across sites.",
  },
];

// ─── Shared card visual ────────────────────────────────────────────────────────

function CardInner({
  item,
  priority,
}: {
  item: (typeof MMR_IMAGES)[0];
  priority?: boolean;
}) {
  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 shadow-2xl">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        priority={priority}
      />

      {/* Bottom text strip — softened fade */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-white/95 via-white/55 to-transparent px-5 pb-4 pt-12 sm:px-7 sm:pb-5 sm:pt-14">
        <p
          className="text-[#5ba83d] font-semibold leading-relaxed text-sm sm:text-base"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {item.text}
        </p>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function MmrSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2">
        {MMR_IMAGES.map((item, index) => (
          <div key={index} className={index > 2 ? "hidden lg:block" : "w-full"}>
            <CardInner item={item} priority={index === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
