"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Settings, Eye, Save, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/ui/Button/Button";
import { DashboardNavbarProps } from "@/types";

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  user,
  onPreview,
  onSave,
  isSaving = false,
}) => {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showUserMenu]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-white/10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-xl font-display font-bold text-white">
                Portfolio Builder
              </h1>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Save Button */}
            <Button
              onClick={onSave}
              disabled={isSaving}
              variant="secondary"
              size="sm"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>

            {/* Preview Button */}
            <Button onClick={onPreview} variant="primary" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>

            {/* User Menu */}
            <div ref={menuRef} className="relative z-50">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">
                    {user.name || "User"}
                  </div>
                  <div className="text-xs text-white/50">{user.email}</div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-white/50 transition-transform ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 py-2 z-[60] shadow-xl bg-gray-800 border border-white/20 rounded-xl">
                  <div className="px-4 py-2 border-b border-white/10">
                    <div className="text-sm font-medium text-white">
                      {user.name || "User"}
                    </div>
                    <div className="text-xs text-white/50">{user.email}</div>
                  </div>

                  <div className="py-1">
                    <button className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
