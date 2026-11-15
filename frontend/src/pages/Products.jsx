import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import ProductFilters from "../components/products/ProductFilters";
import ProductsHeader from "../components/products/ProductsHeader";
import ProductToolbar from "../components/products/ProductToolbar";
import ProductList from "../components/products/ProductList";
import ProductPagination from "../components/products/ProductPagination";
import AnimatedSection from "../components/motion/AnimatedSection";

import { fetchProducts } from "../redux/features/productSlice";

const DEFAULT_FILTERS = {
  category_id: null,
  category: null,
  minPrice: 0,
  maxPrice: 200000,
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get("category");
  const categoryIdParam = searchParams.get("category_id");
  const urlSearchParam = searchParams.get("search");

  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    category: categoryParam || null,
    category_id: categoryIdParam || null,
  }));
  const [search, setSearch] = useState(urlSearchParam || "");
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearchParam || "");
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const {
    products,
    pagination,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Synchronize state when URL search parameters change externally
  useEffect(() => {
    const currentCategory = searchParams.get("category");
    const currentCategoryId = searchParams.get("category_id");
    const currentSearch = searchParams.get("search");

    setFilters((prev) => {
      const nextCategory = currentCategory || null;
      const nextCategoryId = currentCategoryId || null;

      if (prev.category !== nextCategory || prev.category_id !== nextCategoryId) {
        return {
          ...prev,
          category: nextCategory,
          category_id: nextCategoryId,
        };
      }
      return prev;
    });

    if (currentSearch !== null && currentSearch !== search) {
      setSearch(currentSearch);
    }
  }, [searchParams]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch products whenever filters or controls change
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        limit: 8,
        search: debouncedSearch,
        category_id: filters.category_id || undefined,
        category: filters.category || undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        sortBy,
        order,
      })
    );
  }, [
    dispatch,
    currentPage,
    debouncedSearch,
    filters,
    sortBy,
    order,
  ]);

  // Reset pagination when filters change & update URL query string
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);

    const updatedParams = new URLSearchParams(searchParams);

    if (newFilters.category) {
      updatedParams.set("category", newFilters.category);
      updatedParams.delete("category_id");
    } else if (newFilters.category_id) {
      updatedParams.set("category_id", newFilters.category_id);
      updatedParams.delete("category");
    } else {
      updatedParams.delete("category");
      updatedParams.delete("category_id");
    }

    setSearchParams(updatedParams, { replace: true });
  };

  // Reset pagination when search changes
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Reset pagination when sorting changes
  const handleSortChange = ({ sortBy, order }) => {
    setSortBy(sortBy);
    setOrder(order);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <ProductsHeader />

      <AnimatedSection>
        <div className="mx-auto max-w-[1440px] px-6 pt-10 pb-20 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[286px_1fr]">
            {/* Filters */}
            <ProductFilters
              activeFilters={filters}
              onFiltersChange={handleFiltersChange}
            />

            {/* Products Content */}
            <div className="min-w-0 space-y-6">
              <ProductToolbar
                totalProducts={pagination?.totalProducts || 0}
                currentPage={pagination?.page || 1}
                limit={pagination?.limit || 12}
                search={search}
                sortBy={sortBy}
                order={order}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
              />

              {/* Product List */}
              <ProductList
                products={products}
                loading={loading}
                error={error}
              />

              {/* Pagination */}
              {!loading && !error && (
                <ProductPagination
                  currentPage={pagination?.page || 1}
                  totalPages={pagination?.totalPages || 1}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default Products;
