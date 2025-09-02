"use client";

import React from "react";
import {
  User,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Mail,
  Award,
  Code,
  Heart,
  Settings,
  ChevronRight,
  Plus,
} from "lucide-react";
import Card from "@/components/ui/Card/Card";
import { SidebarSection, DashboardSidebarProps } from "@/types";

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeSection,
  onSectionChange,
  completedSections,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const sections: SidebarSection[] = [
    {
      id: "introduction",
      title: "Introduction",
      icon: User,
      isRequired: true,
    },
    {
      id: "education",
      title: "Education",
      icon: GraduationCap,
    },
    {
      id: "experience",
      title: "Experience",
      icon: Briefcase,
    },
    {
      id: "projects",
      title: "Projects",
      icon: FolderOpen,
      isRequired: true,
    },
    {
      id: "skills",
      title: "Skills",
      icon: Code,
    },
    {
      id: "achievements",
      title: "Achievements",
      icon: Award,
    },
    {
      id: "interests",
      title: "Interests",
      icon: Heart,
    },
    {
      id: "contact",
      title: "Contact",
      icon: Mail,
      isRequired: true,
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
    },
  ];

  const getSectionStatus = (section: SidebarSection) => {
    const isCompleted = completedSections.includes(section.id);
    const isActive = activeSection === section.id;

    return {
      isCompleted,
      isActive,
      statusColor: isCompleted
        ? "text-green-400"
        : section.isRequired
        ? "text-orange-400"
        : "text-white/50",
    };
  };

  return (
    <aside
      className={`h-full bg-gray-900/50 border-r border-white/10 overflow-y-auto ${
        isCollapsed ? "w-16" : "w-full"
      } transition-none`}
    >
      <div
        className={`${
          isCollapsed ? "p-2 pt-16" : "p-6"
        } relative transition-all duration-200`}
      >
        {/* Collapse Toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className={`absolute ${
              isCollapsed ? "top-2 left-1/2 -translate-x-1/2" : "top-4 right-2"
            } p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 z-10 group`}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight
              className={`w-4 h-4 text-white/70 group-hover:text-white transition-all duration-200 ${
                isCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        )}

        {!isCollapsed && (
          <div className="mb-6 mt-4">
            <h2 className="text-lg font-display font-semibold text-white mb-2">
              Portfolio Sections
            </h2>
            <p className="text-sm text-white/60">
              Complete all sections to build your portfolio
            </p>
          </div>
        )}

        <div className={`${isCollapsed ? "space-y-1" : "space-y-2"}`}>
          {sections.map((section) => {
            const { isCompleted, isActive, statusColor } =
              getSectionStatus(section);
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full group ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30"
                    : "hover:bg-white/5 border-transparent"
                } border ${
                  isCollapsed ? "rounded-lg p-2" : "rounded-xl p-4"
                } transition-all duration-200 text-left`}
                title={isCollapsed ? section.title : undefined}
              >
                <div
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "justify-between"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      isCollapsed ? "justify-center w-full" : "space-x-3"
                    }`}
                  >
                    <div
                      className={`${isCollapsed ? "p-1.5" : "p-2"} rounded-lg ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : "bg-white/10"
                      } relative`}
                    >
                      <Icon
                        className={`${isCollapsed ? "w-4 h-4" : "w-5 h-5"} ${
                          isActive ? "text-white" : statusColor
                        }`}
                      />
                      {/* Completion indicator for collapsed state */}
                      {isCollapsed && isCompleted && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                      )}
                      {/* Required indicator for collapsed state */}
                      {isCollapsed && section.isRequired && !isCompleted && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <div>
                        <div
                          className={`font-medium ${
                            isActive ? "text-white" : "text-white/80"
                          }`}
                        >
                          {section.title}
                          {section.isRequired && (
                            <span className="text-orange-400 ml-1">*</span>
                          )}
                        </div>
                        <div className="text-xs text-white/50">
                          {isCompleted ? "Completed" : "Not started"}
                        </div>
                      </div>
                    )}
                  </div>

                  {!isCollapsed && (
                    <div className="flex items-center space-x-2">
                      {isCompleted && (
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      )}
                      <ChevronRight
                        className={`w-4 h-4 text-white/50 group-hover:text-white transition-colors ${
                          isActive ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {!isCollapsed && (
          <>
            {/* Progress Indicator */}
            <Card variant="glass" className="mt-6 p-4">
              <div className="mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Progress</span>
                  <span className="text-white/80">
                    {
                      completedSections.filter(
                        (section) => section !== "settings"
                      ).length
                    }
                    /{sections.length - 1} {/* Exclude settings */}
                  </span>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (completedSections.filter(
                        (section) => section !== "settings"
                      ).length /
                        (sections.length - 1)) *
                      100
                    }%`,
                  }}
                />
              </div>
              <div className="text-xs text-white/60 mt-2">
                {completedSections.filter((section) => section !== "settings")
                  .length ===
                sections.length - 1
                  ? "🎉 Portfolio complete!"
                  : `${
                      sections.length -
                      1 -
                      completedSections.filter(
                        (section) => section !== "settings"
                      ).length
                    } sections remaining`}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                <Plus className="w-4 h-4" />
                <span>Add Custom Section</span>
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
