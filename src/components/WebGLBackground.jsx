import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WebGLBackground — Three.js powered particle field + neon grid.
 * Renders on a full-screen canvas absolutely positioned behind all UI.
 * Cleans up all Three.js objects on unmount to prevent memory leaks.
 */
export default function WebGLBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ── Scene + Camera ────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020409, 0.035);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 60);

    // ── Particle Field ────────────────────────────────────
    const PARTICLE_COUNT = 600;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const cyanColor  = new THREE.Color("#06b6d4");
    const indigoColor = new THREE.Color("#818cf8");
    const redColor   = new THREE.Color("#ef4444");
    const palette = [cyanColor, cyanColor, cyanColor, indigoColor, indigoColor, redColor];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 20 + Math.random() * 80;

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 30;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Neon Grid ─────────────────────────────────────────
    const gridSize  = 80;
    const gridDivs  = 20;
    const gridMat   = new THREE.LineBasicMaterial({
      color: new THREE.Color("#06b6d4"),
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });

    // Horizontal lines
    for (let i = 0; i <= gridDivs; i++) {
      const z = -40 + (i / gridDivs) * gridSize;
      const points = [
        new THREE.Vector3(-gridSize / 2, -25, z),
        new THREE.Vector3( gridSize / 2, -25, z),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      scene.add(new THREE.Line(geo, gridMat));
    }
    // Vertical lines
    for (let i = 0; i <= gridDivs; i++) {
      const x = -gridSize / 2 + (i / gridDivs) * gridSize;
      const points = [
        new THREE.Vector3(x, -25, -40),
        new THREE.Vector3(x, -25, gridSize - 40),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      scene.add(new THREE.Line(geo, gridMat));
    }

    // ── Neon Rings (depth markers) ─────────────────────────
    for (let i = 0; i < 5; i++) {
      const ringGeo = new THREE.RingGeometry(15 + i * 8, 15.3 + i * 8, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? new THREE.Color("#06b6d4") : new THREE.Color("#818cf8"),
        transparent: true,
        opacity: 0.04 - i * 0.006,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -20 - i * 15;
      scene.add(ring);
    }

    // ── Mouse Parallax ────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize Handler ─────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation Loop ─────────────────────────────────────
    let frameId;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.004;

      // Slowly rotate particles
      particles.rotation.y  = t * 0.05;
      particles.rotation.x  = t * 0.02;

      // Breathe effect on particle opacity
      particleMat.opacity = 0.5 + Math.sin(t * 0.8) * 0.15;

      // Smooth camera parallax follow mouse
      camera.position.x += (mouseX * 4 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
