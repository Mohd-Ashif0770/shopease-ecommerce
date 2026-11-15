
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Home, Tag } from "lucide-react";

const NotFound = () => {
  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-white px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-2xl text-center"
      >
        {/* Illustration */}
        <div className="relative mx-auto mb-6 flex h-48 w-64 items-center justify-center sm:h-56 sm:w-80">
          {/* Background Shape */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-5 rounded-[45%] bg-emerald-50"
          />

          {/* Decorative Leaves */}
          <motion.div
            initial={{ opacity: 0, rotate: -15 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-5 left-5 text-emerald-700"
          >
            <svg viewBox="0 0 70 75" className="h-16 w-16" fill="none">
              <path d="M34 68C34 43 26 22 8 9" stroke="currentColor" strokeWidth="3" />
              <path d="M28 42C8 39 5 25 8 9C25 12 34 24 28 42Z" fill="#15803d" />
              <path d="M35 54C32 33 43 20 61 18C63 37 53 51 35 54Z" fill="#047857" />
              <path d="M34 68C34 48 43 39 57 35" stroke="currentColor" strokeWidth="3" />
            </svg>
          </motion.div>

          {/* Floating Shopping Bag */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 h-full w-full"
          >
            <svg
              viewBox="0 0 220 190"
              className="h-full w-full drop-shadow-md"
              fill="none"
            >
              <path
                d="M67 66C67 27 82 8 108 8C134 8 149 27 149 66"
                stroke="#047857"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M48 43H168L183 164C184 173 177 180 168 180H49C40 180 34 173 35 164L48 43Z"
                fill="#F8FAFC"
                stroke="#E2E8F0"
                strokeWidth="2"
              />
              <path
                d="M35 164L48 43L35 48L23 157C22 168 29 176 40 179H53C42 177 34 173 35 164Z"
                fill="#E2E8F0"
              />
              {/* Sad Face */}
              <path d="M75 112C81 120 91 120 97 112" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
              <path d="M124 112C130 120 140 120 146 112" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
              <path d="M91 145C101 130 120 130 131 145" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Pop-in 404 Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: -12 }}
            transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.3 }}
            className="absolute bottom-5 right-2 z-20 rounded-lg bg-[#087443] px-3 py-2 text-2xl font-extrabold text-white shadow-lg sm:right-4 sm:text-3xl"
          >
            404
          </motion.div>

          {/* Decorative Lines */}
          <div className="absolute right-8 top-6 rotate-12 text-emerald-800">
            <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
              <path d="M8 20L13 7M20 24L31 12M25 32L37 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-flex h-11 min-w-36 items-center justify-center gap-2 rounded-xl bg-[#087443] px-5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-800"
            >
              <Home size={16} />
              Go to Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/products"
              className="inline-flex h-11 min-w-36 items-center justify-center gap-2 rounded-xl border border-[#087443]/30 px-5 text-sm font-semibold text-[#087443] transition-colors hover:bg-emerald-50"
            >
              <Tag size={16} />
              Browse Products
            </Link>
          </motion.div>
        </div>

        <p className="mt-10 text-xs font-medium tracking-widest text-slate-400">
          SHOPEASE · HAPPY SHOPPING
        </p>
      </motion.div>
    </section>
  );
};

export default NotFound;
