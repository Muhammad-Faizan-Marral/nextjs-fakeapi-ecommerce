"use client"
export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-sm flex items-center justify-center z-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Loading container */}
      <div className="relative flex flex-col items-center gap-6 sm:gap-8">
        {/* Spinner with multiple rings */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-purple-500 rounded-full animate-spin"></div>
          
          {/* Middle ring */}
          <div className="absolute inset-2 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin-reverse"></div>
          
          {/* Inner ring */}
          <div className="absolute inset-4 border-4 border-transparent border-t-pink-500 border-r-pink-500 rounded-full animate-spin-slow"></div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-white text-xl sm:text-2xl font-semibold tracking-wider animate-pulse">
            Loading
            <span className="inline-flex ml-1">
              <span className="animate-bounce-dot">.</span>
              <span className="animate-bounce-dot delay-200">.</span>
              <span className="animate-bounce-dot delay-400">.</span>
            </span>
          </p>
          
          {/* Progress bar */}
          <div className="w-48 sm:w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 animate-progress"></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-float-1"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float-2"></div>
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-float-3"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-float-4"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-dot {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          40% {
            transform: translateY(-8px);
            opacity: 0.7;
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float-1 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(20px, -30px);
            opacity: 0.8;
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(-25px, 35px);
            opacity: 0.8;
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(30px, 20px);
            opacity: 0.8;
          }
        }

        @keyframes float-4 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(-20px, -25px);
            opacity: 0.8;
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .animate-bounce-dot {
          animation: bounce-dot 1.4s infinite;
          display: inline-block;
        }

        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 3.5s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 4s ease-in-out infinite;
        }

        .animate-float-4 {
          animation: float-4 3.2s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}