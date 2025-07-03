import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Plus, Trash2, GraduationCap } from 'lucide-react';
import { PersonalInfo } from '../../types/resume';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: Partial<PersonalInfo>) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string | string[]) => {
    onChange({ [field]: value });
  };

  const addTopSkill = () => {
    const currentSkills = data.topSkills || [];
    if (currentSkills.length < 3) {
      handleChange('topSkills', [...currentSkills, '']);
    }
  };

  const updateTopSkill = (index: number, value: string) => {
    const currentSkills = [...(data.topSkills || [])];
    currentSkills[index] = value;
    handleChange('topSkills', currentSkills);
  };

  const removeTopSkill = (index: number) => {
    const currentSkills = data.topSkills || [];
    const newSkills = currentSkills.filter((_, i) => i !== index);
    handleChange('topSkills', newSkills);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <User className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Alok Ahirrao"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="alokahirrao.ai@gmail.com"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="+91-9579472584"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Pune, Maharashtra"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Portfolio Website
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="url"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="alokahirrao.netlify.app"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="url"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="https://linkedin.com/in/alokahirrao"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub
          </label>
          <div className="relative">
            <Github className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="url"
              value={data.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="https://github.com/alok-ahirrao"
            />
          </div>
        </div>
      </div>

      {/* College Information Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">College Information</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          This information will appear in your header as: "College Name • Month Year Pass out"
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              College/University Name *
            </label>
            <input
              type="text"
              value={data.collegeName || ''}
              onChange={(e) => handleChange('collegeName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="PES Modern College of Engineering"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation Month *
              </label>
              <select
                value={data.graduationMonth || ''}
                onChange={(e) => handleChange('graduationMonth', e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation Year *
              </label>
              <input
                type="number"
                min="2020"
                max="2030"
                value={data.graduationYear || ''}
                onChange={(e) => handleChange('graduationYear', e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="2025"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Skills Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Top 3 Professional Skills *
          </label>
          {(!data.topSkills || data.topSkills.length < 3) && (
            <button
              onClick={addTopSkill}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add Skill</span>
            </button>
          )}
        </div>
        <div className="space-y-3">
          {(data.topSkills || []).map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => updateTopSkill(index, e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={`Professional skill ${index + 1} (e.g., Machine Learning Engineer)`}
                required
              />
              <button
                onClick={() => removeTopSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          These will appear in your header as "Skill 1 • Skill 2 • Skill 3"
        </p>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary *
        </label>
        <textarea
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
          required
        />
        <p className="text-sm text-gray-500 mt-2">
          2-3 sentences that capture your professional identity and value proposition
        </p>
      </div>
    </div>
  );
};