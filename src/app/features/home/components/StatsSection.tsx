"use client";
import React from "react";

const StatsSection = () => {
  return (
    <div className="bg-[#0E0E0E] border-t border-b py-3  border-gray-700 flex items-start md:items-center justify-start md:justify-around flex-col md:flex-row text-white ">
      <div className=" p-4 flex items-center gap-4">
        <div className="border-l border-gray-700 h-16 mt-2"></div>
        <div>
          <h1 className="text-4xl font-medium tracking-wide">2M+</h1>
          <h3 className="text-gray-400 mt-1.5 tracking-wide text-[16px]">Trusted Users</h3>
        </div>
      </div>
      <div className=" p-4 flex items-center gap-4">
        <div className="border-l border-gray-700 h-16 mt-2"></div>
        <div>
          <h1 className="text-4xl font-medium tracking-wide">50k+</h1>
          <h3 className="text-gray-400 mt-1.5 tracking-wide text-[16px]">Products Sold</h3>
        </div>
      </div>
      <div className=" p-4 flex items-center gap-4">
        <div className="border-l border-gray-700 h-16 mt-2"></div>
        <div>
          <h1 className="text-4xl font-medium tracking-wide">4.9/5</h1>
          <h3 className="text-gray-400 mt-1.5 tracking-wide text-[16px]">Customer Rating</h3>
        </div>
      </div>
      <div className=" p-4 flex items-center gap-4">
        <div className="border-l border-gray-700 h-16 mt-2"></div>
        <div>
          <h1 className="text-4xl font-medium tracking-wide">24/7</h1>
          <h3 className="text-gray-400 mt-1.5 tracking-wide text-[16px]">Support</h3>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
