"use client";

import React from "react";

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";

export default function SetQuantity({
  cartCounter,
  cartProduct,
  handleIncrease,
  handleDecrease,
}) {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex gap-4 items-center text-base">
        <button onClick={handleDecrease} className={btnStyles}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button onClick={handleIncrease} className={btnStyles}>
          +
        </button>
      </div>
    </div>
  );
}
