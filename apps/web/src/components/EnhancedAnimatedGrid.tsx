'use client';

import { useEffect, useState } from 'react';

export default function EnhancedAnimatedGrid() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* 主要網格 */}
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"
            style={{
              top: `${i * 4}%`,
              animationDelay: `${i * 0.05}s`,
              transform: `translateX(${Math.sin(i * 0.1) * 10}px)`,
            }}
          />
        ))}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-green-500 to-transparent"
            style={{
              left: `${i * 4}%`,
              animationDelay: `${i * 0.05}s`,
              transform: `translateY(${Math.cos(i * 0.1) * 10}px)`,
            }}
          />
        ))}
      </div>

      {/* 鼠標跟隨光暈 */}
      {/* <div
        className="absolute w-76 h-76 bg-green-500/20 rounded-full blur-3xl transition-all duration-300 ease-out"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      /> */}

      {/* 脈衝圓圈 */}
      {/* <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute border border-green-500/30 rounded-full animate-ping"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 0.5}s`,
              animationDuration: "4s",
            }}
          />
        ))}
      </div> */}

      {/* 移動的數據流 */}
      <div className="absolute inset-0 opacity-60">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`stream-${i}`}
            className="absolute w-1 h-20 bg-gradient-to-b from-green-400 to-transparent animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s',
              transform: `translateY(-100vh)`,
              animation: `dataStream 3s linear infinite ${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes dataStream {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
