"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Smartphone,
  Monitor,
  Tablet,
  Maximize2,
  Mail,
  Github,
  Linkedin,
  Calendar,
  MapPin,
} from "lucide-react";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import Footer from "@/components/ui/Footer/Footer";
import { PortfolioPreviewProps } from "@/types";

const EnhancedPortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  portfolioData,
  previewMode,
  onPreviewModeChange,
  onPublish,
  onOpenFullWindow,
}) => {
  // Refs for each section
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const interestsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (
    ref: React.RefObject<HTMLElement | null>
  ) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Intersection Observer for active section
  // Removed since we don't have internal navigation anymore

  const getPreviewDimensions = () => {
    switch (previewMode) {
      case "mobile":
        return "w-[375px] h-[667px]";
      case "tablet":
        return "w-[768px] h-[1024px]";
      default:
        return "w-full max-w-[1200px] h-[800px]";
    }
  };

  const PreviewContent = () => (
    <div className="relative min-h-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white overflow-hidden">
      {/* Main Content without navbar padding */}
      <div>
        {/* Hero Section */}
        <section
          ref={homeRef}
          data-section="home"
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20"
              animate={{
                background: [
                  "linear-gradient(to bottom right, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2))",
                  "linear-gradient(to bottom right, rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))",
                  "linear-gradient(to bottom right, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2))",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1200),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 800),
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center px-8">
            {/* Animated Avatar */}
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 25px rgba(147, 51, 234, 0.5)",
              }}
            >
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                {portfolioData.introduction?.avatar ? (
                  <Image
                    src={portfolioData.introduction.avatar}
                    alt={portfolioData.introduction.name || "Profile"}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {portfolioData.introduction?.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Animated Name */}
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {portfolioData.introduction?.name || "Your Name"}
            </motion.h1>

            {/* Animated Title */}
            <motion.p
              className="text-xl md:text-2xl text-purple-400 mb-6 font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {portfolioData.introduction?.title || "Your Title"}
            </motion.p>

            {/* Animated Bio */}
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {portfolioData.introduction?.bio || "Tell us about yourself..."}
            </motion.p>

            {/* Animated Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {portfolioData.contact?.email && (
                <motion.a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold transition-all duration-300 shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(147, 51, 234, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              )}
              <motion.button
                onClick={() => scrollToSection(projectsRef)}
                className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(147, 51, 234, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        {portfolioData.introduction?.bio && (
          <section ref={aboutRef} data-section="about" className="py-20 px-8">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                About Me
              </motion.h2>
              <motion.div
                className="text-lg text-white/80 leading-relaxed text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p>{portfolioData.introduction.bio}</p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolioData.projects && portfolioData.projects.length > 0 && (
          <section
            ref={projectsRef}
            data-section="projects"
            className="py-20 px-8 bg-white/5"
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                My Projects
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioData.projects.map((project, index) => {
                  const proj = project as typeof project & {
                    startDate?: string;
                    endDate?: string;
                    name?: string;
                  };
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="group"
                    >
                      <Card
                        variant="glass"
                        className="p-6 h-full transition-all duration-500 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/20 border hover:border-purple-500/30"
                      >
                        {project.image && (
                          <div className="mb-4 rounded-lg overflow-hidden relative">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Image
                                src={project.image}
                                alt={
                                  project.title || proj.name || "Project image"
                                }
                                width={400}
                                height={200}
                                className="w-full h-48 object-cover transition-transform duration-300"
                              />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}
                        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
                          {project.title || proj.name}
                        </h3>
                        {(proj.startDate || proj.endDate) && (
                          <div className="flex items-center text-purple-400 text-sm mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            {proj.startDate}{" "}
                            {proj.endDate && proj.startDate ? " - " : ""}{" "}
                            {proj.endDate || "Present"}
                          </div>
                        )}
                        <p className="text-white/70 mb-4 group-hover:text-white/90 transition-colors">
                          {project.description}
                        </p>
                        {project.technologies && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              <motion.span
                                key={techIndex}
                                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30 hover:bg-purple-500/30 hover:scale-105 transition-all duration-200"
                                whileHover={{ scale: 1.05 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        )}
                        {project.link && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group-hover:translate-x-1"
                            whileHover={{ x: 5 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              View Project
                            </span>
                          </motion.a>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {portfolioData.experience && portfolioData.experience.length > 0 && (
          <section
            ref={experienceRef}
            data-section="experience"
            className="py-20 px-8"
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Experience
              </motion.h2>
              <div className="space-y-8">
                {portfolioData.experience.map((exp, index) => {
                  const experience = exp as typeof exp & {
                    startDate?: string;
                    endDate?: string;
                    location?: string;
                    duration?: string;
                  };
                  return (
                    <motion.div
                      key={exp.id}
                      className="relative pl-8 border-l-2 border-purple-500/30"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full"></div>
                      <h3 className="text-xl font-semibold text-white">
                        {exp.position}
                      </h3>
                      <p className="text-purple-400 mb-2">{exp.company}</p>
                      <div className="flex items-center text-white/60 text-sm mb-2 space-x-4">
                        {experience.duration && (
                          <span>{experience.duration}</span>
                        )}
                        {experience.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{experience.location}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-white/80">{exp.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {portfolioData.skills && portfolioData.skills.length > 0 && (
          <section
            ref={skillsRef}
            data-section="skills"
            className="py-20 px-8 bg-white/5"
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Skills & Technologies
              </motion.h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {portfolioData.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      boxShadow: "0 10px 25px rgba(147, 51, 234, 0.3)",
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-white font-medium hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300 cursor-default select-none"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {portfolioData.education && portfolioData.education.length > 0 && (
          <section
            ref={educationRef}
            data-section="education"
            className="py-20 px-8"
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Education
              </motion.h2>
              <div className="space-y-8">
                {portfolioData.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    className="relative pl-8 border-l-2 border-purple-500/30"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-purple-400 mb-2">{edu.institution}</p>
                    <p className="text-white/60 text-sm mb-2">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                    {edu.fieldOfStudy && (
                      <p className="text-white/70 mb-1">
                        Field: {edu.fieldOfStudy}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Achievements Section */}
        {portfolioData.achievements &&
          portfolioData.achievements.length > 0 && (
            <section
              ref={achievementsRef}
              data-section="achievements"
              className="py-20 px-8 bg-white/5"
            >
              <div className="max-w-4xl mx-auto">
                <motion.h2
                  className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Achievements & Awards
                </motion.h2>
                <div className="space-y-6">
                  {portfolioData.achievements.map((achievement, index) => {
                    const achievementWithFields =
                      achievement as typeof achievement & {
                        category?: string;
                        issuer?: string;
                        link?: string;
                      };

                    return (
                      <motion.div
                        key={achievement.id}
                        className="bg-white/5 rounded-lg p-6 border border-yellow-500/20"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-yellow-400">
                            {achievement.title}
                          </h3>
                          {achievementWithFields.category && (
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full">
                              {achievementWithFields.category}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center text-purple-400 mb-2">
                          {(achievementWithFields.issuer ||
                            achievement.organization) && (
                            <span>
                              {achievementWithFields.issuer ||
                                achievement.organization}
                            </span>
                          )}
                          {(achievementWithFields.issuer ||
                            achievement.organization) &&
                            achievement.date && <span className="mx-2">•</span>}
                          {achievement.date && <span>{achievement.date}</span>}
                        </div>

                        {achievement.description && (
                          <p className="text-white/70 mb-3 whitespace-pre-line">
                            {achievement.description}
                          </p>
                        )}

                        {(achievementWithFields.link || achievement.url) && (
                          <a
                            href={achievementWithFields.link || achievement.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Credential
                          </a>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

        {/* Interests Section */}
        {portfolioData.interests && portfolioData.interests.length > 0 && (
          <section
            ref={interestsRef}
            data-section="interests"
            className="py-20 px-8"
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Interests & Hobbies
              </motion.h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {portfolioData.interests.map((interest, index) => (
                  <motion.span
                    key={index}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg text-white font-medium hover:bg-gradient-to-r hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {portfolioData.contact && (
          <section
            ref={contactRef}
            data-section="contact"
            className="py-20 px-8 bg-white/5"
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Get In Touch
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioData.contact.email && (
                  <motion.a
                    href={`mailto:${portfolioData.contact.email}`}
                    className="flex items-center gap-4 p-6 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)",
                    }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Mail className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-200">
                        Email
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90">
                        {portfolioData.contact.email}
                      </p>
                    </div>
                  </motion.a>
                )}

                {portfolioData.contact.phone && (
                  <motion.a
                    href={`tel:${portfolioData.contact.phone}`}
                    className="flex items-center gap-4 p-6 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)",
                    }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Smartphone className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-200">
                        Phone
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90">
                        {portfolioData.contact.phone}
                      </p>
                    </div>
                  </motion.a>
                )}

                {portfolioData.contact.website && (
                  <motion.a
                    href={portfolioData.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      <ExternalLink className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-200">
                        Website
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90">
                        {portfolioData.contact.website}
                      </p>
                    </div>
                  </motion.a>
                )}

                {portfolioData.contact.location && (
                  <motion.div
                    className="flex items-center gap-4 p-6 bg-white/5 rounded-lg border border-white/10 group"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)",
                    }}
                  >
                    <motion.div
                      whileHover={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <MapPin className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-200">
                        Location
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90">
                        {portfolioData.contact.location}
                      </p>
                    </div>
                  </motion.div>
                )}

                {(
                  portfolioData.contact as typeof portfolioData.contact & {
                    github?: string;
                  }
                )?.github && (
                  <motion.a
                    href={
                      (
                        portfolioData.contact as typeof portfolioData.contact & {
                          github?: string;
                        }
                      ).github
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)",
                    }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Github className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-200">
                        GitHub
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90 truncate">
                        {
                          (
                            portfolioData.contact as typeof portfolioData.contact & {
                              github?: string;
                            }
                          ).github
                        }
                      </p>
                    </div>
                  </motion.a>
                )}

                {(
                  portfolioData.contact as typeof portfolioData.contact & {
                    linkedin?: string;
                  }
                )?.linkedin && (
                  <motion.a
                    href={
                      (
                        portfolioData.contact as typeof portfolioData.contact & {
                          linkedin?: string;
                        }
                      ).linkedin
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      <Linkedin className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-200">
                        LinkedIn
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90 truncate">
                        {
                          (
                            portfolioData.contact as typeof portfolioData.contact & {
                              linkedin?: string;
                            }
                          ).linkedin
                        }
                      </p>
                    </div>
                  </motion.a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white/5 rounded-lg border border-white/10">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-white">
            Portfolio Preview
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => onPreviewModeChange("desktop")}
              variant={previewMode === "desktop" ? "primary" : "secondary"}
              size="sm"
              className="p-2"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onPreviewModeChange("tablet")}
              variant={previewMode === "tablet" ? "primary" : "secondary"}
              size="sm"
              className="p-2"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onPreviewModeChange("mobile")}
              variant={previewMode === "mobile" ? "primary" : "secondary"}
              size="sm"
              className="p-2"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={onOpenFullWindow} variant="secondary" size="sm">
            <Maximize2 className="w-4 h-4 mr-2" />
            Full Window
          </Button>
          <Button onClick={onPublish} variant="primary" size="sm">
            Publish
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex items-center justify-center p-4">
          <div
            className={`${getPreviewDimensions()} border border-white/20 rounded-lg overflow-hidden bg-gray-900 shadow-2xl`}
          >
            <div className="w-full h-full overflow-y-auto">
              <PreviewContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPortfolioPreview;
