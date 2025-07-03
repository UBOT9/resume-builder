import { useState, useEffect } from 'react';
import { ResumeData, ResumeTemplate } from '../types/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    topSkills: ['Machine Learning Engineer', 'Data Science', 'Python Developer'],
    collegeName: 'PES Modern College of Engineering',
    graduationYear: '2025',
    graduationMonth: 'June'
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: []
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>('minimal');

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Ensure new fields exist for backward compatibility
        if (!parsed.personalInfo.topSkills) {
          parsed.personalInfo.topSkills = ['Machine Learning Engineer', 'Data Science', 'Python Developer'];
        }
        if (!parsed.personalInfo.collegeName) {
          parsed.personalInfo.collegeName = 'PES Modern College of Engineering';
        }
        if (!parsed.personalInfo.graduationYear) {
          parsed.personalInfo.graduationYear = '2025';
        }
        if (!parsed.personalInfo.graduationMonth) {
          parsed.personalInfo.graduationMonth = 'June';
        }
        if (!parsed.certifications) {
          parsed.certifications = [];
        }
        setResumeData(parsed);
      } catch (error) {
        console.error('Error loading saved resume data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (personalInfo: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...personalInfo }
    }));
  };

  const addExperience = (experience: ResumeData['experience'][0]) => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, experience]
    }));
  };

  const updateExperience = (id: string, updates: Partial<ResumeData['experience'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, ...updates } : exp
      )
    }));
  };

  const deleteExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = (education: ResumeData['education'][0]) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, education]
    }));
  };

  const updateEducation = (id: string, updates: Partial<ResumeData['education'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...updates } : edu
      )
    }));
  };

  const deleteEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill: ResumeData['skills'][0]) => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const updateSkill = (id: string, updates: Partial<ResumeData['skills'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, ...updates } : skill
      )
    }));
  };

  const deleteSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addProject = (project: ResumeData['projects'][0]) => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProject = (id: string, updates: Partial<ResumeData['projects'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, ...updates } : project
      )
    }));
  };

  const deleteProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const addCertification = (certification: ResumeData['certifications'][0]) => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, certification]
    }));
  };

  const updateCertification = (id: string, updates: Partial<ResumeData['certifications'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, ...updates } : cert
      )
    }));
  };

  const deleteCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  return {
    resumeData,
    selectedTemplate,
    setSelectedTemplate,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification
  };
};