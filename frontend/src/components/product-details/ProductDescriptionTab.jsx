import { CheckCircle2 } from "lucide-react";
import { getProductHighlights } from "../../utils/productDetailsHelper";

const ProductDescriptionTab = ({ product = {} }) => {
  const highlights = getProductHighlights(product);
  const primaryImage =
    product.images?.find((img) => img.is_primary)?.image_url ||
    product.images?.[0]?.image_url;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
      {/* Left Text & Highlights */}
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          About This Product
        </h2>

        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          {product.description ||
            `The ${product.name || "product"} delivers exceptional performance, premium build quality, and versatile usability. Perfect for daily use and designed to last.`}
        </p>

        {/* Checklist */}
        <div className="space-y-3 pt-2">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-sm font-medium text-slate-800">
              <CheckCircle2 size={18} className="text-[#087443] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Feature Showcase Banner Card using actual product image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs flex items-center justify-center">
        {/* Category Label on Top Right without background */}
        <span className="absolute top-4 right-4 text-xs font-bold uppercase tracking-wider text-[#087443] bg-green-100/50 px-3 py-1 rounded-full shadow-xs">
          {product.category?.name || "Premium Collection"}
        </span>

        {primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name || "Product showcase"}
            className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400 text-sm">
            No Image Available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescriptionTab;
