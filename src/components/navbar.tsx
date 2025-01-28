"use client";

import React from "react";
import Image from "next/image";
import { UserCircle2 } from "lucide-react";

interface NavbarProps {
  userPhoto?: string;
  username?: string;
}

const Navbar = ({ userPhoto, username = "Kenneth Njenga" }: NavbarProps) => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0  md:relative px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-xl font-bold flex items-center space-x-1">
            <div className="flex items-center">
              <Image
                src={"/whatbytes.png"}
                alt={`whatbytes logo`}
                width={50}
                height={50}
              />
            </div>
            <span className="text-2xl font-bold">WhatBytes</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center border rounded-md p-1">
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {userPhoto ? (
                <Image
                  src={userPhoto}
                  alt={`${username}'s avatar`}
                  className="rounded-full object-cover"
                  layout="fill"
                />
              ) : (
                <UserCircle2 className="w-full h-full text-gray-400" />
              )}
            </div>
            <span className="hidden md:block text-sm font-extrabold text-black">
              {username}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
