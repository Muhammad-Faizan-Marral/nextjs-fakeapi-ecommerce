"use client";

import { decrementQuantity, deleteProduct, incrementQuantity } from "@/app/features/cart/slice";
import { RootState } from "@/app/lib/redux/store";
import { MdDelete, MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const CartItem = () => {
  const dispatch = useDispatch();

  const { activeUserId, cartsByUserId } = useSelector((state: RootState) => state.cart);

  const cartProducts = activeUserId && cartsByUserId[activeUserId] ? cartsByUserId[activeUserId] : [];

  if (!cartProducts.length) {
    return <div className="text-center text-gray-400 mt-10">Your cart is empty</div>;
  }

  return (
    <div className="w-full">
      {cartProducts.map((item) => (
        <div
          key={item.id}
          className="group mt-3 bg-[#121212] border border-gray-800 hover:border-purple-500
          rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center
          gap-4 transition-all duration-300"
        >
          {/* Product Image */}
          <div className="relative shrink-0 overflow-hidden rounded-xl w-24 h-24 bg-[#1d1c1c]">
            <img
              alt={item.title}
              src={item.images?.[0]}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-1 w-full">
            <div className="flex justify-between items-start">
              <h3 className="text-white font-semibold text-lg truncate">{item.title}</h3>

              <div className="flex gap-1">
                <Link href={`/productdetailsection/${item.id}`}>
                  <button
                    aria-label="View product"
                    className="text-gray-500 hover:text-green-500 transition-colors p-1"
                  >
                    <MdOutlineRemoveRedEye size={20} />
                  </button>
                </Link>

                <button
                  aria-label="Remove item"
                  className="text-gray-500 hover:text-red-500 transition-colors p-1"
                  onClick={() => dispatch(deleteProduct(item.id))}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>

            {/* Price & Quantity */}
            <div className="flex items-center justify-between mt-2">
              <p className="text-purple-400 font-bold text-lg">${item.price}</p>

              <div className="flex items-center rounded-lg border border-gray-800">
                <button
                  onClick={() => dispatch(decrementQuantity(item.id))}
                  className="px-3 py-1 hover:text-white text-gray-400"
                >
                  -
                </button>

                <span className="text-sm font-medium text-white px-2">{item.quantity}</span>

                <button
                  onClick={() => dispatch(incrementQuantity(item.id))}
                  className="px-3 py-1 hover:text-white text-gray-400"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
