"use client";

import React from "react";
import Image from "next/image";
import {
  ExternalLink,
  Smartphone,
  Monitor,
  Tablet,
  Maximize2,
} from "lucide-react";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import { PortfolioData, PortfolioPreviewProps } from "@/types";

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  portfolioData,
  previewMode,
  onPreviewModeChange,
  onPublish,
  onOpenFullWindow,
}) => {
  const getPreviewDimensions = () => {
    switch (previewMode) {
      case "mobile":
        return "w-80 h-[600px]";
      case "tablet":
        return "w-[768px] h-[600px]";
      default:
        return "w-full h-full";
    }
  };

  const PreviewContent = () => (
    <div className="min-h-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="relative p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
              {portfolioData.introduction?.avatar ? (
                <Image
                  src={portfolioData.introduction.avatar}
                  alt={portfolioData.introduction.name || "Profile"}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {portfolioData.introduction?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {portfolioData.introduction?.name || "Your Name"}
          </h1>
          <p className="text-purple-400 mb-4">
            {portfolioData.introduction?.title || "Your Title"}
          </p>
          <p className="text-white/70 max-w-md mx-auto">
            {portfolioData.introduction?.bio || "Tell us about yourself..."}
          </p>
        </div>
      </div>

      {/* Projects Section */}
      {portfolioData.projects && portfolioData.projects.length > 0 && (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.projects.map((project) => (
              <Card key={project.id} variant="glass" className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.name || project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                {(project.startDate || project.endDate) && (
                  <p className="text-white/60 text-sm mb-2">
                    {project.startDate} {project.endDate ? ` - ${project.endDate}` : ' - Ongoing'}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      View Project <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                  {project.image && project.link && (
                    <span className="text-white/40">•</span>
                  )}
                  {project.image && (
                    <a
                      href={project.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-sm"
                    >
                      View Image
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {portfolioData.experience && portfolioData.experience.length > 0 && (
        <div className="p-8 bg-white/5">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-6">
            {portfolioData.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold">{exp.position}</h3>
                <p className="text-purple-400 mb-2">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                {(exp.startDate || exp.endDate) && (
                  <p className="text-white/60 text-sm mb-2">
                    {exp.startDate} {exp.endDate ? ` - ${exp.endDate}` : ' - Present'}
                  </p>
                )}
                {exp.description && (
                  <p className="text-white/70">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {portfolioData.skills && portfolioData.skills.length > 0 && (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {portfolioData.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {portfolioData.education && portfolioData.education.length > 0 && (
        <div className="p-8 bg-white/5">
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <div className="space-y-6">
            {portfolioData.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="text-purple-400 mb-2">
                  {edu.institution}
                  {edu.location && ` • ${edu.location}`}
                </p>
                {(edu.startDate || edu.endDate) && (
                  <p className="text-white/60 text-sm mb-2">
                    {edu.startDate} {edu.endDate ? ` - ${edu.endDate}` : ' - Present'}
                  </p>
                )}
                {edu.fieldOfStudy && (
                  <p className="text-white/70 mb-1">
                    Field: {edu.fieldOfStudy}
                  </p>
                )}
                {edu.gpa && <p className="text-white/70">GPA: {edu.gpa}</p>}
                {edu.description && (
                  <p className="text-white/70 mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Section */}
      {portfolioData.achievements && portfolioData.achievements.length > 0 && (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Achievements & Awards</h2>
          <div className="space-y-6">
            {portfolioData.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white/5 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-purple-400 mb-2">
                  {achievement.organization} • {achievement.date}
                </p>
                {achievement.description && (
                  <p className="text-white/70 mb-2">
                    {achievement.description}
                  </p>
                )}
                {achievement.url && (
                  <a
                    href={achievement.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    View Credential →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interests Section */}
      {portfolioData.interests && portfolioData.interests.length > 0 && (
        <div className="p-8 bg-white/5">
          <h2 className="text-2xl font-bold mb-6">Interests & Hobbies</h2>
          <div className="flex flex-wrap gap-3">
            {portfolioData.interests.map((interest, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg text-white"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      {portfolioData.contact && (
        <div className="p-8 bg-white/5">
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <div className="space-y-2">
            {portfolioData.contact.email && (
              <p>
                Email:{" "}
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="text-purple-400 hover:text-purple-300"
                >
                  {portfolioData.contact.email}
                </a>
              </p>
            )}
            {portfolioData.contact.phone && (
              <p>
                Phone:{" "}
                <a
                  href={`tel:${portfolioData.contact.phone}`}
                  className="text-purple-400 hover:text-purple-300"
                >
                  {portfolioData.contact.phone}
                </a>
              </p>
            )}
            {portfolioData.contact.location && (
              <p>
                Location: <span className="text-white/70">{portfolioData.contact.location}</span>
              </p>
            )}
            {portfolioData.contact.website && (
              <p>
                Website:{" "}
                <a
                  href={portfolioData.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  {portfolioData.contact.website}
                </a>
              </p>
            )}
            {portfolioData.contact.github && (
              <p>
                GitHub:{" "}
                <a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  {portfolioData.contact.github}
                </a>
              </p>
            )}
            {portfolioData.contact.linkedin && (
              <p>
                LinkedIn:{" "}
                <a
                  href={portfolioData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  {portfolioData.contact.linkedin}
                </a>
              </p>
            )}
            {portfolioData.contact.twitter && (
              <p>
                Twitter:{" "}
                <a
                  href={portfolioData.contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  {portfolioData.contact.twitter}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-900/30">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-white">Live Preview</h3>
        </div>

        <div className="flex items-center space-x-4">
          {/* Device Preview Buttons */}
          <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => onPreviewModeChange("desktop")}
              className={`p-2 rounded ${
                previewMode === "desktop"
                  ? "bg-purple-500"
                  : "hover:bg-white/10"
              } transition-colors`}
            >
              <Monitor className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onPreviewModeChange("tablet")}
              className={`p-2 rounded ${
                previewMode === "tablet" ? "bg-purple-500" : "hover:bg-white/10"
              } transition-colors`}
            >
              <Tablet className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onPreviewModeChange("mobile")}
              className={`p-2 rounded ${
                previewMode === "mobile" ? "bg-purple-500" : "hover:bg-white/10"
              } transition-colors`}
            >
              <Smartphone className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Full Window Button */}
          {onOpenFullWindow && (
            <button
              onClick={onOpenFullWindow}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              title="Open preview in full window"
            >
              <Maximize2 className="w-4 h-4 text-white" />
            </button>
          )}

          {/* Publish Button */}
          <Button onClick={onPublish} variant="primary" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="h-full flex items-center justify-center">
          <div
            className={`${getPreviewDimensions()} bg-white/5 rounded-xl border border-white/20 overflow-hidden shadow-2xl`}
          >
            <div className="h-full overflow-y-auto">
              <PreviewContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;
