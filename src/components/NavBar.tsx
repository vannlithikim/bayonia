"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as Node).contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    {
      name: "Stays",
      href: "/stays",
      dropdown: [
        { name: "Hotels", href: "/stays/hotels" },
        { name: "Apartments", href: "/stays/apartments" },
        { name: "Villas", href: "/stays/villas" },
        { name: "Unique Stays", href: "/stays/unique" },
      ],
    },
    {
      name: "Experiences",
      href: "/experiences",
      dropdown: [
        { name: "Tours", href: "/experiences/tours" },
        { name: "Activities", href: "/experiences/activities" },
        { name: "Food & Drink", href: "/experiences/food" },
      ],
    },
    
    { name: "Restaurants", href: "/restaurants" },
    { name: "Destinations", href: "/destinations" },
    { name: "About", href: "/about" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white/90 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <nav
        className="mx-4 sm:mx-6 lg:mx-8 xl:mx-12 2xl:mx-16"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-2 group"
              aria-label="Bayonia - Go to homepage"
            >
              <div className="relative">
                <Image
                  src="/Logo.png"
                  alt="Bayonia"
                  width={32}
                  height={32}
                  className="transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              <span className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                ayonia
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div
            className="hidden lg:flex items-center space-x-1 ml-20 lg:ml-24 xl:ml-32 2xl:ml-40"
            ref={dropdownRef}
          >
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActiveLink(item.href)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        )
                      }
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      aria-expanded={activeDropdown === item.name ? true : false}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.name && (
                      <div
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActiveLink(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Language and region"
            >
              <Globe className="h-5 w-5" />
            </button>

            <div className="w-px h-6 bg-gray-300" />

            <button
              className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
              onClick={() => router.push("/login")}
            >
              Log in
            </button>

            <button
              className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-screen opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-4 space-y-2 border-t border-gray-100">
            {/* Mobile Navigation Links */}
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        )
                      }
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Actions */}
            <div className="pt-4 space-y-3 border-t border-gray-100">
              <div className="flex space-x-3">
                <button
                  className="flex-1 text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-4 py-3 rounded-lg font-medium transition-all duration-200"
                  onClick={() => router.push("/login")}
                >
                  Log in
                </button>
                <button
                  className="flex-1 bg-gray-900 text-white hover:bg-gray-800 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </button>
              </div>

              <div className="flex justify-center space-x-6 pt-2">
                <button
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                  <span className="text-sm">Search</span>
                </button>
                <button
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label="Language and region"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm">Region</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
