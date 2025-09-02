"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import DashboardNavbar from "@/components/ui/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/components/ui/DashboardSidebar/DashboardSidebar";
import PortfolioPreview from "@/components/ui/PortfolioPreview/PortfolioPreview";
import IntroductionSectionEditor from "@/components/ui/SectionEditors/IntroductionSectionEditor";
import ProjectsSectionEditor from "@/components/ui/SectionEditors/ProjectsSectionEditor";
import ExperienceSectionEditor from "@/components/ui/SectionEditors/ExperienceSectionEditor";
import SkillsSectionEditor from "@/components/ui/SectionEditors/SkillsSectionEditor";
import EducationSectionEditor from "@/components/ui/SectionEditors/EducationSectionEditor";
import ContactSectionEditor from "@/components/ui/SectionEditors/ContactSectionEditor";
import AchievementsSectionEditor from "@/components/ui/SectionEditors/AchievementsSectionEditor";
import InterestsSectionEditor from "@/components/ui/SectionEditors/InterestsSectionEditor";
import SettingsSectionEditor from "@/components/ui/SectionEditors/SettingsSectionEditor";
import ResizablePanel from "@/components/ui/ResizablePanel/ResizablePanel";
import { useResizable } from "@/hooks/useResizable";
import type { PortfolioData } from "@/types/portfolio";

