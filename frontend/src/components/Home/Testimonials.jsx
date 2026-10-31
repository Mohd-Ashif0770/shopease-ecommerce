
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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
      "Great customer service and easy return process. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Verified Buyer",
    rating: 5,
    review:
      "I love the variety of products. The website is clean and easy to use.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Verified Buyer",
    rating: 5,
    review:
      "Excellent product quality and a smooth checkout experience. I'll definitely shop again.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 5,
    name: "Sophia Martinez",
    role: "Verified Buyer",
    rating: 5,
    review:
      "The entire shopping experience was simple and convenient. Great value for money!",
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
    <section className="pt-14 sm:pt-18">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              What Our Customers Say
            </h2>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Real stories from people who love shopping with ShopEase.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("prev")}
              aria-label="Previous testimonials"
              className="flex h-10 w-10 items-center cursor-pointer justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-green-700 hover:bg-green-50 hover:text-green-700"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={() => scroll("next")}
              aria-label="Next testimonials"
              className="flex h-10 w-10 items-center cursor-pointer justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-green-700 hover:bg-green-50 hover:text-green-700"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex w-[85%] shrink-0 snap-start flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-shadow duration-300 hover:shadow-md sm:w-[calc((100%-1rem)/2)] sm:flex-row sm:items-start lg:w-[calc((100%-2rem)/3)]"
            >
              {/* Customer Image */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-16 w-16 shrink-0 rounded-full border border-slate-100 object-cover"
                loading="lazy"
              />

              {/* Review Content */}
              <div className="min-w-0 flex-1">
                <p className="min-h-[48px] text-sm leading-relaxed text-slate-600">
                  "{testimonial.review}"
                </p>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-0.5">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <Star
                        key={index}
                        size={17}
                        className="fill-amber-400 text-amber-400"
                      />
                    )
                  )}
                </div>

                {/* Customer Details */}
                <div className="mt-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {testimonial.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
