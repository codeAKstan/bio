"use client";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode, RefObject } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FullImageParallaxSection({
  id,
  sectionRef,
  image,
  alt,
  priority,
  gradientClassName,
  children,
}: {
  id: string;
  sectionRef: RefObject<HTMLElement | null>;
  image: StaticImageData;
  alt: string;
  priority?: boolean;
  gradientClassName: string;
  children: ReactNode;
}) {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const bgEl = bgRef.current;
    const imgEl = imgRef.current;
    if (!sectionEl || !bgEl || !imgEl) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    let maxPan = 0;

    const quickY = gsap.quickTo(bgEl, "y", { duration: 0.9, ease: "power3.out" });
    const setY = (y: number) => {
      if (prefersReducedMotion) {
        gsap.set(bgEl, { y });
        return;
      }
      quickY(y);
    };

    const computeMaxPan = () => {
      const imgHeight = imgEl.getBoundingClientRect().height;
      maxPan = Math.max(0, imgHeight - window.innerHeight);
    };

    const update = () => {
      const rect = sectionEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const sectionTop = scrollY + rect.top;
      const maxScroll = Math.max(1, sectionEl.offsetHeight - viewportHeight);
      const progress = Math.min(1, Math.max(0, (scrollY - sectionTop) / maxScroll));

      setY(-progress * maxPan);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        computeMaxPan();
        update();
      });
    };

    const ro =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            onResize();
          })
        : null;

    computeMaxPan();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    ro?.observe(imgEl);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      gsap.killTweensOf(bgEl);
    };
  }, [sectionRef]);

  return (
    <section ref={sectionRef} id={id} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={bgRef} className="absolute left-0 top-0 w-full will-change-transform">
            <div ref={imgRef} className="w-full">
              <Image
                src={image}
                alt={alt}
                priority={priority}
                width={image.width}
                height={image.height}
                sizes="100vw"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
        <div className={`absolute inset-0 ${gradientClassName}`} />
      </div>

      <div className="absolute inset-0 z-10">{children}</div>
    </section>
  );
}
