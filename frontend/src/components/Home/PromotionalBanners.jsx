import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import furnitureBanner from "../../assets/categories/furniture-banner.png";
import electronicsBanner from "../../assets/categories/electronics-banner.png";
import { staggerContainer, staggerItem } from "../../utils/motion";

const promotionalBanners = [
  {
    id: 1,
    badge: "Smart Living",
    title: "Modern Furniture",
    highlight: "For a Better Home",
    description: "Stylish, comfortable and built for your everyday lifestyle.",
    buttonText: "Shop Now",
    image: furnitureBanner,
    link: "/products?category=furniture",
    theme: "bg-[#EAF4EB]",
    badgeStyle: "bg-emerald-100/80 text-emerald-900 border border-emerald-200",
  },
  {
    id: 2,
    badge: "Up to 30% Off",
    title: "Latest Electronics",
    highlight: "Super Deals",
    description: "Top technology for work, entertainment and smart living.",
    buttonText: "Shop Now",
    image: electronicsBanner,
    link: "/products?category=electronics",
    theme: "bg-[#FFF0E3]",
    badgeStyle: "bg-amber-100/80 text-amber-900 border border-amber-200",
  },
];

const PromotionalBanners = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {promotionalBanners.map((banner) => (
            <motion.div
              key={banner.id}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`group relative isolate min-h-[240px] overflow-hidden rounded-3xl border border-slate-200/70 ${banner.theme} shadow-xs transition-shadow duration-300 hover:shadow-xl sm:min-h-[260px]`}
            >
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Text Readability Overlay */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/35 via-white/10 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex min-h-[240px] w-[62%] flex-col items-start justify-center p-6 sm:min-h-[260px] sm:w-[55%] sm:p-8">
                {/* Badge */}
                <span
                  className={`mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs ${banner.badgeStyle}`}
                >
                  {banner.badge}
                </span>

                {/* Heading */}
                <h3 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                  {banner.title}
                  <br />
                  <span className="text-[#087443]">{banner.highlight}</span>
                </h3>

                {/* Description */}
                <p className="mt-2 max-w-[280px] text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {banner.description}
                </p>

                {/* CTA */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-5"
                >
                  <Link
                    to={banner.link}
                    className="inline-flex items-center gap-2 rounded-full bg-[#087443] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-800 sm:px-6 sm:py-3 sm:text-sm"
                  >
                    {banner.buttonText}
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
