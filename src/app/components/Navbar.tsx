"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type NavLink = {
  name: string;
  href: string;
};

const navLinks: NavLink[] = [{ name: "Compare", href: "/compare" }];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="shrink-0 flex items-center">
              <span className="ml-2 text-xl font-bold text-gray-900">
                Pokédex
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${"border-transparent text-gray-500 hover:text-gray-700"} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
