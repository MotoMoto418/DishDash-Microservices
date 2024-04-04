"use client";

import React, { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { FaCaretDown } from "react-icons/fa";
import Link from "next/link";
import MenuItem from "./MenuItem";
import BackDrop from "./BackDrop";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const currentUser = Cookies.get("user_id");

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition "
        >
          <Avatar />
          <FaCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <MenuItem>
                  Welcome{" "}
                  <p className="font-bold">{currentUser.toUpperCase()}!</p>
                </MenuItem>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                {/* <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link> */}
                <Link href="/">
                  <MenuItem
                    onClick={() => {
                      toggleOpen();
                      Cookies.remove("user_id");
                      toast.success("Logged out successfully.")
                    }}
                  >
                    Logout
                  </MenuItem>
                </Link>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
}
