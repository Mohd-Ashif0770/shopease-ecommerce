import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, ArrowLeft } from "lucide-react";

import AnimatedSection from "../components/motion/AnimatedSection";
import ProductBreadcrumbs from "../components/product-details/ProductBreadcrumbs";
import ProductGallery from "../components/product-details/ProductGallery";
import ProductInfo from "../components/product-details/ProductInfo";
import ProductTrustBar from "../components/product-details/ProductTrustBar";
import ProductTabs from "../components/product-details/ProductTabs";
import ProductDescriptionTab from "../components/product-details/ProductDescriptionTab";
import ProductSpecificationsTab from "../components/product-details/ProductSpecificationsTab";
import ProductReviewsTab from "../components/product-details/ProductReviewsTab";

import { fetchProductDetails } from "../redux/features/productSlice";

const ProductDetails = () => {
  const { identifier } = useParams();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("description");

  const {
    currentProduct,
    detailsLoading,
    detailsError,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (identifier) {
      dispatch(fetchProductDetails(identifier));
    }
  }, [dispatch, identifier]);

  // Loading skeleton
  if (detailsLoading) {
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
          <div className="animate-pulse space-y-8">
            <div className="h-5 w-48 rounded-full bg-slate-200" />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="aspect-[4/3] w-full rounded-3xl bg-slate-200" />
              <div className="space-y-4">
                <div className="h-6 w-24 rounded-full bg-slate-200" />
                <div className="h-10 w-3/4 rounded-2xl bg-slate-200" />
                <div className="h-5 w-32 rounded-full bg-slate-200" />
                <div className="h-12 w-48 rounded-2xl bg-slate-200" />
                <div className="h-20 w-full rounded-2xl bg-slate-200" />
                <div className="h-12 w-full rounded-2xl bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (detailsError) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Product Not Found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {detailsError || "The product you are looking for does not exist or has been removed."}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#087443] px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-800"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pb-28">
      <AnimatedSection>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10 space-y-8">
          {/* Breadcrumbs */}
          <ProductBreadcrumbs
            categoryName={currentProduct?.category?.name}
            categorySlug={currentProduct?.category?.slug}
            productName={currentProduct?.name}
          />

          {/* Main Product Hero (Gallery + Info) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Gallery */}
            <ProductGallery
              images={currentProduct?.images || []}
              productName={currentProduct?.name}
            />

            {/* Info */}
            <ProductInfo product={currentProduct || {}} />
          </div>

          {/* Trust & Delivery Banner */}
          <ProductTrustBar stock={currentProduct?.stock} />

          {/* Tabs Navigation */}
          <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content Section */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductDescriptionTab
                    product={currentProduct || {}}
                  />
                </motion.div>
              )}

              {activeTab === "specifications" && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductSpecificationsTab
                    product={currentProduct || {}}
                  />
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductReviewsTab product={currentProduct || {}} />
                </motion.div>
              )}

              {activeTab === "qa" && (
                <motion.div
                  key="qa"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-slate-200/90 bg-white p-8 text-center"
                >
                  <h3 className="text-lg font-bold text-slate-900">
                    Questions & Answers (24)
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Have a question about this product? Ask our community or seller directly.
                  </p>
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#087443] px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-800 cursor-pointer"
                  >
                    Ask a Question
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default ProductDetails;