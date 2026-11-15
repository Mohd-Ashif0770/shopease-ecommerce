import { CheckCircle2, MapPin, Tag, Truck } from "lucide-react";

const ProductTrustBar = ({ stock = 12 }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-100/80 bg-emerald-50/40 p-4 sm:p-5 shadow-xs">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-emerald-200/60">
        {/* Item 1: Stock */}
        <div className="flex items-start gap-3 lg:pr-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-2xs">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">In Stock</p>
            <p className="text-xs font-medium text-slate-500">
              Only {stock > 0 ? stock : 12} left – order soon!
            </p>
          </div>
        </div>

        {/* Item 2: Delivery */}
        <div className="flex items-start gap-3 lg:px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-2xs">
            <Truck size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Delivery</p>
            <p className="text-xs font-medium text-slate-500">
              Get it by <span className="font-semibold text-slate-800">Nov 16 – Nov 18</span>
            </p>
          </div>
        </div>

        {/* Item 3: Location */}
        <div className="flex items-start gap-3 lg:px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-2xs">
            <MapPin size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              Deliver to <span className="font-medium text-slate-700">Surat, Gujarat 395009</span>
            </p>
            <button
              type="button"
              className="text-xs font-semibold text-[#087443] hover:underline cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>

        {/* Item 4: Discount Promo */}
        <div className="flex items-start gap-3 lg:pl-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-2xs">
            <Tag size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Extra 10% off</p>
            <p className="text-xs font-medium text-slate-500">
              Use code: <span className="font-bold text-slate-900">EASE10</span> at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTrustBar;
