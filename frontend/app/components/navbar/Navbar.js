import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
import logo from "/assets/logo_dish.png";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import Cookies from "js-cookie";

export default function Navbar() {
  console.log(Cookies.get('f_name'))

  // console.log(f_name)

  return (
    <div className="sticky top-0 w-full z-30 shadow-sm bg-slate-100">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md-gap-0">
            <Link href="/">
              <Image src={logo} width={192} height={108} />
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu/>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
