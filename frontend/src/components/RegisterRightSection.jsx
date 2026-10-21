import interiorImage from "../assets/login-interior.png";
import { Truck, ShieldCheck, PackageCheck } from "lucide-react";

const RegisterRightSection = () => {
  return (
    <aside className="relative hidden h-screen overflow-hidden lg:block">
      <img
        src={interiorImage}
        alt="Warm minimalist living room with an olive armchair and indoor plants"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#f4f0e8]/35 via-[#f4f0e8]/10 to-transparent" />

      <div className="absolute left-[8%] top-[12%] z-10 max-w-[390px] xl:left-[10%] xl:top-[13%]">
        <div className="mb-3 h-[2px] w-8 bg-emerald-800" />

        <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-slate-950 xl:text-[32px]">
          Join ShopEase
          <span className="block text-emerald-800">Today</span>
        </h2>

        <p className="mt-2 max-w-[300px] text-sm leading-5 text-slate-600 xl:text-base">
          Get exclusive deals, faster checkout and a better shopping experience.
        </p>

        {/* Benefits */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800/10 text-emerald-800">
              <Truck size={21} strokeWidth={1.7} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-900 xl:text-sm">
                Free Shipping
              </p>
              <p className="mt-0.5 text-xs text-slate-600">
                On orders over $50
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800/10 text-emerald-800">
              <ShieldCheck size={21} strokeWidth={1.7} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-900 xl:text-sm">
                Secure Payment
              </p>
              <p className="mt-0.5 text-xs text-slate-600">
                100% secure checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800/10 text-emerald-800">
              <PackageCheck size={21} strokeWidth={1.7} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-900 xl:text-sm">
                30-Day Returns
              </p>
              <p className="mt-0.5 text-xs text-slate-600">
                Hassle-free returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RegisterRightSection;
