import { useEffect, useState, useRef } from "react";

/**
 * SnowBirdCursor — CursorRipple.jsx
 * Custom cursor shaped like a sleek flying snow bird that rotates to face the direction of flight,
 * leaving a trail of drifting, wobbling snowflakes behind it.
 */
export default function CustomCursor() {
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const [flakes, setFlakes] = useState([]);
  const [hovered, setHovered] = useState(false);

  const mouse = useRef({ x: -100, y: -100 });
  const lastPos = useRef({ x: -100, y: -100 });
  const activeFlakes = useRef([]);

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = "none";

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouse.current = { x, y };

      // Calculate direction angle of movement
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      if (Math.hypot(dx, dy) > 2) {
        // Calculate angle and smooth it
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; // offset so bird faces up
        setAngle(targetAngle);

        // Spawn a snowflake
        if (Math.random() < 0.6) {
          const newFlake = {
            id: Date.now() + Math.random(),
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            size: Math.random() * 4 + 2, // 2px to 6px
            opacity: 1,
            vy: Math.random() * 1.5 + 0.8, // fall speed
            wobbleSpeed: Math.random() * 0.08 + 0.04,
            wobbleAmp: Math.random() * 2 + 1,
            wobbleVal: Math.random() * 100,
          };
          activeFlakes.current.push(newFlake);
        }
        
        lastPos.current = { x, y };
      }
    };

    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);

    const attachHoverListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, select, textarea, [data-magnetic]").forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    attachHoverListeners();

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // requestAnimationFrame loop to update snow fall physics
    let frameId;
    const tick = () => {
      frameId = requestAnimationFrame(tick);
      
      const mx = mouse.current.x;
      const my = mouse.current.y;
      setCoords({ x: mx, y: my });

      // Animate active snowflakes
      activeFlakes.current = activeFlakes.current
        .map((f) => {
          f.y += f.vy; // fall down
          f.wobbleVal += f.wobbleSpeed;
          f.x += Math.sin(f.wobbleVal) * f.wobbleAmp * 0.2; // sway side to side
          f.opacity -= 0.022; // fade out
          return f;
        })
        .filter((f) => f.opacity > 0);

      setFlakes([...activeFlakes.current]);
    };
    tick();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.style.cursor = "";
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Falling Snowflakes Trail */}
      {flakes.map((f) => (
        <div
          key={f.id}
          style={{
            position: "fixed",
            left: f.x,
            top: f.y,
            width: f.size,
            height: f.size,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(0, 210, 255, 0.4)",
            opacity: f.opacity,
            pointerEvents: "none",
            zIndex: 99998,
          }}
        />
      ))}

      {/* Main Snow Bird Pointer */}
      <div
        style={{
          position: "fixed",
          left: coords.x,
          top: coords.y,
          width: 32,
          height: 32,
          pointerEvents: "none",
          transform: `translate(-50%, -50%) rotate(${angle}deg) ${hovered ? "scale(1.2)" : "scale(1)"}`,
          zIndex: 99999,
          transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <svg viewBox="-15 -15 30 30" width="100%" height="100%">
          {/* Bird wings outer glow */}
          <path
            d="M 0 -6 Q 6 -14, 12 -10 Q 6 -8, 2 -2 L 0 0 L -2 -2 Q -6 -8, -12 -10 Q -6 -14, 0 -6"
            fill="none"
            stroke="rgba(0, 210, 255, 0.6)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 5px rgba(0,210,255,0.7))" }}
          />
          {/* Flying Snow Bird Silhouette */}
          <path
            d="M 0 -6 Q 6 -14, 12 -10 Q 6 -8, 2 -2 L 0 0 L -2 -2 Q -6 -8, -12 -10 Q -6 -14, 0 -6"
            fill="rgba(255, 255, 255, 0.95)"
            stroke="rgba(139, 92, 246, 0.8)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Glowing central core */}
          <circle cx="0" cy="-4" r="2.2" fill="#00d2ff" style={{ filter: "drop-shadow(0 0 3px #00d2ff)" }} />
        </svg>
      </div>
    </>
  );
}
