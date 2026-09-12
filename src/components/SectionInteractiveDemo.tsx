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
      <button
        type="button"
        className="pointer-events-auto mb-7 flex cursor-pointer items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="size-6 text-secondary"
        >
          <path
            fill="currentColor"
            d="M8 17.221V6.779a.931.931 0 0 1 1.456-.77l7.657 5.222a.93.93 0 0 1 0 1.538L9.456 17.99A.931.931 0 0 1 8 17.221"
          />
        </svg>
        <p className="text-pretty text-body font-medium text-secondary">
          Watch our new film (ft. Odessa A&#x2019;zion)
        </p>
      </button>
      
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
              className="w-5 h-5 drop-shadow-md text-white fill-current stroke-black stroke-[1.5px]"
              viewBox="0 0 24 24"
              style={{ transform: 'translate(-5px, -5px)' }}
            >
              <path d="M4 2v20l6-6h10z" />
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
