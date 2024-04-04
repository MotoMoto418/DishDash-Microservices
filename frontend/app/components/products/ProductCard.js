"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ data }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${data.food_id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 
    text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={data.image}
            alt={data.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{data.name}</div>
        <div></div>
        <div className="font-semibold">₹{data.price}</div>
        <div></div>
      </div>
    </div>
  );
}
