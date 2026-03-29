"use client";
import Image, { type StaticImageData } from "next/image";

export default function FloatingSectionNav({
  active,
  onClick,
}: {
  active: { id: string; label: string; image: StaticImageData };
  onClick: () => void;
}) {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 sm:bottom-8 sm:w-auto">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-black/40 px-3 py-2 text-xs text-white ring-1 ring-white/10 backdrop-blur sm:w-auto sm:px-4 sm:text-sm"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
          <Image
            src={active.image}
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 rounded-full object-cover"
          />
        </div>
        <span className="truncate">{active.label}</span>
      </button>
    </div>
  );
}
