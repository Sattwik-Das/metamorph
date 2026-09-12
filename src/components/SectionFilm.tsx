import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function SectionFilm() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  // Scale from 0.8 to 1 as it scrolls into view
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div ref={ref} className="relative w-full flex flex-col items-center justify-center py-24 z-10 bg-paper">
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
        className="group/film pointer-events-auto cursor-pointer overflow-hidden rounded-xl shadow-large w-[80%] max-w-[1000px] aspect-video"
      >
        <div className="relative size-full bg-black/10">
          <video
            className="size-full object-cover"
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            src="https://cdn.sanity.io/files/ca81n2nu/production/e7b39f6041abcf18084a9e2760a920367eb77926.mp4"
          />
        </div>
      </motion.div>
    </div>
  );
}
