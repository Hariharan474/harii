import React, { useEffect, useRef } from "react";

export default function BackgroundWaterDrops() {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);
  const splashesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Water Drop class
    class WaterDrop {
      constructor() {
        this.reset();
        // Stagger initial Y coordinates so they don't all start at the top at once
        this.y = Math.random() * -canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -100 - 20;
        this.speed = Math.random() * 4 + 3; // Fall speed (3px to 7px)
        this.length = Math.random() * 15 + 10; // Drop length (10px to 25px)
        this.opacity = Math.random() * 0.12 + 0.05; // Ambient background (very subtle)
        // Splash height: random Y in the bottom half of the screen
        this.splashY = canvas.height * 0.5 + Math.random() * (canvas.height * 0.5);
      }

      update() {
        this.y += this.speed;
        if (this.y >= this.splashY) {
          // Spawn a splash ripple
          splashesRef.current.push(new SplashRipple(this.x, this.splashY, this.opacity * 1.5));
          this.reset();
        }
      }

      draw(context) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.length);
        context.strokeStyle = `rgba(0, 229, 255, ${this.opacity})`;
        context.lineWidth = 1.0;
        context.stroke();
      }
    }

    // Splash Ripple class
    class SplashRipple {
      constructor(x, y, maxOpacity) {
        this.x = x;
        this.y = y;
        this.radius = 1;
        this.maxRadius = Math.random() * 25 + 15; // Splash size (15px to 40px)
        this.opacity = maxOpacity;
        this.fadeSpeed = 0.015;
        this.growSpeed = 0.8;
      }

      update() {
        this.radius += this.growSpeed;
        this.opacity -= this.fadeSpeed;
      }

      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(0, 229, 255, ${Math.max(0, this.opacity)})`;
        context.lineWidth = 0.8;
        context.stroke();
      }
    }

    // Initialize drops pool (e.g. 25 drops for soft ambient density)
    const totalDrops = 25;
    dropsRef.current = Array.from({ length: totalDrops }, () => new WaterDrop());

    // Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and draw drops
      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        drops[i].update();
        drops[i].draw(ctx);
      }

      // 2. Update and draw splashes
      const splashes = splashesRef.current;
      for (let i = splashes.length - 1; i >= 0; i--) {
        const splash = splashes[i];
        splash.update();

        if (splash.opacity <= 0 || splash.radius >= splash.maxRadius) {
          splashes.splice(i, 1);
        } else {
          splash.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen", opacity: 0.8 }}
    />
  );
}
