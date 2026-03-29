"use client";
import type { StaticImageData } from "next/image";
import type { RefObject } from "react";

import FullImageParallaxSection from "./full-image-parallax-section";

export default function BooksSection({
  sectionRef,
  image,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  image: StaticImageData;
}) {
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
              A curated selection of printed work—editorials, campaigns, and personal projects—brought together in
              tangible form.
            </div>
            <div className="mt-6 flex sm:mt-8">
              <button
                type="button"
                className="w-full rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15 sm:w-auto"
              >
                View book
              </button>
            </div>
          </div>
        </div>

        <div className="relative grid h-svh grid-cols-12 gap-x-4 sm:gap-x-6 py-10 sm:py-14">
          <div className="col-span-12 md:col-span-7" />
          <div className="col-span-12 md:col-span-5">
            <div className="mb-6 text-xs tracking-wide text-white/80">Books.</div>
            <div className="h-px w-full bg-white/25" />
            <div className="mt-6 max-w-md text-xs leading-relaxed text-white/80">
              Limited runs, special editions, and collaborations. Each book captures a body of work with intention,
              sequencing, and pace—made to be experienced away from the screen.
            </div>
          </div>
        </div>
      </div>
    </FullImageParallaxSection>
  );
}
