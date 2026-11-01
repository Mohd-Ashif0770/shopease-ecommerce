import { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, Filter, RotateCcw } from "lucide-react";

const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Dell",
  "HP",
  "Canon",
  "Nike",
  "JBL",
  "Logitech",
];

const ratings = [5, 4, 3, 2];

const ProductFilters = ({ onFiltersChange }) => {
  const { categories } = useSelector((state) => state.categories);

  const [filters, setFilters] = useState({
    category_id: null,
    minPrice: 0,
    maxPrice: 200000,
  });

  const [priceInputs, setPriceInputs] = useState({
    minPrice: "0",
    maxPrice: "200000",
  });

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const updateFilter = (key, value) => {
    const updatedFilters = {
      ...filters,
      [key]: value,
    };

    if (key === "minPrice" || key === "maxPrice") {
      setPriceInputs({
        minPrice: String(updatedFilters.minPrice),
        maxPrice: String(updatedFilters.maxPrice),
      });
    }

    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category_id: null,
      minPrice: 0,
      maxPrice: 200000,
    };

    setPriceInputs({
      minPrice: "0",
      maxPrice: "200000",
    });

    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const handlePriceInputChange = (key, value) => {
    // Allow empty input while typing
    if (value === "") {
      setPriceInputs((prev) => ({
        ...prev,
        [key]: "",
      }));
      return;
    }

    const numberValue = Number(value);

    if (!Number.isFinite(numberValue) || numberValue < 0) return;

    if (key === "minPrice") {
      const validValue = Math.min(numberValue, filters.maxPrice);

      setPriceInputs((prev) => ({
        ...prev,
        minPrice: value,
      }));

      updateFilter("minPrice", validValue);
    } else {
      const validValue = Math.max(
        filters.minPrice,
        Math.min(numberValue, 200000),
      );

      setPriceInputs((prev) => ({
        ...prev,
        maxPrice: value,
      }));

      updateFilter("maxPrice", validValue);
    }
  };

  const handlePriceInputBlur = (key) => {
    const value = priceInputs[key];

    if (value === "") {
      const fallback = key === "minPrice" ? 0 : 200000;

      setPriceInputs((prev) => ({
        ...prev,
        [key]: String(fallback),
      }));

      updateFilter(key, fallback);
      return;
    }

    setPriceInputs((prev) => ({
      ...prev,
      [key]: String(filters[key]),
    }));
  };

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 6);

  const visibleBrands = showAllBrands ? brands : brands.slice(0, 5);

  return (
    <aside className="h-fit w-full rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 className="flex items-center gap-2 font-heading text-base font-bold text-slate-900">
          <Filter size={17} />
          Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs cursor-pointer font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
        >
          Clear All
        </button>
      </div>

      <div className="divide-y divide-slate-200 px-5">
        {/* Categories */}
        <section className="py-4">
          <h3 className="mb-3 text-sm font-bold text-slate-900">Categories</h3>

          <div className="space-y-3">
            {visibleCategories.map((category) => (
              <label
                key={category.id}
                className="flex cursor-pointer items-center justify-between gap-3 text-sm"
              >
                <span className="flex items-center gap-3 text-slate-700">
                  <input
                    type="checkbox"
                    checked={filters.category_id === category.id}
                    onChange={() =>
                      updateFilter(
                        "category_id",
                        filters.category_id === category.id
                          ? null
                          : category.id,
                      )
                    }
                    className="h-4 w-4 cursor-pointer accent-emerald-700"
                  />
                  {category.name}
                </span>
              </label>
            ))}
          </div>

          {categories.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="mt-3 flex items-center gap-1 cursor-pointer text-xs font-semibold text-emerald-700 hover:text-emerald-900"
            >
              {showAllCategories ? "Show Less" : "Show More"}
              <ChevronDown
                size={14}
                className={showAllCategories ? "rotate-180" : ""}
              />
            </button>
          )}
        </section>

        {/* Price Range */}
        <section className="py-4">
          <h3 className="mb-4 text-sm font-bold text-slate-900">Price Range</h3>

          <div className="space-y-4">
            {/* Dual Range Slider */}
            <div className="relative flex h-6 items-center">
              {/* Track */}
              <div className="absolute h-1.5 w-full rounded-full bg-slate-200" />

              {/* Selected Range */}
              <div
                className="absolute h-1.5 rounded-full bg-emerald-700"
                style={{
                  left: `${(filters.minPrice / 200000) * 100}%`,
                  right: `${100 - (filters.maxPrice / 200000) * 100}%`,
                }}
              />

              {/* Minimum Slider */}
              <input
                type="range"
                min="0"
                max="200000"
                step="500"
                value={filters.minPrice}
                onChange={(e) => {
                  const value = Math.min(
                    Number(e.target.value),
                    filters.maxPrice,
                  );

                  updateFilter("minPrice", value);
                }}
                className="range-slider range-slider-min"
                aria-label="Minimum price"
              />

              {/* Maximum Slider */}
              <input
                type="range"
                min="0"
                max="200000"
                step="500"
                value={filters.maxPrice}
                onChange={(e) => {
                  const value = Math.max(
                    Number(e.target.value),
                    filters.minPrice,
                  );

                  updateFilter("maxPrice", value);
                }}
                className="range-slider range-slider-max"
                aria-label="Maximum price"
              />
            </div>

            {/* Price Inputs */}
            <div className="flex items-center gap-2">
              {/* Minimum Price */}
              <input
                type="number"
                min="0"
                max={filters.maxPrice}
                value={priceInputs.minPrice}
                onChange={(e) =>
                  handlePriceInputChange("minPrice", e.target.value)
                }
                onBlur={() => handlePriceInputBlur("minPrice")}
                placeholder="Min"
                className="h-10 w-full min-w-0 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-emerald-700"
              />

              <span className="text-slate-400">–</span>

              {/* Maximum Price */}
              <input
                type="number"
                min={filters.minPrice}
                max="200000"
                value={priceInputs.maxPrice}
                onChange={(e) =>
                  handlePriceInputChange("maxPrice", e.target.value)
                }
                onBlur={() => handlePriceInputBlur("maxPrice")}
                placeholder="Max"
                className="h-10 w-full min-w-0 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-emerald-700"
              />
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="py-4">
          <h3 className="mb-3 text-sm font-bold text-slate-900">Brand</h3>

          <div className="space-y-3">
            {visibleBrands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-3 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-emerald-700"
                />
                {brand}
              </label>
            ))}
          </div>

          {brands.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllBrands((prev) => !prev)}
              className="mt-3 flex items-center gap-1 text-xs font-semibold cursor-pointer text-emerald-700 hover:text-emerald-900"
            >
              {showAllBrands ? "Show Less" : "Show More"}
              <ChevronDown
                size={14}
                className={showAllBrands ? "rotate-180" : ""}
              />
            </button>
          )}
        </section>

        {/* Rating */}
        <section className="py-4">
          <h3 className="mb-3 text-sm font-bold text-slate-900">Rating</h3>

          <div className="space-y-3">
            {ratings.map((rating) => (
              <label
                key={rating}
                className="flex cursor-pointer items-center justify-between gap-2 text-sm"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="product-rating"
                    className="h-4 w-4 cursor-pointer accent-emerald-700"
                  />

                  <span className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className={
                          index < rating ? "text-amber-400" : "text-slate-300"
                        }
                      >
                        ★
                      </span>
                    ))}

                    {rating !== 5 && (
                      <span className="ml-1 text-xs text-slate-500">& Up</span>
                    )}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default ProductFilters;
