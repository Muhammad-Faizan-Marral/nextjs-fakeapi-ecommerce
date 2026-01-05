"use client";
import React from "react";
import WishlistHeader from "../components/liked/WishlistHeader";
import ProductsList from "../components/Products/ProductList";

const Page = () => {
  return (
    <div>
      <WishlistHeader />
      <ProductsList onlyWishlist />
    </div>
  );
};

export default Page;
