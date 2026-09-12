import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const apps = [
  // Background layer
  { src: '/images/apps2/whatsapp.svg', cls: 'top-[5%] left-[15%] w-[60px]', rot: -15, speed: 0.1, op: 0.5, scale: 0.75 },
  { src: '/images/apps2/youtube.svg', cls: 'top-[12%] left-[28%] w-[80px]', rot: 8, speed: -0.05, op: 0.6, scale: 0.8 },
  { src: '/images/apps2/figma.svg', cls: 'top-[8%] right-[25%] w-[70px]', rot: -5, speed: 0.05, op: 0.4, scale: 0.7 },
  { src: '/images/apps2/chrome.svg', cls: 'top-[20%] right-[10%] w-[90px]', rot: 12, speed: 0.15, op: 0.55, scale: 0.85 },
  
  // Midground layer
  { src: '/images/apps2/slack.svg', cls: 'top-[50%] left-[18%] w-[80px]', rot: 5, speed: 0.12, op: 0.7, scale: 0.85 },
  { src: '/images/apps2/vscode.svg', cls: 'top-[65%] left-[8%] w-[100px]', rot: -12, speed: -0.05, op: 0.9, scale: 1 },
  { src: '/images/apps2/gmail.svg', cls: 'bottom-[10%] left-[22%] w-[70px]', rot: 10, speed: 0.15, op: 0.75, scale: 0.9 },
  
  // Foreground layer
  { src: '/images/apps2/spotify.svg', cls: 'top-[40%] right-[5%] w-[90px]', rot: -15, speed: -0.15, op: 1, scale: 1.1 },
  { src: '/images/apps2/notion.png', cls: 'bottom-[15%] right-[25%] w-[80px]', rot: 14, speed: 0.1, op: 0.8, scale: 1 },
];

export function HeroPolaroids() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 75%)',
        }}
      >
        {apps.map((p, i) => {
          const y = useTransform(scrollY, [0, 1000], [0, 1000 * p.speed]);
          return (
            <motion.div
              key={i}
              className={`absolute ${p.cls} flex items-center justify-center filter drop-shadow-xl`}
              style={{ y, rotate: p.rot, opacity: p.op, scale: p.scale }}
              initial={{ opacity: 0, scale: p.scale * 0.8 }}
              animate={{ opacity: p.op, scale: p.scale }}
              transition={{ duration: 0.8, delay: i * 0.05 + 0.2 }}
            >
              <img src={p.src} alt="App Logo" className="w-full h-auto object-contain" />
            </motion.div>
          );
        })}
      </div>
      
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(247, 245, 243, 0.95) 0%, transparent 65%)'
        }}
      />
    </div>
  );
}
