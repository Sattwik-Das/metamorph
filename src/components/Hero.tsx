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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="89"
                    height="15"
                    viewBox="0 0 89 15"
                    fill="none"
                    className="h-auto w-25 text-primary"
                  >
                    <path
                      d="M83.5012 15C80.0429 15 77.7929 13.125 77.5012 10.3333H80.1887C80.6262 12 81.9804 12.625 83.5012 12.625C85.0637 12.625 86.1471 11.8542 86.1471 10.7708C86.1471 9.58333 85.2721 9.10417 83.3346 8.6875L82.0637 8.41667C79.9387 7.95833 77.9804 6.85417 77.9804 4.35417C77.9804 1.875 80.1262 0 83.2304 0C86.4387 0 88.2929 1.75 88.7512 4.47917H86.0637C85.7304 3.08333 84.7929 2.35417 83.2304 2.35417C81.6887 2.35417 80.7304 3.125 80.7304 4.14583C80.7304 5.1875 81.6054 5.60417 83.2929 6L84.5637 6.29167C86.8971 6.83333 88.9596 7.83333 88.9596 10.5208C88.9596 13.125 86.7929 15 83.5012 15Z"
                      fill="currentColor"
                    />
                    <path
                      d="M69.1056 15C64.9181 15 61.7097 11.8542 61.7097 7.5C61.7097 3.14583 64.9181 0 69.1056 0C73.2931 0 76.5014 3.14583 76.5014 7.5C76.5014 11.8542 73.2931 15 69.1056 15ZM69.1056 12.5C71.7931 12.5 73.6264 10.3125 73.6264 7.5C73.6264 4.6875 71.7931 2.5 69.1056 2.5C66.4181 2.5 64.5847 4.6875 64.5847 7.5C64.5847 10.3125 66.4181 12.5 69.1056 12.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M47.1996 14.6875H44.7205V0.3125H48.7621L52.408 11.0625L56.0955 0.3125H59.9705V14.6875H57.4705V3L53.5955 14.6875H51.1163L47.1996 2.9375V14.6875Z"
                      fill="currentColor"
                    />
                    <path
                      d="M37.366 15C33.9076 15 31.6576 13.125 31.366 10.3333H34.0535C34.491 12 35.8451 12.625 37.366 12.625C38.9285 12.625 40.0118 11.8542 40.0118 10.7708C40.0118 9.58333 39.1368 9.10417 37.1993 8.6875L35.9285 8.41667C33.8035 7.95833 31.8451 6.85417 31.8451 4.35417C31.8451 1.875 33.991 0 37.0951 0C40.3035 0 42.1576 1.75 42.616 4.47917H39.9285C39.5951 3.08333 38.6576 2.35417 37.0951 2.35417C35.5535 2.35417 34.5951 3.125 34.5951 4.14583C34.5951 5.1875 35.4701 5.60417 37.1576 6L38.4285 6.29167C40.7618 6.83333 42.8243 7.83333 42.8243 10.5208C42.8243 13.125 40.6576 15 37.366 15Z"
                      fill="currentColor"
                    />
                    <path
                      d="M22.9703 15C18.7828 15 15.5745 11.8542 15.5745 7.5C15.5745 3.14583 18.7828 0 22.9703 0C27.1578 0 30.3661 3.14583 30.3661 7.5C30.3661 11.8542 27.1578 15 22.9703 15ZM22.9703 12.5C25.6578 12.5 27.4911 10.3125 27.4911 7.5C27.4911 4.6875 25.6578 2.5 22.9703 2.5C20.2828 2.5 18.4495 4.6875 18.4495 7.5C18.4495 10.3125 20.2828 12.5 22.9703 12.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M7.39583 15C3.27083 15 0 11.8958 0 7.52083C0 3.16667 3.27083 0 7.39583 0C11.0417 0 13.8542 2.3125 14.5 5.75H11.6458C11.0833 3.83333 9.52083 2.5 7.39583 2.5C4.72917 2.5 2.875 4.625 2.875 7.5C2.875 10.3333 4.72917 12.5 7.39583 12.5C9.45833 12.5 11 11.2708 11.6042 9.45833H14.4792C13.7917 12.75 11.0208 15 7.39583 15Z"
                      fill="currentColor"
                    />
                  </svg>
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
