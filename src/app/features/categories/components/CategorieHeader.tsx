"use client";
import { ChevronDown, Check, DollarSign } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Props = {
  onSetData: (data: FilterPrice) => void;
  category?: string;
};
type FilterPrice = {
  minPrice: number;
  maxPrice: number | undefined;
};

const categoryContent: Record<string, { title: string; description: string }> = {
  furniture: {
    title: "Premium Furniture",
    description:
      "Discover elegant and comfortable furniture pieces to transform your living spaces with style and sophistication.",
  },
  shoes: {
    title: "Footwear Collection",
    description:
      "Step into comfort and style with our curated selection of premium shoes for every occasion and activity.",
  },
  grosery: {
    title: "Fresh Groceries",
    description: "Shop fresh, high-quality groceries and daily essentials delivered straight to your doorstep.",
  },
  "computer-category": {
    title: "Computing Essentials",
    description: "Explore cutting-edge computers, laptops, and accessories for work, gaming, and creative projects.",
  },
  electronics: {
    title: "Electronic Devices",
    description:
      "Browse the latest electronic gadgets and devices featuring innovative technology and premium quality.",
  },
  clothes: {
    title: "Fashion & Apparel",
    description:
      "Elevate your wardrobe with our trendy and comfortable clothing collection for every season and style.",
  },
};

const CategorieHeader = ({ onSetData, category = "electronics" }: Props) => {
  const { categorie } = useParams<{ categorie: string }>();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [appliedMinPrice, setAppliedMinPrice] = useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const content = categoryContent[categorie] || categoryContent.electronics;

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setMinPrice("");
      return;
    }

    const numValue = Number(value);

    if (numValue >= 1 && Number.isInteger(numValue)) {
      setMinPrice(value);
    } else if (numValue > 0 && numValue < 1) {
      setMinPrice("1");
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setMaxPrice("");
      return;
    }

    const numValue = Number(value);

    if (numValue >= 1 && Number.isInteger(numValue)) {
      setMaxPrice(value);
    } else if (numValue > 0 && numValue < 1) {
      setMaxPrice("1");
    }
  };

  const handleApplyFilter = () => {
    setIsApplying(true);

    setTimeout(() => {
      const filterData: FilterPrice = {
        minPrice: minPrice === "" ? 1 : Number(minPrice),
        maxPrice: maxPrice === "" ? undefined : Number(maxPrice),
      };

      setAppliedMinPrice(minPrice);
      setAppliedMaxPrice(maxPrice);

      onSetData(filterData);

      setIsApplying(false);
    }, 300);
  };

  const handleResetFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setAppliedMinPrice("");
    setAppliedMaxPrice("");

    onSetData({
      minPrice: 1,
      maxPrice: undefined,
    });
  };

  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 mt-[9vh] md:mt-2.5">
      <div className="mb-6">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">{content.title}</h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl">{content.description}</p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-end">
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <label className="text-gray-400 text-sm font-medium flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            Price Range
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min (1+)"
              value={minPrice}
              onChange={handleMinPriceChange}
              min="1"
              step="1"
              className="h-11 w-full sm:w-28 px-3 rounded-xl bg-surface-dark border border-surface-border 
                         text-white text-sm placeholder:text-gray-500
                         focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 
                         transition-all"
            />
            <span className="text-gray-500 text-sm">to</span>
            <input
              type="number"
              placeholder="Max (1+)"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              min="1"
              step="1"
              className="h-11 w-full sm:w-28 px-3 rounded-xl bg-surface-dark border border-surface-border 
                         text-white text-sm placeholder:text-gray-500
                         focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 
                         transition-all"
            />
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleApplyFilter}
            disabled={isApplying}
            className={`h-11 px-6 rounded-xl bg-primary border-2 border-primary text-white text-sm font-medium
                       hover:bg-primary/90 hover:border-primary/90 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 flex-1 sm:flex-none
                       ${isApplying ? "scale-95" : ""}`}
          >
            {isApplying ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Applying...
              </span>
            ) : (
              "Apply Filter"
            )}
          </button>

          <button
            onClick={handleResetFilter}
            className="h-11 px-6 rounded-xl bg-surface-dark border-2 border-surface-border 
                       text-gray-400 text-sm font-medium hover:text-white hover:border-primary/50 
                       hover:bg-white/5 active:scale-95
                       transition-all duration-200 flex-1 sm:flex-none"
          >
            Reset
          </button>
        </div>
      </div>

      {(appliedMinPrice !== "" || appliedMaxPrice !== "") && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 text-sm animate-in fade-in slide-in-from-top-1 duration-300">
          <span className="text-gray-400 font-medium">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {appliedMinPrice !== "" && (
              <span
                className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary border-2 border-primary/30
                             font-medium inline-flex items-center gap-1.5 animate-in zoom-in duration-200"
              >
                <DollarSign className="w-3.5 h-3.5" />
                Min: ${appliedMinPrice}
              </span>
            )}
            {appliedMaxPrice !== "" && (
              <span
                className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary border-2 border-primary/30
                             font-medium inline-flex items-center gap-1.5 animate-in zoom-in duration-200"
              >
                <DollarSign className="w-3.5 h-3.5" />
                Max: ${appliedMaxPrice}
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default CategorieHeader;
