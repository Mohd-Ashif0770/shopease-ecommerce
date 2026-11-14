
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "../common/ProductCard";
import { fetchProducts } from "../../redux/features/productSlice";
import { staggerContainer } from "../../utils/motion";

const BestSellingProducts = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: 1,
        limit: 5,
        sortBy: "created_at",
        order: "desc",
      })
    );
  }, [dispatch]);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      {/* Section Header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#087443]">
            <Sparkles size={14} />
            Featured Deals
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Best Selling Products
          </h2>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Our most popular items loved by thousands of happy shoppers
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/products"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <span>View All</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4"
            >
              <div className="aspect-[4/3] w-full rounded-xl bg-slate-100" />
              <div className="mt-4 h-4 w-1/3 rounded-full bg-slate-100" />
              <div className="mt-3 h-5 w-4/5 rounded-full bg-slate-100" />
              <div className="mt-3 h-6 w-1/2 rounded-full bg-slate-100" />
              <div className="mt-4 h-10 w-full rounded-xl bg-slate-100" />
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

      {/* Staggered Products Grid */}
      {!loading && !error && products.length > 0 && (
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          className="grid grid-cols-2 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="rounded-2xl border border-slate-200/80 bg-white py-12 text-center text-sm text-slate-500">
          No products available right now.
        </div>
      )}

      {/* Mobile View All */}
      <div className="mt-8 flex justify-center sm:hidden">
        <motion.div whileTap={{ scale: 0.96 }}>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-[#087443] px-6 py-3 text-sm font-semibold text-white shadow-sm"
          >
            View All Products
            <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellingProducts;
