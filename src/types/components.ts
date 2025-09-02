import { ReactNode } from "react";
import { PortfolioData, IntroductionData } from "./portfolio";

// Layout component props
export interface DashboardLayoutProps {
  children: ReactNode;
}

export interface PreviewLayoutProps {
  children: ReactNode;
}

export interface ClientLayoutProps {
  children: ReactNode;
}

// Dashboard component props
export interface DashboardNavbarProps {
  user: {
    name?: string;
    email: string;
    image?: string;
  };
  onPreview: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export interface SidebarSection {
  id: string;
  title: string; // Changed from 'name' to 'title'
  icon: React.ComponentType<{ className?: string }>; // More specific type
  isCompleted?: boolean; // Changed from 'completed'
  isRequired?: boolean; // Added required property
}

export interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void; // Changed parameter name
  completedSections: string[]; // Added completedSections
  isCollapsed?: boolean; // Changed from 'collapsed'
  onToggleCollapse?: () => void;
}

// Preview component props
export interface PortfolioPreviewProps {
  portfolioData: PortfolioData;
  previewMode: "desktop" | "tablet" | "mobile";
  onPreviewModeChange: (mode: "desktop" | "tablet" | "mobile") => void;
  onPublish: () => void;
  onOpenFullWindow?: () => void;
}

export interface FullWindowPreviewProps {
  portfolioData: PortfolioData;
}

// Section editor props
export interface IntroductionSectionProps {
  data: IntroductionData;
  onChange: (data: IntroductionData) => void;
}

// UI component props
export interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  isResizing: boolean;
  position?: "left" | "right";
}

export interface ResizablePanelProps {
  children: ReactNode;
  width: number;
  onMouseDown: (e: React.MouseEvent) => void;
  isResizing: boolean;
  className?: string;
  showHandle?: boolean;
  handlePosition?: "left" | "right";
}

// Aurora effect props
export interface AuroraProps {
  colorStops: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
  time?: number;
}

// Generic UI component props
export interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "glass" | "solid" | "gradient";
  hover?: boolean;
}

export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

// Feature components props
export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
  buttonText: string;
  onSelect: () => void;
}
