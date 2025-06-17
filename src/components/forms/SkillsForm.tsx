import React, { useState } from 'react';
import { Code, Plus, Trash2 } from 'lucide-react';
import { Skill } from '../../types/resume';

interface SkillsFormProps {
  data: Skill[];
  onAdd: (skill: Skill) => void;
  onUpdate: (id: string, updates: Partial<Skill>) => void;
  onDelete: (id: string) => void;
}

const skillCategories = [
  { value: 'technical', label: 'Technical Skills' },
  { value: 'soft', label: 'Soft Skills' },
  { value: 'language', label: 'Languages' }
] as const;

export const SkillsForm: React.FC<SkillsFormProps> = ({
  data,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: '',
    category: 'technical'
  });

  const handleAdd = () => {
    if (newSkill.name) {
      onAdd({
        id: Date.now().toString(),
        name: newSkill.name!,
        category: newSkill.category || 'technical'
      });
      setNewSkill({
        name: '',
        category: 'technical'
      });
      setShowAddForm(false);
    }
  };

  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Existing Skills by Category */}
      <div className="space-y-6">
        {skillCategories.map((category) => {
          const categorySkills = groupedSkills[category.value] || [];
          if (categorySkills.length === 0) return null;

          return (
            <div key={category.value}>
              <h3 className="text-lg font-medium text-gray-900 mb-3">{category.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="border border-gray-200 rounded-lg p-4 relative">
                    <button
                      onClick={() => onDelete(skill.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="mb-3">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => onUpdate(skill.id, { name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        placeholder="Skill name"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Skill Form */}
      {showAddForm && (
        <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Skill</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name *</label>
              <input
                type="text"
                value={newSkill.name || ''}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="JavaScript, Leadership, Spanish, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newSkill.category || 'technical'}
                onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value as Skill['category'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {skillCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
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
              Add Skill
            </button>
          </div>
        </div>
      )}
    </div>
  );
};