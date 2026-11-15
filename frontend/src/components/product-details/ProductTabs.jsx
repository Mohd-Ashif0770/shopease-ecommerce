import { motion } from "motion/react";

const TABS = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Specifications" },
  { id: "reviews", label: "Reviews (630)" },
  { id: "qa", label: "Q&A (24)" },
];

const ProductTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-slate-200">
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar sm:gap-8">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative py-3.5 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-[#087443]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}

              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#087443] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTabs;
