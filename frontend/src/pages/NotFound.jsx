
import { Link } from "react-router-dom";
import { Home, Tag } from "lucide-react";

const NotFound = () => {
  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-white px-4 py-16">
      <div className="mx-auto w-full max-w-2xl text-center">

        {/* Illustration */}
        <div className="relative mx-auto mb-6 flex h-48 w-64 items-center justify-center sm:h-56 sm:w-80">

          {/* Background Shape */}
          <div className="absolute inset-5 rounded-[45%] bg-emerald-50" />

          {/* Decorative Leaves */}
          <div className="absolute bottom-5 left-5 text-emerald-700">
            <svg viewBox="0 0 70 75" className="h-16 w-16" fill="none">
              <path d="M34 68C34 43 26 22 8 9" stroke="currentColor" strokeWidth="3" />
              <path d="M28 42C8 39 5 25 8 9C25 12 34 24 28 42Z" fill="#15803d" />
              <path d="M35 54C32 33 43 20 61 18C63 37 53 51 35 54Z" fill="#047857" />
              <path d="M34 68C34 48 43 39 57 35" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>

          {/* Shopping Bag */}
          <svg
            viewBox="0 0 220 190"
            className="relative z-10 h-full w-full drop-shadow-md"
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

          {/* 404 Badge */}
          <div className="absolute bottom-5 right-2 z-20 -rotate-12 rounded-lg bg-emerald-800 px-3 py-2 text-2xl font-extrabold text-white shadow-lg sm:right-4 sm:text-3xl">
            404
          </div>

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
          <Link
            to="/"
            className="inline-flex h-11 min-w-36 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
          >
            <Home size={16} />
            Go to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex h-11 min-w-36 items-center justify-center gap-2 rounded-lg border border-emerald-800/20 px-5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
          >
            <Tag size={16} />
            Browse Products
          </Link>
        </div>
         <p className="mt-10 text-xs font-medium tracking-widest text-slate-400">
          SHOPEASE · HAPPY SHOPPING
        </p>
      </div>
    </section>
  );
};

export default NotFound;
