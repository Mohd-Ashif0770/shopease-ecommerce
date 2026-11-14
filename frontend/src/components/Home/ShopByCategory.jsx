import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { categoryPresentation } from "../../data/categoryPresentation";
import { fetchCategories } from "../../redux/features/categorySlice";
import { staggerContainer, staggerItem } from "../../utils/motion";

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
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Explore curated collections across top categories
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/categories"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <span className="hidden sm:inline">View All Categories</span>
              <span className="sm:hidden">View All</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-[3/2] w-full bg-slate-100" />
                <div className="p-4 text-center">
                  <div className="mx-auto h-4 w-3/4 rounded-full bg-slate-100" />
                  <div className="mx-auto mt-2 h-3 w-1/2 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50/50 py-10 text-center text-sm font-medium text-rose-600">
            {error}
          </div>
        )}

        {/* Categories Grid Staggered */}
        {!loading && !error && categories.length > 0 && (
          <motion.div
            variants={staggerContainer(0.15, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {categories.slice(0, 6).map((category) => {
              const presentation = categoryPresentation[category.slug];
              const FallbackIcon = presentation?.icon || ImageIcon;

              return (
                <motion.div
                  key={category.id}
                  variants={staggerItem}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-shadow duration-300 hover:border-emerald-300 hover:shadow-lg hover:shadow-slate-200/60"
                  >
                    {/* Category Image */}
                    <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100">
                      {presentation?.image ? (
                        <img
                          src={presentation.image}
                          alt={category.name}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <FallbackIcon
                            size={40}
                            strokeWidth={1.5}
                            className="text-slate-400"
                          />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="bg-white px-3 py-4 text-center">
                      <h3 className="text-sm font-semibold leading-tight text-slate-900 transition-colors group-hover:text-[#087443] sm:text-base">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 sm:text-xs">
                        {category.productCount ?? 20}+ items
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ShopByCategory;
