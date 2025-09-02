"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import {
  introductionSchema,
  projectSchema,
  experienceItemSchema,
  skillsSchema,
  educationSchema,
  contactSchema,
  type IntroductionFormData,
  type ProjectFormData,
  type ExperienceFormData,
  type SkillsFormData,
  type EducationFormData,
  type ContactFormData,
} from "@/lib/portfolioValidation";

// Rate limiting (simple in-memory store for demo)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10; // 10 requests per minute

  const current = rateLimitMap.get(userId);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

async function validateUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!checkRateLimit(session.user.id)) {
    throw new Error("Rate limit exceeded");
  }

  return session.user;
}

// Sanitize HTML content to prevent XSS
function sanitizeHtml(content: string): string {
  return content
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export async function saveIntroductionAction(data: IntroductionFormData) {
  try {
    const user = await validateUser();

    // Validate data
    const validatedData = introductionSchema.parse(data);

    // Sanitize content
    const sanitizedData = {
      name: sanitizeHtml(validatedData.name),
      title: sanitizeHtml(validatedData.title),
      bio: sanitizeHtml(validatedData.bio),
      avatar: validatedData.avatar,
    };

    // TODO: Save to database
    // await db.portfolio.upsert({
    //   where: { userId: user.id },
    //   update: { introduction: sanitizedData },
    //   create: { userId: user.id, introduction: sanitizedData }
    // });

    return { success: true, data: sanitizedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, error: "Failed to save introduction" };
  }
}

export async function saveProjectsAction(data: ProjectFormData[]) {
  try {
    const user = await validateUser();

    // Validate data
    const validatedData = z.array(projectSchema).parse(data);

    // Sanitize content
    const sanitizedData = validatedData.map((project) => ({
      ...project,
      title: sanitizeHtml(project.title),
      description: sanitizeHtml(project.description),
      technologies: project.technologies?.map((tech) => sanitizeHtml(tech)),
    }));

    // TODO: Save to database

    return { success: true, data: sanitizedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, error: "Failed to save projects" };
  }
}

export async function saveExperienceAction(data: ExperienceFormData[]) {
  try {
    const user = await validateUser();

    // Validate data
    const validatedData = z.array(experienceItemSchema).parse(data);

    // Sanitize content
    const sanitizedData = validatedData.map((exp) => ({
      ...exp,
      company: exp.company ? sanitizeHtml(exp.company) : "",
      position: exp.position ? sanitizeHtml(exp.position) : "",
      description: exp.description ? sanitizeHtml(exp.description) : "",
    }));

    return { success: true, data: sanitizedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, error: "Failed to save experience" };
  }
}

export async function saveSkillsAction(data: SkillsFormData) {
  try {
    const user = await validateUser();

    // Validate data
    const validatedData = skillsSchema.parse(data);

    // Sanitize content
    const sanitizedData = {
      skills: validatedData.skills.map((skill) => sanitizeHtml(skill)),
    };

    return { success: true, data: sanitizedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, error: "Failed to save skills" };
  }
}

export async function saveEducationAction(data: EducationFormData[]) {
  try {
    const user = await validateUser();

    // Validate data
    const validatedData = z.array(educationSchema).parse(data);

    // Sanitize content
    const sanitizedData = validatedData.map((edu) => ({
      ...edu,
      institution: sanitizeHtml(edu.institution),
      degree: sanitizeHtml(edu.degree),
      fieldOfStudy: sanitizeHtml(edu.fieldOfStudy),
      startDate: sanitizeHtml(edu.startDate),
      endDate: edu.endDate ? sanitizeHtml(edu.endDate) : undefined,
    }));

    return { success: true, data: sanitizedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, error: "Failed to save education" };
  }
}

export async function saveContactAction(data: ContactFormData) {
  try {
    const user = await validateUser();

    // Validate data
    const validatedData = contactSchema.parse(data);

    // Sanitize content (URLs don't need HTML sanitization)
    const sanitizedData = {
      email: validatedData.email,
      phone: validatedData.phone
        ? sanitizeHtml(validatedData.phone)
        : undefined,
      location: validatedData.location
        ? sanitizeHtml(validatedData.location)
        : undefined,
      github: validatedData.github,
      linkedin: validatedData.linkedin,
      website: validatedData.website,
    };

    return { success: true, data: sanitizedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, error: "Failed to save contact information" };
  }
}

// Get portfolio data
export async function getPortfolioAction() {
  try {
    const user = await validateUser();

    // TODO: Get from database
    // const portfolio = await db.portfolio.findUnique({
    //   where: { userId: user.id }
    // });

    // Return default structure for now
    return {
      success: true,
      data: {
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
        contact: {
          email: user.email,
          phone: "",
          location: "",
          github: "",
          linkedin: "",
          website: "",
        },
      },
    };
  } catch (error) {
    return { success: false, error: "Failed to load portfolio data" };
  }
}
