"use client";

import React from "react";
import { Heart, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left - Contact Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-white mb-6">Get in Touch</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/80">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Melek ElMokhtar</div>
                  <div className="text-sm">Tunisia</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-white/80">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-400" />
                </div>
                <a href="tel:+21698701740" className="hover:text-white transition-colors">
                  +216 98 701 740
                </a>
              </div>
              
              <div className="flex items-center space-x-3 text-white/80">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <a href="mailto:melekelmokhtar@gmail.com" className="hover:text-white transition-colors">
                  melekelmokhtar@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Center - Social Buttons */}
          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com/in/melek-elmokhtar"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
              
              <Link
                href="https://github.com/melekelmokhtar"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4 rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-gray-500/25 transform hover:scale-105"
              >
                <Github className="w-6 h-6" />
              </Link>
            </div>
            
            {/* Logo or Brand */}
            <div className="text-center">
              <div className="text-2xl font-display font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                PortfolioMaker
              </div>
              <p className="text-white/60 text-sm mt-1">Create. Showcase. Inspire.</p>
            </div>
          </div>

          {/* Right - Love Message */}
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="relative">
                <Heart className="w-5 h-5 text-red-400 animate-pulse" fill="currentColor" />
                <div className="absolute inset-0 w-5 h-5 text-red-400 animate-ping opacity-20">
                  <Heart className="w-full h-full" fill="currentColor" />
                </div>
              </div>
              <span className="text-white/80 font-medium">
                Made with love, for all creators
              </span>
            </div>
            
            <p className="text-white/50 text-sm mt-4 max-w-xs lg:ml-auto">
              Empowering creators worldwide to showcase their amazing work beautifully.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} PortfolioMaker. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="text-white/60 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
