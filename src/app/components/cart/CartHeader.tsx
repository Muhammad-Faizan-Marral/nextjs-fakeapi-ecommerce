"use client";

import { RootState } from "@/app/store";
import React from "react";
import { FaTruck } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartHeader = () => {
  const { activeUserId, cartsByUserId } = useSelector((state: RootState) => state.cart);

  const cartCount = activeUserId && cartsByUserId[activeUserId] ? cartsByUserId[activeUserId].length : 0;

  return (
    <div className="p-13">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white tracking-tight">
          Your Cart <span className="text-gray-500 font-medium text-lg ml-2">({cartCount})</span>
        </h2>

        <p className="text-[15px] tracking-wide font-medium flex items-center gap-2 text-blue-700">
          <FaTruck className="text-sm" />
          Free shipping unlocked!
        </p>
      </div>
    </div>
  );
};

export default CartHeader;
