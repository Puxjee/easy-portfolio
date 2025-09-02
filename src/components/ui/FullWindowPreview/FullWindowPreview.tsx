"use client";

import React, { useEffect } from "react";
import PortfolioPreview from "@/components/ui/PortfolioPreview/PortfolioPreview";
import { FullWindowPreviewProps } from "@/types";

const FullWindowPreview: React.FC<FullWindowPreviewProps> = ({
  portfolioData,
}) => {
  useEffect(() => {
    // Set title for the preview window
    document.title = `${
      portfolioData.introduction?.name || "Portfolio"
    } - Preview`;
  }, [portfolioData.introduction?.name]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <PortfolioPreview
        portfolioData={portfolioData}
        previewMode="desktop"
        onPreviewModeChange={() => {}}
        onPublish={() => {}}
      />
    </div>
  );
};

export default FullWindowPreview;
