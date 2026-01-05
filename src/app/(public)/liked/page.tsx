"use client";
import React from "react";

import ProductsList from "@/app/features/products/components/ProductList";
import WishlistHeader from "@/app/features/wishlist/components/WishlistHeader";

const Page = () => {
  return (
    <div>
      <WishlistHeader />
      <ProductsList onlyWishlist />
    </div>
  );
};

export default Page;
