"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchProducts } from "@/app/features/products/useGetAllProducts";
import ProductList from "@/app/components/Products/ProductList";
import { FiSearch } from "react-icons/fi";

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: products, isLoading, error } = useSearchProducts(query);

  /* ---------------- LOADING STATE ---------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            Searching for `&{query}`...
          </h1>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              <p className="text-gray-400">Searching products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
            <p className="text-red-500 text-xl">Error searching products</p>
            <p className="text-gray-400">Please try again</p>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            Search Results for `&{query}`
          </h1>
          <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
            <FiSearch className="text-gray-600 text-6xl" />
            <p className="text-gray-400 text-xl">No products found</p>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- RESULTS ---------------- */
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Search Results for `&{query}`
          </h1>
          <p className="text-gray-400">
            Found {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Display search results */}
        <ProductList searchResults={products} />
      </div>
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;