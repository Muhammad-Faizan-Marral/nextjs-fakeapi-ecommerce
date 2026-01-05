"use client";
import React from "react";
import CartHeader from "../components/cart/CartHeader";
import CartItem from "../components/cart/cartitem";
import OrderSummary from "../components/cart/OrderSummary";

const Page = () => {
  return (
    <div>
      <CartHeader />
      <div className="flex justify-between gap-16 lg:gap-7 items-start min-h-screen flex-col lg:flex-row p-13 ">
        <CartItem />
        <OrderSummary />
      </div>
    </div>
  );
};

export default Page;
