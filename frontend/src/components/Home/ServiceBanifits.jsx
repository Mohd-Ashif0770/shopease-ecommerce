import { motion } from "motion/react";
import { Truck, ShieldCheck, PackageCheck, Headset } from "lucide-react";
import { staggerContainer, staggerItem } from "../../utils/motion";

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
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-2 gap-4 rounded-2xl bg-white/80 p-5 shadow-sm border border-slate-200/80 backdrop-blur-sm sm:px-8 md:grid-cols-4 md:gap-6 lg:px-10"
    >
      {benefits.map((benefit) => {
        const Icon = benefit.icon;

        return (
          <motion.div
            key={benefit.title}
            variants={staggerItem}
            whileHover={{ y: -2 }}
            className="flex items-center justify-center gap-3.5 rounded-xl p-2 transition-colors duration-200 hover:bg-slate-50/80"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#087443] shadow-xs">
              <Icon size={22} strokeWidth={1.8} />
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
                {benefit.title}
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ServiceBanifits;
