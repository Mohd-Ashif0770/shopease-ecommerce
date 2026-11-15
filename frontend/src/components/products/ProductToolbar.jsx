import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, ChevronDown, Check } from "lucide-react";

const sortOptions = [
  { value: "created_at-desc", label: "Newest First" },
  { value: "created_at-asc", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const ProductToolbar = ({
  totalProducts = 0,
  currentPage = 1,
  limit = 12,
  search = "",
  sortBy = "created_at",
  order = "desc",
  onSearchChange,
  onSortChange,
}) => {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  const startItem = totalProducts === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalProducts);

  const currentSortOption =
    sortOptions.find((opt) => opt.value === `${sortBy}-${order}`) ||
    sortOptions[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:flex-row sm:items-center"
    >
      {/* Product Count */}
      <p className="shrink-0 text-sm font-medium text-slate-600">
        Showing{" "}
        <span className="font-bold text-slate-900">{startItem}</span> –{" "}
        <span className="font-bold text-slate-900">{endItem}</span> of{" "}
        <span className="font-bold text-[#087443]">{totalProducts}</span> products
      </p>

      {/* Search and Sort */}
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative min-w-0 flex-1 sm:w-60 sm:flex-none">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search in products..."
            aria-label="Search products"
            autoComplete="off"
            className="h-10 w-full rounded-xl border border-slate-200/90 bg-slate-50/80 pl-9 pr-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#087443] focus:bg-white focus:ring-2 focus:ring-emerald-700/10 [&::-webkit-search-cancel-button]:cursor-pointer"
          />
        </div>

        {/* Custom Animated Sort Dropdown */}
        <div ref={sortRef} className="relative shrink-0 sm:w-52">
          <button
            type="button"
            onClick={() => setSortOpen((prev) => !prev)}
            aria-expanded={sortOpen}
            aria-label="Sort options"
            className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-slate-200/90 bg-slate-50/80 px-3.5 text-sm font-medium text-slate-800 transition-all duration-200 hover:border-[#087443] hover:bg-white focus:border-[#087443] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/10"
          >
            <div className="flex items-center gap-2.5 truncate">
              <SlidersHorizontal size={16} className="shrink-0 text-slate-500" />
              <span className="truncate">{currentSortOption.label}</span>
            </div>
            <ChevronDown
              size={16}
              className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                sortOpen ? "rotate-180 text-[#087443]" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {sortOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 top-12 z-30 w-full min-w-[200px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-xl shadow-slate-200/50"
              >
                {sortOptions.map((option) => {
                  const isSelected = `${sortBy}-${order}` === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        const [newSortBy, newOrder] = option.value.split("-");
                        onSortChange?.({ sortBy: newSortBy, order: newOrder });
                        setSortOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                        isSelected
                          ? "bg-emerald-50 text-[#087443]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <Check size={16} className="shrink-0 text-[#087443]" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductToolbar;
