import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import productsHeader from "../../assets/banners/products-header.png";

const ProductsHeader = () => {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${productsHeader})` }}
    >
      <div className="mx-auto flex min-h-[180px] max-w-[1440px] items-center px-6 py-8 sm:min-h-[200px] sm:px-8 lg:px-10">
        <div className="relative z-10 max-w-xl">
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

            <span className="font-medium text-emerald-800">
              Shop
            </span>
          </nav>

          {/* Heading */}
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
            Shop Products
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            Discover our wide range of premium products at the best prices.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsHeader;
