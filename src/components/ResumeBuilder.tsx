import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { ResumePreview } from './resume/ResumePreview';
import { useResumeData } from '../hooks/useResumeData';
import { exportToPDF } from '../utils/pdfExport';

interface ResumeBuilderProps {
  onBackToHome: () => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onBackToHome }) => {
  const [showPreview, setShowPreview] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  
  const {
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
  } = useResumeData();

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDF('resume-preview', `${resumeData.personalInfo.fullName || 'Resume'}.pdf`);
    } catch (error) {
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* Back to Home Button */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <Header
        selectedTemplate={selectedTemplate}
        onTemplateChange={setSelectedTemplate}
        onExportPDF={handleExportPDF}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview(!showPreview)}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          {/* Forms Section */}
          <div className="space-y-6">
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={updatePersonalInfo}
            />
            
            <ExperienceForm
              data={resumeData.experience}
              onAdd={addExperience}
              onUpdate={updateExperience}
              onDelete={deleteExperience}
            />
            
            <EducationForm
              data={resumeData.education}
              onAdd={addEducation}
              onUpdate={updateEducation}
              onDelete={deleteEducation}
            />
            
            <SkillsForm
              data={resumeData.skills}
              onAdd={addSkill}
              onUpdate={updateSkill}
              onDelete={deleteSkill}
            />
            
            <ProjectsForm
              data={resumeData.projects}
              onAdd={addProject}
              onUpdate={updateProject}
              onDelete={deleteProject}
            />

            <CertificationsForm
              data={resumeData.certifications}
              onAdd={addCertification}
              onUpdate={updateCertification}
              onDelete={deleteCertification}
            />
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <ResumePreview
                data={resumeData}
                template={selectedTemplate}
              />
            </div>
          )}
        </div>
      </div>

      {/* Loading overlay for PDF export */}
      {isExporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-700">Generating your PDF...</p>
          </div>
        </div>
      )}
    </>
  );
};