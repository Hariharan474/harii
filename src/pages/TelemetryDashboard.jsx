import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, animate } from "framer-motion";

/* ─────────────────────────────────────────────
   CONSTANTS & FAKE TELEMETRY DATA
───────────────────────────────────────────── */
const DRIVER = {
  name: "MAX VERSTAPPEN",
  number: "1",
  team: "Oracle Red Bull Racing",
  teamColor: "#3671C6",
  position: 1,
  gap: "LEADER",
  tyre: "MEDIUM",
  tyreAge: 18,
  fuel: 72,
  drs: true,
};

const SECTORS = [
  { id: "S1", time: "28.142", delta: -0.312, color: "#a855f7" },
  { id: "S2", time: "31.558", delta: +0.088, color: "#22d3ee" },
  { id: "S3", time: "19.203", delta: -0.541, color: "#a855f7" },
];

const LEADERBOARD = [
  { pos: 1, driver: "VER", team: "RBR", gap: "—", color: "#3671C6" },
  { pos: 2, driver: "HAM", team: "MER", gap: "+2.341", color: "#27F4D2" },
  { pos: 3, driver: "NOR", team: "MCL", gap: "+5.887", color: "#FF8000" },
  { pos: 4, driver: "LEC", team: "FER", gap: "+9.124", color: "#E8002D" },
  { pos: 5, driver: "SAI", team: "FER", gap: "+12.003", color: "#E8002D" },
];

