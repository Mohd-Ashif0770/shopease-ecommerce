import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ShoppingBag, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/features/categorySlice";

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
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="border-t border-slate-200/90 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.5fr] lg:gap-12 lg:py-14">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <motion.span
                whileHover={{ rotate: -5, scale: 1.05 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087443] text-white shadow-xs"
              >
                <ShoppingBag size={20} />
              </motion.span>
              <span className="font-heading text-2xl font-extrabold tracking-tight text-slate-950">
                Shop<span className="text-[#087443]">Ease</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500 sm:text-base">
              Your trusted online shopping destination for premium quality products,
              unbeatable deals, and fast global shipping.
            </p>

            {/* Social Links with Motion */}
            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map(({ name, icon: Icon, url }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-[#087443] hover:bg-[#087443] hover:text-white"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-[#087443]"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">
              Categories
            </h3>

            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-[#087443]"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/categories"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#087443] hover:underline"
                >
                  All Categories
                  <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">
              Stay Connected
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              Subscribe to our newsletter and get <span className="font-bold text-emerald-800">10% off</span> your first order plus exclusive member deals.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-5 flex flex-col gap-2.5 sm:flex-row"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 transition-colors focus-within:border-[#087443] focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-700/10">
                <Mail size={18} className="shrink-0 text-slate-400" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-11 w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="h-11 cursor-pointer rounded-xl bg-[#087443] px-6 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-800 sm:text-sm"
              >
                Subscribe
              </motion.button>
            </form>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={16} className="text-emerald-700" />
              <span>100% Secure & Spam-Free Guarantee</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t border-slate-200/90 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-slate-900">ShopEase.</span> All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-[#087443]"
            >
              Privacy Policy
            </Link>

            <span className="h-3 w-px bg-slate-300" />

            <Link
              to="/terms-and-conditions"
              className="transition-colors hover:text-[#087443]"
            >
              Terms & Conditions
            </Link>

            <span className="h-3 w-px bg-slate-300" />

            <Link
              to="/sitemap"
              className="transition-colors hover:text-[#087443]"
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
