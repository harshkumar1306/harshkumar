"use client";

import React, { useEffect, useState } from "react";
import { Lottie } from "lottie-react";
import animationData from "@/public/assets/blogging.json";

export function HeroLottie() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full max-w-[420px] xs:max-w-[480px] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[760px] flex items-center justify-center select-none pointer-events-auto">
      {isMounted ? (
        <div className="w-full h-auto flex items-center justify-center">
          <Lottie
            src={animationData}
            loop={true}
            autoplay={true}
            className="w-full h-auto max-h-[560px] lg:max-h-[620px] object-contain drop-shadow-sm scale-105 sm:scale-110 lg:scale-115 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="w-full aspect-[4/3] bg-transparent animate-pulse rounded-2xl" />
      )}
    </div>
  );
}
