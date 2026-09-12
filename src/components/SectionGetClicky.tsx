import { motion } from 'framer-motion';

export function SectionGetClicky() {
  return (
    <>
<motion.section className="relative -mb-20 flex h-[220px] flex-col items-center justify-center gap-6 px-4 md:mb-0 lg:h-[320px] lg:px-0" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}>
                <p className="relative z-10 text-center text-heading-medium text-primary lg:text-heading-large">
                  <span className="inline-flex">
                    <span className="inline-block" style={{} as React.CSSProperties}>Work&#xa0;</span>
                  </span>
                  <span className="inline-flex">
                    <span className="inline-block" style={{} as React.CSSProperties}>smarter&#xa0;</span>
                  </span>
                  <span className="inline-flex">
                    <span className="inline-block" style={{} as React.CSSProperties}>with&#xa0;</span>
                  </span>
                  <span className="inline-flex">
                    <span className="inline-block" style={{} as React.CSSProperties}>us.</span>
                  </span>
                </p>
                <div className="relative z-10 flex w-full max-w-[360px] flex-col items-center gap-4 lg:w-auto lg:max-w-none lg:gap-6 mt-4">
                  <a
                    className="w-full cursor-pointer rounded-full bg-button-primary px-8 py-5 text-center font-clicky-oracle text-3xl md:text-[58px] text-inverted leading-none tracking-[-2.32px] transition-colors hover:bg-hover-primary block lg:w-auto md:px-12 md:py-8"
                    href="/start"
                  >
                    Download for macOS
                  </a>
                </div>
              </motion.section>
    </>
  );
}
