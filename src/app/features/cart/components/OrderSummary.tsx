"use client";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { BsFillCreditCardFill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";
import { useEffect, useState } from "react";
import { CartItem } from "@/app/features/cart/slice";

const OrderSummary = () => {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(6);
  const [total, setTotal] = useState<number>();
  const { activeUserId, cartsByUserId } = useSelector((state: RootState) => state.cart);

  const cartCount = activeUserId && cartsByUserId[activeUserId] ? cartsByUserId[activeUserId] : 0;

  useEffect(() => {
    let total = 0;
    cartCount.forEach((item: CartItem) => {
      total += item.price * item.quantity;
    });
    setSubTotal(total);
    setTotal(tax + total);
  }, [cartCount]);

  return (
    <div className="sticky top-12 w-full -mt-12  ">
      <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl  p-6 shadow-2xl shadow-black/50 w-full lg:max-w-sm mx-auto">
        <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

        <div className="space-y-4 border-b border-gray-800 pb-6">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span className="text-white font-medium">${subTotal}</span>
          </div>

          <div className="flex justify-between text-gray-400">
            <span>Shipping estimate</span>
            <span className="text-[#6ee7b7] font-medium">Free</span>
          </div>

          <div className="flex justify-between text-gray-400">
            <span>Tax estimate</span>
            <span className="text-white font-medium">${tax}</span>
          </div>
        </div>

        <div className="py-6 flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Order Total</span>
          <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#4f46e5] to-[#6ee7b7]">
            ${total}
          </span>
        </div>

        <div className="mb-6">
          <label htmlFor="promo" className="sr-only">
            Promo Code
          </label>

          <div className="flex gap-2"></div>
        </div>

        <button
          className="group w-full relative overflow-hidden rounded-xl 
           bg-linear-to-r from-[#4f46e5] to-[#6ee7b7] p-px
           focus:outline-none focus:ring-2 focus:ring-offset-2 
           focus:ring-offset-[#0a0a0a] focus:ring-[#4f46e5]
           transition-all duration-300"
        >
          <div
            className="relative bg-linear-to-r from-[#4f46e5] to-[#6ee7b7] 
             px-6 py-4 rounded-xl flex items-center justify-center 
             gap-2 transition-all group-hover:bg-opacity-90"
          >
            <span className="text-white font-bold text-lg tracking-wide">Proceed to Checkout</span>
            <span className="material-symbols-outlined text-white transition-transform group-hover:translate-x-1">
              <FaArrowRightLong />
            </span>
          </div>
        </button>

        <div className="mt-6 flex justify-center gap-4 text-gray-500">
          <span className="material-symbols-outlined text-3xl" title="Secure Payment">
            <FaLock />
          </span>
          <span className="material-symbols-outlined text-3xl" title="Credit Card">
            <BsFillCreditCardFill />
          </span>
          <span className="material-symbols-outlined text-3xl" title="Verified">
            <MdVerifiedUser />
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
