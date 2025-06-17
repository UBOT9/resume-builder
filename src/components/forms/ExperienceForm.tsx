import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Building } from 'lucide-react';
import { Experience } from '../../types/resume';

interface ExperienceFormProps {
  data: Experience[];
  onAdd: (experience: Experience) => void;
  onUpdate: (id: string, updates: Partial<Experience>) => void;
  onDelete: (id: string) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  data,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ['']
  });

  const handleAdd = () => {
    if (newExperience.position && newExperience.company && newExperience.startDate) {
      onAdd({
        id: Date.now().toString(),
        position: newExperience.position!,
        company: newExperience.company!,
        location: newExperience.location || '',
        startDate: newExperience.startDate!,
        endDate: newExperience.current ? '' : newExperience.endDate || '',
        current: newExperience.current || false,
        description: newExperience.description || ['']
      });
      setNewExperience({
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ['']
      });
      setShowAddForm(false);
    }
  };

  const addDescriptionPoint = (experienceId: string) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (experience) {
      onUpdate(experienceId, {
        description: [...experience.description, '']
      });
    }
  };

  const updateDescriptionPoint = (experienceId: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (experience) {
      const newDescription = [...experience.description];
      newDescription[index] = value;
      onUpdate(experienceId, { description: newDescription });
    }
  };

  const removeDescriptionPoint = (experienceId: string, index: number) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (experience && experience.description.length > 1) {
      const newDescription = experience.description.filter((_, i) => i !== index);
      onUpdate(experienceId, { description: newDescription });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Existing Experiences */}
      <div className="space-y-6">
        {data.map((experience) => (
          <div key={experience.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => onDelete(experience.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={experience.position}
                  onChange={(e) => onUpdate(experience.id, { position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => onUpdate(experience.id, { company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={experience.location}
                  onChange={(e) => onUpdate(experience.id, { location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => onUpdate(experience.id, { startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => onUpdate(experience.id, { endDate: e.target.value })}
                    disabled={experience.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={experience.current}
                  onChange={(e) => onUpdate(experience.id, { current: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">I currently work here</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
              {experience.description.map((desc, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <textarea
                    value={desc}
                    onChange={(e) => updateDescriptionPoint(experience.id, index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={2}
                    placeholder="Describe your key achievements and responsibilities..."
                  />
                  {experience.description.length > 1 && (
                    <button
                      onClick={() => removeDescriptionPoint(experience.id, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addDescriptionPoint(experience.id)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                + Add Achievement
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Experience Form */}
      {showAddForm && (
        <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Experience</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
              <input
                type="text"
                value={newExperience.position || ''}
                onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
              <input
                type="text"
                value={newExperience.company || ''}
                onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tech Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={newExperience.location || ''}
                onChange={(e) => setNewExperience(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  type="month"
                  value={newExperience.startDate || ''}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="month"
                  value={newExperience.endDate || ''}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                  disabled={newExperience.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newExperience.current || false}
                onChange={(e) => setNewExperience(prev => ({ ...prev, current: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">I currently work here</span>
            </label>
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
              Add Experience
            </button>
          </div>
        </div>
      )}
    </div>
  );
};