import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const polaroids = [
  // Background layer (smaller, faded, slower)
  { src: '/images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212.png', cls: 'top-[5%] left-[15%] w-[9%]', rot: -15, speed: 0.1, op: 0.5, scale: 0.75 },
  { src: '/images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312.png', cls: 'top-[12%] left-[28%] w-[6%]', rot: 8, speed: -0.05, op: 0.6, scale: 0.8 },
  { src: '/images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560.png', cls: 'top-[8%] right-[25%] w-[8%]', rot: -5, speed: 0.05, op: 0.4, scale: 0.7 },
  { src: '/images/503c057fa2b78012af824220976153651323efca-764x1644.png', cls: 'top-[20%] right-[10%] w-[10%]', rot: 12, speed: 0.15, op: 0.55, scale: 0.85 },
  
  // Midground layer (medium size, medium fade)
  { src: '/images/8f5934850f4844c6be14461b7e5f320edf17e9a4-692x1272.png', cls: 'top-[30%] left-[5%] w-[8%]', rot: -8, speed: -0.1, op: 0.8, scale: 0.9 },
  { src: '/images/f10cbd2c6ea56eac0c3bb67bc4af5f46c85d8b8b-892x720.png', cls: 'top-[50%] left-[18%] w-[5%]', rot: 5, speed: 0.12, op: 0.7, scale: 0.85 },
  { src: '/images/cc559a567335ab21050449cb02abc0396098914f-512x948.png', cls: 'top-[65%] left-[8%] w-[7%]', rot: -12, speed: -0.05, op: 0.9, scale: 1 },
  { src: '/images/94edc31a29bbceb45c81e29287fb87b834801830-748x820.png', cls: 'bottom-[10%] left-[22%] w-[6%]', rot: 10, speed: 0.15, op: 0.75, scale: 0.9 },
  
  // Foreground layer (larger, more opaque, faster)
  { src: '/images/39c94d292621915bf40a76e1c84fca7f62f29906-628x1056.png', cls: 'top-[40%] right-[5%] w-[7%]', rot: -15, speed: -0.15, op: 1, scale: 1.1 },
  { src: '/images/f4c96e1a6cb9852333a5ee6c30bb63f90799b346-1600x2080.png', cls: 'top-[55%] right-[20%] w-[5%]', rot: 8, speed: 0.2, op: 0.85, scale: 1.05 },
  { src: '/images/d9255cba26dced830cc18620632e3fad27b760bc-1680x2560.png', cls: 'top-[75%] right-[8%] w-[8%]', rot: -6, speed: -0.12, op: 0.95, scale: 1.15 },
  { src: '/images/260ba59928327fbf2676087b34c19bcd956b38f9-1680x2560.png', cls: 'bottom-[15%] right-[25%] w-[6%]', rot: 14, speed: 0.1, op: 0.8, scale: 1 },
  
  // Center / Random Fill (very faded since they are near center)
  { src: '/images/75a47a525bb28b1ec5097d51f3574edb5667af0e-1680x2560.png', cls: 'top-[80%] left-[35%] w-[7%]', rot: -9, speed: -0.18, op: 0.4, scale: 0.7 },
  { src: '/images/b8892b9c83e75c405aa91441cfd875a86e137c60-83x60.svg', cls: 'top-[75%] right-[40%] w-[6%]', rot: 4, speed: 0.14, op: 0.5, scale: 0.8 },
  { src: '/images/307beb34748e14fe2c5842bbad7f6edd21f18285-113x60.svg', cls: 'top-[25%] left-[40%] w-[5%]', rot: -3, speed: -0.11, op: 0.45, scale: 0.75 },
  { src: '/images/3925ff5d4cd3607efc9006fe25660c31d663f9db-58x60.svg', cls: 'top-[22%] right-[40%] w-[6%]', rot: 11, speed: 0.09, op: 0.35, scale: 0.65 }
];

export function HeroPolaroids() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Floating Gallery Container with CSS Mask for center cutout */}
      <div 
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(ellipse at center, transparent 25%, black 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 25%, black 75%)',
        }}
      >
        {polaroids.map((p, i) => {
          // Move y up or down based on scroll
          const y = useTransform(scrollY, [0, 1000], [0, 1000 * p.speed]);
          return (
            <motion.div
              key={i}
              className={`absolute ${p.cls} rounded-[18px] shadow-2xl overflow-hidden`}
              style={{ y, rotate: p.rot, opacity: p.op, scale: p.scale }}
              initial={{ opacity: 0, scale: p.scale * 0.8 }}
              animate={{ opacity: p.op, scale: p.scale }}
              transition={{ duration: 0.8, delay: i * 0.05 + 0.2 }}
            >
              <img src={p.src} alt="Floating inspiration" className="w-full h-auto object-cover" />
            </motion.div>
          );
        })}
      </div>
      
      {/* Radial Vignette Overlay for blending */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(247, 245, 243, 0.95) 0%, transparent 65%)'
        }}
      />
    </div>
  );
}
