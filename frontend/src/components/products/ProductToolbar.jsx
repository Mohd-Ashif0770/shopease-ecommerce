import { Search, SlidersHorizontal } from "lucide-react";

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
  const startItem = totalProducts === 0 ? 0 : (currentPage - 1) * limit + 1;

  const endItem = Math.min(currentPage * limit, totalProducts);

  const handleSortChange = (e) => {
    const [newSortBy, newOrder] = e.target.value.split("-");
    onSortChange?.({ sortBy: newSortBy, order: newOrder });
  };

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      {/* Product Count */}
      <p className="shrink-0 text-sm text-slate-500">
        Showing{" "}      
          {startItem} - {endItem} {" "}
       
        of {totalProducts} products
      </p>

      {/* Search and Sort */}
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            autoComplete="off"
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative shrink-0 sm:w-48">
          <SlidersHorizontal
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={`${sortBy}-${order}`}
            onChange={handleSortChange}
            className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-sm text-slate-700 outline-none transition-colors focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
          >
            <option value="created_at-desc">Newest First</option>
            <option value="created_at-asc">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;
