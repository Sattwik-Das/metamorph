import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { SectionInteractiveDemo } from '../components/SectionInteractiveDemo';
import { SectionNewWorld } from '../components/SectionNewWorld';
import { SectionSearch } from '../components/SectionSearch';
import { SectionKnow } from '../components/SectionKnow';
import { SectionGetClicky } from '../components/SectionGetClicky';
import { SectionTeam } from '../components/SectionTeam';
import { SectionFAQ } from '../components/SectionFAQ';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <>
      <div id="S:0">
        <Header />
        <div data-landing={true}>
          <div className="relative">
            <Hero />
            <SectionInteractiveDemo />
          </div>
        </div>
        <SectionNewWorld />
        <SectionSearch />
        <SectionKnow />
        <SectionTeam />
        <SectionFAQ />
        <div className="relative overflow-hidden bg-paper">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[350px] lg:h-[573px]"
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div
            className="pointer-events-none absolute z-1 backdrop-blur-[10px] inset-x-0 bottom-40 md:bottom-24 lg:bottom-0 h-[500px] lg:h-[550px]"
          />
          <div className="mx-auto max-w-[1300px]">
            <SectionGetClicky />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
