
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import furnitureBanner from "../../assets/categories/furniture-banner.png";
import electronicsBanner from "../../assets/categories/electronics-banner.png";

const promotionalBanners = [
  {
    id: 1,
    badge: "Smart Living",
    title: "Modern Furniture",
    highlight: "For a Better Home",
    description: "Stylish, comfortable and built for your lifestyle.",
    buttonText: "Shop Now",
    image: furnitureBanner,
    link: "/products?category=furniture",
    theme: "bg-[#EAF4EB]",
    badgeStyle: "bg-[#D5EBDD] text-green-800",
  },
  {
    id: 2,
    badge: "Up to 30% Off",
    title: "Latest Electronics",
    highlight: "Deals",
    description: "Top technology for work, entertainment and everyday life.",
    buttonText: "Shop Now",
    image: electronicsBanner,
    link: "/products?category=mobiles-and-laptops",
    theme: "bg-[#FFF0E3]",
    badgeStyle: "bg-[#FFE2D3] text-orange-600",
  },
];

const PromotionalBanners = () => {
  return (
    <section className="bg-slate-50 pt-8 sm:pt-10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {promotionalBanners.map((banner) => (
            <div
              key={banner.id}
              className={`group relative isolate min-h-[230px] overflow-hidden rounded-2xl ${banner.theme} sm:min-h-[250px]`}
            >
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Text Readability Overlay */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/25 via-transparent to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex min-h-[230px] w-[58%] flex-col items-start justify-center p-5 sm:min-h-[250px] sm:w-[55%] sm:p-7">

                {/* Badge */}
                <span
                  className={`mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${banner.badgeStyle}`}
                >
                  {banner.badge}
                </span>

                {/* Heading */}
                <h3 className="text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl">
                  {banner.title}
                  <br />
                  {banner.highlight}
                </h3>

                {/* Description */}
                <p className="mt-2 max-w-[280px] text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {banner.description}
                </p>

                {/* CTA */}
                <Link
                  to={banner.link}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-green-800 hover:shadow-md sm:px-6 sm:py-3 sm:text-sm"
                >
                  {banner.buttonText}
                  <ArrowRight size={16} />
                </Link>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
