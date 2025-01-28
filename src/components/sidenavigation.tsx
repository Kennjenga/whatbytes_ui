"use client";

import React, { useState } from "react";
import { Home, BookOpen, Briefcase, Menu, X } from "lucide-react";

const SideNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={toggleNav}
        className="md:hidden fixed top-3 right-20 z-50 p-2 rounded-md hover:bg-gray-100"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleNav}
        />
      )}

      {/* Navigation Menu */}
      <nav
        className={`fixed lg:static top-0 left-0 right-0 h-fit lg:h-screen w-full lg:w-64 bg-white rounded-lg border-gray-200 p-4 pt-16 lg:pt-11 z-40
          ${isOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0"}
          transition-transform duration-300 ease-in-out`}
      >
        {/* Navigation Links */}
        <div className="space-y-2">
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
