import Image from "next/image";
import React from "react";

export default function HomeBanner() {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discounts!!
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Flat 20% off for first users!
          </p>
          <p className="text-lg md:text-xl text-white mb-2">Sign Up now!</p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            fill
            src="https://t4.ftcdn.net/jpg/02/84/46/89/360_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg"
            alt="banner image"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
