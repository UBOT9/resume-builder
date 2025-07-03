export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  // New dynamic fields
  topSkills: string[];
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  specialization?: string;
  startYear: string;
  endYear: string;
  gpa?: string;
  gradeType?: 'cgpa' | 'percentage';
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export type ResumeTemplate = 'modern' | 'classic' | 'minimal' | 'creative';