const DashboardPage = () => {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState("introduction");
  const [previewMode, setPreviewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Resizable hooks
  const sidebarResizable = useResizable({
    initialWidth: 320,
    minWidth: 280,
    maxWidth: 500,
  });

  const contentResizable = useResizable({
    initialWidth: 600,
    minWidth: 400,
    maxWidth: 1000,
  });

  // Get actual sidebar width based on collapse state
  const getSidebarWidth = () => {
    return sidebarCollapsed ? 64 : sidebarResizable.width;
  };

  // Disable resizing when sidebar is collapsed
  const handleSidebarMouseDown = (e: React.MouseEvent) => {
    if (!sidebarCollapsed) {
      sidebarResizable.handleMouseDown(e);
    }
  };

  // Portfolio data state
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    introduction: {
      name: "",
      title: "",
      bio: "",
      avatar: "",
    },
    projects: [],
    experience: [],
    skills: [],
    education: [],
    achievements: [],
    interests: [],
    contact: {
      email: session?.user?.email || "",
      phone: "",
      location: "",
      github: "",
      linkedin: "",
      website: "",
      twitter: "",
      social: {
        linkedin: "",
        github: "",
        twitter: "",
        website: "",
      },
    },
    settings: {
      theme: "dark" as const,
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

  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Update completed sections
  useEffect(() => {
    // Check if a section is completed
    const checkSectionCompletion = (sectionId: string) => {
      switch (sectionId) {
        case "introduction":
          return (
            portfolioData.introduction?.name &&
            portfolioData.introduction?.title &&
            portfolioData.introduction?.bio
          );
        case "projects":
          return (portfolioData.projects?.length || 0) > 0;
        case "experience":
          return (portfolioData.experience?.length || 0) > 0;
        case "skills":
          return (portfolioData.skills?.length || 0) > 0;
        case "education":
          return (portfolioData.education?.length || 0) > 0;
        case "achievements":
          return (portfolioData.achievements?.length || 0) > 0;
        case "interests":
          return (portfolioData.interests?.length || 0) > 0;
        case "contact":
          return !!portfolioData.contact?.email;
        case "settings":
          return true; // Settings section is always considered complete
        default:
          return false;
      }
    };

    const sections = [
      "introduction",
      "projects",
      "experience",
      "skills",
      "education",
      "achievements",
      "interests",
      "contact",
      "settings",
    ];
    const completed = sections.filter(checkSectionCompletion);
    setCompletedSections(completed);
  }, [portfolioData]);

  const handleSectionDataChange = useCallback(
    (sectionId: string, newData: unknown) => {
      setPortfolioData((prev) => ({
        ...prev,
        [sectionId]: newData,
      }));
    },
    []
  );

  // Memoized onChange callbacks for each section to prevent infinite re-renders
  const handleIntroductionChange = useCallback(
    (newData: unknown) => {
      handleSectionDataChange("introduction", newData);
    },
    [handleSectionDataChange]
  );

  const handleProjectsChange = useCallback(
    (newData: { projects?: any[] }) => {
      // Extract projects array from the form data structure
      const projectsData = newData?.projects || [];
      handleSectionDataChange("projects", projectsData);
    },
    [handleSectionDataChange]
  );

  const handleExperienceChange = useCallback(
    (newData: { experience?: any[] }) => {
      // Extract experience array from the form data structure
      const experienceData = newData?.experience || [];
      handleSectionDataChange("experience", experienceData);
    },
    [handleSectionDataChange]
  );

  const handleSkillsChange = useCallback(
    (newData: { skills?: any[] }) => {
      // Extract skills array from the form data structure
      const skillsData = newData?.skills || [];
      handleSectionDataChange("skills", skillsData);
    },
    [handleSectionDataChange]
  );

  const handleEducationChange = useCallback(
    (newData: { education?: any[] }) => {
      // Extract education array from the form data structure
      const educationData = newData?.education || [];
      handleSectionDataChange("education", educationData);
    },
    [handleSectionDataChange]
  );

  const handleContactChange = useCallback(
    (newData: unknown) => {
      handleSectionDataChange("contact", newData);
    },
    [handleSectionDataChange]
  );

  const handleAchievementsChange = useCallback(
    (newData: { achievements?: any[] }) => {
      // Extract achievements array from the form data structure  
      const achievementsData = newData?.achievements || [];
      handleSectionDataChange("achievements", achievementsData);
    },
    [handleSectionDataChange]
  );

  const handleInterestsChange = useCallback(
    (newData: { interests?: any[] }) => {
      // Extract interests array from the form data structure
      const interestsData = newData?.interests || [];
      handleSectionDataChange("interests", interestsData);
    },
    [handleSectionDataChange]
  );

  const handleSettingsChange = useCallback(
    (newData: unknown) => {
      handleSectionDataChange("settings", newData);
    },
    [handleSectionDataChange]
  );

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement save to database
    setTimeout(() => {
      setIsSaving(false);
      console.log("Portfolio saved:", portfolioData);
    }, 1000);
  };

  const handlePreview = () => {
    // TODO: Open preview in new window
    console.log("Opening preview...");
  };

  const handleOpenFullWindowPreview = () => {
    // Encode portfolio data to pass as URL parameter
    const encodedData = encodeURIComponent(JSON.stringify(portfolioData));
    const previewUrl = `/preview?data=${encodedData}`;

    // Open preview in a new window
    window.open(
      previewUrl,
      "_blank",
      "width=1200,height=800,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no"
    );
  };

  const handlePublish = () => {
    // TODO: Implement publish functionality
    console.log("Publishing portfolio...");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "introduction":
        return (
          <IntroductionSectionEditor
            data={{
              name: portfolioData.introduction?.name || "",
              title: portfolioData.introduction?.title || "",
              bio: portfolioData.introduction?.bio || "",
              avatar: portfolioData.introduction?.avatar || "",
            }}
            onChange={handleIntroductionChange}
          />
        );
      case "projects":
        return (
          <ProjectsSectionEditor
            data={{
              projects: (portfolioData.projects || []).map((project) => ({
                id: project.id,
                name: project.title || "", // Map title to name
                description: project.description || "",
                technologies: project.technologies || [],
                image: project.image || "",
                link: project.link || "",
                startDate: "",
                endDate: "",
              })),
            }}
            onChange={handleProjectsChange}
          />
        );
      case "experience":
        return (
          <ExperienceSectionEditor
            data={{
              experience: portfolioData.experience || [],
            }}
            onChange={handleExperienceChange}
          />
        );
      case "skills":
        return (
          <SkillsSectionEditor
            data={{
              skills: portfolioData.skills || [],
            }}
            onChange={handleSkillsChange}
          />
        );
      case "education":
        return (
          <EducationSectionEditor
            data={{
              education: portfolioData.education || [],
            }}
            onChange={handleEducationChange}
          />
        );
      case "contact":
        return (
          <ContactSectionEditor
            data={{
              email: portfolioData.contact?.email || "",
              phone: portfolioData.contact?.phone || "",
              location: portfolioData.contact?.location || "",
              website: portfolioData.contact?.website || "",
              github: portfolioData.contact?.github || "",
              linkedin: portfolioData.contact?.linkedin || "",
              twitter: portfolioData.contact?.twitter || "",
            }}
            onChange={handleContactChange}
          />
        );
      case "achievements":
        return (
          <AchievementsSectionEditor
            data={{
              achievements: portfolioData.achievements || [],
            }}
            onChange={handleAchievementsChange}
          />
        );
      case "interests":
        return (
          <InterestsSectionEditor
            data={{
              interests: portfolioData.interests || [],
            }}
            onChange={handleInterestsChange}
          />
        );
      case "settings":
        return (
          <SettingsSectionEditor
            data={
              portfolioData.settings || {
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
              }
            }
            onChange={handleSettingsChange}
          />
        );
      default:
        return (
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-6">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <div className="bg-white/5 border border-white/20 rounded-lg p-8 text-center">
              <p className="text-white/60">
                Select a section from the sidebar to start editing your
                portfolio.
              </p>
            </div>
          </div>
        );
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardNavbar
        user={{
          name: session.user.name,
          email: session.user.email,
          image: session.user.image || undefined,
        }}
        onPreview={handlePreview}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Resizable Sidebar */}
        <ResizablePanel
          width={getSidebarWidth()}
          onMouseDown={handleSidebarMouseDown}
          isResizing={!sidebarCollapsed && sidebarResizable.isResizing}
          showHandle={!sidebarCollapsed}
        >
          <DashboardSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            completedSections={completedSections}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </ResizablePanel>

        {/* Resizable Content Area */}
        <ResizablePanel
          width={contentResizable.width}
          onMouseDown={contentResizable.handleMouseDown}
          isResizing={contentResizable.isResizing}
          className="overflow-y-auto bg-gray-900/50"
        >
          {renderActiveSection()}
        </ResizablePanel>

        {/* Preview Area - Takes remaining space */}
        <div className="flex-1 border-l border-white/10">
          <PortfolioPreview
            portfolioData={portfolioData}
            previewMode={previewMode}
            onPreviewModeChange={setPreviewMode}
            onPublish={handlePublish}
            onOpenFullWindow={handleOpenFullWindowPreview}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
