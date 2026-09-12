

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
            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-transparent p-1 transition-colors duration-200 ease-out">
              <a
                className="relative inline-flex cursor-pointer select-none items-center justify-center gap-x-1 rounded-full border border-transparent transition-all disabled:cursor-default h-10 px-4 md:h-12 md:px-6 md:py-4 font-medium text-body-medium text-secondary hover:bg-transparent hover:text-primary"
                type="button"
                data-testid="topnav-logged-out-sign-in-btn"
                href="/login"
              >
                <div className="contents">Log in</div>
              </a>
              <a
                className="relative inline-flex cursor-pointer select-none items-center justify-center gap-x-1 rounded-full border border-transparent transition-all disabled:cursor-default bg-button-primary text-inverted hover:bg-hover-primary disabled:bg-elevation disabled:text-tertiary disabled:hover:bg-elevation h-10 px-4 md:h-12 md:px-6 md:py-4 font-medium text-body-medium whitespace-nowrap"
                type="button"
                data-testid="topnav-logged-out-sign-up-btn"
                href="/start"
              >
                <div className="contents">Sign up</div>
              </a>
            </div>
          </div>
        </header>
    </>
  );
}
