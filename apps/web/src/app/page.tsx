"use client";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import firstImage from "../first.png";
import secondImage from "../second.png";
import thirdImage from "../third.png";
import fourthImage from "../fourth.png";
import logo from "../LogoF.png";
import AboutSection from "@/components/about-section";
import BackgroundSection from "@/components/background-section";
import BooksSection from "@/components/books-section";
import ContactSection from "@/components/contact-section";
import FloatingSectionNav from "@/components/floating-section-nav";

export default function Home() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const backgroundRef = useRef<HTMLElement | null>(null);
  const booksRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const sections = useMemo(
    () => [
      { id: "about" as const, label: "About", image: firstImage, ref: aboutRef },
      { id: "background" as const, label: "Background", image: secondImage, ref: backgroundRef },
      { id: "books" as const, label: "Books", image: thirdImage, ref: booksRef },
      { id: "contact" as const, label: "Contact", image: fourthImage, ref: contactRef },
    ],
    [],
  );

  const [activeNav, setActiveNav] = useState(sections[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let rafId = 0;

    const updateActive = () => {
      const viewportMid = window.innerHeight * 0.5;
      const aboutRect = sections[0].ref.current?.getBoundingClientRect();
      const backgroundRect = sections[1].ref.current?.getBoundingClientRect();
      const booksRect = sections[2].ref.current?.getBoundingClientRect();
      const contactRect = sections[3].ref.current?.getBoundingClientRect();

      const isContactActive =
        !!contactRect && contactRect.top <= viewportMid && contactRect.bottom >= viewportMid;
      const isBooksActive = !!booksRect && booksRect.top <= viewportMid && booksRect.bottom >= viewportMid;
      const isBackgroundActive =
        !!backgroundRect && backgroundRect.top <= viewportMid && backgroundRect.bottom >= viewportMid;
      const isAboutActive = !!aboutRect && aboutRect.top <= viewportMid && aboutRect.bottom >= viewportMid;

      if (isContactActive) {
        setActiveNav((prev) => (prev.id === "contact" ? prev : sections[3]));
        return;
      }

      if (isBooksActive) {
        setActiveNav((prev) => (prev.id === "books" ? prev : sections[2]));
        return;
      }

      if (isBackgroundActive) {
        setActiveNav((prev) => (prev.id === "background" ? prev : sections[1]));
        return;
      }

      if (isAboutActive) {
        setActiveNav((prev) => (prev.id === "about" ? prev : sections[0]));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <main className="w-full">
      <header className="fixed inset-x-0 top-0 z-[999] flex items-start justify-between px-6 pt-6">
        <Image
          src={logo}
          alt="Logo"
          priority
          width={logo.width}
          height={logo.height}
          className="h-10 w-auto sm:h-12"
          style={{ filter: "brightness(0) invert(1)" }}
        />

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="grid size-11 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-black/50 sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[998] grid content-start bg-black/70 px-6 pt-24 text-white backdrop-blur sm:hidden"
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close menu overlay"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="relative w-full rounded-2xl bg-black/50 ring-1 ring-white/10">
            <div className="border-b border-white/10 px-4 py-3 text-sm font-medium tracking-wide">
              Menu
            </div>
            <div className="p-2">
              {sections.map((section) => {
                const isActive = activeNav.id === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                      history.replaceState(null, "", `#${section.id}`);
                    }}
                    className={[
                      "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ring-1 transition-colors",
                      isActive
                        ? "bg-white/10 text-white ring-white/15"
                        : "bg-transparent text-white/80 ring-transparent hover:bg-white/5 hover:text-white",
                    ].join(" ")}
                  >
                    <div className="grid size-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                      <Image
                        src={section.image}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 rounded-full object-cover"
                      />
                    </div>
                    <span className="min-w-0 flex-1 truncate">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <FloatingSectionNav
        active={activeNav}
        onClick={() => {
          document.getElementById(activeNav.id)?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <AboutSection sectionRef={aboutRef} image={firstImage} />
      <BackgroundSection sectionRef={backgroundRef} image={secondImage} />
      <BooksSection sectionRef={booksRef} image={thirdImage} />
      <ContactSection sectionRef={contactRef} image={fourthImage} />
    </main>
  );
}
