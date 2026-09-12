import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroPolaroids } from './HeroPolaroids';

export function Hero() {
  const words = ["AI companion", "AI buddy", "AI copilot", "AI sidekick"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
                  <img src="/logos/logotext.png" alt="Clickit" className="h-10 md:h-12 w-auto object-contain brightness-0 opacity-90" />
                  <h1 className="text-pretty text-center font-[350] text-[50px] md:text-[74px] text-primary leading-none tracking-[-3.7px]">
                    Your{' '}
                    <span className="inline-flex overflow-visible relative text-center">
                      <AnimatePresence mode="wait">
                        <motion.strong
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="font-bold text-center"
                        >
                          {words[index]}
                        </motion.strong>
                      </AnimatePresence>
                    </span>
                    <br />
                    for macOS
                  </h1>
                  <div className="mt-2.5">
                    <div className="flex gap-2">
                      <a
                        href="/start"
                        className="relative cursor-pointer select-none items-center justify-center gap-x-1 rounded-full border border-transparent transition-all disabled:cursor-default bg-button-primary text-inverted hover:bg-hover-primary disabled:bg-elevation disabled:text-tertiary disabled:hover:bg-elevation h-12 px-6 py-4 md:h-14 md:px-8 font-medium text-body-large flex"
                      >
                        <div className="contents">Download for macOS</div>
                      </a>
                    </div>
                  </div>

                  {/* App Compatibility Logos */}
                  <div className="mt-16 flex flex-col items-center">
                    <p className="text-secondary text-[12px] uppercase tracking-[0.1em] mb-6 font-medium">Works with all your apps</p>
                    <div className="flex gap-8 md:gap-12 items-center justify-center flex-wrap transition-all duration-700">
                      <img src="/images/apps/apple.svg" alt="Apple" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps2/chrome.svg" alt="Chrome" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps2/figma.svg" alt="Figma" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps2/slack.svg" alt="Slack" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps2/vscode.svg" alt="VS Code" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps2/whatsapp.svg" alt="WhatsApp" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps2/youtube.svg" alt="YouTube" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps2/gmail.svg" alt="Gmail" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps2/spotify.svg" alt="Spotify" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
                      <img src="/images/apps2/notion.png" alt="Notion" className="h-6 md:h-7 w-auto object-contain hover:scale-110 transition-transform duration-300 hover:opacity-100 opacity-70" />
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
