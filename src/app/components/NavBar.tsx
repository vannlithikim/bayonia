"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full px-2">
      <nav className="mx-4 py-7 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Logo.png"
              alt="Bayonia Logo"
              width={28}
              height={40}
              className="self-center"
              style={{ verticalAlign: "middle", marginTop: "-5px" }}
            />
            <span className="text-3xl font-semibold text-gray-800 leading-[40px] self-center">
              ayonia
            </span>
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-3">
          <button
            className=" bg-gray-800 text-white hover:bg-gray-700 rounded-full px-6 py-2 transition-colors"
            onClick={() => router.push("/login")}
          >
            Log in
          </button>
          <button
            className="border border-gray-800 text-gray-800  hover:bg-gray-200 rounded-full px-6 py-2 transition-colors font-bold"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 px-4 py-2 flex flex-col space-y-2">
          <div className="flex flex-col space-y-2 pt-2">
            <button
              className="border border-gray-800 text-gray-800 hover:bg-gray-200 rounded-full px-6 py-2 transition-colors"
              onClick={() => {
                router.push("/login");
                toggleMenu();
              }}
            >
              Log in
            </button>
            <button
              className="bg-gray-800 text-white hover:bg-gray-700 rounded-full px-6 py-2 transition-colors"
              onClick={() => {
                router.push("/signup");
                toggleMenu();
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
