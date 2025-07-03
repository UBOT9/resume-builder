import React from 'react';
import { ResumeData, ResumeTemplate } from '../../types/resume';
import { ModernTemplate } from './ModernTemplate';
import { MinimalisticTemplate } from './MinimalisticTemplate';
import { ClassicTemplate } from './ClassicTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'minimal':
        return <MinimalisticTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'modern':
      case 'creative':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Resume Preview</h2>
        <p className="text-gray-600 text-sm">This is how your resume will look when exported</p>
      </div>
      <div className="transform scale-75 origin-top border border-gray-300 rounded-lg overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
};