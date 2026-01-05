"use client";
import React from "react";
import Image from "next/image";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-[linear-gradient(124deg,rgba(27,19,39,1)_0%,rgba(26,21,44,1)_51%,rgba(7,62,156,1)_51%,rgba(9,9,121,1)_52%,rgba(23,16,31,1)_100%)] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="flex items-center justify-center lg:justify-between gap-8 md:gap-12 lg:gap-16 flex-col lg:flex-row">
          
          {/* Left content */}
          <div className="w-full lg:w-1/2 max-w-2xl text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              The Future of <br />
              <span className="bg-gradient-to-r from-[#fd2df3] via-[#b844e8] to-[#1FA0DD] bg-clip-text text-transparent animate-gradient">
                Immersive Sound
              </span>
            </h1>

            <p className="mt-6 sm:mt-8 md:mt-10 text-base sm:text-lg md:text-xl text-gray-100 tracking-wide leading-relaxed max-w-xl mx-auto lg:mx-0">
              Experience audio like never before with our new Pulse X1 Series. Precision engineering meets 360° control
              for the ultimate listening experience.
            </p>

            <div className="pt-4 sm:pt-6">
              <button className="group relative bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-purple-500/50 px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 rounded-lg flex items-center gap-3 transition-all duration-300 mx-auto lg:mx-0 text-white font-semibold text-sm sm:text-base transform hover:scale-105 hover:-translate-y-1">
                <span>Explore More</span>
                <span className="text-xl transform transition-all duration-300 ease-out group-hover:translate-x-2">
                  <MdOutlineArrowRightAlt />
                </span>
              </button>
            </div>

            {/* Feature highlights */}
            <div className="hidden sm:flex items-center justify-center lg:justify-start gap-8 pt-8 text-gray-300">
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-bold text-white">360°</p>
                <p className="text-xs md:text-sm">Surround Sound</p>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-bold text-white">48hrs</p>
                <p className="text-xs md:text-sm">Battery Life</p>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-bold text-white">Hi-Res</p>
                <p className="text-xs md:text-sm">Audio Quality</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              {/* Image container */}
              <div className="relative transform transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-2">
                <Image 
                  src="/main.png" 
                  alt="Pulse X1 Series Headphones" 
                  width={600} 
                  height={600}
                  className="w-full h-auto max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-bounce-slow">
                NEW
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-float">
                50% OFF
              </div>
            </div>
          </div>
        </div>

        {/* Mobile feature highlights */}
        <div className="sm:hidden flex items-center justify-around gap-4 pt-12 text-gray-300">
          <div className="text-center">
            <p className="text-xl font-bold text-white">360°</p>
            <p className="text-xs">Surround</p>
          </div>
          <div className="w-px h-10 bg-gray-600"></div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">48hrs</p>
            <p className="text-xs">Battery</p>
          </div>
          <div className="w-px h-10 bg-gray-600"></div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">Hi-Res</p>
            <p className="text-xs">Audio</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;