// Portfolio data structure types
export interface PortfolioData {
  introduction?: {
    name?: string;
    title?: string;
    bio?: string;
    avatar?: string;
  };
  projects?: Array<{
    id: string;
    title: string;
    description: string;
    image?: string;
    link?: string;
    technologies?: string[];
  }>;
  experience?: Array<{
    id: string;
    company: string;
    position: string; // Using 'position' instead of 'role' to match component usage
    duration: string;
    description: string;
  }>;
  skills?: string[]; // Simple string array as used in the component
  education?: Array<{
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string; // Changed from 'field' to 'fieldOfStudy' to match component
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  achievements?: Array<{
    id: string;
    title: string;
    organization: string;
    date: string;
    description: string;
    url?: string;
  }>;
  interests?: string[]; // Simple string array
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    twitter?: string;
    social?: {
      linkedin?: string;
      github?: string;
      twitter?: string;
      website?: string;
    };
  };
  settings?: {
    theme: "dark" | "light" | "auto";
    primaryColor: string;
    font: string;
    showContactInfo: boolean;
    showSocialLinks: boolean;
    enableAnimations: boolean;
    isPublic: boolean;
    customDomain?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
}

// Individual section data types
export interface IntroductionData {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
}

export interface ProjectData {
  id?: string;
  name?: string;
  title?: string; // Keep for backward compatibility
  description?: string;
  image?: string;
  link?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
}

export interface ExperienceData {
  id?: string;
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
}

export interface SkillData {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface EducationData {
  id?: string;
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  gpa?: string;
  description?: string;
}

export interface ContactData {
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
}
