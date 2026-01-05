"use client";
import CategorieHeader from "@/app/features/categories/components/CategorieHeader";
import ProductList from "@/app/features/products/components/ProductList";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export type FilteredPrice = {
  minPrice: number;
  maxPrice: number | null;
};

const Page = () => {
  const { categorie } = useParams<{ categorie: string }>();
  const [priceFilter, setPriceFilter] = useState<FilteredPrice>({
    minPrice: 0,
    maxPrice: null,
  });
  return (
    <div>
      <CategorieHeader onSetData={setPriceFilter} />
      <div className="flex justify-between gap-16 lg:gap-7 items-start min-h-screen flex-col lg:flex-row p-13">
        <ProductList categorySlug={categorie} priceFilter={priceFilter} />
      </div>
    </div>
  );
};

export default Page;
