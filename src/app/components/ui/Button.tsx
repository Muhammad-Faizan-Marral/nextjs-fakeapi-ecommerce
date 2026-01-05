"use client";

import { MdOutlineArrowForward } from "react-icons/md";

type ButtonProps = {
  onLoadMore: () => void;
  disabled: boolean;
};

const Button = ({ onLoadMore, disabled }: ButtonProps) => {
  if (disabled) return null;

  return (
    <div>
      <div className={`flex items-center justify-center`}>
        <button
          onClick={() => onLoadMore()}
          className="
        flex 
        items-center 
        justify-center 
        gap-2 
        border border-gray-600
        hover:bg-gray-700 
        text-white 
        px-6 
        py-3 
        rounded-3xl 
        font-medium 
        transition-all 
        duration-300 
        shadow-lg 
        mt-11
        cursor-pointer

      "
        >
          Load More Products
          <MdOutlineArrowForward className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Button;
