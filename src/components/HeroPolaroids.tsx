import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const apps = [
  // Background layer
  { src: '/images/apps2/whatsapp.svg', cls: 'top-[5%] left-[15%] w-[60px]', rot: -15, speed: 0.1, op: 0.8, scale: 0.75 },
  { src: '/images/apps2/youtube.svg', cls: 'top-[12%] left-[28%] w-[80px]', rot: 8, speed: -0.05, op: 0.9, scale: 0.8 },
  { src: '/images/apps2/figma.svg', cls: 'top-[8%] right-[25%] w-[70px]', rot: -5, speed: 0.05, op: 0.7, scale: 0.7 },
  { src: '/images/apps2/chrome.svg', cls: 'top-[20%] right-[10%] w-[90px]', rot: 12, speed: 0.15, op: 0.85, scale: 0.85 },
  { src: '/images/apps2/reddit.svg', cls: 'top-[25%] left-[5%] w-[50px]', rot: -20, speed: 0.08, op: 0.6, scale: 0.7 },
  { src: '/images/apps/apple.svg', cls: 'top-[15%] right-[35%] w-[45px]', rot: 10, speed: 0.1, op: 0.5, scale: 0.6 },
  { src: '/images/apps2/slack.svg', cls: 'top-[2%] right-[45%] w-[55px]', rot: -12, speed: -0.1, op: 0.6, scale: 0.65 },
  { src: '/images/apps2/spotify.svg', cls: 'top-[30%] right-[28%] w-[65px]', rot: 25, speed: 0.12, op: 0.7, scale: 0.75 },
  { src: '/images/apps2/vscode.svg', cls: 'bottom-[35%] left-[12%] w-[75px]', rot: -15, speed: 0.09, op: 0.8, scale: 0.7 },
  { src: '/images/apps2/gmail.svg', cls: 'bottom-[40%] right-[15%] w-[60px]', rot: 5, speed: -0.15, op: 0.65, scale: 0.75 },
  { src: '/images/apps2/notion.png', cls: 'top-[45%] left-[25%] w-[85px]', rot: 18, speed: 0.11, op: 0.85, scale: 0.8 },
  { src: '/images/apps/figma.svg', cls: 'bottom-[20%] right-[40%] w-[50px]', rot: -8, speed: 0.07, op: 0.55, scale: 0.65 },
  
  // Midground layer
  { src: '/images/apps2/slack.svg', cls: 'top-[50%] left-[18%] w-[80px]', rot: 5, speed: 0.12, op: 0.9, scale: 0.85 },
  { src: '/images/apps2/vscode.svg', cls: 'top-[65%] left-[8%] w-[100px]', rot: -12, speed: -0.05, op: 1, scale: 1 },
  { src: '/images/apps2/gmail.svg', cls: 'bottom-[10%] left-[22%] w-[70px]', rot: 10, speed: 0.15, op: 0.95, scale: 0.9 },
  { src: '/images/apps2/maps.svg', cls: 'top-[75%] left-[32%] w-[65px]', rot: -8, speed: 0.06, op: 0.8, scale: 0.8 },
  { src: '/images/apps2/applemusic.svg', cls: 'top-[45%] right-[18%] w-[75px]', rot: 15, speed: 0.1, op: 0.75, scale: 0.85 },
  { src: '/images/apps2/safari.svg', cls: 'bottom-[25%] left-[5%] w-[55px]', rot: 25, speed: -0.1, op: 0.65, scale: 0.75 },
  { src: '/images/apps2/youtube.svg', cls: 'bottom-[15%] right-[38%] w-[70px]', rot: -14, speed: 0.13, op: 0.85, scale: 0.85 },
  { src: '/images/apps2/chrome.svg', cls: 'top-[35%] left-[5%] w-[65px]', rot: 12, speed: 0.08, op: 0.7, scale: 0.75 },
  { src: '/images/apps2/whatsapp.svg', cls: 'top-[55%] right-[32%] w-[55px]', rot: -22, speed: -0.11, op: 0.6, scale: 0.8 },
  { src: '/images/apps/apple.svg', cls: 'bottom-[45%] left-[38%] w-[50px]', rot: 5, speed: 0.05, op: 0.55, scale: 0.7 },
  
  // Foreground layer
  { src: '/images/apps2/spotify.svg', cls: 'top-[40%] right-[5%] w-[90px]', rot: -15, speed: -0.15, op: 1, scale: 1.1 },
  { src: '/images/apps2/notion.png', cls: 'bottom-[15%] right-[25%] w-[80px]', rot: 14, speed: 0.1, op: 1, scale: 1 },
  { src: '/images/apps/figma.svg', cls: 'bottom-[5%] right-[10%] w-[95px]', rot: -5, speed: 0.18, op: 0.9, scale: 1.05 },
  { src: '/images/apps2/chrome.svg', cls: 'top-[60%] right-[8%] w-[60px]', rot: 20, speed: -0.08, op: 0.7, scale: 0.8 },
  { src: '/images/apps2/reddit.svg', cls: 'bottom-[35%] right-[4%] w-[75px]', rot: -18, speed: 0.14, op: 0.9, scale: 1 },
  { src: '/images/apps2/maps.svg', cls: 'top-[10%] left-[2%] w-[85px]', rot: 8, speed: -0.12, op: 0.85, scale: 0.95 },
  { src: '/images/apps2/slack.svg', cls: 'bottom-[55%] left-[45%] w-[90px]', rot: -5, speed: 0.1, op: 0.95, scale: 1.05 },
  { src: '/images/apps2/applemusic.svg', cls: 'top-[85%] right-[15%] w-[70px]', rot: 15, speed: -0.15, op: 0.8, scale: 0.85 },
];

export function HeroPolaroids() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div 
        className="absolute inset-0"
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
          background: 'radial-gradient(circle at center, rgba(247, 245, 243, 0.95) 0%, transparent 80%)'
        }}
      />
    </div>
  );
}
