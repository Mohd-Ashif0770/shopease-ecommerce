import ProductCard from "../common/ProductCard";

const ProductList = ({ products = [], loading = false, error = null }) => {
  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <div className="aspect-square bg-slate-100" />

            <div className="space-y-3 p-4">
              <div className="h-4 w-3/4 rounded bg-slate-100" />
              <div className="h-4 w-1/2 rounded bg-slate-100" />
              <div className="h-9 w-full rounded-lg bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-red-200 bg-white px-4 text-center">
        <h3 className="font-heading text-lg font-bold text-slate-900">
          Something went wrong
        </h3>

        <p className="mt-2 max-w-sm text-sm text-slate-500">{error}</p>
      </div>
    );
  }

  // Empty state
  if (!products.length) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-4 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <span className="text-3xl">🛍️</span>
        </div>

        <h3 className="font-heading text-lg font-bold text-slate-900">
          No Products Found
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
          We couldn't find any products matching your selection. Try adjusting
          your filters or search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
