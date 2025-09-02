"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import AuthForm from "@/components/ui/AuthForm/AuthForm";
import { LoginFormData, RegisterFormData } from "@/lib/validation";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (formData: LoginFormData | RegisterFormData) => {
    console.log(isLogin ? "Login data:" : "Register data:", formData);
    // TODO: Handle authentication logic here
    // For login: authenticate user
    // For register: create new user account
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-6">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            Join 10,000+ creators worldwide
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 relative h-16">
            <span
              className={`absolute inset-0 transition-all duration-500 ${
                isLogin
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              Welcome Back
            </span>
            <span
              className={`absolute inset-0 transition-all duration-500 ${
                !isLogin
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Get Started
            </span>
          </h1>
        </div>

        {/* Auth Form */}
        <AuthForm
          isLogin={isLogin}
          onToggleMode={toggleMode}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AuthPage;
