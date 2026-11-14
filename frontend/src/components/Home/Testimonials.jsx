import { useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { staggerContainer, staggerItem } from "../../utils/motion";

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
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const card = container.querySelector("article");

    if (!card) return;

    const gap = 16;
    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

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
              onClick={() => scroll("prev")}
              aria-label="Previous testimonials"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-colors hover:border-[#087443] hover:bg-emerald-50 hover:text-[#087443]"
            >
              <ChevronLeft size={19} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => scroll("next")}
              aria-label="Next testimonials"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-colors hover:border-[#087443] hover:bg-emerald-50 hover:text-[#087443]"
            >
              <ChevronRight size={19} />
            </motion.button>
          </div>
        </div>

        {/* Testimonial Cards Staggered */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group relative flex w-[88%] shrink-0 snap-start flex-col justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/50 sm:w-[calc((100%-1rem)/2)] sm:flex-row sm:items-start lg:w-[calc((100%-2rem)/3)]"
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
      </div>
    </section>
  );
};

export default Testimonials;
