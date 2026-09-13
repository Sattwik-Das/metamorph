import { Link } from 'react-router-dom';
export function Header() {
  return (
    <>
<header
          data-testid="topnav"
          className="sticky top-0 z-sticky flex h-(--layout-header-outer-height) w-full items-center justify-between gap-4 md:gap-18 px-4 py-4 md:py-6 text-primary motion-reduce:animate-none md:px-(--nav-padding-horizontal) pointer-events-none backdrop-blur-xl bg-[#f7f5f3]/70 border-b border-black/5"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-42"
            style={{} as React.CSSProperties}
          />
          <div className="pointer-events-auto relative flex min-w-0 items-center gap-5">
            <a
              data-testid="topnav-clicky-logo"
              className="flex h-8 shrink-0 items-center"
              style={{} as React.CSSProperties}
              href="/"
            >
              <div className="flex items-center gap-3">
                <img src="/logos/logo-image.png" alt="Logo Icon" className="h-10 md:h-14 w-auto object-contain brightness-0" />
                <img src="/logos/logotext.png" alt="Logo Text" className="h-7 md:h-9 w-auto object-contain hidden lg:block brightness-0 grayscale" />
              </div>
            </a>

            <div className="hidden h-(--layout-header-height) items-center gap-6 font-medium text-body-medium xl:flex">
              <a
                data-testid="desktop-nav-explore-link"
                className="relative text-secondary transition-colors focus-visible:outline-none hover:text-primary"
                href="/explore"
              >
                <span className="relative inline-flex w-fit">Explore</span>
              </a>
              <a
                className="relative text-secondary transition-colors focus-visible:outline-none hover:text-primary"
                href="/sequence"
              >
                <span className="relative inline-flex w-fit">Sequence</span>
              </a>
              <a
                className="relative text-secondary transition-colors focus-visible:outline-none hover:text-primary"
                href="/explore/shop"
              >
                <span className="relative inline-flex w-fit">Shop</span>
              </a>
              <a
                className="relative text-secondary transition-colors focus-visible:outline-none hover:text-primary"
                href="/careers"
              >
                <span className="relative inline-flex w-fit">Careers</span>
              </a>
            </div>
          </div>

          <div className="pointer-events-auto mx-1 flex items-center justify-self-end">
          </div>
        </header>
    </>
  );
}
