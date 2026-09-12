import { motion } from 'framer-motion';

export function Header() {
  return (
    <>
<header
          data-testid="topnav"
          className="sticky top-0 z-sticky hidden h-(--layout-header-outer-height) w-full items-center justify-between gap-18 px-3 py-6 text-primary motion-reduce:animate-none md:flex md:px-(--nav-padding-horizontal) pointer-events-none"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-42"
            style={{} as React.CSSProperties}
          />
          <div className="pointer-events-auto relative flex min-w-0 items-center gap-5">
            <a
              data-testid="topnav-clicky-logo"
              className="hidden h-8 shrink-0 items-center md:flex"
              style={{} as React.CSSProperties}
              href="/"
            >
              <div className="flex items-center gap-2">
                <img src="/logos/logo-image.png" alt="Logo Icon" className="h-8 w-auto object-contain" />
                <img src="/logos/logotext.png" alt="Logo Text" className="h-5 w-auto object-contain hidden lg:block grayscale brightness-0 opacity-90" />
              </div>
            </a>
            <button
              type="button"
              tabIndex={0}
              aria-haspopup="menu"
              id="base-ui-_R_1n7epfivallb_"
              data-testid="tablet-nav-menu-trigger"
              className="outline-none relative z-elevated h-(--layout-header-height) font-medium text-body-medium duration-200 ease-out hover:bg-transparent data-popup-open:bg-transparent xl:hidden flex items-center gap-1.5 text-primary transition-colors"
            >
              <span className="text-pretty text-body-medium line-clamp-1 max-w-[12ch] text-ellipsis text-left font-medium capitalize">
                Menu
              </span>
              <svg viewBox="0 0 24 24" className="size-4">
                <title>Open</title>
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  d="M4.25 9.25 L12 17 L19.75 9.25"
                />
              </svg>
            </button>
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
          <div className="absolute inset-0 mx-auto hidden max-w-150 items-center justify-center md:flex">
            <div
              className="pointer-events-auto flex h-(--layout-header-height) w-80 items-center rounded-full font-medium text-body-large transition-shadow duration-300 ease-out-quint lg:w-114 shadow-small"
              style={{} as React.CSSProperties}
            >
              <div
                data-list-empty={true}
                role="combobox"
                tabIndex={0}
                id="base-ui-_R_1pepfivallb_"
                aria-expanded="false"
                aria-haspopup="dialog"
                data-testid="global-search-input"
                data-search-container={true}
                className="relative -mr-[0.5px] flex h-full w-full flex-1 items-center gap-2 rounded-full border border-primary bg-light-elevation p-2 transition-[color,background-color,border-color,box-shadow,backdrop-filter] max-md:shadow-small inset-shadow-glass group z-modal cursor-text hover:bg-hover-tertiary"
              >
                <div className="flex shrink-0 items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    data-testid="search-page-search-icon"
                    className="mr-0.5 ml-2 size-5 shrink-0 text-tertiary transition-colors"
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
                </div>
                <div className="relative flex min-w-0 flex-1">
                  <input
                    data-list-empty={true}
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    autoCapitalize="none"
                    role="combobox"
                    aria-expanded="false"
                    aria-haspopup="listbox"
                    aria-autocomplete="list"
                    id="base-ui-_R_1pepfivallb_"
                    data-testid="search-page-input"
                    className="size-full font-normal outline-none placeholder:text-tertiary autofill:shadow-[0_0_0px_1000px_var(--background-color-primary)_inset]! focus-visible:rounded-none! data-com-onepassword-filled:shadow-[0_0_0px_1000px_var(--background-color-primary)_inset]! relative z-1 w-full select-text bg-transparent text-body-regular text-primary transition-colors"
                    name="search"
                    defaultValue=""
                  />
                  <span
                    className="text-pretty font-normal text-body-small pointer-events-none absolute top-1/2 left-0 max-w-full -translate-y-1/2 truncate whitespace-nowrap text-tertiary transition-colors group-hover:text-secondary"
                    style={{}}
                  />
                </div>
                <div className="flex items-center" data-search-triggers={true}>
                  <button
                    type="button"
                    data-search-panel-trigger={true}
                    data-testid="search-page-search-by-image-btn"
                    className="group/visual cursor-pointer rounded-full"
                    id="base-ui-_R_fljdpepfivallb_"
                    data-base-ui-tooltip-trigger=""
                  >
                    <div className="relative flex size-8.5 items-center justify-center rounded-full transition-colors hover:bg-hover-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="size-6 shrink-0 text-tertiary transition-colors group-hover/visual:text-primary"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth="1.75"
                          d="M9 4h-.2c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C4 6.28 4 7.12 4 8.8V9m11-5h.2c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 6.28 20 7.12 20 8.8V9M9 20h-.2c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 17.72 4 16.88 4 15.2V15m11 5h.2c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C20 17.72 20 16.88 20 15.2V15"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeLinecap="square"
                          strokeWidth="1.75"
                        />
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    data-search-panel-trigger={true}
                    className="group/color cursor-pointer rounded-full"
                    id="base-ui-_R_fpjdpepfivallb_"
                    data-base-ui-tooltip-trigger=""
                  >
                    <div className="relative flex size-8.5 items-center justify-center rounded-full transition-colors hover:bg-hover-secondary">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6 shrink-0 text-tertiary transition-colors group-hover/color:text-primary"
                      >
                        <ellipse
                          cx="6.79559"
                          cy="17.1179"
                          rx="1.95202"
                          ry="1.94063"
                          fill="#4694F6"
                        />
                        <ellipse
                          cx="17.2053"
                          cy="17.2312"
                          rx="1.95202"
                          ry="1.94063"
                          fill="#C877CB"
                        />
                        <ellipse
                          cx="6.79559"
                          cy="6.88204"
                          rx="1.95202"
                          ry="1.94063"
                          fill="#81B386"
                        />
                        <ellipse
                          cx="17.2053"
                          cy="6.76876"
                          rx="1.95202"
                          ry="1.94063"
                          fill="#9C6030"
                        />
                        <ellipse
                          cx="19.5476"
                          cy="11.6857"
                          rx="1.95202"
                          ry="1.94063"
                          fill="#A0213E"
                        />
                        <ellipse
                          cx="12.0005"
                          cy="4.44063"
                          rx="1.95202"
                          ry="1.94063"
                          fill="#EBB042"
                        />
                        <ellipse
                          cx="4.45208"
                          cy="11.6857"
                          rx="1.95202"
                          ry="1.94063"
                          fill="#77CDD0"
                        />
                        <ellipse
                          cx="12"
                          cy="19.5593"
                          rx="1.95202"
                          ry="1.94063"
                          fill="#6951F5"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <input
                id="base-ui-_R_1pepfivallb_-hidden-input"
                style={{} as React.CSSProperties}
                tabIndex={-1}
                aria-hidden="true"
                defaultValue=""
              />
            </div>
          </div>
          <div className="pointer-events-auto mx-1 flex items-center justify-self-end">
            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-transparent p-1 transition-colors duration-200 ease-out">
              <a
                className="relative inline-flex cursor-pointer select-none items-center justify-center gap-x-1 rounded-full border border-transparent transition-all disabled:cursor-default disabled:text-tertiary h-12 px-6 py-4 font-medium text-body-medium text-secondary hover:bg-transparent hover:text-primary"
                type="button"
                data-testid="topnav-logged-out-sign-in-btn"
                href="/login"
              >
                <div className="contents">Log in</div>
              </a>
              <a
                className="relative inline-flex cursor-pointer select-none items-center justify-center gap-x-1 rounded-full border border-transparent transition-all disabled:cursor-default bg-button-primary text-inverted hover:bg-hover-primary disabled:bg-elevation disabled:text-tertiary disabled:hover:bg-elevation h-12 px-6 py-4 font-medium text-body-medium"
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
