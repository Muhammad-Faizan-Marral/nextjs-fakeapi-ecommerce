"use client";
import React from "react";
import Image from "next/image";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const LandingPage = () => {
  return (
    <div className="  bg-[linear-gradient(124deg,rgba(27,19,39,1)_0%,rgba(26,21,44,1)_51%,rgba(7,62,156,1)_51%,rgba(9,9,121,1)_52%,rgba(23,16,31,1)_100%)]">
      <div className=" flex items-center justify-around gap-4 md:gap-10 flex-col md:flex-row ">
        {/* left */}
        <div className=" max-w-[34em]">
          <h1 className="text-6xl font-bold text-white">
            The Future of <br />
            <span className="bg-linear-to-r from-[#fd2df3] to-[#1FA0DD] bg-clip-text text-transparent ">
              Immersive Sound
            </span>
          </h1>

          <p className="mt-10 text-xl text-gray-100 tracking-wide  leading-7.5">
            Experience audio like never before with our new Pulse X1 Series. Precision engineering meets 360° control
            for the ultimate listening experience.
          </p>
          <button className="group relative bg-purple-800 hover:bg-purple-900 shadow-lg px-12 py-3.5 rounded-[7px] flex items-center gap-3 transition-all duration-300">
            Explorer More
            <span className="text-xl transform transition-all duration-300 ease-linear group-hover:translate-x-1">
              <MdOutlineArrowRightAlt />
            </span>
          </button>
        </div>
        {/* right */}
        <div className="hover:scale-105 transition delay-150 duration-300 ease-linear ">
          <Image src="/main.png" alt="Picture of the author" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
