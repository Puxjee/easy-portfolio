"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import { PortfolioData } from "@/types";

const PreviewPage = () => {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");

  let portfolioData: PortfolioData = {};

  if (dataParam) {
    try {
      portfolioData = JSON.parse(decodeURIComponent(dataParam));
    } catch (error) {
      console.error("Failed to parse portfolio data:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="relative p-8 text-center">
          {portfolioData.introduction?.avatar && (
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {portfolioData.introduction.name?.charAt(0) || "U"}
                </span>
              </div>
            </div>
          )}
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
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
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
                {project.link && (
                  <a
                    href={project.link}
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View Project <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                )}
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
                  {exp.company} • {exp.duration}
                </p>
                <p className="text-white/70">{exp.description}</p>
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
                  className="text-purple-400"
                >
                  {portfolioData.contact.email}
                </a>
              </p>
            )}
            {portfolioData.contact.github && (
              <p>
                GitHub:{" "}
                <a
                  href={portfolioData.contact.github}
                  className="text-purple-400"
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
                  className="text-purple-400"
                >
                  {portfolioData.contact.linkedin}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
