import React from "react";

export default function LanguageLogo({ langId, size = 48, className = "" }) {
  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 128 128",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: `transition-transform duration-300 ${className}`,
  };

  switch (langId) {
    case "JS":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="jsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7df1e" />
              <stop offset="100%" stopColor="#f39c12" />
            </linearGradient>
            <filter id="jsGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#f7df1e" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Outer Shield/Box */}
          <rect
            x="12"
            y="12"
            width="104"
            height="104"
            rx="20"
            fill="url(#jsGrad)"
            filter="url(#jsGlow)"
          />
          {/* Subtle Inner Highlight */}
          <rect
            x="16"
            y="16"
            width="96"
            height="96"
            rx="16"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.25"
          />
          {/* "JS" Letters */}
          <text
            x="96"
            y="100"
            fill="#1e1e24"
            fontSize="44"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="end"
          >
            JS
          </text>
        </svg>
      );

    case "Python":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="pyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#306998" />
              <stop offset="100%" stopColor="#204969" />
            </linearGradient>
            <linearGradient id="pyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffe052" />
              <stop offset="100%" stopColor="#ffd343" />
            </linearGradient>
            <filter id="pyGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#306998" floodOpacity="0.35" />
            </filter>
          </defs>
          <g filter="url(#pyGlow)">
            {/* Top Blue Snake */}
            <path
              d="M64 12C38.6 12 40 23.4 40 23.4l.2 11.2h24v3.6H30.4S12 34.8 12 60.4c0 25.6 16.4 24.2 16.4 24.2h9.8v-13.8s-.4-16.4 16.2-16.4H78s15.6.2 15.6-15.6V37.6S94.8 12 64 12z"
              fill="url(#pyBlue)"
            />
            {/* Bottom Yellow Snake */}
            <path
              d="M64 116c25.4 0 24-11.4 24-11.4l-.2-11.2H63.8v-3.6h33.8s18.4 3.4 18.4-22.2c0-25.6-16.4-24.2-16.4-24.2H89.8v13.8s.4 16.4-16.2 16.4H50S34.4 73 34.4 88.8v1.6S33.2 116 64 116z"
              fill="url(#pyYellow)"
            />
            {/* Eyes */}
            <circle cx="51" cy="23" r="3" fill="#fff" />
            <circle cx="77" cy="105" r="3" fill="#111" />
          </g>
        </svg>
      );

    case "Java":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="javaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f39c12" />
              <stop offset="50%" stopColor="#e67e22" />
              <stop offset="100%" stopColor="#e74c3c" />
            </linearGradient>
            <filter id="javaGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#e67e22" floodOpacity="0.45" />
            </filter>
          </defs>
          <g filter="url(#javaGlow)">
            {/* Shield backdrop */}
            <path
              d="M64 8L112 24V64C112 92.8 91.2 112 64 120C36.8 112 16 92.8 16 64V24L64 8Z"
              fill="url(#javaGrad)"
              fillOpacity="0.1"
              stroke="url(#javaGrad)"
              strokeWidth="3.5"
            />
            {/* Glowing Steam waves */}
            <path
              d="M52 42 Q58 30 50 18 M64 40 Q72 26 62 14 M76 45 Q80 34 74 22"
              stroke="url(#javaGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            {/* Coffee Cup body */}
            <path
              d="M38 52 C38 78, 90 78, 90 52 Z"
              fill="url(#javaGrad)"
            />
            {/* Cup Handle */}
            <path
              d="M90 56 C98 56, 98 68, 90 68"
              stroke="url(#javaGrad)"
              strokeWidth="4"
              fill="none"
            />
            {/* Cup Base / Saucer */}
            <path
              d="M30 80 C50 86, 78 86, 98 80"
              stroke="url(#javaGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>
      );

    case "CSS":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="cssGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="100%" stopColor="#0066ff" />
            </linearGradient>
            <filter id="cssGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00a2ff" floodOpacity="0.45" />
            </filter>
          </defs>
          <g filter="url(#cssGlow)">
            {/* CSS3 Shield */}
            <path
              d="M18 12 L110 12 L102 96 L64 116 L26 96 Z"
              fill="url(#cssGrad)"
            />
            {/* Inner highlight (lighter blue) */}
            <path
              d="M64 20 L100 20 L94 88 L64 105 Z"
              fill="white"
              fillOpacity="0.1"
            />
            {/* Styled "3" */}
            <path
              d="M36 34 L92 34 L90 50 L48 50 L50 66 L88 66 L84 92 L64 100 L44 92 L42 74 L58 74 L59 82 L64 85 L69 82 L71 74 L38 74 Z"
              fill="white"
            />
          </g>
        </svg>
      );

    case "HTML":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="htmlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff512f" />
              <stop offset="100%" stopColor="#dd2476" />
            </linearGradient>
            <filter id="htmlGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#ff416c" floodOpacity="0.45" />
            </filter>
          </defs>
          <g filter="url(#htmlGlow)">
            {/* HTML Shield shape */}
            <path
              d="M18 12 L110 12 L102 96 L64 116 L26 96 Z"
              fill="url(#htmlGrad)"
            />
            {/* Lighter overlay */}
            <path
              d="M64 20 L100 20 L94 88 L64 105 Z"
              fill="white"
              fillOpacity="0.1"
            />
            {/* HTML Tags Symbol (</>) */}
            <path
              d="M48 40 L28 64 L48 88 M80 40 L100 64 L80 88 M70 32 L58 96"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </svg>
      );

    case "SQL":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="sqlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="100%" stopColor="#4facfe" />
            </linearGradient>
            <filter id="sqlGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00f2fe" floodOpacity="0.45" />
            </filter>
          </defs>
          <g filter="url(#sqlGlow)" fill="url(#sqlGrad)" stroke="url(#sqlGrad)" strokeWidth="3">
            {/* Database Cylinders */}
            {/* Top Cylinder */}
            <ellipse cx="64" cy="34" rx="36" ry="14" />
            <path d="M28 34 V52 C28 60, 100 60, 100 52 V34" fillOpacity="0.2" />
            {/* Middle Cylinder */}
            <path d="M28 58 C28 66, 100 66, 100 58" fill="none" />
            <path d="M28 58 V76 C28 84, 100 84, 100 76 V58" fillOpacity="0.3" />
            {/* Bottom Cylinder */}
            <path d="M28 82 C28 90, 100 90, 100 82" fill="none" />
            <path d="M28 82 V100 C28 108, 100 108, 100 100 V82" fillOpacity="0.4" />
            <ellipse cx="64" cy="100" rx="36" ry="14" fillOpacity="0.5" />
          </g>
        </svg>
      );

    default:
      return (
        <svg {...svgProps}>
          <rect x="16" y="16" width="96" height="96" rx="20" fill="gray" />
        </svg>
      );
  }
}
