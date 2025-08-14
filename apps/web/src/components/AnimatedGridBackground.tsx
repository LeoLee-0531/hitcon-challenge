'use client';

export default function AnimatedGridBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"
            style={{
              top: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-green-500 to-transparent animate-pulse"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* 添加漸變光暈效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/10 animate-pulse" />

      {/* 添加移動的光點效果 */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-60 animate-ping"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes slideGrid {
          0%,
          100% {
            transform: translateX(0) translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translateX(2px) translateY(2px);
            opacity: 0.8;
          }
        }

        .absolute:nth-child(odd) {
          animation: slideGrid 4s ease-in-out infinite;
        }

        .absolute:nth-child(even) {
          animation: slideGrid 4s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  );
}
