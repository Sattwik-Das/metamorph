import { motion } from 'framer-motion';

export function SectionGetClicky() {
  return (
    <>
<motion.section className="relative -mb-20 flex h-[350px] flex-col items-center justify-center gap-6 px-4 md:mb-0 lg:h-[573px] lg:px-0" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}>
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
                <div className="relative z-10 flex w-full max-w-[360px] flex-col items-center gap-4 lg:w-auto lg:max-w-none lg:gap-6">
                  <a
                    href="https://apps.apple.com/app/apple-store/id1577975475"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full cursor-pointer rounded-full bg-button-primary px-8 py-5 text-center font-clicky-oracle text-[18px] text-inverted leading-none tracking-[-0.72px] transition-colors hover:bg-hover-primary lg:hidden"
                  >
                    Download for macOS
                  </a>
                  <a
                    className="hidden w-full cursor-pointer rounded-full bg-button-primary px-12 py-8 text-center font-clicky-oracle text-[58px] text-inverted leading-none tracking-[-2.32px] transition-colors hover:bg-hover-primary lg:block lg:w-auto"
                    href="/start"
                  >
                    Download for macOS
                  </a>
                  <button
                    type="button"
                    className="relative cursor-pointer select-none items-center justify-center gap-x-1 rounded-full transition-all disabled:cursor-default border border-primary text-primary hover:border-hover hover:bg-hover-tertiary disabled:text-quaternary disabled:hover:border-primary disabled:hover:bg-transparent h-14 px-6 py-4 font-medium text-body-large hidden bg-paper lg:flex"
                  >
                    <div className="contents">Download for macOS</div>
                  </button>
                </div>
              </motion.section>
    </>
  );
}
