import { motion, useScroll, useTransform, useMotionValue, useSpring, animate, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

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

  // Softer spring = smoother, more cinematic trailing cursor
  const cursorX = useSpring(mouseX, { stiffness: 40, damping: 25, mass: 1.2 });
  const cursorY = useSpring(mouseY, { stiffness: 40, damping: 25, mass: 1.2 });

  const [activeTarget, setActiveTarget] = useState<'folder' | 'code' | null>(null);

  // Automated animation — choreographed sequence
  useEffect(() => {
    let isActive = true;
    
    const runSequence = async () => {
      // Small initial delay
      await new Promise(r => setTimeout(r, 1000));
      
      while (isActive) {
        const el = containerRef.current;
        if (!el) return;
        const W = el.clientWidth;
        const H = el.clientHeight;

        // Move to Folder (approx 20% left, 30% top)
        animate(mouseX, W * 0.2 + 32, { duration: 1.5, ease: "easeInOut" });
        await animate(mouseY, H * 0.3 + 32, { duration: 1.5, ease: "easeInOut" });
        
        if (!isActive) break;
        setActiveTarget('folder');
        await new Promise(r => setTimeout(r, 3500)); // Hold and show summary
        
        if (!isActive) break;
        setActiveTarget(null);
        await new Promise(r => setTimeout(r, 500));
        
        // Move to Code File (approx 65% left, 55% top)
        animate(mouseX, W * 0.65 + 32, { duration: 1.5, ease: "easeInOut" });
        await animate(mouseY, H * 0.55 + 32, { duration: 1.5, ease: "easeInOut" });
        
        if (!isActive) break;
        setActiveTarget('code');
        await new Promise(r => setTimeout(r, 3500)); // Hold and show summary
        
        if (!isActive) break;
        setActiveTarget(null);
        await new Promise(r => setTimeout(r, 800));
      }
    };

    runSequence();

    return () => { isActive = false; };
  }, [mouseX, mouseY]);

  return (
    <div ref={ref} className="relative w-full flex flex-col items-center justify-center py-24 z-10 bg-paper">
      
      {/* Restored the exact original header UI */}

      <motion.div
        style={{ scale, opacity }}
        className="group/film pointer-events-auto overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-black/5 w-[85%] max-w-[1100px] aspect-[16/10]"
      >
        {/* Background Screenshot */}
        <div 
          ref={containerRef}
          className="relative size-full bg-gray-100 bg-[url('/hero1.png')] bg-cover bg-top bg-no-repeat"
        >
          {/* Subtle overlay so the cursor pops */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Mock UI Elements (Targets) */}
          <div className="absolute top-[30%] left-[20%] flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeTarget === 'folder' ? 'bg-blue-500/40 border border-blue-400/50 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/10 border border-white/10'}`}>
              <svg className={`w-8 h-8 transition-colors duration-500 ${activeTarget === 'folder' ? 'text-blue-300' : 'text-white/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <span className="text-white/80 text-[13px] font-medium drop-shadow-md">Assets</span>
          </div>

          <div className="absolute top-[55%] left-[65%] flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeTarget === 'code' ? 'bg-purple-500/40 border border-purple-400/50 scale-110 shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-white/10 border border-white/10'}`}>
              <svg className={`w-8 h-8 transition-colors duration-500 ${activeTarget === 'code' ? 'text-purple-300' : 'text-white/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span className="text-white/80 text-[13px] font-medium drop-shadow-md">App.tsx</span>
          </div>

          <motion.div
            className="absolute top-0 left-0 pointer-events-none z-50 flex items-start"
            style={{ x: cursorX, y: cursorY }}
          >
            {/* Click Ripple Effect */}
            <AnimatePresence>
              {activeTarget && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute -top-3 -left-3 w-8 h-8 bg-blue-400 rounded-full mix-blend-screen"
                />
              )}
            </AnimatePresence>

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
            <AnimatePresence>
              {activeTarget && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute top-8 left-6"
                >
                  {/* Dynamic Output Bubble */}
                  <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 drop-shadow-2xl w-[260px] shrink-0">
                    {activeTarget === 'folder' && (
                      <span className="text-white/95 text-[14px] leading-relaxed font-medium block">
                        Found <span className="text-blue-300">24 design assets</span> in this folder. 3 were added today.
                      </span>
                    )}
                    {activeTarget === 'code' && (
                      <span className="text-white/95 text-[14px] leading-relaxed font-medium block">
                        This is a <span className="text-purple-300">React component</span> using Framer Motion. 142 lines of code.
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
