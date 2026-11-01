
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const ProductPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  const buttonClass =
    "flex h-10 min-w-10 items-center justify-center rounded-lg border text-sm font-medium transition-all duration-200";

  return (
    <nav
      aria-label="Product pagination"
      className="flex items-center justify-center gap-2 pt-6"
    >
      {/* Previous */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        aria-label="Previous page"
        className={`${buttonClass} cursor-pointer border-slate-200 text-slate-700 hover:border-emerald-700 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronLeft size={19} />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 w-8 items-center justify-center text-slate-500"
            >
              <MoreHorizontal size={19} />
            </span>
          );
        }

        const isActive = currentPage === page;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? "page" : undefined}
            className={`${buttonClass} ${
              isActive
                ? "border-emerald-800 bg-emerald-800 text-white shadow-sm cursor-pointer"
                : "border-slate-200 bg-white text-slate-700 hover:border-emerald-700 hover:text-emerald-700 cursor-pointer"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        aria-label="Next page"
        className={`${buttonClass} cursor-pointer border-slate-200 text-slate-700 hover:border-emerald-700 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronRight size={19} />
      </button>
    </nav>
  );
};

export default ProductPagination;
