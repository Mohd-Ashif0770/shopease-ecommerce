import { motion, AnimatePresence } from "motion/react";
import ProductCard from "../common/ProductCard";
import { staggerContainer } from "../../utils/motion";

const ProductList = ({ products = [], loading = false, error = null }) => {
  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
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
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-rose-100 bg-rose-50/50 p-6 text-center"
      >
        <h3 className="font-heading text-lg font-bold text-rose-900">
          Something went wrong
        </h3>
        <p className="mt-2 max-w-sm text-sm text-rose-600">{error}</p>
      </motion.div>
    );
  }

  // Empty state
  if (!products.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl"
        >
          🛍️
        </motion.div>

        <h3 className="font-heading text-xl font-bold text-slate-900">
          No Products Found
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
          We couldn't find any products matching your selection. Try adjusting
          your search or resetting your filters.
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={products.map((p) => p.id).join("-")}
        variants={staggerContainer(0.06, 0.02)}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductList;
