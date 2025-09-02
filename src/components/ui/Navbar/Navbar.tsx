"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <nav className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl max-w-10/17 mx-auto shadow-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-xl font-bold text-white font-display"
              >
                PortfolioMaker
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/features"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Pricing
              </Link>
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/auth"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/auth"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white/80 hover:text-white p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/10 backdrop-blur-sm rounded-b-xl border-t border-white/10">
                <Link
                  href="/features"
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/templates"
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Templates
                </Link>
                <Link
                  href="/pricing"
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/showcase"
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Showcase
                </Link>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <Link
                    href="/auth"
                    className="block px-3 py-2 text-white/80 hover:text-white transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth"
                    className="block px-3 py-2 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-center shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
