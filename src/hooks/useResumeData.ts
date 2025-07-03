import { useState, useEffect } from 'react';
import { ResumeData, ResumeTemplate } from '../types/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Alok Ahirrao',
    email: 'alokahirrao.ai@gmail.com',
    phone: '+91-9579472584',
    location: 'Pune, Maharashtra',
    website: 'https://alokahirrao.netlify.app',
    linkedin: 'https://linkedin.com/in/alokahirrao',
    github: 'https://github.com/alok-ahirrao',
    summary: 'Passionate Machine Learning Engineer with expertise in AI-driven solutions, data science, and full-stack development. Experienced in building intelligent systems using Python, deep learning frameworks, and modern web technologies.',
    topSkills: ['Machine Learning Engineer', 'Data Science', 'Python Developer'],
    collegeName: 'PES Modern College of Engineering',
    graduationMonth: 'June',
    graduationYear: '2025'
  },
  experience: [
    {
      id: '1',
      position: 'Machine Learning Developer Intern',
      company: 'Ilytics Technology',
      location: 'Pune',
      startDate: '2024-06',
      endDate: '',
      current: true,
      description: [
        'Developed AI-powered smart parking system with real-time vehicle classification and slot detection',
        'Built ML models using TensorFlow/PyTorch for vehicle classification (VIP, Normal, EV)',
        'Enhanced chatbot interactions using prompt engineering for improved booking experience',
        'Implemented admin dashboard for monitoring and analytics'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'PES Modern College of Engineering',
      location: 'Pune',
      degree: 'B.E.',
      specialization: 'Artificial Intelligence and Machine Learning',
      startYear: '2021',
      endYear: '2025',
      gpa: '8.17',
      gradeType: 'cgpa'
    },
    {
      id: '2',
      institution: 'MET Bhujbal Knowledge City',
      location: 'Nashik',
      degree: 'Class XII',
      specialization: 'PCM',
      startYear: '2020',
      endYear: '2021',
      gpa: '81.5',
      gradeType: 'percentage'
    }
  ],
  skills: [
    { id: '1', name: 'Python', category: 'technical' },
    { id: '2', name: 'SQL', category: 'technical' },
    { id: '3', name: 'Scikit-learn', category: 'technical' },
    { id: '4', name: 'Pandas', category: 'technical' },
    { id: '5', name: 'NumPy', category: 'technical' },
    { id: '6', name: 'Matplotlib', category: 'technical' },
    { id: '7', name: 'Seaborn', category: 'technical' },
    { id: '8', name: 'OpenCV', category: 'technical' },
    { id: '9', name: 'PyTorch', category: 'technical' },
    { id: '10', name: 'TensorFlow', category: 'technical' },
    { id: '11', name: 'FastAPI', category: 'technical' },
    { id: '12', name: 'Flask', category: 'technical' },
    { id: '13', name: 'MongoDB', category: 'technical' },
    { id: '14', name: 'PostgreSQL', category: 'technical' },
    { id: '15', name: 'Git', category: 'technical' },
    { id: '16', name: 'Docker', category: 'technical' },
    { id: '17', name: 'AWS', category: 'technical' }
  ],
  projects: [
    {
      id: '1',
      name: 'AI Medical Bot',
      description: 'Designed an AI-driven healthcare assistant supporting voice queries, medical image analysis, and text/audio responses using deep learning and NLP models',
      technologies: ['Python', 'Deep Learning', 'OpenCV', 'NLP'],
      link: 'https://demo-link.com',
      github: 'https://github.com/alok-ahirrao/ai-medical-bot'
    },
    {
      id: '2',
      name: 'Recipe Chatbot',
      description: 'Developed an AI-powered Recipe Chatbot using YOLO for ingredient detection and Groq API for recipe generation',
      technologies: ['FastAPI', 'React', 'Groq API'],
      link: '',
      github: 'https://github.com/alok-ahirrao/recipe-chatbot'
    },
    {
      id: '3',
      name: 'Hand Gesture-Controlled Gaming System',
      description: 'Developed interactive gaming system with hand gesture recognition using OpenCV and MediaPipe',
      technologies: ['OpenCV', 'MediaPipe'],
      link: '',
      github: 'https://github.com/alok-ahirrao/gesture-gaming'
    },
    {
      id: '4',
      name: 'Number Plate Detection System',
      description: 'Built real-time number plate recognition system using YOLOv5 and PaddleOCR',
      technologies: ['PyTorch', 'FastAPI', 'React'],
      link: '',
      github: 'https://github.com/alok-ahirrao/number-plate-detection'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'Machine Learning Specialization',
      issuer: 'DeepLearning.AI & Stanford University',
      issueDate: '2023-05',
      expiryDate: '',
      credentialId: ''
    },
    {
      id: '2',
      name: 'NPTEL Python for Data Science',
      issuer: 'IIT Madras - Grade A+ (79%)',
      issueDate: '2024-01',
      expiryDate: '',
      credentialId: ''
    },
    {
      id: '3',
      name: 'HackerRank Problem Solving',
      issuer: 'HackerRank',
      issueDate: '2024-09',
      expiryDate: '',
      credentialId: ''
    }
  ]
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
        if (!parsed.personalInfo.graduationMonth) {
          parsed.personalInfo.graduationMonth = 'June';
        }
        if (!parsed.personalInfo.graduationYear) {
          parsed.personalInfo.graduationYear = '2025';
        }
        
        // Update education structure for backward compatibility
        if (parsed.education) {
          parsed.education = parsed.education.map((edu: any) => ({
            ...edu,
            institution: edu.institution || edu.school || '',
            startYear: edu.startYear || edu.graduationDate?.split('-')[0] || '',
            endYear: edu.endYear || edu.graduationDate?.split('-')[0] || '',
            gradeType: edu.gradeType || 'cgpa'
          }));
        }
        
        if (!parsed.certifications) {
          parsed.certifications = [];
        }
        setResumeData(parsed);
      } catch (error) {
        console.error('Error loading saved resume data:', error);
        // If there's an error, use the initial data with sample content
        setResumeData(initialResumeData);
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