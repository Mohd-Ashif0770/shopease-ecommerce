
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/features/productSlice";

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

  if (loading) return <p>Loading products...</p>;

  if (error) return <p>{error}</p>;


  return (
    <section className="mx-auto max-w-[1440px] bg-slate-50 px-6 pt-16 sm:px-8 lg:px-10">
      {/* Section Header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>

          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
            Best Selling Products
          </h2>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Our most popular products loved by customers
          </p>
        </div>

        <Link
          to="/products"
          className="hidden border border-slate-300 rounded-lg py-2 px-3 shrink-0 items-center gap-2 text-sm font-semibold text-[#087443] transition-all duration-300 ease-in-out hover:bg-green-700 hover:border-green-700 hover:text-white sm:flex"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <p className="py-10 text-center text-sm text-slate-500">
          Loading products...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="py-10 text-center text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <p className="py-10 text-center text-sm text-slate-500">
          No products available right now.
        </p>
      )}

      {/* Mobile View All */}
      <div className="mt-7 flex justify-center sm:hidden">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-[#087443] px-6 py-3 text-sm font-semibold text-[#087443]"
        >
          View All Products
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
};

export default BestSellingProducts;
