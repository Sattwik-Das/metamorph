import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(300);

  // Smooth springs for the cursor (trailing effect)
  const cursorX = useSpring(mouseX, { stiffness: 300, damping: 25, mass: 0.5 });
  const cursorY = useSpring(mouseY, { stiffness: 300, damping: 25, mass: 0.5 });

  // Automated animation
  useEffect(() => {
    let time = 0;
    const interval = setInterval(() => {
      time += 0.02;
      // Smooth complex movement pattern
      const x = 500 + Math.sin(time) * 350 + Math.cos(time * 0.5) * 100;
      const y = 300 + Math.sin(time * 1.5) * 200 + Math.cos(time * 0.8) * 50;
      mouseX.set(x);
      mouseY.set(y);
    }, 16); // 60fps

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
          className="relative size-full bg-black cursor-none"
        >
          <motion.div
            className="absolute top-0 left-0 pointer-events-none z-50 flex items-start"
            style={{ x: cursorX, y: cursorY }}
          >
            {/* Standard macOS-style cursor */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="black" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] z-50 relative"
            >
              <path d="M2.47 2.06 11.83 21.36c.33.67 1.34.6 1.58-.11l2.55-7.53 7.53-2.55c.71-.24.78-1.25.11-1.58L4.3 2.23c-.6-.3-1.28.25-1.12.89z"/>
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
