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

  // Generate dynamic header content exactly like reference image
  const getTopSkillsLine = () => {
    const skills = data.personalInfo.topSkills || ['Machine Learning Engineer', 'Data Science', 'Python Developer'];
    return skills.filter(skill => skill.trim()).join(' • ');
  };

  const getCollegeLine = () => {
    const collegeName = data.personalInfo.collegeName || 'PES Modern College of Engineering';
    const graduationMonth = data.personalInfo.graduationMonth || 'June';
    const graduationYear = data.personalInfo.graduationYear || '2025';
    const website = data.personalInfo.website ? 
      data.personalInfo.website.replace('https://', '').replace('http://', '') : 
      'alokahirrao.netlify.app';
    
    return `${collegeName} • ${graduationMonth} ${graduationYear} Pass out • ${website}`;
  };

  return (
    <div 
      className="mx-auto bg-white shadow-lg" 
      id="resume-preview" 
      style={{
        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
        fontSize: '11pt',
        lineHeight: '1.2',
        color: '#000000',
        minHeight: '1123px',
        width: '100%',
        maxWidth: '850px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header - Exact LaTeX Computer Modern styling */}
      <div style={{ 
        textAlign: 'center', 
        padding: '40px 40px 24pt 40px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        {/* Name - Large serif font with LaTeX styling, all caps, bold */}
        <h1 style={{
          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
          fontSize: '28pt',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '8pt',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          lineHeight: '1.2',
          textAlign: 'center',
          width: '100%',
          wordWrap: 'break-word',
          fontVariant: 'small-caps'
        }}>
          {data.personalInfo.fullName}
        </h1>
        
        {/* Professional title line - serif font with bullet separators */}
        <p style={{
          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
          fontSize: '12pt',
          color: '#000000',
          marginBottom: '6pt',
          lineHeight: '1.3',
          textAlign: 'center',
          width: '100%',
          wordWrap: 'break-word',
          fontWeight: 'normal'
        }}>
          {getTopSkillsLine()}
        </p>
        
        {/* College and portfolio line - EXACTLY like reference image */}
        <div style={{
          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
          fontSize: '12pt',
          color: '#000000',
          marginBottom: '6pt',
          lineHeight: '1.3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          width: '100%',
          flexWrap: 'wrap',
          fontWeight: 'normal'
        }}>
          <Globe style={{ width: '12px', height: '12px', flexShrink: 0 }} />
          <span style={{ textDecoration: 'underline', wordBreak: 'break-all' }}>
            {getCollegeLine()}
          </span>
        </div>
        
        {/* Contact information line - smaller serif font with icons */}
        <div style={{ 
          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
          fontSize: '10pt', 
          color: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          width: '100%',
          marginTop: '4pt',
          fontWeight: 'normal'
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

      <div style={{ padding: '0 40px 40px 40px', boxSizing: 'border-box' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <h2 style={{
                  fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '8pt',
                  paddingBottom: '4pt',
                  borderBottom: '2px solid #2563eb'
                }}>
                  Experience
                </h2>
                <div className="space-y-6">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 style={{
                            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                            fontSize: '12pt',
                            fontWeight: 'bold',
                            color: '#000000',
                            marginBottom: '2pt'
                          }}>
                            {exp.position}
                          </h3>
                          <p style={{
                            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                            fontSize: '11pt',
                            color: '#2563eb',
                            fontWeight: '500'
                          }}>
                            {exp.company}
                          </p>
                          <p style={{
                            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                            fontSize: '10pt',
                            color: '#666666'
                          }}>
                            {exp.location}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-600 flex-shrink-0">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span style={{
                              fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                              fontSize: '10pt'
                            }}>
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {exp.description.map((desc, index) => (
                          <li key={index} style={{
                            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                            fontSize: '11pt',
                            lineHeight: '1.3',
                            color: '#000000'
                          }}>
                            {desc}
                          </li>
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
                <h2 style={{
                  fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '8pt',
                  paddingBottom: '4pt',
                  borderBottom: '2px solid #2563eb'
                }}>
                  Projects
                </h2>
                <div className="space-y-4">
                  {data.projects.map((project) => (
                    <div key={project.id}>
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <h3 style={{
                          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                          fontSize: '12pt',
                          fontWeight: 'bold',
                          color: '#000000',
                          flex: '1',
                          minWidth: '0'
                        }}>
                          {project.name}
                        </h3>
                        <div className="flex space-x-2 flex-shrink-0">
                          {project.link && (
                            <span style={{
                              fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                              fontSize: '10pt',
                              color: '#2563eb'
                            }}>
                              Demo
                            </span>
                          )}
                          {project.github && (
                            <span style={{
                              fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                              fontSize: '10pt',
                              color: '#666666'
                            }}>
                              Code
                            </span>
                          )}
                        </div>
                      </div>
                      <p style={{
                        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                        fontSize: '11pt',
                        color: '#000000',
                        lineHeight: '1.3',
                        marginBottom: '8px'
                      }}>
                        {project.description}
                      </p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              style={{
                                fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                                fontSize: '9pt',
                                padding: '2px 8px',
                                backgroundColor: '#dbeafe',
                                color: '#1e40af',
                                borderRadius: '12px'
                              }}
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
                <h2 style={{
                  fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '8pt',
                  paddingBottom: '4pt',
                  borderBottom: '2px solid #2563eb'
                }}>
                  Education
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 style={{
                        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                        fontSize: '12pt',
                        fontWeight: 'bold',
                        color: '#000000'
                      }}>
                        {edu.degree}
                      </h3>
                      <p style={{
                        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                        fontSize: '11pt',
                        color: '#2563eb',
                        fontWeight: '500'
                      }}>
                        {edu.institution}
                      </p>
                      <p style={{
                        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                        fontSize: '10pt',
                        color: '#666666'
                      }}>
                        {edu.location}
                      </p>
                      <p style={{
                        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                        fontSize: '10pt',
                        color: '#666666'
                      }}>
                        {edu.startYear} - {edu.endYear}
                      </p>
                      {edu.gpa && (
                        <p style={{
                          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                          fontSize: '10pt',
                          color: '#666666'
                        }}>
                          {edu.gradeType === 'percentage' ? 'Percentage' : 'CGPA'}: {edu.gpa}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <section>
                <h2 style={{
                  fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '8pt',
                  paddingBottom: '4pt',
                  borderBottom: '2px solid #2563eb'
                }}>
                  Skills
                </h2>
                
                {['technical', 'soft', 'language'].map((category) => {
                  const categorySkills = data.skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  const categoryName = category === 'technical' ? 'Technical' : 
                                     category === 'soft' ? 'Soft Skills' : 'Languages';
                  
                  return (
                    <div key={category} className="mb-4">
                      <h3 style={{
                        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                        fontSize: '12pt',
                        fontWeight: 'bold',
                        color: '#000000',
                        marginBottom: '8px'
                      }}>
                        {categoryName}
                      </h3>
                      <div className="space-y-2">
                        {categorySkills.map((skill) => (
                          <div key={skill.id} style={{
                            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                            fontSize: '11pt',
                            color: '#000000'
                          }}>
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
                <h2 style={{
                  fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '8pt',
                  paddingBottom: '4pt',
                  borderBottom: '2px solid #2563eb'
                }}>
                  Certifications
                </h2>
                <div className="space-y-4">
                  {data.certifications.map((cert) => (
                    <div key={cert.id}>
                      <h3 style={{
                        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                        fontSize: '12pt',
                        fontWeight: 'bold',
                        color: '#000000'
                      }}>
                        {cert.name}
                      </h3>
                      <p style={{
                        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                        fontSize: '11pt',
                        color: '#2563eb',
                        fontWeight: '500'
                      }}>
                        {cert.issuer}
                      </p>
                      <p style={{
                        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                        fontSize: '10pt',
                        color: '#666666'
                      }}>
                        {formatDate(cert.issueDate)}
                      </p>
                      {cert.credentialId && (
                        <p style={{
                          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                          fontSize: '10pt',
                          color: '#666666'
                        }}>
                          ID: {cert.credentialId}
                        </p>
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