import React from "react";
import { PreviewLayoutProps } from "@/types";

const PreviewLayout: React.FC<PreviewLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default PreviewLayout;
