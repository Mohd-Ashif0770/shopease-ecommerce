import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ProductBreadcrumbs = ({ categoryName, categorySlug, productName }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs font-medium text-slate-500 sm:text-sm"
    >
      <Link
        to="/"
        className="transition-colors hover:text-[#087443]"
      >
        Home
      </Link>

      <ChevronRight size={14} className="text-slate-400 shrink-0" />

      {categoryName ? (
        <>
          <Link
            to={`/products?category=${categorySlug || ""}`}
            className="transition-colors hover:text-[#087443]"
          >
            {categoryName}
          </Link>
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
        </>
      ) : (
        <>
          <Link
            to="/products"
            className="transition-colors hover:text-[#087443]"
          >
            Products
          </Link>
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
        </>
      )}

      <span className="truncate font-semibold text-slate-900 max-w-[200px] sm:max-w-[360px]">
        {productName || "Product Details"}
      </span>
    </nav>
  );
};

export default ProductBreadcrumbs;
