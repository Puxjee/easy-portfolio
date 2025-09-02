import { z } from "zod";

// Introduction section validation
export const introductionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  title: z
    .string()
    .min(1, "Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  bio: z
    .string()
    .min(1, "Bio is required")
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be less than 500 characters"),
  avatar: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

// Project validation
export const projectSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Project title is required")
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  image: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  link: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required")
    .max(10, "Maximum 10 technologies allowed"),
});

// Experience validation
export const experienceItemSchema = z.object({
  id: z.string().optional(),
  company: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  position: z
    .string()
    .min(1, "Position is required")
    .min(2, "Position must be at least 2 characters")
    .max(100, "Position must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .max(20, "Start date must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  endDate: z
    .string()
    .max(20, "End date must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .max(50, "Location must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
});

export const experienceSchema = z.object({
  experience: z
    .array(experienceItemSchema)
    .min(1, "At least one experience is required")
    .max(10, "Maximum 10 experiences allowed"),
});

// Skills validation
export const skillsSchema = z.object({
  skills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "At least one skill is required")
    .max(20, "Maximum 20 skills allowed"),
});

// Education validation
export const educationSchema = z.object({
  id: z.string(),
  institution: z
    .string()
    .min(1, "Institution name is required")
    .min(2, "Institution name must be at least 2 characters")
    .max(100, "Institution name must be less than 100 characters"),
  degree: z
    .string()
    .min(1, "Degree is required")
    .min(2, "Degree must be at least 2 characters")
    .max(100, "Degree must be less than 100 characters"),
  fieldOfStudy: z
    .string()
    .min(1, "Field of study is required")
    .min(2, "Field must be at least 2 characters")
    .max(100, "Field must be less than 100 characters"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .regex(/^\d{4}$/, "Please enter a valid year (YYYY)"),
  endDate: z
    .string()
    .regex(/^\d{4}$/, "Please enter a valid year (YYYY)")
    .optional()
    .or(z.literal("")),
  gpa: z
    .string()
    .regex(/^[0-4]\.\d{1,2}$/, "Please enter a valid GPA (0.00-4.00)")
    .optional()
    .or(z.literal("")),
});

// Contact validation
export const contactSchema = z
  .object({
    email: z
      .string()
      .email("Please enter a valid email address")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(/^[+]?[(]?[\d\s\-\(\)]{10,}$/, "Please enter a valid phone number")
      .optional()
      .or(z.literal("")),
    location: z
      .string()
      .max(100, "Location must be less than 100 characters")
      .optional()
      .or(z.literal("")),
    website: z
      .string()
      .url("Please enter a valid website URL")
      .optional()
      .or(z.literal("")),
    github: z
      .string()
      .url("Please enter a valid GitHub URL")
      .optional()
      .or(z.literal("")),
    linkedin: z
      .string()
      .url("Please enter a valid LinkedIn URL")
      .optional()
      .or(z.literal("")),
    twitter: z
      .string()
      .url("Please enter a valid Twitter URL")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      return (
        data.email ||
        data.phone ||
        data.github ||
        data.linkedin ||
        data.website ||
        data.twitter
      );
    },
    {
      message: "At least one contact method is required",
      path: ["email"],
    }
  );

// Achievement validation
export const achievementSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Achievement title is required")
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  organization: z
    .string()
    .min(1, "Organization is required")
    .min(2, "Organization must be at least 2 characters")
    .max(100, "Organization must be less than 100 characters"),
  date: z
    .string()
    .min(1, "Date is required")
    .regex(
      /^\d{4}(-\d{2})?(-\d{2})?$/,
      "Please enter a valid date (YYYY, YYYY-MM, or YYYY-MM-DD)"
    ),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must be less than 300 characters"),
  url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

// Interests validation
export const interestsSchema = z.object({
  interests: z
    .array(
      z
        .string()
        .min(1, "Interest cannot be empty")
        .max(50, "Interest must be less than 50 characters")
    )
    .min(1, "At least one interest is required")
    .max(15, "Maximum 15 interests allowed"),
});

// Settings validation
export const settingsSchema = z.object({
  theme: z.enum(["dark", "light", "auto"], {
    message: "Please select a valid theme",
  }),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Please enter a valid hex color code"),
  font: z
    .string()
    .min(1, "Font selection is required")
    .max(50, "Font name must be less than 50 characters"),
  showContactInfo: z.boolean(),
  showSocialLinks: z.boolean(),
  enableAnimations: z.boolean(),
  isPublic: z.boolean(),
  customDomain: z
    .string()
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
      "Please enter a valid domain"
    )
    .optional()
    .or(z.literal("")),
  seoTitle: z
    .string()
    .max(60, "SEO title must be less than 60 characters")
    .optional()
    .or(z.literal("")),
  seoDescription: z
    .string()
    .max(160, "SEO description must be less than 160 characters")
    .optional()
    .or(z.literal("")),
});

// Export inferred types
export type IntroductionFormData = z.infer<typeof introductionSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type ExperienceItemFormData = z.infer<typeof experienceItemSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type SkillsFormData = z.infer<typeof skillsSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type AchievementFormData = z.infer<typeof achievementSchema>;
export type InterestsFormData = z.infer<typeof interestsSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;

// Array schemas for section forms
export const projectsSectionSchema = z.object({
  projects: z.array(projectSchema).max(20, "Maximum 20 projects allowed"),
});

export const experienceSectionSchema = z.object({
  experiences: z
    .array(experienceSchema)
    .max(10, "Maximum 10 experiences allowed"),
});

export const educationSectionSchema = z.object({
  education: z
    .array(educationSchema)
    .max(10, "Maximum 10 education entries allowed"),
});

export const achievementsSectionSchema = z.object({
  achievements: z
    .array(achievementSchema)
    .max(15, "Maximum 15 achievements allowed"),
});

// Section form data types
export type ProjectsSectionFormData = z.infer<typeof projectsSectionSchema>;
export type ExperienceSectionFormData = z.infer<typeof experienceSectionSchema>;
export type EducationSectionFormData = z.infer<typeof educationSectionSchema>;
export type AchievementsSectionFormData = z.infer<
  typeof achievementsSectionSchema
>;
