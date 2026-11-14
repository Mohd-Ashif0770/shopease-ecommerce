import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  UserRound,
  Package,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "Deals", path: "/deals" },
  { name: "Blog", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

const Navbar = ({
  cartCount = 1,
  wishlistCount = 2,
  user = null,
}) => {
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle header scroll shadow/elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearch("");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-b border-slate-100 bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-6 sm:px-8 lg:px-10">
        {/* Logo with Motion */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={closeMobileMenu}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087443] text-white shadow-md shadow-emerald-700/20"
          >
            <ShoppingBag size={22} strokeWidth={2.2} />
          </motion.div>

          <span className="font-heading text-2xl font-extrabold tracking-tight text-slate-950">
            Shop<span className="text-[#087443]">Ease</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 xl:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative px-1 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-[#087443]"
                    : "text-slate-600 hover:text-[#087443]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 h-[2.5px] w-full rounded-full bg-[#087443]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden min-w-[200px] max-w-[360px] flex-1 items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-3.5 py-2 transition-all duration-200 focus-within:border-[#087443] focus-within:bg-white focus-within:ring-3 focus-within:ring-emerald-700/10 lg:flex"
        >
          <Search size={18} className="shrink-0 text-slate-400" />

          <input
            ref={searchInputRef}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, categories..."
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 [&::-webkit-search-cancel-button]:cursor-pointer"
          />

          <kbd className="hidden whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-400 shadow-2xs xl:block">
            Ctrl K
          </kbd>
        </form>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {/* Wishlist */}
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <Heart size={22} strokeWidth={1.8} />

              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-0 top-0 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-2xs"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>
          </motion.div>

          {/* Cart */}
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
            <Link
              to="/cart"
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-emerald-50 hover:text-[#087443]"
            >
              <ShoppingCart size={22} strokeWidth={1.8} />

              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-0 top-0 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#087443] px-1 text-[10px] font-bold text-white shadow-2xs"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </motion.div>

          {/* Divider */}
          <div className="hidden h-7 w-px bg-slate-200 sm:block" />

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative hidden sm:block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-expanded={profileOpen}
              aria-label="Open account menu"
              className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200/80 p-1 pr-2.5 transition-colors hover:border-emerald-300 hover:bg-slate-50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#087443] text-sm font-bold text-white shadow-2xs">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </span>

              <ChevronDown
                size={16}
                className={`text-slate-600 transition-transform duration-200 ${
                  profileOpen ? "rotate-180 text-[#087443]" : ""
                }`}
              />
            </motion.button>

            {/* Profile Menu Animation */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-xl shadow-slate-200/50"
                >
                  <div className="border-b border-slate-100 px-3.5 py-3">
                    <p className="text-sm font-bold text-slate-900">
                      {user?.name || "Account Overview"}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {user?.email || "Manage orders & profile"}
                    </p>
                  </div>

                  <div className="mt-1 space-y-0.5">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-[#087443]"
                    >
                      <UserRound size={17} />
                      My Profile
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-[#087443]"
                    >
                      <Package size={17} />
                      My Orders
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-800 hover:bg-slate-100 xl:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-100 bg-white/98 px-6 py-5 backdrop-blur-md xl:hidden"
          >
            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5"
            >
              <Search size={18} className="text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 [&::-webkit-search-cancel-button]:cursor-pointer"
              />
            </form>

            {/* Mobile Links */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-[#087443]"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="mt-2 flex items-center gap-3 border-t border-slate-100 px-4 pt-4 text-sm font-semibold text-slate-700"
              >
                <UserRound size={18} className="text-[#087443]" />
                My Account
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
