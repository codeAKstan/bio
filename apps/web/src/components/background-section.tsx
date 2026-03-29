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
        <div className="grid h-svh grid-cols-12 items-end gap-x-4 sm:gap-x-6 pb-12 pt-8 sm:pb-16 sm:pt-10">
          <div className="col-span-12 flex items-center justify-center md:col-span-7 md:justify-start">
            <h2 className="font-serif leading-none tracking-tight text-[clamp(56px,16vw,200px)]">
              Story
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="font-serif leading-[1.05] tracking-tight text-[clamp(20px,4.4vw,40px)]">
              Creativity has woven its way through every chapter of Otto&apos;s life, seamlessly transitioning from
              spinning beats as a DJ and producer to crafting captivating images as a model and photographer.
              He&apos;s discovered that whether he&apos;s captivated by the shapes and composition of a photograph or the
              rhythm and mood of a song, it all springs from the same well of inspiration within.
            </div>
          </div>
        </div>

        <div className="relative grid h-svh grid-cols-12 gap-x-4 sm:gap-x-6 py-10 sm:py-14">
          <div className="col-span-12 md:col-span-7" />
          <div className="col-span-12 md:col-span-5">
            <div className="mb-6 text-xs tracking-wide text-white/80">Background.</div>
            <div className="h-px w-full bg-white/25" />
            <div className="mt-6 max-w-md text-xs leading-relaxed text-white/80">
              Otto has a profound passion for the creative journey, whether it be through photography or music. For
              him, there&apos;s something truly special about collaborating with others, grasping their vision, and
              bringing it to life. It&apos;s about transforming concepts into something real. This exchange of
              creativity is profoundly fulfilling.
            </div>
          </div>
        </div>
      </div>
    </FullImageParallaxSection>
  );
}
