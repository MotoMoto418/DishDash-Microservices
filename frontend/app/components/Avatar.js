import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Avatar({ src }) {
  if (src) {
    <Image
      src={src}
      alt="avatar"
      className="rounded-full"
      height="30"
      width="30"
    />;
  }

  return <FaUserCircle size={24}/>;
}
