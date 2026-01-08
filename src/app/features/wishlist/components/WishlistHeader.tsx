"use client";
import React, { useState, useMemo } from "react";
import { ChevronDown, Check } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { RootState } from "@/app/lib/redux/store";
import { useSelector } from "react-redux";

interface WishlistHeaderProps {
  onPriceFilterChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
}

const WishlistHeader: React.FC<WishlistHeaderProps> = ({ 
  onPriceFilterChange, 
  onSortChange 
}) => {
  const activeUserId = useSelector((state: RootState) => state.cart.activeUserId);
  const likedByUserId = useSelector((state: RootState) => state.wishlist.likedByUserId);

  const wishlistIds = useMemo<number[]>(() => {
    if (!activeUserId) return [];
    return likedByUserId?.[activeUserId] ?? [];
  }, [activeUserId, likedByUserId]);


  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-gray-700 pb-10 mt-5">
    
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
    </div>
  );
};

export default WishlistHeader;