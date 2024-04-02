"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

export default function ItemContent({ item }) {
  const { handleRemoveProduct, handleQtyIncrease, handleQtyDecrease } = useCart();

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.food_id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.image}
              alt={item.name}
              className="object-contain"
              fill
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.food_id}`}>{item.name}</Link>
          <div className="w-[70px]">
            <button
              className="underline"
              onClick={() => handleRemoveProduct(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">₹{item.price}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleDecrease={() => {
            handleQtyDecrease(item);
          }}
          handleIncrease={() => {
            handleQtyIncrease(item);
          }}
        />
      </div>
      <div className="justify-self-end font-semibold">
        ₹{item.price * item.quantity}
      </div>
    </div>
  );
}
