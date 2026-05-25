import { useEffect, useRef } from "react";

/**
 * WaveBackground — Dark Blue Blurry Background Theme
 * Rendered with animated layered cyan-to-purple waves and drifting blurred blobs.
 */
export default function WaveBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Dark blue mesh gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #020617 0%, #071033 50%, #030712 100%)",
        }}
      />

      {/* Drifting blurred glow spheres (Logo Colors) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none animate-float-slower" />
      <div className="absolute top-[30%] left-[50%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-float-slowest" />

      {/* Wave layer 1 — deepest, widest */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "55%", animation: "wave1 8s ease-in-out infinite", mixBlendMode: "screen" }}
      >
        <defs>
          <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#0072ff" stopOpacity="0.25" />
            <stop offset="50%"  stopColor="#00d2ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wg1)"
          d="M0,160 C200,80 400,240 600,160 C800,80 1000,200 1200,140 C1350,90 1400,180 1440,160 L1440,320 L0,320 Z"
        />
      </svg>

      {/* Wave layer 2 — mid glow */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "48%", animation: "wave2 6s ease-in-out infinite 1s", mixBlendMode: "screen" }}
      >
        <defs>
          <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#00d2ff" stopOpacity="0.35" />
            <stop offset="50%"  stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wg2)"
          d="M0,200 C300,100 500,260 720,180 C900,110 1100,230 1300,170 C1380,145 1420,190 1440,200 L1440,320 L0,320 Z"
        />
      </svg>

      {/* Wave layer 3 — bright glow ribbon */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "40%", animation: "wave3 7s ease-in-out infinite 0.5s", mixBlendMode: "screen" }}
      >
        <defs>
          <linearGradient id="wg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#00f0ff" stopOpacity="0.45" />
            <stop offset="50%"  stopColor="#a855f7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <filter id="glow3">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          fill="url(#wg3)"
          filter="url(#glow3)"
          d="M0,230 C180,160 380,280 600,210 C820,140 1000,250 1200,200 C1340,165 1400,220 1440,230 L1440,320 L0,320 Z"
        />
      </svg>

      {/* Wave layer 4 — top edge bright highlight ribbon */}
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "38%", animation: "wave4 5s ease-in-out infinite 2s", mixBlendMode: "screen" }}
      >
        <defs>
          <linearGradient id="wg4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#00f0ff" stopOpacity="0" />
            <stop offset="30%"  stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="70%"  stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <filter id="glow4">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          fill="none"
          stroke="url(#wg4)"
          strokeWidth="2"
          filter="url(#glow4)"
          d="M0,20 C180,5 380,35 600,15 C820,0 1050,30 1250,12 C1350,4 1410,22 1440,20"
        />
      </svg>

      {/* CSS keyframes injected inline */}
      <style>{`
        @keyframes wave1 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50%       { transform: translateX(-30px) scaleY(1.04); }
        }
        @keyframes wave2 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50%       { transform: translateX(25px) scaleY(0.96); }
        }
        @keyframes wave3 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50%       { transform: translateX(-20px) scaleY(1.06); }
        }
        @keyframes wave4 {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(35px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(-40px, 30px) scale(1.08); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(50px, -40px) scale(0.94); }
        }
        @keyframes float-slowest {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(-30px, -30px) scale(1.04); }
        }
        .animate-float-slow { animation: float-slow 16s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 22s ease-in-out infinite; }
        .animate-float-slowest { animation: float-slowest 19s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
