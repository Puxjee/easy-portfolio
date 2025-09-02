"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/ui/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/components/ui/DashboardSidebar/DashboardSidebar";
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
import Button from "@/components/ui/Button/Button";
import { useResizable } from "@/hooks/useResizable";
import { ArrowRight, Eye } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

const DashboardPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("introduction");
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Resizable hooks
  const sidebarResizable = useResizable({
    initialWidth: 320,
    minWidth: 280,
    maxWidth: 500,
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

  // Navigation functions
  const handlePreview = () => {
    // Save current data to localStorage before navigating
    localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
    router.push("/preview");
  };

  const handleOpenFullWindowPreview = () => {
    // Save current data and open in new window
    localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
    window.open("/preview?fullscreen=true", "_blank");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
      // TODO: Also save to database/API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Error saving portfolio:", error);
    } finally {
      setIsSaving(false);
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

  // Load portfolio data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("portfolioData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setPortfolioData(parsedData);
      }
    } catch (error) {
      console.error("Error loading portfolio data:", error);
    }
  }, []);

  // Save portfolio data to localStorage whenever it changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeoutId);
  }, [portfolioData]);

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
    (newData: {
      projects: Array<{
        name: string;
        description: string;
        technologies: string[];
        id?: string;
        image?: string;
        link?: string;
        startDate?: string;
        endDate?: string;
      }>;
    }) => {
      // Extract projects array from the form data structure
      const projectsData = newData?.projects || [];
      handleSectionDataChange("projects", projectsData);
    },
    [handleSectionDataChange]
  );

  const handleExperienceChange = useCallback(
    (newData: { experience?: Array<unknown> }) => {
      // Extract experience array from the form data structure
      const experienceData = newData?.experience || [];
      handleSectionDataChange("experience", experienceData);
    },
    [handleSectionDataChange]
  );

  const handleSkillsChange = useCallback(
    (newData: { skills?: Array<unknown> }) => {
      // Extract skills array from the form data structure
      const skillsData = newData?.skills || [];
      handleSectionDataChange("skills", skillsData);
    },
    [handleSectionDataChange]
  );

  const handleEducationChange = useCallback(
    (newData: { education?: Array<unknown> }) => {
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
    (newData: { achievements?: Array<unknown> }) => {
      // Extract achievements array from the form data structure
      const achievementsData = newData?.achievements || [];
      handleSectionDataChange("achievements", achievementsData);
    },
    [handleSectionDataChange]
  );

  const handleInterestsChange = useCallback(
    (newData: { interests?: Array<unknown> }) => {
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

  // Memoize the introduction data to prevent unnecessary re-renders
  const introductionData = React.useMemo(
    () => ({
      name: portfolioData.introduction?.name || "",
      title: portfolioData.introduction?.title || "",
      bio: portfolioData.introduction?.bio || "",
      avatar: portfolioData.introduction?.avatar || "",
    }),
    [
      portfolioData.introduction?.name,
      portfolioData.introduction?.title,
      portfolioData.introduction?.bio,
      portfolioData.introduction?.avatar,
    ]
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "introduction":
        return (
          <IntroductionSectionEditor
            data={introductionData}
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

        {/* Main Content Area - Now takes full remaining space */}
        <div className="flex-1 overflow-y-auto bg-gray-900/50 relative">
          {renderActiveSection()}

          {/* Floating Preview Button */}
          <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={handleOpenFullWindowPreview}
              className="bg-gray-800/80 backdrop-blur-md text-white/70 hover:text-white hover:bg-gray-700/80 border border-white/10"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick Preview
            </Button>

            <Button
              variant="primary"
              onClick={handlePreview}
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Preview Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
