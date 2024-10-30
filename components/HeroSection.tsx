"use client";
import { TypewriterEffectSmooth } from "../components/accertenity/typewriter-effect";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export function HeroSection() {
  const words = [
    { text: "Get" },
    { text: "The" },
    { text: "Best" },
    { text: "Accomodation" },
    { text: "With" },
    { text: "ROJA.", className: "text-[#A3B18A]" },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-[40rem]">
      <Image
        src="/assets/hero.jpg"
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center">
        <p className=" text-md sm:text-lg mb-4 text-[#A3B18A]">
          The road to freedom starts from here
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-8">
          <Button
            variant="outline"
            className="border-[#344E41] border-2 rounded-full text-[#DAD7CD] font-bold bg-transparent"
          >
            <Link href="/auth/login">Join now</Link>
          </Button>
          <Button className="rounded-full bg-[#344E41] text-[#DAD7CD] font-bold">
            <Link href="/properties">View Listings</Link>
          </Button>

          {/* <button className="w-40 h-10 rounded-xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white text-sm border border-white border-opacity-20">
            Join now
          </button>
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
            View Listings
          </button> */}
        </div>
      </div>
    </div>
  );
}
