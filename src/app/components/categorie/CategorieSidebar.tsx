"use client";

import RangeSlider from "../ui/RangeSlider";

export default function CategorieSidebar() {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 lg:sticky lg:top-[12rem]">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Categories</h3>

        <div className="space-y-2">
          {[
            { label: "All Audio", checked: true },
            { label: "Over-Ear Headphones" },
            { label: "True Wireless Earbuds" },
            { label: "Gaming Headsets" },
            { label: "Portable Speakers" },
          ].map((cat, i) => (
            <label key={i} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={cat.checked}
                className="form-checkbox h-4 w-4 text-primary rounded border-gray-700 bg-[#1e1e1e] focus:ring-primary focus:ring-offset-0 transition duration-150 ease-in-out"
              />
              <span
                className={`ml-3 transition-colors ${
                  cat.checked ? "text-white group-hover:text-primary" : "text-gray-400 group-hover:text-white"
                }`}
              >
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Price Range</h3>

        <RangeSlider />
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Brands</h3>

        <div className="flex flex-wrap gap-2">
          {[
            { name: "Sony", active: true },
            { name: "Bose" },
            { name: "Sennheiser" },
            { name: "Apple" },
            { name: "JBL" },
          ].map((brand, i) => (
            <button
              key={i}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                brand.active
                  ? "bg-primary text-white shadow-neon"
                  : "bg-[#2c2249] text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
