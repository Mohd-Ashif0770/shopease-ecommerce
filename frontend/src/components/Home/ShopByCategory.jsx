import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { categoryPresentation } from "../../data/categoryPresentation";
import { fetchCategories } from "../../redux/features/categorySlice";

const ShopByCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section className="bg-slate-50 pt-16">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Find what you need across our product collections
            </p>
          </div>

          <Link
            to="/categories"
            className="hidden border border-slate-300 rounded-lg py-2 px-3 shrink-0 items-center gap-2 text-sm font-semibold text-[#087443] transition-all duration-300 ease-in-out hover:bg-green-700 hover:border-green-700 hover:text-white sm:flex"
          >
            View All Categories
            <ArrowRight size={17} />
          </Link>
        </div>

        {loading && (
          <p className="text-center text-slate-500">Loading categories...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 6).map((category) => {
            const presentation = categoryPresentation[category.slug];
            const FallbackIcon = presentation?.icon || ImageIcon;

            return (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
              >
                {/* Image fills the entire top area */}
                <div className="aspect-[3/2] w-full overflow-hidden bg-slate-100">
                  {presentation?.image ? (
                    <img
                      src={presentation.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FallbackIcon
                        size={44}
                        strokeWidth={1.5}
                        className="text-slate-400"
                      />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="bg-white px-3 py-4 text-center">
                  <h3 className="text-sm font-semibold leading-tight text-slate-900 sm:text-base">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    {category.productCount ?? 20}+ products
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
