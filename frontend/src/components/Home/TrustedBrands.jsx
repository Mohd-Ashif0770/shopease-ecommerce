import { useState } from "react";
import { motion } from "motion/react";

import appleLogo from "../../assets/brands/apple.png";
import samsungLogo from "../../assets/brands/samsung.png";
import sonyLogo from "../../assets/brands/sony.png";
import nikeLogo from "../../assets/brands/nike.png";
import canonLogo from "../../assets/brands/canon.png";
import dellLogo from "../../assets/brands/dell.png";
import hpLogo from "../../assets/brands/hp.png";

const brands = [
  { name: "Apple", logo: appleLogo },
  { name: "Samsung", logo: samsungLogo },
  { name: "Sony", logo: sonyLogo },
  { name: "Dell", logo: dellLogo },
  { name: "Canon", logo: canonLogo },
  { name: "HP", logo: hpLogo },
  { name: "Nike", logo: nikeLogo },
];

const TrustedBrands = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate brands for a seamless infinite marquee.
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="overflow-hidden py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Trusted By Top Brands
          </h2>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Discover authentic products from the world's leading manufacturers
          </p>
        </div>

        {/* Brand Marquee Container */}
        <div
          className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 py-6 shadow-xs backdrop-blur-xs"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white/90 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white/90 to-transparent sm:w-24" />

          <div
            className={`flex w-max items-center gap-12 sm:gap-16 lg:gap-20 ${
              isPaused ? "animate-marquee-paused" : "animate-marquee"
            }`}
          >
            {marqueeBrands.map((brand, index) => (
              <motion.div
                key={`${brand.name}-${index}`}
                whileHover={{ scale: 1.1 }}
                aria-hidden={index >= brands.length}
                className="flex h-14 w-28 shrink-0 items-center justify-center sm:w-36"
              >
                <img
                  src={brand.logo}
                  alt={index < brands.length ? `${brand.name} logo` : ""}
                  loading="lazy"
                  className="max-h-11 max-w-24 object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:max-h-14 sm:max-w-28"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
