"use client";

import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-800/80 backdrop-blur-lg border-b border-gray-700/40 shadow-md z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Resume Builder
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/dashboard/template">Templates</NavLink>
            <NavLink href="/dashboard/prepare">AI-Recommendations</NavLink>
            <NavLink href="/dashboard/cover-letter">Cover-Letter Maker</NavLink>
            <NavLink href="/dashboard/Jobs">Jobs</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="text-lg font-medium text-white hover:text-blue-400 transition-all duration-300"
    >
      {children}
    </Link>
  );
};
