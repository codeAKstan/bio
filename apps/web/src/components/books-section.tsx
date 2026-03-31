"use client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";

import book1 from "../book1.png";
import book2 from "../book2.png";
import book3 from "../book3.png";
import book4 from "../book4.png";
import book5 from "../book5.png";
import FullImageParallaxSection from "./full-image-parallax-section";

export default function BooksSection({
  sectionRef,
  image,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  image: StaticImageData;
}) {
  const [open, setOpen] = useState(false);
  const [enableOverlay, setEnableOverlay] = useState(false);
  const books = [book1, book2, book3, book4, book5];
  const pages = Array.from({ length: Math.ceil(books.length / 2) }, (_, i) => {
    const left = books[i * 2];
    const right = books[i * 2 + 1] ?? left;
    return { left, right };
  });
  const [spread, setSpread] = useState(0);
  const wheelLockRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      setEnableOverlay(true);
      return;
    }

    const media = window.matchMedia("(min-width: 640px) and (pointer: fine)");
    const update = () => setEnableOverlay(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [open]);

  return (
    <FullImageParallaxSection
      id="books"
      sectionRef={sectionRef}
      image={image}
      alt="Books"
      gradientClassName="bg-gradient-to-b from-black/0 via-black/20 to-black/55"
    >
      <div className="mx-auto h-full w-full max-w-7xl px-4 sm:px-6 text-white">
        <div className="grid h-svh grid-cols-12 items-end gap-x-4 sm:gap-x-6 pb-12 pt-8 sm:pb-16 sm:pt-10">
          <div className="col-span-12 flex items-center justify-center md:col-span-7 md:justify-start">
            <h2 className="font-serif leading-none tracking-tight text-[clamp(56px,16vw,200px)]">
              Book
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="font-serif leading-[1.05] tracking-tight text-[clamp(20px,4.4vw,40px)]">
              Treena E. Reynolds’ debut, Ticklish Cloud, illustrated by Karissa Feese, is a playful book designed for ages 3–7. It delivers a mix of humor and rhythm that makes it perfect for bedtime, group reading, or solo exploration by early readers. 
            </div>
            <div className="mt-6 flex sm:mt-8">
              <Link
                href="/books"
                onClick={(e) => {
                  if (!enableOverlay) return;
                  e.preventDefault();
                  setOpen(true);
                }}
                className="w-full rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15 sm:w-auto"
              >
                View book
              </Link>
            </div>
          </div>
        </div>

        <div className="relative grid h-svh grid-cols-12 gap-x-4 sm:gap-x-6 py-10 sm:py-14">
          <div className="col-span-12 md:col-span-7" />
          <div className="col-span-12 md:col-span-5">
            <div className="mb-6 text-xs tracking-wide text-white/80">Book.</div>
            <div className="h-px w-full bg-white/25" />
            <div className="mt-6 max-w-md text-xs leading-relaxed text-white/80">
              The story is fun, but it also works as a learning tool. Short text supports early reading skills. Illustrations guide comprehension. Humor keeps attention locked in. 
              It’s a storybook that works as both entertainment and early literacy support.
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-[999] flex items-center justify-center bg-black/55 px-6 overscroll-contain transition-opacity duration-300 ${
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
          onWheel={(e) => {
            if (!open) return;
            e.preventDefault();
            e.stopPropagation();

            const now = Date.now();
            if (now - wheelLockRef.current < 420) return;
            if (Math.abs(e.deltaY) < 8) return;
            wheelLockRef.current = now;

            if (e.deltaY < 0) {
              setSpread((s) => (s + 1) % pages.length);
              return;
            }

            setSpread((s) => (s - 1 + pages.length) % pages.length);
          }}
        >
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -right-2 -top-2 grid size-10 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-black/60"
            >
              <X className="size-4" />
            </button>
            <div
              className="relative mx-auto flex w-full max-w-4xl gap-4 bg-black/20 p-4 ring-1 ring-white/15 backdrop-blur"
              style={{ perspective: "1200px" }}
            >
              <div
                className="relative h-[60svh] w-1/2 overflow-hidden bg-black/20 ring-1 ring-white/20"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "left center",
                  backfaceVisibility: "hidden",
                  transform: open ? "rotateY(0deg)" : "rotateY(90deg)",
                  transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <Image
                  src={pages[spread].left}
                  alt=""
                  width={pages[spread].left.width}
                  height={pages[spread].left.height}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="relative h-[60svh] w-1/2 overflow-hidden bg-black/20 ring-1 ring-white/20"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "right center",
                  backfaceVisibility: "hidden",
                  transform: open ? "rotateY(0deg)" : "rotateY(-90deg)",
                  transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <Image
                  src={pages[spread].right}
                  alt=""
                  width={pages[spread].right.width}
                  height={pages[spread].right.height}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullImageParallaxSection>
  );
}
