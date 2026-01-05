"use client";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

// Product type
interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
}

const ProfileLiked = () => {
  /* ---------------- REDUX ---------------- */
  const activeUserId = useSelector((state: RootState) => state.cart.activeUserId);
  const likedByUserId = useSelector((state: RootState) => state.wishlist.likedByUserId);

  /* ---------------- WISHLIST IDS ---------------- */
  const wishlistIds = useMemo<number[]>(() => {
    if (!activeUserId) return [];
    return likedByUserId?.[activeUserId] ?? [];
  }, [activeUserId, likedByUserId]);

  /* ---------------- FETCH PRODUCTS ---------------- */
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  /* ---------------- FILTER LIKED PRODUCTS ---------------- */
  const likedProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  /* ---------------- EMPTY STATE ---------------- */
  if (!likedProducts.length) {
    return (
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-2">Liked</h3>
        <p className="text-sm text-gray-500">
          You have no liked products yet.
        </p>
      </div>
    );
  }

  /* ---------------- DISPLAY LIKED PRODUCTS ---------------- */
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Liked</h3>
        <Link
          href="/liked"
          className="text-sm text-blue-500 hover:text-purple-400 transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="flex -space-x-3 overflow-hidden">
        {likedProducts.slice(0, 3).map((product, index) => (
          <Image
            key={product.id}
            src={product.images?.[0] || "https://via.placeholder.com/48"}
            alt={product.title || "Product"}
            width={48}
            height={48}
            className="inline-block h-12 w-12 rounded-full ring-2 ring-[#0a0a0a] object-cover hover:scale-110 transition-transform cursor-pointer"
            style={{ zIndex: 10 - index }}
          />
        ))}

        {likedProducts.length > 3 && (
          <div className="h-12 w-12 rounded-full ring-2 ring-[#0a0a0a] bg-gray-800 flex items-center justify-center text-xs text-white font-medium">
            +{likedProducts.length - 3}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        {likedProducts.length} {likedProducts.length === 1 ? "item" : "items"} in your wishlist.
      </p>
    </div>
  );
};

export default ProfileLiked;