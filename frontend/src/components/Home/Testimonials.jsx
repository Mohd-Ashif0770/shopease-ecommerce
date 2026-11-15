import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    rating: 5,
    review:
      "Amazing shopping experience! The products are high quality and delivery was super fast.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Buyer",
    rating: 5,
    review:
      "Great customer service and easy return process. Highly recommended for quality products!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Verified Buyer",
    rating: 5,
    review:
      "I love the variety of products available. The website is clean, fast, and easy to navigate.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Verified Buyer",
    rating: 5,
    review:
      "Excellent product quality and a smooth checkout experience. I'll definitely shop here again.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 5,
    name: "Sophia Martinez",
    role: "Verified Buyer",
    rating: 5,
    review:
      "The entire shopping experience was simple and convenient. Unbeatable value for money!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get 3 visible cards starting from currentIndex
  const len = testimonials.length;
  const visibleCards = [
    testimonials[currentIndex % len],
    testimonials[(currentIndex + 1) % len],
    testimonials[(currentIndex + 2) % len],
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              What Our Customers Say
            </h2>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Real stories from verified shoppers who love ShopEase
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonials"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-colors hover:border-[#087443] hover:bg-emerald-50 hover:text-[#087443]"
            >
              <ChevronLeft size={19} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={handleNext}
              aria-label="Next testimonials"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-colors hover:border-[#087443] hover:bg-emerald-50 hover:text-[#087443]"
            >
              <ChevronRight size={19} />
            </motion.button>
          </div>
        </div>

        {/* Testimonial Cards Animated Container */}
        <div className="relative overflow-hidden min-h-[220px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction === "next" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "next" ? -50 : 50 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleCards.map((testimonial, idx) => (
                <motion.article
                  key={`${testimonial.id}-${idx}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className={`group relative flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/50 ${
                    idx === 1 ? "hidden sm:flex" : ""
                  } ${idx === 2 ? "hidden lg:flex" : ""}`}
                >
                  {/* Decorative Quote Icon */}
                  <Quote
                    size={36}
                    className="absolute right-5 top-5 text-slate-100 transition-colors group-hover:text-emerald-100"
                  />

                  {/* Customer Image */}
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 shrink-0 rounded-full border-2 border-slate-100 object-cover shadow-xs"
                    loading="lazy"
                  />

                  {/* Review Content */}
                  <div className="relative z-10 min-w-0 flex-1">
                    <p className="min-h-[48px] text-sm leading-relaxed text-slate-600">
                      "{testimonial.review}"
                    </p>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-1">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            size={15}
                            className="fill-amber-400 text-amber-400"
                          />
                        )
                      )}
                    </div>

                    {/* Customer Details */}
                    <div className="mt-2.5">
                      <h3 className="text-sm font-bold text-slate-900">
                        {testimonial.name}
                      </h3>

                      <p className="mt-0.5 text-xs font-medium text-emerald-700">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="mt-6 flex justify-center items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setDirection(idx > currentIndex ? "next" : "prev");
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-6 bg-[#087443]"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
