import { Link } from "react-router-dom";
import { ShoppingBag, Mail } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/features/categorySlice";

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Blog", path: "/blogs" },
  { name: "FAQs", path: "/faqs" },
  { name: "Terms & Conditions", path: "/terms-and-conditions" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Help Center", path: "/help" },
];

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com" },
  { name: "Instagram", icon: FaInstagram, url: "https://instagram.com" },
  { name: "YouTube", icon: FaYoutube, url: "https://youtube.com" },
  { name: "X", icon: FaXTwitter, url: "https://x.com" },
  { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || email.trim() === "") {
      toast.error("Please enter a valid email address.");
      return;
    }
    // Connect your newsletter subscription API here.
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-6 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.5fr] lg:gap-12 lg:py-8">
          {/* Brand Information */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-800 text-white">
                <ShoppingBag size={18} />
              </span>
              <span className="font-heading text-xl font-extrabold tracking-tight text-slate-900">
                ShopEase
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              Your trusted online shopping destination for quality products,
              great prices and exceptional customer service.
            </p>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ name, icon: Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 hover:border-emerald-700 hover:bg-emerald-700 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">Quick Links</h3>

            <ul className="mt-3 space-y-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-500 transition-colors hover:text-emerald-700"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">Categories</h3>

            <ul className="mt-3 space-y-1">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="text-sm text-slate-500 transition-colors hover:text-emerald-700"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <Link
                to={`/products?categories`}
                className="text-sm text-slate-500 transition-colors hover:text-emerald-700"
              >
                All Categories
              </Link>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">Newsletter</h3>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              Subscribe to our newsletter and get 10% off your first order.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-4 flex flex-col gap-2 sm:flex-row"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-200 px-3 transition-colors focus-within:border-emerald-700">
                <Mail size={16} className="shrink-0 text-slate-400" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-11 w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                className="h-11 rounded-md cursor-pointer bg-emerald-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 border-t border-slate-200 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <span >ShopEase. </span> All
            rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-emerald-700"
            >
              Privacy Policy
            </Link>

            <span className="h-3 w-px bg-slate-300" />

            <Link
              to="/terms-and-conditions"
              className="transition-colors hover:text-emerald-700"
            >
              Terms & Conditions
            </Link>

            <span className="h-3 w-px bg-slate-300" />

            <Link
              to="/sitemap"
              className="transition-colors hover:text-emerald-700"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
