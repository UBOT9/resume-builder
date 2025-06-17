import React, { useState } from 'react';
import { Award, Plus, Trash2, Calendar } from 'lucide-react';
import { Certification } from '../../types/resume';

interface CertificationsFormProps {
  data: Certification[];
  onAdd: (certification: Certification) => void;
  onUpdate: (id: string, updates: Partial<Certification>) => void;
  onDelete: (id: string) => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({
  data,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCertification, setNewCertification] = useState<Partial<Certification>>({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: ''
  });

  const handleAdd = () => {
    if (newCertification.name && newCertification.issuer && newCertification.issueDate) {
      onAdd({
        id: Date.now().toString(),
        name: newCertification.name!,
        issuer: newCertification.issuer!,
        issueDate: newCertification.issueDate!,
        expiryDate: newCertification.expiryDate,
        credentialId: newCertification.credentialId
      });
      setNewCertification({
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: ''
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {/* Existing Certifications */}
      <div className="space-y-6">
        {data.map((certification) => (
          <div key={certification.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => onDelete(certification.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                <input
                  type="text"
                  value={certification.name}
                  onChange={(e) => onUpdate(certification.id, { name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                <input
                  type="text"
                  value={certification.issuer}
                  onChange={(e) => onUpdate(certification.id, { issuer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Amazon Web Services"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                <input
                  type="month"
                  value={certification.issueDate}
                  onChange={(e) => onUpdate(certification.id, { issueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
                <input
                  type="month"
                  value={certification.expiryDate || ''}
                  onChange={(e) => onUpdate(certification.id, { expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  value={certification.credentialId || ''}
                  onChange={(e) => onUpdate(certification.id, { credentialId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ABC123XYZ789"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Certification Form */}
      {showAddForm && (
        <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Certification</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name *</label>
              <input
                type="text"
                value={newCertification.name || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="AWS Certified Solutions Architect"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization *</label>
              <input
                type="text"
                value={newCertification.issuer || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Amazon Web Services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date *</label>
              <input
                type="month"
                value={newCertification.issueDate || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, issueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
              <input
                type="month"
                value={newCertification.expiryDate || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, expiryDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID (Optional)</label>
              <input
                type="text"
                value={newCertification.credentialId || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, credentialId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ABC123XYZ789"
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
              Add Certification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};