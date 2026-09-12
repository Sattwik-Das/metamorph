import { motion } from 'framer-motion';

export function SectionGetClicky() {
  return (
    <>
<motion.section className="relative -mb-20 flex h-[350px] flex-col items-center justify-center gap-6 px-4 md:mb-0 lg:h-[573px] lg:px-0" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}>
                <p className="relative z-10 text-center text-[40px] md:text-[56px] font-clicky-oracle text-primary leading-none tracking-[-1.52px] mb-8">
                  Work smartly with us.
                </p>
                <div className="relative z-10 flex w-full max-w-[360px] flex-col items-center gap-4 lg:w-auto lg:max-w-none lg:gap-6 mt-4">
                  <a
                    className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-[32px] bg-primary px-8 py-4 md:px-10 md:py-6 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)] hover:scale-[1.02]"
                    href="/start"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <svg
                      className="relative z-10 h-6 w-6 md:h-8 md:w-8 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 20.604c-1.748 0-3.328-.867-4.321-2.222-.888-1.21-1.394-2.883-1.464-4.838-.088-2.455.955-4.492 2.846-5.545 1.054-.588 2.227-.852 3.322-.746 1.407.135 2.72.77 3.738 1.802.164.168.163.438-.003.604l-1.077 1.076c-.161.161-.417.17-.589.02-.682-.593-1.638-.934-2.612-.907-1.37.037-2.616.719-3.268 1.782-.676 1.103-.96 2.47-.799 3.86.19 1.636 1.042 3.09 2.378 4.053.947.683 2.106 1.036 3.25 1.036 1.674 0 3.21-.832 4.093-2.222h-3.95c-.234 0-.425-.19-.425-.425v-1.65c0-.234.19-.424.425-.424h6.143c.234 0 .424.19.424.424v5.303c0 .235-.19.425-.424.425-.66 0-1.282-.128-1.85-.36a8.887 8.887 0 01-5.84 2.162z" />
                    </svg>
                    <span className="relative z-10 text-xl md:text-3xl font-semibold tracking-tight">
                      Download for macOS
                    </span>
                  </a>
                </div>
              </motion.section>
    </>
  );
}
