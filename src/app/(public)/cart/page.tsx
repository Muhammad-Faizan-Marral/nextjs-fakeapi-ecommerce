"use client";
import CartHeader from "@/app/features/cart/components/CartHeader";
import CartItem from "@/app/features/cart/components/cartitem";
import OrderSummary from "@/app/features/cart/components/OrderSummary";
import React from "react";

const Page = () => {
  return (
    <div>
      <CartHeader/>
      <div className="flex justify-between gap-16 lg:gap-7 items-start min-h-screen flex-col lg:flex-row p-13 ">
        <CartItem/>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Page;
