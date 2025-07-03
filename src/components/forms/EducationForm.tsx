import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Education } from '../../types/resume';

interface EducationFormProps {
  data: Education[];
  onAdd: (education: Education) => void;
  onUpdate: (id: string, updates: Partial<Education>) => void;
  onDelete: (id: string) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  data,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    institution: '',
    location: '',
    degree: '',
    specialization: '',
    startYear: '',
    endYear: '',
    gpa: '',
    gradeType: 'cgpa'
  });

  const handleAdd = () => {
    if (newEducation.institution && newEducation.degree && newEducation.startYear && newEducation.endYear) {
      onAdd({
        id: Date.now().toString(),
        institution: newEducation.institution!,
        location: newEducation.location || '',
        degree: newEducation.degree!,
        specialization: newEducation.specialization,
        startYear: newEducation.startYear!,
        endYear: newEducation.endYear!,
        gpa: newEducation.gpa,
        gradeType: newEducation.gradeType || 'cgpa'
      });
      setNewEducation({
        institution: '',
        location: '',
        degree: '',
        specialization: '',
        startYear: '',
        endYear: '',
        gpa: '',
        gradeType: 'cgpa'
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      {/* Existing Education */}
      <div className="space-y-6">
        {data.map((education) => (
          <div key={education.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => onDelete(education.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution/University Name</label>
                <input
                  type="text"
                  value={education.institution}
                  onChange={(e) => onUpdate(education.id, { institution: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="PES Modern College of Engineering"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={education.location}
                  onChange={(e) => onUpdate(education.id, { location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Pune"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree (Short Form)</label>
                <input
                  type="text"
                  value={education.degree}
                  onChange={(e) => onUpdate(education.id, { degree: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="B.E. or Class XII"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization/Honors (Optional)</label>
                <input
                  type="text"
                  value={education.specialization || ''}
                  onChange={(e) => onUpdate(education.id, { specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Artificial Intelligence and Machine Learning"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                <input
                  type="number"
                  min="2000"
                  max="2030"
                  value={education.startYear}
                  onChange={(e) => onUpdate(education.id, { startYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2021"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                <input
                  type="number"
                  min="2000"
                  max="2030"
                  value={education.endYear}
                  onChange={(e) => onUpdate(education.id, { endYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2025"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade Type</label>
                <select
                  value={education.gradeType || 'cgpa'}
                  onChange={(e) => onUpdate(education.id, { gradeType: e.target.value as 'cgpa' | 'percentage' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="cgpa">CGPA</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {education.gradeType === 'percentage' ? 'Percentage' : 'CGPA'} (Optional)
                </label>
                <input
                  type="text"
                  value={education.gpa || ''}
                  onChange={(e) => onUpdate(education.id, { gpa: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={education.gradeType === 'percentage' ? '85.5%' : '8.17'}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Education Form */}
      {showAddForm && (
        <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Education</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution/University Name *</label>
              <input
                type="text"
                value={newEducation.institution || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="PES Modern College of Engineering"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={newEducation.location || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pune"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree (Short Form) *</label>
              <input
                type="text"
                value={newEducation.degree || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="B.E. or Class XII"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization/Honors (Optional)</label>
              <input
                type="text"
                value={newEducation.specialization || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, specialization: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Artificial Intelligence and Machine Learning"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Year *</label>
              <input
                type="number"
                min="2000"
                max="2030"
                value={newEducation.startYear || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, startYear: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2021"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Year *</label>
              <input
                type="number"
                min="2000"
                max="2030"
                value={newEducation.endYear || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, endYear: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2025"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade Type</label>
              <select
                value={newEducation.gradeType || 'cgpa'}
                onChange={(e) => setNewEducation(prev => ({ ...prev, gradeType: e.target.value as 'cgpa' | 'percentage' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="cgpa">CGPA</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {newEducation.gradeType === 'percentage' ? 'Percentage' : 'CGPA'} (Optional)
              </label>
              <input
                type="text"
                value={newEducation.gpa || ''}
                onChange={(e) => setNewEducation(prev => ({ ...prev, gpa: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={newEducation.gradeType === 'percentage' ? '85.5%' : '8.17'}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Education
            </button>
          </div>
        </div>
      )}
    </div>
  );
};