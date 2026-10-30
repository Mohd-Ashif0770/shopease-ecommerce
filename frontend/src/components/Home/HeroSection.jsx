import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import bannerImage1 from "../../assets/banner-image-1.png";
import bannerImage2 from "../../assets/banner-image-2.png";
import bannerImage3 from "../../assets/banner-image-3.png";

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
    promotionLink: "/products?category=home-living",
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

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = slides[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-[1440px]">
      {/* Main Hero Carousel */}
      <div className="relative isolate min-h-[440px] overflow-hidden bg-[#f4f8f5] sm:min-h-[460px] lg:min-h-[470px]">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.badge}
            className="h-full w-full animate-[fadeIn_0.7s_ease-in-out] object-cover object-center"
          />
        </div>

        {/* Dynamic Gradient Overlay */}
        <div
          className={`absolute inset-y-0 left-0 z-0 w-full bg-gradient-to-r ${currentSlide.overlay} md:w-[68%]`}
        />

        {/* Hero Content */}
        <div
          key={currentSlide.id + "-content"}
          className="relative z-10 flex min-h-[440px] animate-[fadeIn_0.7s_ease-in-out] flex-col justify-center px-6 py-12 sm:min-h-[460px] sm:px-8 lg:min-h-[470px] lg:w-[58%] lg:px-10"
        >
           
          {/* Collection Badge */}
          <div
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold shadow-sm backdrop-blur-sm"
            style={{ color: currentSlide.accent }}
          >
            <Sparkles size={15} strokeWidth={2} />
            {currentSlide.badge}
          </div>

          {/* Heading */}
          <h1 className="max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[56px]">
            {currentSlide.title}
            <span className="block" style={{ color: currentSlide.accent }}>
              {currentSlide.highlight}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
            {currentSlide.description}
          </p>

          {/* CTA Button */}
          <div className="mt-7">
            <Link
              to={currentSlide.link}
              className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-90"
              style={{
                backgroundColor: currentSlide.accent,
              }}
            >
              {currentSlide.buttonText}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Floating Promotion Card */}
        <div
          key={currentSlide.id + "-promotion"}
          className="absolute bottom-6 right-6 z-20 hidden animate-[fadeIn_0.7s_ease-in-out] items-center gap-5 rounded-2xl border border-white/70 bg-white/95 px-5 py-2 shadow-xl backdrop-blur-sm sm:flex lg:bottom-10 lg:right-10"
        >
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {currentSlide.promotionTitle}
            </h3>
            <p
              className="mt-1 text-xs font-semibold"
              style={{ color: currentSlide.accent }}
            >
              {currentSlide.promotionDiscount}
            </p>
          </div>

          <Link
            to={currentSlide.promotionLink}
            aria-label={`Explore ${currentSlide.promotionTitle}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition hover:text-white hover:bg-[#087443]"
            
          >
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Slide Indicators - Center Bottom */}
        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === index ? "w-8" : "w-2 bg-slate-400/60"
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
        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-30 flex cursor-pointer h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/20 text-slate-700 shadow-md transition hover:scale-105 hover:bg-white sm:left-4 sm:h-9 sm:w-9"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-30 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border cursor-pointer border-white/70 bg-white/90 text-slate-700 shadow-md transition hover:scale-105 hover:bg-white sm:right-4 sm:h-9 sm:w-9"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Service Benefits */}
      <ServiceBanifits />
    </section>
  );
};

export default HeroSection;