const TYRES = {
  SOFT: { label: "SOFT", color: "#EF4444", textColor: "#fff" },
  MEDIUM: { label: "MEDIUM", color: "#EAB308", textColor: "#000" },
  HARD: { label: "HARD", color: "#E5E7EB", textColor: "#000" },
  INTER: { label: "INTER", color: "#22C55E", textColor: "#fff" },
  WET: { label: "WET", color: "#3B82F6", textColor: "#fff" },
};

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedNumber({ target, duration = 1.5, decimals = 0, suffix = "" }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(parseFloat(v.toFixed(decimals))),
    });
    return controls.stop;
  }, [target, duration, decimals]);
  return <span>{value.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   SPEED GAUGE
───────────────────────────────────────────── */
function SpeedGauge({ speed = 312 }) {
  const maxSpeed = 360;
  const pct = speed / maxSpeed;
  const r = 80;
  const cx = 100;
  const cy = 110;
  const startAngle = -210;
  const endAngle = 30;
  const range = endAngle - startAngle;
  const sweep = range * pct;

  const toXY = (angle, radius = r) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const describeArc = (from, to) => {
    const s = toXY(from);
    const e = toXY(to);
    const large = to - from > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const needleAngle = startAngle + sweep;
  const needleEnd = toXY(needleAngle, 72);
  const needleBase1 = toXY(needleAngle - 90, 8);
  const needleBase2 = toXY(needleAngle + 90, 8);

  return (
    <svg viewBox="0 0 200 130" className="w-full max-w-[220px] mx-auto">
      {/* Track */}
      <path d={describeArc(startAngle, endAngle)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round" />
      {/* Fill */}
      <motion.path
        d={describeArc(startAngle, startAngle)}
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        animate={{ d: describeArc(startAngle, needleAngle) }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      {/* Glow */}
      <motion.path
        d={describeArc(startAngle, startAngle)}
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.18"
        animate={{ d: describeArc(startAngle, needleAngle) }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      {/* Needle */}
      <motion.polygon
        points={`${needleEnd.x},${needleEnd.y} ${needleBase1.x},${needleBase1.y} ${cx},${cy} ${needleBase2.x},${needleBase2.y}`}
        fill="white"
        opacity="0.9"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      <circle cx={cx} cy={cy} r="5" fill="#0f172a" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      {/* Labels */}
      <text x={cx} y={cy - 20} textAnchor="middle" fill="white" fontSize="24" fontWeight="800" fontFamily="monospace">
        {speed}
      </text>
      <text x={cx} y={cy - 5} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">
        KM/H
      </text>
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="60%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   THROTTLE / BRAKE BARS
───────────────────────────────────────────── */
function PedalBar({ label, value, color, delay = 0 }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-[10px] font-bold tracking-widest">
        <span style={{ color }}>{label}</span>
        <span className="text-white/70">{value}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}99` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 1.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GEAR DISPLAY
───────────────────────────────────────────── */
function GearDisplay({ gear = 7 }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-[10px] tracking-widest text-white/40 uppercase font-bold mb-1">Gear</span>
      <motion.div
        key={gear}
        initial={{ scale: 1.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-6xl font-black text-white"
        style={{ textShadow: "0 0 30px rgba(99,102,241,0.9), 0 0 60px rgba(99,102,241,0.4)" }}
      >
        {gear}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MINI MAP (Monza-style circuit)
───────────────────────────────────────────── */
function MiniMap() {
  const pathData = "M 50,20 L 200,20 Q 230,20 230,50 L 230,80 Q 230,95 215,95 L 180,95 Q 160,95 160,120 L 160,150 Q 160,175 180,185 L 220,185 Q 250,185 250,210 L 250,240 Q 250,260 230,265 L 80,265 Q 55,265 50,240 L 50,80 Q 50,50 80,40 Z";

  const carPosition = 0.22; // 0-1 along the path

  return (
    <div className="relative w-full flex justify-center">
      <svg viewBox="0 0 300 290" className="w-full max-w-[200px]">
        {/* Shadow / glow effect */}
        <path d={pathData} fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
        {/* Track background */}
        <path d={pathData} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        {/* Animated draw */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="rgba(6,182,212,0.85)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        />
        {/* Sector highlights */}
        <motion.path
          d="M 50,20 L 130,20"
          fill="none" stroke="#a855f7" strokeWidth="5" strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.4 }}
        />
        <motion.path
          d="M 130,20 L 230,80 L 160,150"
          fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 0.4 }}
        />
        <motion.path
          d="M 160,150 L 50,200 L 50,80"
          fill="none" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4, duration: 0.4 }}
        />
        {/* Car dot */}
        <motion.circle
          cx={130} cy={20} r={7}
          fill="#ef4444"
          style={{ filter: "drop-shadow(0 0 6px #ef4444)" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.8, type: "spring", stiffness: 400 }}
        />
        <motion.circle
          cx={130} cy={20} r={12}
          fill="none" stroke="#ef4444" strokeWidth="1.5"
          opacity="0.4"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.8, 1] }}
          transition={{ delay: 3.8, duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
        {/* DRS Zone markers */}
        <motion.rect x={65} y={16} width={30} height={8} rx={3} fill="#22c55e" opacity="0.6"
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 3.2 }}
        />
        <text x={80} y={22} textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="monospace">DRS</text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PARTICLE BACKGROUND
───────────────────────────────────────────── */
function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.4 + 0.05,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCAN LINE OVERLAY
───────────────────────────────────────────── */
function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   LIVE LAP TIME TICKER
───────────────────────────────────────────── */
function LapTimeTicker() {
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setSeconds((s) => {
        const next = s + 0.025;
        if (next >= 79.0) return 0;
        return next;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [started]);

  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  const ms = Math.floor((seconds % 1) * 1000).toString().padStart(3, "0");

  return (
    <div className="text-center">
      <div className="text-[10px] tracking-widest text-cyan-400/70 uppercase font-bold mb-1">Current Lap</div>
      <div className="font-mono text-2xl font-black text-white tracking-wider" style={{ textShadow: "0 0 20px rgba(6,182,212,0.6)" }}>
        {m}:{s}.<span className="text-cyan-400 text-lg">{ms}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TYRE COMPOUND WIDGET
───────────────────────────────────────────── */
function TyreWidget({ compound = "MEDIUM", age = 18 }) {
  const tyre = TYRES[compound] || TYRES.MEDIUM;
  const wearPct = Math.min(100, (age / 30) * 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-[10px] tracking-widest text-white/40 uppercase font-bold">Tyre</div>
      <motion.div
        className="relative w-16 h-16 rounded-full flex items-center justify-center font-black text-xs"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${tyre.color}cc, ${tyre.color}66)`,
          boxShadow: `0 0 20px ${tyre.color}66, inset 0 0 15px rgba(0,0,0,0.4)`,
          border: `2px solid ${tyre.color}99`,
          color: tyre.textColor,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {compound[0]}
      </motion.div>
      <div className="text-[10px] text-white/60 font-mono">{compound}</div>
      <div className="w-16">
        <div className="flex justify-between text-[9px] text-white/40 mb-0.5">
          <span>Wear</span><span>{Math.round(wearPct)}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: wearPct > 70 ? "#ef4444" : wearPct > 40 ? "#eab308" : "#22c55e" }}
            initial={{ width: 0 }}
            animate={{ width: `${wearPct}%` }}
            transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DRS INDICATOR
───────────────────────────────────────────── */
function DRSIndicator({ active = true }) {
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-black text-xs tracking-widest"
      style={{
        background: active ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${active ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.08)"}`,
        color: active ? "#22c55e" : "rgba(255,255,255,0.3)",
        boxShadow: active ? "0 0 16px rgba(34,197,94,0.2)" : "none",
      }}
      animate={active ? { boxShadow: ["0 0 8px rgba(34,197,94,0.2)", "0 0 20px rgba(34,197,94,0.4)", "0 0 8px rgba(34,197,94,0.2)"] } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <div className={`w-2 h-2 rounded-full ${active ? "bg-green-400" : "bg-white/20"}`} />
      DRS {active ? "OPEN" : "CLOSED"}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTOR TIME CARD
───────────────────────────────────────────── */
function SectorCard({ sector, delay }) {
  const isPurple = sector.delta < 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center justify-between px-4 py-2.5 rounded-xl"
      style={{
        background: isPurple ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${isPurple ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.06)"}`,
      }}
    >
      <span className="text-[10px] font-black tracking-widest" style={{ color: isPurple ? "#a855f7" : "#22d3ee" }}>{sector.id}</span>
      <span className="font-mono text-white text-sm font-bold">{sector.time}</span>
      <span className={`text-xs font-black font-mono ${isPurple ? "text-purple-400" : "text-red-400"}`}>
        {isPurple ? "" : "+"}{sector.delta.toFixed(3)}
      </span>
      {isPurple && (
        <motion.div
          className="w-2 h-2 rounded-full bg-purple-400"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FUEL BAR
───────────────────────────────────────────── */
function FuelWidget({ level = 72 }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-[10px] tracking-widest font-bold">
        <span className="text-white/40 uppercase">Fuel Load</span>
        <span className="text-cyan-400 font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #06b6d4, #818cf8)", boxShadow: "0 0 8px rgba(6,182,212,0.5)" }}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LEADERBOARD WIDGET
───────────────────────────────────────────── */
function MiniLeaderboard() {
  return (
    <div className="space-y-1.5">
      {LEADERBOARD.map((entry, i) => (
        <motion.div
          key={entry.pos}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + i * 0.12, duration: 0.4 }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg"
          style={{
            background: entry.pos === 1 ? "rgba(54,113,198,0.12)" : "rgba(255,255,255,0.025)",
            border: `1px solid ${entry.pos === 1 ? "rgba(54,113,198,0.3)" : "rgba(255,255,255,0.04)"}`,
          }}
        >
          <span className="text-[10px] font-black text-white/40 w-4">{entry.pos}</span>
          <div className="w-1.5 h-4 rounded-full" style={{ background: entry.color }} />
          <span className="text-xs font-black text-white tracking-wider flex-1">{entry.driver}</span>
          <span className="text-[10px] text-white/40 font-mono">{entry.team}</span>
          <span className={`text-[10px] font-bold font-mono ${entry.pos === 1 ? "text-cyan-400" : "text-white/60"}`}>{entry.gap}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   GLOWING PANEL WRAPPER
───────────────────────────────────────────── */
function GlowPanel({ children, className = "", delay = 0, glowColor = "rgba(99,102,241,0.08)", style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: "rgba(15,18,36,0.85)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: `0 0 40px ${glowColor}, 0 8px 32px rgba(0,0,0,0.4)`,
        ...style,
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)" }} />
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PANEL HEADER
───────────────────────────────────────────── */
function PanelHeader({ label, accent = "#06b6d4" }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-4 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
      <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: accent }}>{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RPM BAR DISPLAY
───────────────────────────────────────────── */
function RPMDisplay({ rpm = 10800 }) {
  const maxRPM = 15000;
  const segments = 16;
  const filled = Math.round((rpm / maxRPM) * segments);
  const getColor = (i) => {
    if (i >= 14) return "#ef4444";
    if (i >= 11) return "#eab308";
    return "#22d3ee";
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-[10px] tracking-widest">
        <span className="text-white/40 font-bold uppercase">RPM</span>
        <span className="text-white font-mono font-bold">{rpm.toLocaleString()}</span>
      </div>
      <div className="flex gap-1 items-end h-6">
        {Array.from({ length: segments }, (_, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              background: i < filled ? getColor(i) : "rgba(255,255,255,0.06)",
              boxShadow: i < filled ? `0 0 4px ${getColor(i)}99` : "none",
              height: `${60 + (i / segments) * 40}%`,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.0 + i * 0.04, duration: 0.3, ease: "easeOut" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN TELEMETRY DASHBOARD
───────────────────────────────────────────── */
export default function TelemetryDashboard({ onBack }) {
  const [introComplete, setIntroComplete] = useState(false);
  const [speed] = useState(312);
  const [rpm] = useState(10800);

  useEffect(() => {
    const t = setTimeout(() => setIntroComplete(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #020409 0%, #050d1a 40%, #0a0818 70%, #030608 100%)",
        fontFamily: "'Inter', 'Roboto', sans-serif",
      }}
    >
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Roboto+Mono:wght@400;600;700&display=swap');`}</style>

      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-5%] right-[5%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.25) 0%, transparent 70%)" }} />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%)" }} />
      </div>

      {/* Particle field */}
      <ParticleField />
      {/* Scan lines */}
      <ScanLines />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)" }} />

      {/* ── CINEMATIC INTRO OVERLAY ── */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: "#020409" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-5xl font-black tracking-[0.3em] text-white" style={{ textShadow: "0 0 40px rgba(6,182,212,0.8)" }}>
                F1 <span style={{ color: "#ef4444" }}>●</span> LIVE
              </div>
              <div className="text-xs tracking-[0.5em] text-cyan-400/60 mt-2 uppercase">Telemetry System</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOP HEADER BAR ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-20 flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(6,182,212,0.1)", background: "rgba(5,13,26,0.7)", backdropFilter: "blur(16px)" }}
      >
        {/* Logo Area */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 hover:text-cyan-400 transition-colors"
          >
            ← BACK
          </motion.button>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-3">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ boxShadow: "0 0 10px rgba(239,68,68,0.8)" }}
            />
            <span className="text-xs font-black tracking-[0.3em] text-white uppercase">F1 Telemetry Live</span>
          </div>
        </div>

        {/* Center: Race Info */}
        <div className="hidden md:flex items-center gap-6 text-[10px] font-bold tracking-widest text-white/40">
          <span>MONACO GP</span>
          <span className="text-cyan-400">●</span>
          <span>LAP 38/78</span>
          <span className="text-cyan-400">●</span>
          <span>RACE</span>
        </div>

        {/* Right: Driver Badge */}
        <div className="flex items-center gap-3">
          <DRSIndicator active={DRIVER.drs} />
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: `${DRIVER.teamColor}15`, border: `1px solid ${DRIVER.teamColor}40` }}
          >
            <div className="text-lg font-black" style={{ color: DRIVER.teamColor }}>{DRIVER.number}</div>
            <div className="text-[10px] font-black tracking-wider text-white leading-tight">
              <div>VER</div>
              <div style={{ color: DRIVER.teamColor }} className="text-[8px]">P{DRIVER.position}</div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── MAIN GRID ── */}
      <main className="relative z-10 p-5 grid gap-4"
        style={{ gridTemplateColumns: "280px 1fr 280px", gridTemplateRows: "auto auto auto" }}>

        {/* ─ COL 1: Left Panel ─ */}
        <div className="flex flex-col gap-4">
          {/* Speed Gauge */}
          <GlowPanel delay={1.0} glowColor="rgba(6,182,212,0.1)" className="p-5">
            <PanelHeader label="Speed" accent="#06b6d4" />
            <SpeedGauge speed={speed} />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-[9px] text-white/30 uppercase tracking-widest">Top Speed</div>
                <div className="text-sm font-black font-mono text-white">340 km/h</div>
              </div>
              <div className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-[9px] text-white/30 uppercase tracking-widest">Avg Speed</div>
                <div className="text-sm font-black font-mono text-white">208 km/h</div>
              </div>
            </div>
          </GlowPanel>

          {/* Gear + RPM */}
          <GlowPanel delay={1.15} glowColor="rgba(129,140,248,0.08)" className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <GearDisplay gear={7} />
              <div className="flex-1">
                <LapTimeTicker />
              </div>
            </div>
            <RPMDisplay rpm={rpm} />
          </GlowPanel>

          {/* Pedals */}
          <GlowPanel delay={1.3} className="p-5">
            <PanelHeader label="Pedal Input" accent="#a855f7" />
            <div className="space-y-3">
              <PedalBar label="THROTTLE" value={88} color="#22c55e" delay={1.8} />
              <PedalBar label="BRAKE" value={12} color="#ef4444" delay={2.0} />
              <PedalBar label="STEERING" value={34} color="#06b6d4" delay={2.2} />
            </div>
          </GlowPanel>
        </div>

        {/* ─ COL 2: Center Panel ─ */}
        <div className="flex flex-col gap-4">
          {/* Main Driver Hero Card */}
          <GlowPanel delay={0.9} glowColor="rgba(54,113,198,0.15)" className="p-6"
            style={{ background: `linear-gradient(135deg, rgba(5,13,26,0.95), rgba(54,113,198,0.06))` }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="text-[10px] tracking-[0.3em] font-bold mb-1"
                  style={{ color: DRIVER.teamColor }}
                >
                  {DRIVER.team.toUpperCase()}
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-3xl font-black tracking-tight text-white"
                >
                  {DRIVER.name}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.35 }}
                  className="text-sm text-white/40 mt-1 font-mono"
                >
                  {DRIVER.gap} · LAP 38
                </motion.div>
              </div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 300 }}
                className="text-7xl font-black leading-none"
                style={{ color: DRIVER.teamColor, textShadow: `0 0 40px ${DRIVER.teamColor}66` }}
              >
                {DRIVER.number}
              </motion.div>
            </div>

            {/* Best Lap */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "BEST LAP", value: "1:10.903", color: "#a855f7" },
                { label: "LAST LAP", value: "1:11.654", color: "#22d3ee" },
                { label: "GAP AHEAD", value: "LEADER", color: "#22c55e" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                  className="text-center p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="text-[9px] tracking-widest text-white/30 uppercase mb-1">{item.label}</div>
                  <div className="font-mono text-sm font-black" style={{ color: item.color }}>{item.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Sector Times */}
            <PanelHeader label="Sector Times" accent="#a855f7" />
            <div className="space-y-2">
              {SECTORS.map((s, i) => (
                <SectorCard key={s.id} sector={s} delay={1.6 + i * 0.12} />
              ))}
            </div>
          </GlowPanel>

          {/* Track Map */}
          <GlowPanel delay={1.4} className="p-5" glowColor="rgba(6,182,212,0.06)">
            <PanelHeader label="Circuit · Monaco" accent="#06b6d4" />
            <div className="flex gap-6 items-start">
              <div className="flex-1">
                <MiniMap />
              </div>
              <div className="flex flex-col gap-2.5 text-[10px] font-bold tracking-wide min-w-[110px]">
                {[
                  { dot: "#a855f7", label: "SECTOR 1", val: "28.142" },
                  { dot: "#22d3ee", label: "SECTOR 2", val: "31.558" },
                  { dot: "#a855f7", label: "SECTOR 3", val: "19.203" },
                  { dot: "#22c55e", label: "DRS ZONES", val: "2" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.dot, boxShadow: `0 0 5px ${item.dot}` }} />
                    <span className="text-white/40">{item.label}</span>
                    <span className="text-white/70 font-mono ml-auto">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlowPanel>
        </div>

        {/* ─ COL 3: Right Panel ─ */}
        <div className="flex flex-col gap-4">
          {/* Leaderboard */}
          <GlowPanel delay={1.1} className="p-5" glowColor="rgba(239,68,68,0.06)">
            <PanelHeader label="Standings" accent="#ef4444" />
            <MiniLeaderboard />
          </GlowPanel>

          {/* Tyre + Fuel */}
          <GlowPanel delay={1.25} className="p-5">
            <PanelHeader label="Car Status" accent="#eab308" />
            <div className="flex items-center justify-around mb-5">
              <TyreWidget compound={DRIVER.tyre} age={DRIVER.tyreAge} />
              <div className="w-px h-20 bg-white/5" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] tracking-widest text-white/40 uppercase font-bold">ERS</span>
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="absolute inset-0" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                    <motion.circle cx="32" cy="32" r="26" fill="none" stroke="#818cf8" strokeWidth="6"
                      strokeLinecap="round" strokeDasharray="163.36"
                      initial={{ strokeDashoffset: 163.36 }}
                      animate={{ strokeDashoffset: 163.36 * 0.22 }}
                      transform="rotate(-90 32 32)"
                      transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
                      style={{ filter: "drop-shadow(0 0 4px #818cf8)" }}
                    />
                  </svg>
                  <span className="text-xs font-black text-white font-mono">78%</span>
                </div>
                <div className="text-[9px] text-white/30 font-mono">DEPLOYED</div>
              </div>
            </div>
            <FuelWidget level={DRIVER.fuel} />
          </GlowPanel>

          {/* G-Force */}
          <GlowPanel delay={1.4} className="p-5">
            <PanelHeader label="G-Force" accent="#22d3ee" />
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "LATERAL", value: 4.8, max: 6, color: "#22d3ee" },
                { label: "LONGITUDINAL", value: -3.2, max: 6, color: "#ef4444" },
              ].map((g) => (
                <div key={g.label} className="text-center p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="text-[8px] tracking-widest text-white/30 uppercase mb-2">{g.label}</div>
                  <div className="text-xl font-black font-mono" style={{ color: g.color }}>
                    {g.value > 0 ? "+" : ""}{g.value}
                  </div>
                  <div className="text-[8px] text-white/20 mt-0.5">G</div>
                  <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: g.color, boxShadow: `0 0 6px ${g.color}` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(Math.abs(g.value) / g.max) * 100}%` }}
                      transition={{ delay: 2.0, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-3">
              {[
                { label: "CORNERS", value: "3", color: "#a855f7" },
                { label: "STRAIGHTS", value: "6", color: "#06b6d4" },
                { label: "CHICANES", value: "1", color: "#eab308" },
              ].map((item) => (
                <div key={item.label} className="flex-1 text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="text-[8px] text-white/30 uppercase tracking-widest">{item.label}</div>
                  <div className="text-sm font-black" style={{ color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>
          </GlowPanel>

          {/* Weather */}
          <GlowPanel delay={1.55} className="p-5">
            <PanelHeader label="Conditions" accent="#60a5fa" />
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { icon: "🌡️", label: "AIR TEMP", val: "22°C" },
                { icon: "🏎️", label: "TRACK", val: "38°C" },
                { icon: "💧", label: "HUMIDITY", val: "41%" },
              ].map((w) => (
                <motion.div
                  key={w.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  className="p-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="text-base mb-1">{w.icon}</div>
                  <div className="text-[8px] text-white/30 uppercase tracking-widest">{w.label}</div>
                  <div className="text-xs font-black text-white font-mono">{w.val}</div>
                </motion.div>
              ))}
            </div>
          </GlowPanel>
        </div>
      </main>

      {/* ── BOTTOM STATUS BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="relative z-20 px-6 py-2.5 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(5,13,26,0.6)" }}
      >
        <div className="flex items-center gap-4 text-[9px] font-bold tracking-widest text-white/25 uppercase">
          <span>System Online</span>
          <span className="text-cyan-400/40">●</span>
          <span>Data Stream: Live</span>
          <span className="text-cyan-400/40">●</span>
          <span>Latency: 12ms</span>
        </div>
        <motion.div
          className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest text-cyan-400/40"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          TELEMETRY ACTIVE
        </motion.div>
      </motion.div>
    </div>
  );
}
