import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SectionNewWorld } from './components/SectionNewWorld';
import { SectionSearch } from './components/SectionSearch';
import { SectionKnow } from './components/SectionKnow';
import { SectionExplore } from './components/SectionExplore';
import { SectionGetCosmos } from './components/SectionGetCosmos';
import { Footer } from './components/Footer';
import './live.css';

export default function App() {
  return (
    <>
      <div id="S:0">
        <Header />
        <div data-landing={true}>
          <div className="relative">
            <Hero />
            <div
              className="relative h-[130dvh] -translate-y-24"
              style={{} as React.CSSProperties}
            >
              <div
                className="pointer-events-none sticky top-[calc(var(--layout-header-outer-height)+38px)] -mb-[calc(var(--layout-header-outer-height)+96px)] flex h-dvh flex-col items-center justify-start"
                style={{} as React.CSSProperties}
              >
                <div
                  className="relative flex flex-col items-center justify-center"
                  style={{} as React.CSSProperties}
                >
                  <button
                    type="button"
                    className="pointer-events-auto mb-7 flex cursor-pointer items-center gap-2"
                    style={{} as React.CSSProperties}
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
                  <div
                    className="group/film pointer-events-auto cursor-pointer overflow-hidden rounded-xl shadow-large"
                    style={{} as React.CSSProperties}
                  >
                    <div className="relative size-full">
                      <video
                        className="h-full w-auto"
                        preload="metadata"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <SectionNewWorld />
          <SectionSearch />
          <SectionKnow />
          <SectionExplore />
          <div className="relative mt-50 overflow-hidden bg-paper lg:mt-75">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[350px] lg:h-[573px]"
              style={{} as React.CSSProperties}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{} as React.CSSProperties}
              />
            </div>
            <div
              className="pointer-events-none absolute z-1 backdrop-blur-[10px] inset-x-0 bottom-40 md:bottom-24 lg:bottom-0 h-[500px] lg:h-[550px]"
              style={{} as React.CSSProperties}
            />
            <div className="mx-auto max-w-[1300px]">
              <SectionGetCosmos />
              <Footer />
            </div>
          </div>
        </div>
    </>
  );
}
