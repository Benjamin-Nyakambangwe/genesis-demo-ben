"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../components/accertenity/infinite-moving-cards";

export function Testimonials() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-[#DAD7CD] dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "RO-JA made finding my dream apartment a breeze. Their user-friendly platform and extensive listings helped me find the perfect place in no time!",
    name: "Sarah Johnson",
    title: "Happy Tenant",
  },
  {
    quote:
      "As a landlord, I've never had an easier time managing my properties. RO-JA's tools and support are top-notch!",
    name: "Michael Chen",
    title: "Property Owner",
  },
  {
    quote:
      "The student accommodation I found through RO-JA was perfect for my needs and budget. It made my college experience so much better!",
    name: "Emily Rodriguez",
    title: "University Student",
  },
  {
    quote:
      "RO-JA's gated cluster options provided the security and community feel I was looking for. I couldn't be happier with my new home.",
    name: "David Thompson",
    title: "Gated Community Resident",
  },
  {
    quote:
      "Finding a short-term rental for my work assignment was a challenge until I discovered RO-JA. Their platform made the whole process smooth and stress-free.",
    name: "Lisa Patel",
    title: "Business Traveler",
  },
];
