import { motion } from 'framer-motion';
import { HeroPolaroids } from './HeroPolaroids';

export function Hero() {
  return (
    <>
<motion.section className="sticky top-0 z-0 -mt-(--layout-header-outer-height) flex h-dvh flex-col items-center justify-center overflow-hidden bg-paper" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}>
              <div
                className="pointer-events-none absolute -left-[10%] h-screen w-[120%]"
                style={{} as React.CSSProperties}
              >
                <div
                  className="absolute inset-0"
                  style={{} as React.CSSProperties}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[30%]"
                    style={{} as React.CSSProperties}
                  />
                  <HeroPolaroids />
                </div>
              </div>
              <div style={{} as React.CSSProperties}>
                <div
                  className="relative z-10 flex flex-col items-center gap-5"
                  style={{} as React.CSSProperties}
                >
                  <img src="/logos/logotext.png" alt="Clickit" className="h-6 md:h-8 w-auto object-contain brightness-0 opacity-90" />
                  <h1 className="text-pretty text-center font-[350] text-[74px] text-primary leading-none tracking-[-3.7px]">
                    Your AI companion
                    <br />
                    for macOS
                  </h1>
                  <div className="mt-2.5">
                    <div className="flex gap-2">
                      <a
                        href="https://apps.apple.com/app/apple-store/id1577975475"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Get the app"
                        className="relative inline-flex cursor-pointer select-none items-center justify-center gap-x-1 rounded-full border border-transparent transition-all disabled:cursor-default bg-button-primary text-inverted hover:bg-hover-primary disabled:bg-elevation disabled:text-tertiary disabled:hover:bg-elevation h-12 px-6 py-4 font-medium text-button-medium lg:hidden"
                        type="button"
                      >
                        Get the app
                      </a>
                      <a
                        className="relative cursor-pointer select-none items-center justify-center gap-x-1 rounded-full border border-transparent transition-all disabled:cursor-default bg-button-primary text-inverted hover:bg-hover-primary disabled:bg-elevation disabled:text-tertiary disabled:hover:bg-elevation h-14 px-6 py-4 font-medium text-body-large hidden lg:flex"
                        type="button"
                        href="/start"
                      >
                        <div className="contents">Sign up</div>
                      </a>
                      <button
                        type="button"
                        className="relative cursor-pointer select-none items-center justify-center gap-x-1 rounded-full transition-all disabled:cursor-default border border-primary bg-transparent text-primary hover:border-hover hover:bg-hover-tertiary disabled:text-quaternary disabled:hover:border-primary disabled:hover:bg-transparent h-14 px-6 py-4 font-medium text-body-large hidden lg:flex"
                      >
                        <div className="contents">Download for macOS</div>
                      </button>
                    </div>
                  </div>

                  {/* App Compatibility Logos */}
                  <div className="mt-16 flex flex-col items-center">
                    <p className="text-secondary text-[12px] uppercase tracking-[0.1em] mb-6 font-medium">Works with all your apps</p>
                    <div className="flex gap-8 md:gap-12 items-center justify-center flex-wrap opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                      <img src="/images/apps/apple.svg" alt="Apple" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps/googlechrome.svg" alt="Chrome" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps/safari.svg" alt="Safari" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps/notion.svg" alt="Notion" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps/figma.svg" alt="Figma" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                    </div>
                  </div>

                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[308px]"
                style={{} as React.CSSProperties}
              />
            </motion.section>
    </>
  );
}
