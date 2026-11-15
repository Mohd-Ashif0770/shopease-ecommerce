import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X } from "lucide-react";

const ProductGallery = ({ images = [], productName = "Product Image" }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Fallback placeholder images if no images are passed
  const displayImages = images.length > 0
    ? images
    : [{ id: 1, image_url: "https://via.placeholder.com/600x600?text=No+Image" }];

  const currentImage = displayImages[selectedIndex]?.image_url || displayImages[0]?.image_url;

  return (
    <div className="space-y-4">
      {/* Main Image Box */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs flex items-center justify-center">
        {/* Top Badges */}
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-xs">
            -18%
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            Bestseller
          </span>
        </div>

        {/* Expand / Zoom Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => setIsZoomOpen(true)}
          aria-label="Enlarge image"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-slate-50/90 text-slate-700 shadow-xs backdrop-blur-xs transition-colors hover:bg-white hover:text-emerald-700"
        >
          <Maximize2 size={16} />
        </motion.button>

        {/* Active Main Image with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            src={currentImage}
            alt={productName}
            className="max-h-full max-w-full object-contain mix-blend-multiply cursor-pointer"
            onClick={() => setIsZoomOpen(true)}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {displayImages.map((img, index) => {
            const isSelected = selectedIndex === index;
            return (
              <motion.button
                key={img.id || index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-square w-full overflow-hidden rounded-2xl border bg-white p-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[#087443] ring-2 ring-[#087443]/30 shadow-xs"
                    : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <img
                  src={img.image_url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="h-full w-full object-contain mix-blend-multiply"
                />
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
            onClick={() => setIsZoomOpen(false)}
          >
            <div
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-3xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
              >
                <X size={20} />
              </button>
              <img
                src={currentImage}
                alt={productName}
                className="max-h-[80vh] max-w-[80vw] object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGallery;
