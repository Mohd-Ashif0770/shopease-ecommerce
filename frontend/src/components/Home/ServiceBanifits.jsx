import { Truck, ShieldCheck, PackageCheck, Headset } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: PackageCheck,
    title: "30-Day Returns",
    description: "Hassle-free returns",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "We're here to help",
  },
];

const ServiceBanifits = () => {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-lg overflow-hidden bg-gray-50 border-b border-slate-200 px-6 py-6 sm:px-8 md:grid-cols-4 md:gap-6 lg:px-10">
      {benefits.map((benefit) => {
        const Icon = benefit.icon;

        return (
          <div
            key={benefit.title}
            className="flex items-center justify-center gap-3"
          >
            <Icon
              size={27}
              strokeWidth={1.7}
              className="shrink-0 text-[#087443]"
            />

            <div>
              <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
                {benefit.title}
              </h3>
              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                {benefit.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceBanifits;
