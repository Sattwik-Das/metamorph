import { motion } from 'framer-motion';

export function SectionKnow() {
  return (
    <>
<motion.section className="mx-auto mt-32 md:mt-40 lg:mt-48 flex w-full max-w-[1300px] flex-col items-center gap-5 px-4 lg:flex-row lg:justify-center lg:gap-12 lg:px-0 xl:gap-[30px]" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}>
            <div className="flex w-full flex-1 justify-end">
              <h2 className="flex-1 text-center font-clicky-oracle text-[36px] text-primary leading-none tracking-[-1.44px] max-lg:mx-auto lg:max-w-[372px] lg:text-right lg:text-[66px] lg:tracking-[-2.64px]">
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>A&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>cursor&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>that&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>points&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>the&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>way.</span>
                </span>
              </h2>
            </div>
            <div
              className="relative h-[420px] w-full max-w-[360px] overflow-hidden rounded-xl lg:aspect-420/640 lg:h-auto lg:w-full lg:max-w-[360px] xl:max-w-[420px]"
            >
              <div className="absolute inset-0">
                <img
                  src="/hero1.png"
                  alt="A cursor that points the way"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="w-full flex-1">
              <p className="max-w-[330px] flex-1 text-center text-heading-medium text-secondary max-lg:mx-auto lg:max-w-[330px] lg:text-left lg:text-heading-large">
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>More&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>than&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>just&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>voice.&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>When&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>Claude&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>references&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>UI&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>elements,&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>Clickit's&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>blue&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>cursor&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>points&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>the&#xa0;</span>
                </span>
                <span className="inline-flex">
                  <span className="inline-block" style={{} as React.CSSProperties}>way.</span>
                </span>
              </p>
            </div>
          </motion.section>
    </>
  );
}
