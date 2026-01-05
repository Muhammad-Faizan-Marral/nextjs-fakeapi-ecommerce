export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-8 h-[25px]">
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-40 blur-md animate-pulse" />

        {/* Middle glow layer */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 blur-sm" />

        {/* Animated outer ring */}
        <div className="absolute h-8 inset-0 rounded-full border-2 border-transparent border-t-purple-600 border-r-blue-600 animate-spin" />

        {/* Animated inner ring (counter-rotation) */}
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-purple-400 border-l-blue-400 animate-spin-slow" />

        {/* Center dot with pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse shadow-lg shadow-purple-500/50" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
