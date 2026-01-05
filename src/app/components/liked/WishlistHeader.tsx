"use client";
import React, { useState, useMemo } from "react";
import { ChevronDown, Check } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

interface WishlistHeaderProps {
  onPriceFilterChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
}

const WishlistHeader: React.FC<WishlistHeaderProps> = ({ 
  onPriceFilterChange, 
  onSortChange 
}) => {
  /* ---------------- REDUX ---------------- */
  const activeUserId = useSelector((state: RootState) => state.cart.activeUserId);
  const likedByUserId = useSelector((state: RootState) => state.wishlist.likedByUserId);

  /* ---------------- SAFE WISHLIST IDS ---------------- */
  const wishlistIds = useMemo<number[]>(() => {
    if (!activeUserId) return [];
    return likedByUserId?.[activeUserId] ?? [];
  }, [activeUserId, likedByUserId]);

  /* ---------------- DROPDOWN STATES ---------------- */
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  /* ---------------- SELECTED VALUES ---------------- */
  const [priceValue, setPriceValue] = useState("Price: Low to High");
  const [sortValue, setSortValue] = useState("Sorted by: Date Added");

  /* ---------------- PRICE OPTIONS ---------------- */
  const priceOptions = ["Price: Low to High", "Price: High to Low"];

  /* ---------------- SORT OPTIONS ---------------- */
  const sortOptions = [
    "Sorted by: Date Added",
    "Sorted by: A–Z",
    "Sorted by: Recently Viewed"
  ];

  /* ---------------- HANDLE PRICE CHANGE ---------------- */
  const handlePriceChange = (value: string) => {
    setPriceValue(value);
    setPriceOpen(false);
    onPriceFilterChange?.(value);
  };

  /* ---------------- HANDLE SORT CHANGE ---------------- */
  const handleSortChange = (value: string) => {
    setSortValue(value);
    setSortOpen(false);
    onSortChange?.(value);
  };

  /* ---------------- CLOSE DROPDOWNS ON OUTSIDE CLICK ---------------- */
  React.useEffect(() => {
    const handleClickOutside = () => {
      setPriceOpen(false);
      setSortOpen(false);
    };

    if (priceOpen || sortOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [priceOpen, sortOpen]);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-gray-700 pb-10 mt-5">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-3 px-4 md:px-12">
        <h2 className="text-3xl md:text-5xl tracking-tight font-mono text-white font-medium">
          Your Wishlist
        </h2>

        <div className="flex items-center gap-2">
          <div className="text-gray-400 font-medium flex items-center gap-2">
            <span className="text-purple-600">
              <FaHeart />
            </span>
            <span>
              {wishlistIds.length} {wishlistIds.length === 1 ? "item" : "items"} saved
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE → DROPDOWNS */}
      <div className="flex flex-wrap gap-4 px-4 md:px-12">
        {/* PRICE DROPDOWN */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPriceOpen(!priceOpen);
              setSortOpen(false);
            }}
            className="h-11 px-5 rounded-xl bg-gray-900 border border-gray-700 
                       text-white text-sm font-medium flex items-center gap-2
                       hover:border-purple-500/50 transition-all"
          >
            {priceValue}
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${priceOpen ? "rotate-180" : ""}`} />
          </button>

          {priceOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 
                         rounded-xl py-2 shadow-xl z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {priceOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => handlePriceChange(item)}
                  className="w-full text-left px-4 py-2 text-sm text-white 
                             hover:bg-white/10 flex items-center gap-2 transition-colors"
                >
                  {priceValue === item && <Check className="w-4 h-4 text-purple-600" />}
                  <span className={priceValue === item ? "text-purple-400" : ""}>{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SORT DROPDOWN */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSortOpen(!sortOpen);
              setPriceOpen(false);
            }}
            className="h-11 px-5 rounded-xl bg-gray-900 border border-gray-700 
                       text-white text-sm font-medium flex items-center gap-2
                       hover:border-purple-500/50 transition-all"
          >
            {sortValue}
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
          </button>

          {sortOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 
                         rounded-xl py-2 shadow-xl z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {sortOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSortChange(item)}
                  className="w-full text-left px-4 py-2 text-sm text-white 
                             hover:bg-white/10 flex items-center gap-2 transition-colors"
                >
                  {sortValue === item && <Check className="w-4 h-4 text-purple-600" />}
                  <span className={sortValue === item ? "text-purple-400" : ""}>{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistHeader;