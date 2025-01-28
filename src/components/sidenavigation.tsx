"use client";

import React, { useState } from "react";
import { Home, BookOpen, Briefcase, Menu, X } from "lucide-react";
import Image from "next/image";

const SideNavigation = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleNav = () => setIsSideNavOpen(!isSideNavOpen);

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={toggleNav}
        className="md:hidden fixed top-4 right-20 z-20 p-2 rounded-md hover:bg-gray-100"
      >
        {!isSideNavOpen && <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isSideNavOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleNav}
        />
      )}

      {/* Navigation Menu */}
      <nav
        className={`fixed lg:static top-0 left-0 h-screen lg:h-screen w-64 bg-white shadow-lg lg:shadow-none border-r border-gray-200 z-10
          ${
            isSideNavOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          transition-transform duration-300 ease-in-out`}
      >
        {/* Mobile Header with Logo and Close Button */}
        <div className="lg:hidden relative p-4 border-b border-gray-200">
          <div className="text-xl font-bold flex items-center space-x-1">
            <div className="flex items-center">
              <Image
                src="/whatbytes.png"
                alt="whatbytes logo"
                width={50}
                height={50}
              />
            </div>
            <span className="text-2xl font-bold">WhatBytes</span>
          </div>
          <button
            onClick={toggleNav}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2 p-4">
          <NavItem icon={<Home size={20} />} text="Dashboard" active={false} />
          <NavItem
            icon={<BookOpen size={20} />}
            text="Skill Test"
            active={true}
          />
          <NavItem
            icon={<Briefcase size={20} />}
            text="Internship"
            active={false}
          />
        </div>
      </nav>
    </>
  );
};

// NavItem component for each navigation link
interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-4 rounded-lg lg:rounded-r-3xl cursor-pointer
        ${
          active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
        }`}
    >
      {icon}
      <span className={`${active ? "font-medium" : ""}`}>{text}</span>
    </div>
  );
};

export default SideNavigation;
