"use client";
import React, { useState } from "react";
import ProductList from "./ProductList";
import { useGetCategories } from "@/app/features/categories/hook";
import { useFilterProduct } from "@/app/features/filterProduct/hook";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CategorieSelection = () => {
  const router = useRouter();

  const [active, setActive] = useState("All");
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetCategories();

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Error loading product</div>
      </div>
    );
  }

  const fillterCategorie = ["furniture", "shoes", "groceries", "computer-category", "electronics", "clothes"];

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white p-6 mt-16">
      <div className="flex items-start md:items-center justify-between flex-col gap-3.5 sm:flex-row  mb-8 overflow-auto">
        <h2 className="text-2xl font-bold tracking-tighter">Trending Now</h2>

        <div className="flex items-center gap-3">
          {/* ALL BUTTON */}
          <button
            onClick={() => setActive("All")}
            className={`
              px-5 py-2.5 rounded-3xl text-sm font-medium border 
              transition-all duration-300
              ${
                active === "All"
                  ? "bg-purple-700 border-purple-600 text-white"
                  : "bg-[#121212] border-[#1f1f1f] text-gray-300 hover:bg-[#1A1A1A]"
              }
            `}
          >
            All
          </button>

          {categories
            ?.filter((item) => fillterCategorie.includes(item.slug))
            .map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  (setActive(item.slug), router.push(`/categorie/${item.slug}`));
                }}
                className={`
        px-5 py-2.5 rounded-3xl text-sm font-medium border 
        transition-all duration-300
        ${
          active === item.slug
            ? "bg-purple-700 border-purple-600 text-white"
            : "bg-[#121212] border-[#1f1f1f] text-gray-300 hover:bg-[#1A1A1A]"
        }
      `}
              >
                {item.name}
              </button>
            ))}
        </div>
      </div>

      {/* Rest of products */}

      <ProductList showButton={true} categorySlug={active === "All" ? undefined : active} />
    </div>
  );
};

export default CategorieSelection;
