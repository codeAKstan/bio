"use client";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import type { RefObject } from "react";

import FullImageParallaxSection from "./full-image-parallax-section";

export default function AboutSection({
  sectionRef,
  image,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  image: StaticImageData;
}) {
  return (
    <FullImageParallaxSection
      id="about"
      sectionRef={sectionRef}
      image={image}
      alt="About"
      priority
      gradientClassName="bg-gradient-to-b from-black/0 via-black/25 to-black/60"
    >
      <div className="mx-auto h-full w-full max-w-7xl px-4 sm:px-6">
        <div className="grid h-svh grid-cols-12 grid-rows-[auto_1fr_auto] gap-x-4 sm:gap-x-6 py-8 sm:py-10 text-white">
          <div className="col-span-12 flex flex-col gap-4 text-[11px] tracking-wide text-white/80 sm:flex-row sm:items-start sm:justify-between sm:text-xs">
            <div className="leading-relaxed">
              <div className="break-all uppercase sm:break-normal">ANNA@GMAIL.COM</div>
              <div>+31 (0)6 53632545</div>
            </div>
            <div className="flex gap-6 uppercase sm:gap-10">
              <div className="leading-relaxed">
                <Link
                  href="#contact"
                  className="text-white/70"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    history.replaceState(null, "", "#contact");
                  }}
                >
                  contact.
                </Link>
              </div>
              <div className="leading-relaxed">
               <Link href="/books" className="text-white/70">
                  books.
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-12 flex items-center justify-center">
            <h1 className="font-serif leading-none tracking-tight text-[clamp(52px,16vw,180px)]">
              Anna
            </h1>
          </div>
        </div>

        <div className="relative grid h-svh grid-cols-12 gap-x-4 sm:gap-x-6 py-10 sm:py-14 text-white">
          <div className="col-span-12 hidden md:col-span-5 md:block">
            <div className="h-[72svh] w-full" />
          </div>

          <div className="col-span-12 md:col-span-7 md:pl-6">
            <div className="max-w-2xl font-serif leading-[1.05] tracking-tight text-[clamp(22px,4.6vw,44px)]">
              Kante smith joshua is a writter and a lecturer  from the Netherlands. For over two decades, he
              has worked for brands such as Nikkie, Esqualo, Junkies Magazine, Ibana, Rino & Pelle, and many more.
              His passion lies in using the subtle interplay of styles, lighting, and colors to bring creative
              visions to life.
            </div>
          </div>

          <div className="absolute bottom-10 left-6 right-6 hidden text-xs uppercase tracking-wide text-white/80 md:flex md:items-end md:justify-end md:gap-16">
            <div className="leading-relaxed">
              <div className="text-white/70">bertram 50</div>
              <div>1422 sc uithoorn</div>
              <div className="mt-2 text-white/70 lowercase">visit.</div>
            </div>
            <div className="leading-relaxed">
              <div className="text-white/70">zuid afrikaweg 4c</div>
              <div>1432 da, aalsmeer</div>
              <div>the netherlands</div>
              <div className="mt-2 text-white/70 lowercase">studio.</div>
            </div>
          </div>
        </div>
      </div>
    </FullImageParallaxSection>
  );
}
