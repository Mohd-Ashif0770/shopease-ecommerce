import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import bannerImage1 from "../../assets/banners/banner-image-1.png";
import bannerImage2 from "../../assets/banners/banner-image-2.png";
import bannerImage3 from "../../assets/banners/banner-image-3.png";

import ServiceBanifits from "./ServiceBanifits";

const slides = [
  {
    id: 1,
    image: bannerImage1,
    badge: "New Season Collection",
    title: "Upgrade Your",
    highlight: "Lifestyle Today",
    description:
      "Discover premium products for your home, work and everyday life with the best quality, fast delivery and unbeatable prices.",
    buttonText: "Shop Furniture",
    link: "/products",
    promotionTitle: "Modern Furniture",
    promotionDiscount: "Up to 40% Off",
    promotionLink: "/products?category=home-and-lifestyle",
    overlay: "from-[#f4f8f5]/95 via-[#f4f8f5]/80 to-transparent",
    accent: "#087443",
  },
  {
    id: 2,
    image: bannerImage2,
    badge: "Latest Electronics",
    title: "Smart Tech for a",
    highlight: "Smarter Tomorrow",
    description:
      "Explore laptops, mobiles, smart watches and more with the latest technology and unbeatable deals.",
    buttonText: "Shop Electronics",
    link: "/products?category=electronics",
    promotionTitle: "Latest Gadgets",
    promotionDiscount: "Up to 35% Off",
    promotionLink: "/products?category=electronics",
    overlay: "from-[#edf3ff]/95 via-[#edf3ff]/75 to-transparent",
    accent: "#087443",
  },
  {
    id: 3,
    image: bannerImage3,
    badge: "Premium Footwear Collection",
    title: "Step Into",
    highlight: "Premium Comfort",
    description:
      "Discover stylish footwear designed for everyday comfort, quality craftsmanship and effortless style.",
    buttonText: "Shop Footwear",
    link: "/products?category=footwear",
    promotionTitle: "Premium Sneakers",
    promotionDiscount: "Up to 30% Off",
    promotionLink: "/products?category=footwear",
    overlay: "from-[#f8f3e9]/95 via-[#f8f3e9]/75 to-transparent",
    accent: "#087443",
  },
];

const CharByCharText = ({ text, delay = 0, className = "", style = {} }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(3px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
      style={style}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span key={charIndex} variants={charVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
};

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = slides[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Automatic slide change with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="mx-auto max-w-[1440px] pb-4 sm:pb-6">
      {/* Main Hero Carousel */}
      <div
        className="relative isolate min-h-[440px] overflow-hidden bg-[#f4f8f5] sm:min-h-[460px] lg:min-h-[470px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Image with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 -z-10"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.badge}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Gradient Overlay */}
        <div
          className={`absolute inset-y-0 left-0 z-0 w-full bg-gradient-to-r ${currentSlide.overlay} md:w-[68%]`}
        />

        {/* Hero Content with Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id + "-content"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex min-h-[440px] flex-col justify-center px-6 py-12 sm:min-h-[460px] sm:px-8 lg:min-h-[470px] lg:w-[58%] lg:px-10"
          >
            {/* Collection Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold shadow-xs backdrop-blur-md"
              style={{ color: currentSlide.accent }}
            >
              <Sparkles size={15} strokeWidth={2} />
              {currentSlide.badge}
            </motion.div>

            {/* Heading */}
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[56px]">
              <CharByCharText text={currentSlide.title} delay={0.08} />
              <span className="block" style={{ color: currentSlide.accent }}>
                <CharByCharText text={currentSlide.highlight} delay={0.32} />
              </span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 max-w-md text-sm leading-6 text-slate-600 sm:text-base"
            >
              {currentSlide.description}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-7"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link
                  to={currentSlide.link}
                  className="group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: currentSlide.accent,
                  }}
                >
                  {currentSlide.buttonText}
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Promotion Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id + "-promotion"}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-6 right-6 z-20 hidden items-center gap-5 rounded-2xl border border-white/70 bg-white/95 px-5 py-2.5 shadow-xl backdrop-blur-md sm:flex lg:bottom-10 lg:right-10"
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {currentSlide.promotionTitle}
              </h3>
              <p
                className="mt-0.5 text-xs font-semibold"
                style={{ color: currentSlide.accent }}
              >
                {currentSlide.promotionDiscount}
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <Link
                to={currentSlide.promotionLink}
                aria-label={`Explore ${currentSlide.promotionTitle}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition hover:bg-[#087443] hover:text-white"
              >
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators - Center Bottom */}
        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`relative h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                activeSlide === index ? "w-8" : "w-2.5 bg-slate-400/50 hover:bg-slate-400"
              }`}
              style={
                activeSlide === index
                  ? { backgroundColor: currentSlide.accent }
                  : {}
              }
            />
          ))}
        </div>

        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/70 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white sm:left-5 sm:h-10 sm:w-10"
        >
          <ChevronLeft size={20} />
        </motion.button>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/70 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white sm:right-5 sm:h-10 sm:w-10"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Service Benefits */}
      <div className="mt-4 px-4 sm:px-6 lg:px-8">
        <ServiceBanifits />
      </div>
    </section>
  );
};

export default HeroSection;
