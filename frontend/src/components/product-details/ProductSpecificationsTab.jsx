import { Headphones, Cable, Volume2, Briefcase } from "lucide-react";

const DEFAULT_SPECS = [
  { label: "Brand", value: "Sony" },
  { label: "Model", value: "WH-1000XM5" },
  { label: "Type", value: "Over-Ear, Wireless" },
  { label: "Noise Cancellation", value: "Yes (Active)" },
  { label: "Battery Life", value: "Up to 30 hours" },
  { label: "Charging Time", value: "~3.5 hours" },
  { label: "Connectivity", value: "Bluetooth 5.2, USB-C" },
  { label: "Weight", value: "250 g" },
  { label: "Warranty", value: "1 Year" },
];

const IN_THE_BOX_ITEMS = [
  {
    name: "Headphones",
    subtext: "(WH-1000XM5)",
    icon: Headphones,
  },
  {
    name: "USB-C",
    subtext: "Charging Cable",
    icon: Cable,
  },
  {
    name: "3.5 mm",
    subtext: "Audio Cable",
    icon: Volume2,
  },
  {
    name: "Carrying Case",
    subtext: "",
    icon: Briefcase,
  },
];

const ProductSpecificationsTab = ({ specs = DEFAULT_SPECS }) => {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* Key Specifications Table */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-slate-900 sm:text-xl">
          Key Specifications
        </h3>

        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white">
          <div className="divide-y divide-slate-100 text-sm">
            {specs.map((item, index) => (
              <div
                key={item.label}
                className={`flex justify-between px-4 py-3 sm:px-5 ${
                  index % 2 === 0 ? "bg-slate-50/50" : "bg-white"
                }`}
              >
                <span className="font-medium text-slate-500">{item.label}</span>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What's in the Box */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-slate-900 sm:text-xl">
          What's in the Box
        </h3>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {IN_THE_BOX_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-5 text-center transition-all duration-200 hover:border-emerald-300 hover:shadow-xs"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-2xs">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <p className="text-xs font-bold text-slate-900 sm:text-sm">
                  {item.name}
                </p>
                {item.subtext && (
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    {item.subtext}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductSpecificationsTab;
