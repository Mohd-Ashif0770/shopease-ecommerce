
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { staggerItem } from "../../utils/motion";

const MOCK_RATING = 4.5;
const MOCK_REVIEW_COUNT = 902;
const MOCK_DISCOUNT = 20;

const ProductCard = ({ product }) => {
  const primaryImage =
    product.images?.find((image) => image.is_primary)?.image_url ||
    product.images?.[0]?.image_url;

  // Temporary display price until discount data is added to the database.
  const originalPrice = Math.round(
    product.price / (1 - MOCK_DISCOUNT / 100)
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-shadow duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100/50 p-4">
        <img
          src={primaryImage}
          alt={product.name}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Discount Badge */}
        <span className="absolute left-3.5 top-3.5 rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
          -{MOCK_DISCOUNT}%
        </span>

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-3.5 top-3.5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/60 bg-white/90 text-slate-600 shadow-sm backdrop-blur-xs transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
        >
          <Heart size={18} />
        </motion.button>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Rating */}
          <div className="mb-2 flex items-center gap-1.5 text-xs sm:text-sm">
            <Star
              size={15}
              className="fill-amber-400 text-amber-400"
            />
            <span className="font-semibold text-slate-800">
              {MOCK_RATING}
            </span>
            <span className="text-slate-400">
              ({MOCK_REVIEW_COUNT})
            </span>
          </div>

          {/* Product Name */}
          <Link
            to={`/products/${product.slug}`}
            className="block line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition-colors duration-200 hover:text-[#087443] sm:text-base"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        <div className="mt-2">
          {/* Price */}
          <div className="flex items-baseline gap-2.5">
            <span className="text-lg font-bold text-slate-950 sm:text-xl">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-slate-400 line-through sm:text-sm">
              {formatPrice(originalPrice)}
            </span>
          </div>

          {/* Stock */}
          <div className="mt-1">
            {product.stock > 0 ? (
              <span className="text-xs font-medium text-emerald-600">
                In Stock
              </span>
            ) : (
              <span className="text-xs font-medium text-rose-500">
                Out of Stock
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.01 }}
            type="button"
            disabled={product.stock <= 0}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#087443] py-2.5 px-4 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 sm:py-3 sm:text-sm"
          >
            <ShoppingCart size={17} />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
