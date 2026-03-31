"use client";
import Image from "next/image";
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
      <div className="fixed left-6 top-6 z-[999]">
        <Image
          src={logo}
          alt="Logo"
          priority
          width={logo.width}
          height={logo.height}
          className="h-10 w-auto sm:h-12"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
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
