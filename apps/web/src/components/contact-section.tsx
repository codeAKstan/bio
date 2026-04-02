 "use client";
 import type { StaticImageData } from "next/image";
 import { Facebook, Instagram, Linkedin, Twitter, X } from "lucide-react";
 import { useState, type RefObject } from "react";
 
 import FullImageParallaxSection from "./full-image-parallax-section";
 
 export default function ContactSection({
   sectionRef,
   image,
 }: {
   sectionRef: RefObject<HTMLElement | null>;
   image: StaticImageData;
 }) {
  const [mode, setMode] = useState<"intro" | "form">("intro");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

   return (
     <FullImageParallaxSection
       id="contact"
       sectionRef={sectionRef}
       image={image}
       alt="Contact"
       gradientClassName="bg-gradient-to-b from-black/0 via-black/25 to-black/60"
     >
       <div className="mx-auto h-full w-full max-w-7xl px-4 sm:px-6">
         <div className="sm:hidden text-white">
           <div className="sticky top-0 h-svh">
             <div className="h-full overflow-y-auto overscroll-contain snap-y snap-mandatory">
               <div className="snap-start">
                 <div className="grid h-svh grid-cols-12 grid-rows-[auto_1fr_auto] gap-x-4 py-8">
                   <div className="col-span-12" />
                   <div className="col-span-12 flex items-center justify-center">
                     <h1 className="font-serif leading-none tracking-tight text-[clamp(52px,16vw,180px)]">
                       Contact
                     </h1>
                   </div>
                 </div>
               </div>

               <div className="snap-start">
                 <div className="grid h-svh grid-cols-12 gap-x-4 py-10">
                   <div className="col-span-12">
                     <div className="relative mt-2 min-h-[360px] max-w-2xl">
                       <div
                         className={`transition-all duration-500 ease-out ${
                           mode === "intro"
                             ? "opacity-100 translate-y-0"
                             : "pointer-events-none opacity-0 -translate-y-2"
                         }`}
                       >
                         <div className="font-serif leading-[1.05] tracking-tight text-[clamp(22px,4.6vw,44px)]">
                           Interested in collaborating or have a question? Reach out and let&apos;s start a
                           conversation. Share your ideas and we&apos;ll get back to you soon.
                         </div>
                         <div className="mt-6">
                           <button
                             type="button"
                             onClick={() => {
                               setMode("form");
                               setStatus("idle");
                             }}
                             className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
                           >
                             Open contact form
                           </button>
                         </div>
                       </div>

                       <div
                         className={`absolute inset-0 transition-all duration-500 ease-out ${
                           mode === "form"
                             ? "opacity-100 translate-y-0"
                             : "pointer-events-none opacity-0 translate-y-2"
                         }`}
                       >
                         <button
                           type="button"
                           aria-label="Close contact form"
                           onClick={() => {
                             setMode("intro");
                             setStatus("idle");
                           }}
                           className="absolute right-0 top-0 grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
                         >
                           <X className="size-4" />
                         </button>
                         <form
                           className="space-y-6 pt-14"
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
                               className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm outline-none placeholder:text-white/25 focus:border-white/50"
                             />
                           </label>

                           <label className="block">
                             <div className="text-xs font-medium text-white/70">Email</div>
                             <input
                               type="email"
                               name="email"
                               required
                               placeholder="you@email.com"
                               className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm outline-none placeholder:text-white/25 focus:border-white/50"
                             />
                           </label>

                           <label className="block">
                             <div className="text-xs font-medium text-white/70">Message</div>
                             <textarea
                               name="message"
                               rows={4}
                               placeholder="Tell us about your project..."
                               className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-2 text-sm outline-none placeholder:text-white/25 focus:border-white/50"
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
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <div className="hidden sm:block">
           <div className="grid h-svh grid-cols-12 grid-rows-[auto_1fr_auto] gap-x-4 sm:gap-x-6 py-8 sm:py-10 text-white">
             <div className="col-span-12 flex flex-col gap-4 text-[11px] tracking-wide text-white/80 sm:flex-row sm:items-start sm:justify-between sm:text-xs" />

             <div className="col-span-12 flex items-center justify-center">
               <h1 className="font-serif leading-none tracking-tight text-[clamp(52px,16vw,180px)]">Contact</h1>
             </div>
           </div>
 
           <div className="relative grid h-svh grid-cols-12 gap-x-4 sm:gap-x-6 py-10 sm:py-14 text-white">
             <div className="col-span-12 hidden md:col-span-5 md:block">
               <div className="h-[72svh] w-full" />
             </div>
 
             <div className="col-span-12 md:col-span-7 md:pl-6">
               <div className="relative mt-2 min-h-[360px] max-w-2xl">
                 <div
                   className={`transition-all duration-500 ease-out ${
                     mode === "intro"
                       ? "opacity-100 translate-y-0"
                       : "pointer-events-none opacity-0 -translate-y-2"
                   }`}
                 >
                   <div className="font-serif leading-[1.05] tracking-tight text-[clamp(22px,4.6vw,44px)]">
                     Interested in collaborating or have a question? Reach out and let&apos;s start a conversation.
                     Share your ideas and we&apos;ll get back to you soon.
                   </div>
                   <div className="mt-6 sm:mt-8">
                     <button
                       type="button"
                       onClick={() => {
                         setMode("form");
                         setStatus("idle");
                       }}
                       className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
                     >
                       Open contact form
                     </button>
                   </div>
                 </div>

                 <div
                   className={`absolute inset-0 transition-all duration-500 ease-out ${
                     mode === "form"
                       ? "opacity-100 translate-y-0"
                       : "pointer-events-none opacity-0 translate-y-2"
                   }`}
                 >
                   <button
                     type="button"
                     aria-label="Close contact form"
                     onClick={() => {
                       setMode("intro");
                       setStatus("idle");
                     }}
                     className="absolute right-0 top-0 grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
                   >
                     <X className="size-4" />
                   </button>
                   <form
                     className="space-y-6 pt-14"
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
                         className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm outline-none placeholder:text-white/25 focus:border-white/50"
                       />
                     </label>

                     <label className="block">
                       <div className="text-xs font-medium text-white/70">Email</div>
                       <input
                         type="email"
                         name="email"
                         required
                         placeholder="you@email.com"
                         className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm outline-none placeholder:text-white/25 focus:border-white/50"
                       />
                     </label>

                     <label className="block">
                       <div className="text-xs font-medium text-white/70">Message</div>
                       <textarea
                         name="message"
                         rows={4}
                         placeholder="Tell us about your project..."
                         className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-2 text-sm outline-none placeholder:text-white/25 focus:border-white/50"
                       />
                     </label>

                     <button
                       type="submit"
                       className="h-12 w-full rounded-full bg-pink-300 px-6 text-sm font-semibold text-black transition-colors hover:bg-pink-200 sm:w-auto sm:min-w-48"
                     >
                       {status === "submitted" ? "Submitted" : "Submit"}
                     </button>
                   </form>
                 </div>
               </div>
             </div>
 
            <div className="absolute bottom-10 left-6 right-6 hidden text-xs uppercase tracking-wide text-white/80 md:flex md:items-end md:justify-end">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/Treenareynoldsofficial"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
                >
                  <Facebook className="size-4" />
                </a>
                <a
                  href="https://x.com/Reyn3285Treena"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="X"
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
                >
                  <Twitter className="size-4" />
                </a>
                <a
                  href="https://www.instagram.com/treenareynoldsofficial/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
                >
                  <Instagram className="size-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/treena-reynolds-514983284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
                >
                  <Linkedin className="size-4" />
                </a>
              </div>
            </div>
           </div>
         </div>
       </div>
     </FullImageParallaxSection>
   );
 }
