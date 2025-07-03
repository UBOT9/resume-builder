import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Generate dynamic header content
  const getTopSkillsLine = () => {
    const skills = data.personalInfo.topSkills || ['Machine Learning Engineer', 'Data Science', 'Python Developer'];
    return skills.filter(skill => skill.trim()).join(' • ');
  };

  const getCollegeLine = () => {
    const collegeName = data.personalInfo.collegeName || 'PES Modern College of Engineering';
    const graduationMonth = data.personalInfo.graduationMonth || 'June';
    const graduationYear = data.personalInfo.graduationYear || '2025';
    return `${collegeName} • ${graduationMonth} ${graduationYear} Pass out`;
  };

  return (
    <div 
      className="mx-auto bg-white shadow-lg" 
      id="resume-preview" 
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '1.4',
        color: '#000000',
        minHeight: '1123px',
        width: '100%',
        maxWidth: '850px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header - Matching the LaTeX style exactly with proper centering */}
      <div style={{ 
        textAlign: 'center', 
        padding: '30px 30px 20px 30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        {/* Name - Large serif font, all caps, bold */}
        <h1 style={{
          fontFamily: 'Times New Roman, serif',
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          lineHeight: '1.2',
          textAlign: 'center',
          width: '100%',
          wordWrap: 'break-word'
        }}>
          {data.personalInfo.fullName.toUpperCase()}
        </h1>
        
        {/* Professional title line - sans-serif with bullet separators */}
        <p style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          color: '#000000',
          marginBottom: '6px',
          lineHeight: '1.4',
          textAlign: 'center',
          width: '100%',
          wordWrap: 'break-word'
        }}>
          {getTopSkillsLine()}
        </p>
        
        {/* College and portfolio line - same styling as title */}
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          color: '#000000',
          marginBottom: '6px',
          lineHeight: '1.4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          width: '100%',
          flexWrap: 'wrap'
        }}>
          <span style={{ textAlign: 'center' }}>{getCollegeLine()}</span>
          <Globe style={{ width: '12px', height: '12px', flexShrink: 0 }} />
          <span style={{ textDecoration: 'underline', wordBreak: 'break-all' }}>
            {data.personalInfo.website ? 
              data.personalInfo.website.replace('https://', '').replace('http://', '') : 
              'alokahirrao.netlify.app'
            }
          </span>
        </div>
        
        {/* Contact information line - smaller font with icons */}
        <div style={{ 
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px', 
          color: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          width: '100%',
          marginTop: '4px'
        }}>
          {data.personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <Phone style={{ width: '10px', height: '10px' }} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <Mail style={{ width: '10px', height: '10px' }} />
              <span style={{ textDecoration: 'underline', wordBreak: 'break-all' }}>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <Linkedin style={{ width: '10px', height: '10px' }} />
              <span style={{ textDecoration: 'underline', wordBreak: 'break-all' }}>
                {data.personalInfo.linkedin.replace('https://linkedin.com/in/', '').replace('https://www.linkedin.com/in/', 'linkedin.com/in/')}
              </span>
            </div>
          )}
          {data.personalInfo.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <Github style={{ width: '10px', height: '10px' }} />
              <span style={{ textDecoration: 'underline', wordBreak: 'break-all' }}>
                {data.personalInfo.github.replace('https://github.com/', 'github.com/')}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '0 30px 30px 30px', boxSizing: 'border-box' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                  Experience
                </h2>
                <div className="space-y-6">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 break-words">{exp.position}</h3>
                          <p className="text-blue-600 font-medium break-words">{exp.company}</p>
                          <p className="text-gray-600 text-sm break-words">{exp.location}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600 flex-shrink-0">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {exp.description.map((desc, index) => (
                          <li key={index} className="break-words">{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                  Projects
                </h2>
                <div className="space-y-4">
                  {data.projects.map((project) => (
                    <div key={project.id}>
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <h3 className="text-lg font-semibold text-gray-800 flex-1 min-w-0 break-words">{project.name}</h3>
                        <div className="flex space-x-2 flex-shrink-0">
                          {project.link && (
                            <span className="text-blue-600 text-sm">Demo</span>
                          )}
                          {project.github && (
                            <span className="text-gray-600 text-sm">Code</span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2 break-words">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full break-words"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Education */}
            {data.education.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                  Education
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-semibold text-gray-800 break-words">{edu.degree}</h3>
                      <p className="text-blue-600 font-medium break-words">{edu.institution}</p>
                      <p className="text-gray-600 text-sm break-words">{edu.location}</p>
                      <p className="text-gray-600 text-sm">{formatDate(edu.graduationDate)}</p>
                      {edu.gpa && (
                        <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                      )}
                      {edu.honors && (
                        <p className="text-gray-600 text-sm break-words">{edu.honors}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                  Skills
                </h2>
                
                {['technical', 'soft', 'language'].map((category) => {
                  const categorySkills = data.skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  const categoryName = category === 'technical' ? 'Technical' : 
                                     category === 'soft' ? 'Soft Skills' : 'Languages';
                  
                  return (
                    <div key={category} className="mb-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{categoryName}</h3>
                      <div className="space-y-2">
                        {categorySkills.map((skill) => (
                          <div key={skill.id} className="text-gray-700 text-sm break-words">
                            {skill.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </section>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                  Certifications
                </h2>
                <div className="space-y-4">
                  {data.certifications.map((cert) => (
                    <div key={cert.id}>
                      <h3 className="font-semibold text-gray-800 break-words">{cert.name}</h3>
                      <p className="text-blue-600 font-medium break-words">{cert.issuer}</p>
                      <p className="text-gray-600 text-sm">{formatDate(cert.issueDate)}</p>
                      {cert.credentialId && (
                        <p className="text-gray-600 text-sm break-words">ID: {cert.credentialId}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};