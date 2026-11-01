
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

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
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-lg">

      {/* Product Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">

        <img
          src={primaryImage}
          alt={product.name}
          className="h-full w-full object-contain p-5 mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-600">
          -{MOCK_DISCOUNT}%
        </span>

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-4 cursor-pointer top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-colors hover:text-red-500"
        >
          <Heart size={20} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">

        

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1.5 text-sm">
          <Star
            size={16}
            className="fill-amber-400 text-amber-400"
          />
          <span className="font-medium text-slate-700">
            {MOCK_RATING}
          </span>
          <span className="text-slate-400">
            ({MOCK_REVIEW_COUNT})
          </span>
        </div>

        {/* Product Name */}
        <Link
          to={`/products/${product.slug}`}
          className="block truncate text-base font-semibold text-slate-800 transition-colors hover:text-green-700"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-xl font-bold text-green-700">
            {formatPrice(product.price)}
          </span>

          <span className="text-slate-500 line-through">
            {formatPrice(originalPrice)}
          </span>
        </div>

        {/* Stock */}
        <div className="mt-1">
          {product.stock > 0 ? (
            <span className="px-1 font-medium text-green-600">
              In Stock
            </span>
          ) : (
            <span className="text-sm font-medium text-red-500">
              Out of Stock
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          disabled={product.stock <= 0}
          className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <ShoppingCart size={21} />
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
