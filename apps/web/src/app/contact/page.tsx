"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import contactImage from "../../contact-img.png";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const router = useRouter();

  return (
    <main className="min-h-svh w-full bg-black text-white">
      <div className="mx-auto grid w-full max-w-4xl gap-10 px-6 py-10">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
                return;
              }
              router.push("/");
            }}
            className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
          >
            Back
          </button>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src={contactImage}
            alt="Contact"
            priority
            width={contactImage.width}
            height={contactImage.height}
            className="h-auto w-full max-w-xl"
          />
        </div>

        <div className="text-center">
          <h1 className="mx-auto max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            So, let&apos;s make some goooooood stuff together.{" "}
            <span className="text-white/70">Because why not?</span>
          </h1>
          <div className="mt-4 text-sm text-white/60">
            Fill out the form below and we&apos;ll get back to you soon!
          </div>
        </div>

        <form
          className="mx-auto w-full max-w-md space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("submitted");
          }}
        >
          <label className="block">
            <div className="text-xs font-medium text-white/70">Name</div>
            <input
              name="name"
              required
              placeholder="Your name"
              className="mt-2 w-full bg-transparent py-2 text-sm outline-none placeholder:text-white/25 border-b border-white/20 focus:border-white/50"
            />
          </label>

          <label className="block">
            <div className="text-xs font-medium text-white/70">Email</div>
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="mt-2 w-full bg-transparent py-2 text-sm outline-none placeholder:text-white/25 border-b border-white/20 focus:border-white/50"
            />
          </label>

          <label className="block">
            <div className="text-xs font-medium text-white/70">Message</div>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your project..."
              className="mt-2 w-full resize-none bg-transparent py-2 text-sm outline-none placeholder:text-white/25 border-b border-white/20 focus:border-white/50"
            />
          </label>

          <button
            type="submit"
            className="h-12 w-full rounded-full bg-pink-300 px-6 text-sm font-semibold text-black transition-colors hover:bg-pink-200"
          >
            {status === "submitted" ? "Submitted" : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}
