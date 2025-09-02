"use client";

import React from "react";

export default function AppearancePage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Portfolio Appearance
          </h1>
          <p className="text-white/60">
            Customize the look and feel of your portfolio with themes, colors,
            and display settings.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Appearance Settings
          </h2>
          <p className="text-white/70 mb-6">
            This feature will allow you to customize your portfolio&rsquo;s
            theme, colors, fonts, and layout preferences.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-lg">
            <span className="text-purple-300 text-sm">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
