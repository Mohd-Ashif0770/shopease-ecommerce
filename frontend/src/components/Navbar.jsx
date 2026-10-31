
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
} from "lucide-react";

const Navbar = ({
  cartCount = 1,
  wishlistCount = 2,
  user = null,
}) => {
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Deals", path: "/deals" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between  gap-5 px-6 sm:px-8 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          onClick={closeMobileMenu}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087443] text-white shadow-sm">
            <ShoppingBag size={22} strokeWidth={2} />
          </div>

            <span className="text-2xl font-extrabold tracking-tight text-slate-950">
                Shop<span className="text-[#087443]">Ease</span>
            </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative px-1 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "text-[#087443] after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-[#087443]"
                    : "text-slate-700 hover:text-[#087443]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden min-w-[190px] max-w-[340px] flex-1 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/90 px-3 py-2 transition focus-within:border-[#087443]/30 focus-within:bg-white lg:flex"
        >
          <Search size={20} className="shrink-0 text-slate-500" />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />

          {/* focus on search bar by clicking it */}
          <kbd className="hidden whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-500 xl:block">
            Ctrl + K
          </kbd>
        </form>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="relative text-slate-800 transition hover:text-[#087443]"
          >
            <Heart size={25} strokeWidth={1.8} />

            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#087443] px-1 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className="relative text-slate-900 transition hover:text-[#087443]"
          >
            <ShoppingCart size={25} strokeWidth={1.8} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#087443] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Divider */}
          <div className="hidden h-10 w-px bg-slate-200 sm:block" />

          {/* Profile Dropdown */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-expanded={profileOpen}
              aria-label="Open account menu"
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#087443] text-lg font-semibold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </span>

              <ChevronDown
                size={19}
                className={`text-slate-700 transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-xl border border-slate-100 bg-white py-2 shadow-xl">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {user?.name || "Welcome"}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {user?.email || "Manage your account"}
                  </p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#087443]"
                >
                  <UserRound size={17} />
                  My Profile
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#087443]"
                >
                  <Package size={17} />
                  My Orders
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="rounded-lg p-2 text-slate-800 hover:bg-slate-100 xl:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 xl:hidden">
          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
          >
            <Search size={19} className="text-slate-500" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </form>

          {/* Mobile Links */}
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-semibold ${
                    isActive
                      ? "bg-green-50 text-[#087443]"
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
              className="mt-2 flex items-center gap-3 border-t border-slate-100 px-3 py-4 text-sm font-semibold text-slate-700"
            >
              <UserRound size={19} />
              My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
