import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';

export function SectionInteractiveDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  // Scale from 0.8 to 1 as it scrolls into view
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  // Motion values for interactive mouse position
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(150);

  // Softer spring = slower, lazier trailing cursor
  const cursorX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 1 });
  const cursorY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 1 });

  // Automated animation — clamped inside container bounds
  useEffect(() => {
    let time = 0;
    const interval = setInterval(() => {
      time += 0.008;
      const el = containerRef.current;
      const W = el ? el.clientWidth - 40 : 760;
      const H = el ? el.clientHeight - 40 : 390;
      const cx = W / 2;
      const cy = H / 2;
      const x = cx + Math.sin(time) * (cx * 0.75) + Math.cos(time * 0.4) * (cx * 0.2);
      const y = cy + Math.sin(time * 0.7) * (cy * 0.7) + Math.cos(time * 0.3) * (cy * 0.2);
      mouseX.set(Math.max(10, Math.min(W, x)));
      mouseY.set(Math.max(10, Math.min(H, y)));
    }, 16);

    return () => clearInterval(interval);
  }, [mouseX, mouseY]);

  return (
    <div ref={ref} className="relative w-full flex flex-col items-center justify-center py-24 z-10 bg-paper">
      
      {/* Restored the exact original header UI */}

      <motion.div
        style={{ scale, opacity }}
        className="group/film pointer-events-auto overflow-hidden rounded-xl shadow-large w-[80%] max-w-[1000px] aspect-video"
      >
        {/* Pure Black Screen inside */}
        <div 
          ref={containerRef}
          className="relative size-full bg-black"
        >
          <motion.div
            className="absolute top-0 left-0 pointer-events-none z-50 flex items-start"
            style={{ x: cursorX, y: cursorY }}
          >
            {/* Standard OS arrow pointer cursor */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 32 32"
              className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] z-50 relative"
            >
              <polygon
                points="4,2 4,26 9.5,20.5 14,28 17,26.5 12.5,19 20,19"
                fill="white"
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            {/* Triangle Blue Pointer (Clickit Companion) */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <svg 
                className="w-4 h-4 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                style={{ transform: 'rotate(-45deg)' }}
              >
                <path d="M24 22L0 22L12 0L24 22Z" />
              </svg>
              
              {/* Optional Response Bubble next to it */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 flex items-center gap-2 drop-shadow-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-75"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse delay-150"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
