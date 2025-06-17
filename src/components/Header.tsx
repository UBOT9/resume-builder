import React from 'react';
import { FileText, Download, Eye, Settings } from 'lucide-react';
import { ResumeTemplate } from '../types/resume';

interface HeaderProps {
  selectedTemplate: ResumeTemplate;
  onTemplateChange: (template: ResumeTemplate) => void;
  onExportPDF: () => void;
  showPreview: boolean;
  onTogglePreview: () => void;
}

const templates: { value: ResumeTemplate; label: string }[] = [
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimalistic' },
  { value: 'classic', label: 'Classic' },
  { value: 'creative', label: 'Creative' }
];

export const Header: React.FC<HeaderProps> = ({
  selectedTemplate,
  onTemplateChange,
  onExportPDF,
  showPreview,
  onTogglePreview
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          </div>
          <div className="hidden md:block text-sm text-gray-500">
            Build your perfect resume in minutes
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-gray-500" />
            <select
              value={selectedTemplate}
              onChange={(e) => onTemplateChange(e.target.value as ResumeTemplate)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {templates.map(template => (
                <option key={template.value} value={template.value}>
                  {template.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onTogglePreview}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              showPreview
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </span>
          </button>

          <button
            onClick={onExportPDF}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};