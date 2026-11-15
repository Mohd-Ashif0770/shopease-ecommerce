import { motion } from "motion/react";
import { Edit3, Star } from "lucide-react";
import { getSampleReviews } from "../../utils/productDetailsHelper";

const RATING_BREAKDOWN = [
  { stars: 5, percentage: 58 },
  { stars: 4, percentage: 28 },
  { stars: 3, percentage: 9 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 2 },
];

const ProductReviewsTab = ({ product = {} }) => {
  const reviews = getSampleReviews(product);

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
        Customer Reviews (630)
      </h3>

      {/* Summary Rating & Progress Bars Header */}
      <div className="flex flex-col gap-8 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Rating Score */}
        <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
          <span className="text-5xl font-extrabold text-slate-900">4.6</span>
          <div className="mt-2 flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className="fill-amber-400" />
            ))}
          </div>
          <span className="mt-1 text-xs text-slate-500">
            Based on 630 reviews
          </span>
        </div>

        {/* Rating Progress Bars */}
        <div className="flex-1 max-w-md space-y-2">
          {RATING_BREAKDOWN.map((row) => (
            <div key={row.stars} className="flex items-center gap-3 text-xs font-medium">
              <span className="flex w-6 items-center gap-1 text-slate-700">
                {row.stars} <Star size={12} className="fill-amber-400 text-amber-400" />
              </span>

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#087443]"
                  style={{ width: `${row.percentage}%` }}
                />
              </div>

              <span className="w-8 text-right text-slate-500">
                {row.percentage}%
              </span>
            </div>
          ))}
        </div>

        {/* Write a Review Button */}
        <div className="flex justify-center lg:justify-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            className="flex items-center gap-2 rounded-2xl border-2 border-[#087443] px-6 py-3 text-sm font-semibold text-[#087443] transition-colors hover:bg-emerald-50 cursor-pointer"
          >
            <Edit3 size={16} />
            Write a Review
          </motion.button>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs"
          >
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
                "{review.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsTab;
