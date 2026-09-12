import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function SectionNewWorld() {

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <>
<motion.section className="relative z-1 mt-50 flex flex-col items-center px-4 lg:mt-30" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}>
            <h2 className="max-w-[942px] text-center text-[36px] text-primary leading-[1.08] tracking-[-1.44px] lg:text-[66px] lg:tracking-[-2.64px]">
              <span className="inline-flex">
                <span
                  className="inline-block"
                  style={{} as React.CSSProperties}
                >
                  Every&#xa0;
                </span>
              </span>
              <span className="inline-flex">
                <span
                  className="inline-block"
                  style={{} as React.CSSProperties}
                >
                  search&#xa0;
                </span>
              </span>
              <span className="inline-flex">
                <span
                  className="inline-block"
                  style={{} as React.CSSProperties}
                >
                  opens&#xa0;
                </span>
              </span>
              <span className="inline-flex">
                <span
                  className="inline-block"
                  style={{} as React.CSSProperties}
                >
                  a&#xa0;
                </span>
              </span>
              <span className="inline-flex">
                <span
                  className="inline-block"
                  style={{} as React.CSSProperties}
                >
                  new&#xa0;
                </span>
              </span>
              <span className="inline-flex">
                <span
                  className="inline-block"
                  style={{} as React.CSSProperties}
                >
                  world.
                </span>
              </span>
            </h2>
            <div
              className="relative mt-[30px] h-[400px] w-full max-w-[1300px] overflow-hidden rounded-xl lg:mt-15 lg:h-[420px] 2xl:h-[540px]"
              style={{} as React.CSSProperties}
            >
              <div
                className="absolute inset-0"
                style={{} as React.CSSProperties}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[540px] w-full scale-[0.85] lg:scale-100">
                  <div
                    className="absolute inset-0"
                    style={{} as React.CSSProperties}
                  >
                    <motion.div style={{ y: y1 }} className="absolute left-1/2 -translate-x-1/2 top-[-146px] w-[232px] h-[291px] lg:translate-x-0 lg:left-[5.8%] lg:top-[13.3%] lg:w-[24.3%] lg:h-[73.1%] overflow-hidden">
                      <picture className="contents">
                        <source
                          type="image/avif"
                          srcSet="/images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_256.png 256w, /images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_384.png 384w, /images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_640.png 640w, /images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_828.png 828w"
                          sizes="(min-width: 1024px) 25vw, 260px"
                        />
                        <source
                          type="image/webp"
                          srcSet="/images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_256.webp 256w, /images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_384.webp 384w, /images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_640.webp 640w, /images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_828.webp 828w"
                          sizes="(min-width: 1024px) 25vw, 260px"
                        />
                        <img
                          className="absolute inset-0 size-full object-cover"
                          decoding="async"
                          loading="lazy"
                          alt=""
                          src="/images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_828.jpg"
                          srcSet="/images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_256.jpg 256w, /images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_384.jpg 384w, /images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_640.jpg 640w, /images/4400bda550b1fb82e286777fd39f62d24c7daa5a-1516x2212_828.jpg 828w"
                          sizes="(min-width: 1024px) 25vw, 260px"
                        />
                      </picture>
                    </motion.div>
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{} as React.CSSProperties}
                  >
                    <motion.div style={{ y: y2 }} className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[161px] h-[202px] lg:translate-x-0 lg:translate-y-0 lg:left-[40.3%] lg:top-[22.6%] lg:w-[18.2%] lg:h-[54.8%] overflow-hidden">
                      <picture className="contents">
                        <source
                          type="image/avif"
                          srcSet="/images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_256.png 256w, /images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_384.png 384w, /images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_640.png 640w, /images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_828.png 828w"
                          sizes="(min-width: 1024px) 25vw, 260px"
                        />
                        <source
                          type="image/webp"
                          srcSet="/images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_256.webp 256w, /images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_384.webp 384w, /images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_640.webp 640w, /images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_828.webp 828w"
                          sizes="(min-width: 1024px) 25vw, 260px"
                        />
                        <img
                          className="absolute inset-0 size-full object-cover"
                          decoding="async"
                          loading="lazy"
                          alt=""
                          src="/images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_828.jpg"
                          srcSet="/images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_256.jpg 256w, /images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_384.jpg 384w, /images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_640.jpg 640w, /images/debf547a545661eaf7e4e7b3b6cff1e40ab7a18b-1048x1312_828.jpg 828w"
                          sizes="(min-width: 1024px) 25vw, 260px"
                        />
                      </picture>
                    </motion.div>
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{} as React.CSSProperties}
                  >
                    <motion.div style={{ y: y3 }} className="absolute left-1/2 -translate-x-1/2 top-[395px] w-[256px] h-[319px] lg:translate-x-0 lg:left-[69.9%] lg:top-[14.1%] lg:w-[23.8%] lg:h-[71.7%] overflow-hidden">
                      <picture className="contents">
                        <source
                          type="image/avif"
                          srcSet="/images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_256.png 256w, /images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_384.png 384w, /images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_640.png 640w, /images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_828.png 828w"
                          sizes="(min-width: 1024px) 25vw, 260px"
                        />
                        <source
                          type="image/webp"
                          srcSet="/images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_256.webp 256w, /images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_384.webp 384w, /images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_640.webp 640w, /images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_828.webp 828w"
                          sizes="(min-width: 1024px) 25vw, 260px"
                        />
                        <img
                          className="absolute inset-0 size-full object-cover"
                          decoding="async"
                          loading="lazy"
                          alt=""
                          src="/images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_828.jpg"
                          srcSet="/images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_256.jpg 256w, /images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_384.jpg 384w, /images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_640.jpg 640w, /images/3b58bec33141d2e8e26750651711b0ed3ea352c9-1040x1560_828.jpg 828w"
                          sizes="(min-width: 1024px) 25vw, 260px"
                        />
                      </picture>
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 isolate z-2 flex items-center justify-center">
                <div className="flex h-[54px] w-[272px] items-center gap-2 overflow-hidden rounded-full border border-primary/18 bg-black/20 px-5 backdrop-blur-[30px] lg:w-[414px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="size-[18px] text-inverted"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="1.75"
                      d="M20.25 20.25 16 16"
                    />
                    <circle
                      cx="10.75"
                      cy="10.75"
                      r="7.5"
                      stroke="currentColor"
                      strokeWidth="1.754"
                    />
                  </svg>
                  <span
                    className="inline-flex h-full items-center whitespace-nowrap text-body-large text-inverted"
                    style={{} as React.CSSProperties}
                  >
                    future home
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-[30px] max-w-[520px] text-center text-heading-medium text-secondary leading-[1.2] lg:mt-[54px] lg:text-heading-large">
              <p>
                <span className="inline-flex">
                  <span
                    className="inline-block"
                    style={{} as React.CSSProperties}
                  >
                    Your&#xa0;
                  </span>
                </span>
                <span className="inline-flex">
                  <span
                    className="inline-block"
                    style={{} as React.CSSProperties}
                  >
                    collections,&#xa0;
                  </span>
                </span>
                <span className="inline-flex">
                  <span
                    className="inline-block"
                    style={{} as React.CSSProperties}
                  >
                    your&#xa0;
                  </span>
                </span>
                <span className="inline-flex">
                  <span
                    className="inline-block"
                    style={{} as React.CSSProperties}
                  >
                    references,&#xa0;
                  </span>
                </span>
                <span className="inline-flex">
                  <span
                    className="inline-block"
                    style={{} as React.CSSProperties}
                  >
                    your&#xa0;
                  </span>
                </span>
                <span className="inline-flex">
                  <span
                    className="inline-block"
                    style={{} as React.CSSProperties}
                  >
                    taste.&#xa0;
                  </span>
                </span>
                <span className="inline-flex">
                  <span
                    className="inline-block"
                    style={{} as React.CSSProperties}
                  >
                    Connected,&#xa0;
                  </span>
                </span>
                <span className="inline-flex">
                  <span
                    className="inline-block"
                    style={{} as React.CSSProperties}
                  >
                    searchable,&#xa0;
                  </span>
                </span>
                <span className="inline-flex">
                  <span
                    className="inline-block"
                    style={{} as React.CSSProperties}
                  >
                    yours.
                  </span>
                </span>
              </p>
            </div>
          </motion.section>
    </>
  );
}
