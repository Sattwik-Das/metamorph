import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

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

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    // Optional: snap the initial position without springing so it appears right under cursor
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  }

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
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovered(false)}
          className="relative size-full bg-black cursor-none"
        >
          <motion.div
            className="absolute top-0 left-0 pointer-events-none z-50 flex items-start gap-4 transition-opacity duration-300"
            style={{ x: cursorX, y: cursorY, opacity: isHovered ? 1 : 0 }}
          >
            {/* Triangle Blue Pointer */}
            <svg 
              width="28" 
              height="40" 
              viewBox="0 0 24 36" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] origin-top-left -rotate-6"
            >
              <path 
                d="M11.2727 34.5802L1.83407 1.45524C1.39134 -0.0984803 3.19502 -1.14486 4.41724 -0.0450518L32.2217 24.9754C33.3916 26.0282 32.7844 27.9575 31.2292 28.1278L19.4678 29.4149C18.675 29.5017 17.9714 30.0125 17.6206 30.7513L12.9205 40.6496C12.2472 42.0678 10.1558 41.7774 9.94315 40.2442L8.53675 30.1065C8.42398 29.2936 7.82869 28.6189 7.04285 28.4116L1.83407 1.45524" 
                fill="#3b82f6" 
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="scale-50 origin-top-left"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
