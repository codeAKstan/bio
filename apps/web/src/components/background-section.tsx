"use client";
import type { StaticImageData } from "next/image";
import type { RefObject } from "react";

import FullImageParallaxSection from "./full-image-parallax-section";

export default function BackgroundSection({
  sectionRef,
  image,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  image: StaticImageData;
}) {
  return (
    <FullImageParallaxSection
      id="background"
      sectionRef={sectionRef}
      image={image}
      alt="Background"
      gradientClassName="bg-gradient-to-b from-black/0 via-black/15 to-black/50"
    >
      <div className="mx-auto h-full w-full max-w-7xl px-4 sm:px-6 text-white">
        <div className="sm:hidden">
          <div className="sticky top-0 h-svh">
            <div className="h-full overflow-y-auto overscroll-contain snap-y snap-mandatory">
              <div className="snap-start">
                <div className="grid h-svh grid-cols-12 items-end gap-x-4 pb-12 pt-8">
                  <div className="col-span-12 flex items-center justify-center">
                    <h2 className="font-serif leading-none tracking-tight text-[clamp(56px,16vw,200px)]">
                      Story
                    </h2>
                  </div>
                  <div className="col-span-12">
                    <div className="font-serif leading-[1.05] tracking-tight text-[clamp(20px,4.4vw,40px)]">
                      Creativity has been a defining thread throughout Treena’s life, evolving seamlessly from one
                      chapter to the next. Whether expressed through her writing or her work as a lecturer, her
                      ability to shape ideas and bring them to life remains constant. Inspired by the structure of
                      language and the rhythm of storytelling, everything she creates flows from the same deep well
                      of imagination within her.
                    </div>
                  </div>
                </div>
              </div>

              <div className="snap-start">
                <div className="grid h-svh grid-cols-12 gap-x-4 py-10">
                  <div className="col-span-12">
                    <div className="mb-6 text-xs tracking-wide text-white/80">Background.</div>
                    <div className="h-px w-full bg-white/25" />
                    <div className="mt-6 max-w-md text-xs leading-relaxed text-white/80">
                      Treena began by capturing moments through the lens of her camera. Later, her work as a
                      transformation energy coach gave her a deeper understanding of how thoughts and stories shape
                      the way people see themselves.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="grid h-svh grid-cols-12 items-end gap-x-4 sm:gap-x-6 pb-12 pt-8 sm:pb-16 sm:pt-10">
            <div className="col-span-12 flex items-center justify-center md:col-span-7 md:justify-start">
              <h2 className="font-serif leading-none tracking-tight text-[clamp(56px,16vw,200px)]">Story</h2>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="font-serif leading-[1.05] tracking-tight text-[clamp(20px,4.4vw,40px)]">
                Creativity has been a defining thread throughout Treena’s life, evolving seamlessly from one
                chapter to the next. Whether expressed through her writing or her work as a lecturer, her ability
                to shape ideas and bring them to life remains constant. Inspired by the structure of language and
                the rhythm of storytelling, everything she creates flows from the same deep well of imagination
                within her.
              </div>
            </div>
          </div>

          <div className="relative grid h-svh grid-cols-12 gap-x-4 sm:gap-x-6 py-10 sm:py-14">
            <div className="col-span-12 md:col-span-7" />
            <div className="col-span-12 md:col-span-5">
              <div className="mb-6 text-xs tracking-wide text-white/80">Background.</div>
              <div className="h-px w-full bg-white/25" />
              <div className="mt-6 max-w-md text-xs leading-relaxed text-white/80">
                Treena began by capturing moments through the lens of her camera. Later, her work as a
                transformation energy coach gave her a deeper understanding of how thoughts and stories shape the
                way people see themselves.
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullImageParallaxSection>
  );
}
