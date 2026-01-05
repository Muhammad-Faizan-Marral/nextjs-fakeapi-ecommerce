"use client";

import React, { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CiShoppingCart } from "react-icons/ci";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiSearch, FiX } from "react-icons/fi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Image from "next/image";
import { logout } from "@/app/features/auth/authSlice";
import { useDebounce } from "@/app/utils/useDebounce";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Debounced search query - 1.5 seconds delay
  const debouncedSearchQuery = useDebounce(searchQuery, 1500);

  /* ---------------- AUTH STATE ---------------- */
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  /* ---------------- CART STATE ---------------- */
  const { activeUserId, cartsByUserId } = useSelector(
    (state: RootState) => state.cart,
  );

  const cartCount =
    activeUserId && cartsByUserId[activeUserId]
      ? cartsByUserId[activeUserId].length
      : 0;

  /* ---------------- AUTO SEARCH EFFECT ---------------- */
  useEffect(() => {
    // If debounced query is empty and we're on search page, go to dashboard
    if (debouncedSearchQuery.trim() === "" && pathname === "/search") {
      router.push("/dashboard");
      return;
    }

    // If debounced query has value, navigate to search page
    if (debouncedSearchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(debouncedSearchQuery.trim())}`);
    }
  }, [debouncedSearchQuery, router, pathname]);

  /* ---------------- UI RULES ---------------- */
  const hideSearchOn = ["/login", "/profile"];
  const showSearch = !hideSearchOn.some((route) => pathname.startsWith(route));

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (pathname === "/search") {
      router.push("/dashboard");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="bg-gray-700/70 p-1.5 sm:p-2 rounded-full">
              <HiOutlineShoppingBag className="text-white text-lg sm:text-xl" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Cybershop
            </h1>
          </Link>

          {/* Desktop Search */}
          {showSearch && (
            <div className="hidden md:flex flex-1 justify-center px-4 lg:px-7">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 pr-10 rounded-full bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 outline-none transition"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FiX className="text-lg" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart */}
            <Link href="/cart" className="shrink-0">
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-purple-500/40 hover:border-purple-500 transition">
                <CiShoppingCart className="text-xl sm:text-2xl text-purple-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center bg-purple-600 text-white rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Conditional Rendering: Auth Buttons OR Profile + Logout */}
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="shrink-0">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-0.5 cursor-pointer">
                    <Image
                      src={user?.avatar || "https://picsum.photos/100"}
                      alt="profile"
                      className="h-full w-full rounded-full object-cover bg-black"
                      width={100}
                      height={100}
                    />
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="hidden sm:block px-3 lg:px-4 py-2 text-sm rounded-full border border-gray-700 text-white hover:bg-gray-800 transition"
                >
                  Logout
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <HiX className="text-xl" />
                  ) : (
                    <HiOutlineMenuAlt3 className="text-xl" />
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="hidden sm:flex gap-2 lg:gap-3">
                  <Link
                    href="/login"
                    className="px-3 lg:px-4 py-2 text-sm rounded-full border border-gray-700 text-white hover:bg-gray-800 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/login"
                    className="px-3 lg:px-4 py-2 text-sm rounded-full bg-purple-700 text-white hover:bg-purple-600 transition shadow-lg shadow-purple-900/30"
                  >
                    Signup
                  </Link>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <HiX className="text-xl" />
                  ) : (
                    <HiOutlineMenuAlt3 className="text-xl" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-10 rounded-full bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 outline-none transition text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-800 bg-black/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-center rounded-full border border-gray-700 text-white hover:bg-gray-800 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full px-4 py-2.5 text-center rounded-full border border-gray-700 text-white hover:bg-gray-800 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="w-full px-4 py-2.5 text-center rounded-full bg-purple-700 text-white hover:bg-purple-600 transition shadow-lg shadow-purple-900/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;