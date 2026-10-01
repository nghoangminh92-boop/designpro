import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

interface ShinyTextProps {
  text: string;
  className?: string;
  color?: string; // base color
  shineColor?: string; // sweep color
  speed?: number; // seconds per sweep
  spread?: number; // gradient angle in degrees
}

export default function ShinyText({
  text,
  className = "",
  color = "#64CEFB",
  shineColor = "#ffffff",
  speed = 3,
  spread = 100,
}: ShinyTextProps) {
  const reduceMotion = useReducedMotion();
  const [isPaused] = useState(false);
  const progress = useMotionValue(0); // 0 -> 100
  const elapsed = useRef(0);
  const lastTime = useRef<number | null>(null);

  useAnimationFrame((time) => {
    if (isPaused || reduceMotion) {
      lastTime.current = null;
      return;
    }
    if (lastTime.current === null) {
      lastTime.current = time;
      return;
    }
    elapsed.current += time - lastTime.current;
    lastTime.current = time;
    const duration = speed * 1000;
    progress.set(((elapsed.current % duration) / duration) * 100);
  });

  // Gradient is 200% wide; moving position 150% -> -50% sweeps the shine left to right.
  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: "200% auto",
        backgroundPosition,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
    >
      {text}
    </motion.span>
  );
}
