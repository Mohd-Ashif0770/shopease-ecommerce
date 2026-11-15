import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";
import { toast } from "sonner";

const DEFAULT_COLORS = [
  { name: "Black", colorHex: "#1e293b" },
  { name: "Cream", colorHex: "#e2d7c5" },
  { name: "Navy Blue", colorHex: "#0f2b5c" },
];

const ProductInfo = ({ product = {} }) => {
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const price = Number(product.price || 349);
  const originalPrice = Math.round(price / 0.82); // Simulated discount
  const savings = originalPrice - price;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => Math.min(product.stock || 99, prev + 1));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard!");
      }
    } catch {
      // User cancelled share dialog
    }
  };

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name || "item"} to cart!`);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist!",
    );
  };

  return (
    <div className="space-y-6">
      {/* Brand & Share Button */}
      <div className="flex items-center justify-between">
        <Link
          to={`/products?category=${product.category?.slug || ""}`}
          className="text-sm font-semibold text-[#087443] hover:underline"
        >
          {product.category?.name || "Sony"}
        </Link>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleShare}
          aria-label="Share product"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <Share2 size={16} />
        </motion.button>
      </div>

      {/* Product Title */}
      <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
        {product.name || "Sony WH-1000XM5 Wireless Noise Cancelling Headphones"}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={17} className="fill-amber-400" />
          ))}
        </div>
        <span className="font-bold text-slate-900">4.6</span>
        <span className="text-slate-500">(630 reviews)</span>
      </div>

      {/* Price Section */}
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-extrabold text-slate-950 sm:text-4xl">
          {formatPrice(price)}
        </span>

        <span className="text-lg font-medium text-slate-400 line-through">
          {formatPrice(originalPrice)}
        </span>

        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
          Save {formatPrice(savings)} (18%)
        </span>
      </div>

      {/* Short Description */}
      <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
        {product.description ||
          "Industry-leading noise cancellation, exceptional sound quality, and all-day comfort with up to 30 hours of battery life."}
      </p>

      {/* Color Selector */}
      <div className="space-y-3 pt-2">
        <div className="text-sm font-semibold text-slate-900">
          Color: <span className="font-normal text-slate-600">{selectedColor}</span>
        </div>

        <div className="flex items-center gap-3">
          {DEFAULT_COLORS.map((col) => {
            const isSelected = selectedColor === col.name;
            return (
              <button
                key={col.name}
                type="button"
                onClick={() => setSelectedColor(col.name)}
                className={`relative h-9 w-9 cursor-pointer rounded-full transition-transform ${
                  isSelected ? "scale-110 ring-2 ring-[#087443] ring-offset-2" : "hover:scale-105"
                }`}
                style={{ backgroundColor: col.colorHex }}
                title={col.name}
              />
            );
          })}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 pt-2">
        <span className="text-sm font-semibold text-slate-900">Quantity</span>

        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/80 p-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={handleDecreaseQuantity}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-600 transition hover:bg-white hover:text-slate-900"
          >
            <Minus size={15} />
          </motion.button>

          <span className="w-10 text-center text-sm font-bold text-slate-900">
            {quantity}
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={handleIncreaseQuantity}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-600 transition hover:bg-white hover:text-slate-900"
          >
            <Plus size={15} />
          </motion.button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleAddToCart}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-[#087443] py-3.5 px-6 text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-800"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleToggleWishlist}
          className={`flex items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-semibold transition-colors cursor-pointer ${
            isWishlisted
              ? "border-rose-300 bg-rose-50 text-rose-600"
              : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          <Heart size={18} className={isWishlisted ? "fill-rose-600" : ""} />
          Add to Wishlist
        </motion.button>
      </div>
    </div>
  );
};

export default ProductInfo;
