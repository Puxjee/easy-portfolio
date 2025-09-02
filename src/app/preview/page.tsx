"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  ArrowLeft,
  Share,
  Download,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";
import Button from "@/components/ui/Button/Button";
import EnhancedPortfolioPreview from "@/components/ui/PortfolioPreview/EnhancedPortfolioPreview";
import type { PortfolioData } from "@/types/portfolio";

const PreviewPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");
  const isFullscreen = searchParams.get("fullscreen") === "true";

  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    introduction: {
      name: "",
      title: "",
      bio: "",
      avatar: "",
      location: "",
    },
    projects: [],
    experience: [],
    skills: [],
    education: [],
    achievements: [],
    interests: [],
    contact: {
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      website: "",
    },
    settings: {
      theme: "dark",
      primaryColor: "#8B5CF6",
      font: "Inter",
      showContactInfo: true,
      showSocialLinks: true,
      enableAnimations: true,
      isPublic: false,
      customDomain: "",
      seoTitle: "",
      seoDescription: "",
    },
  });
  const [previewMode, setPreviewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [isPublishing, setIsPublishing] = useState(false);

  // Load portfolio data
  useEffect(() => {
    // First try URL parameter (for direct links)
    if (dataParam) {
      try {
        const urlData = JSON.parse(decodeURIComponent(dataParam));
        setPortfolioData(urlData);
        return;
      } catch (error) {
        console.error("Failed to parse URL portfolio data:", error);
      }
    }

    // Then try localStorage
    try {
      const localData = localStorage.getItem("portfolioData");
      if (localData) {
        setPortfolioData(JSON.parse(localData));
      }
    } catch (error) {
      console.error("Error loading portfolio data:", error);
    }
  }, [dataParam]);

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // TODO: Implement actual publish functionality
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      console.log("Portfolio published!");
    } catch (error) {
      console.error("Error publishing portfolio:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: `${portfolioData.introduction?.name}'s Portfolio`,
        text: portfolioData.introduction?.bio || "Check out my portfolio!",
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleDownload = () => {
    // TODO: Implement download as PDF functionality
    console.log("Download portfolio as PDF");
  };

  const handleOpenFullWindow = () => {
    // Open in new tab/window for true full-screen experience
    window.open("/preview?fullscreen=true", "_blank");
  };

  // Get preview container styles based on mode
  const getPreviewContainerStyles = () => {
    if (isFullscreen) {
      return "w-full h-full"; // True fullscreen
    }

    switch (previewMode) {
      case "mobile":
        return "w-[375px] h-[667px] mx-auto bg-white rounded-xl shadow-2xl overflow-hidden";
      case "tablet":
        return "w-[768px] h-[1024px] mx-auto bg-white rounded-xl shadow-2xl overflow-hidden";
      default:
        return "w-full h-full"; // Desktop is full window
    }
  };

  // If in fullscreen mode or no session, show just the portfolio
  if (isFullscreen || !session) {
    return (
      <div className="w-full h-screen bg-gray-900 overflow-auto">
        <EnhancedPortfolioPreview
          portfolioData={portfolioData}
          previewMode={previewMode}
          onPreviewModeChange={setPreviewMode}
          onPublish={handlePublish}
          onOpenFullWindow={handleOpenFullWindow}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Improved Top Navigation Bar - Only show when not in fullscreen */}
      {!isFullscreen && (
        <div className="bg-gray-800/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-lg flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left side - Back button */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="secondary"
                  onClick={handleBackToDashboard}
                  className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Editor
                </Button>

                <div className="h-6 w-px bg-white/20" />

                <div>
                  <h1 className="text-lg font-semibold text-white">
                    Portfolio Preview
                  </h1>
                  <p className="text-xs text-white/50">
                    {portfolioData.introduction?.name || "Your Portfolio"}
                  </p>
                </div>
              </div>

              {/* Center - Enhanced Preview mode controls */}
              <div className="flex items-center space-x-2 bg-white/5 rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    previewMode === "desktop"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Desktop
                </button>
                <button
                  onClick={() => setPreviewMode("tablet")}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    previewMode === "tablet"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Tablet className="w-4 h-4 mr-2" />
                  Tablet
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    previewMode === "mobile"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile
                </button>
              </div>

              {/* Right side - Action buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="secondary"
                  onClick={handleShare}
                  className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleDownload}
                  className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>

                <Button
                  variant="primary"
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="bg-purple-600 hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                >
                  {isPublishing ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Portfolio Preview with Responsive Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className={getPreviewContainerStyles()}>
          <EnhancedPortfolioPreview
            portfolioData={portfolioData}
            previewMode={previewMode}
            onPreviewModeChange={setPreviewMode}
            onPublish={handlePublish}
            onOpenFullWindow={handleOpenFullWindow}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
