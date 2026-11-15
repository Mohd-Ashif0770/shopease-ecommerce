import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import productsHeader from "../../assets/banners/products-header.png";

const ProductsHeader = () => {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${productsHeader})` }}
    >
      {/* Background gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />

      <div className="mx-auto flex min-h-[180px] max-w-[1440px] items-center px-6 py-8 sm:min-h-[200px] sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-xl"
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex items-center gap-1.5 text-sm"
          >
            <Link
              to="/"
              className="text-slate-500 transition-colors hover:text-emerald-700"
            >
              Home
            </Link>

            <ChevronRight size={15} className="text-emerald-700" />

            <span className="font-semibold text-emerald-800">
              Shop
            </span>
          </nav>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]"
          >
            Shop Products
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base"
          >
            Explore our curated catalog of high-quality products at unbeatable prices.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsHeader;
