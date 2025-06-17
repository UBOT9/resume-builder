import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface MinimalisticTemplateProps {
  data: ResumeData;
}

export const MinimalisticTemplate: React.FC<MinimalisticTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white" id="resume-preview" style={{ 
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      lineHeight: '1.4',
      color: '#000000',
      padding: '40px',
      minHeight: '1123px',
      width: '794px'
    }}>
      {/* Header */}
      <div className="mb-8">
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          lineHeight: '1.2'
        }}>
          {data.personalInfo.fullName}
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#333333',
          marginBottom: '16px',
          lineHeight: '1.5'
        }}>
          {data.personalInfo.summary}
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '24px', 
          fontSize: '12px', 
          color: '#666666' 
        }}>
          {data.personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone style={{ width: '14px', height: '14px' }} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail style={{ width: '14px', height: '14px' }} />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin style={{ width: '14px', height: '14px' }} />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe style={{ width: '14px', height: '14px' }} />
              <span>{data.personalInfo.website.replace('https://', '').replace('http://', '')}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Linkedin style={{ width: '14px', height: '14px' }} />
              <span>{data.personalInfo.linkedin.replace('https://linkedin.com/in/', '').replace('https://www.linkedin.com/in/', '')}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Github style={{ width: '14px', height: '14px' }} />
              <span>{data.personalInfo.github.replace('https://github.com/', '')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Profile Section */}
      {data.personalInfo.summary && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            PROFILE
          </h2>
          <div style={{ 
            borderBottom: '1px dashed #000000', 
            marginBottom: '16px' 
          }}></div>
          <p style={{
            color: '#333333',
            lineHeight: '1.6'
          }}>
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div style={{ 
            borderBottom: '1px dashed #000000', 
            marginBottom: '24px' 
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '4px'
                }}>
                  {exp.position}
                </h3>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#333333',
                  marginBottom: '4px'
                }}>
                  {exp.company}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#666666',
                  marginBottom: '12px',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar style={{ width: '12px', height: '12px' }} />
                    <span>
                      {formatDate(exp.startDate)} - {exp.current ? 'Ongoing' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin style={{ width: '12px', height: '12px' }} />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
                <ul style={{
                  listStyleType: 'disc',
                  paddingLeft: '20px',
                  margin: '0',
                  color: '#333333'
                }}>
                  {exp.description.map((desc, index) => (
                    <li key={index} style={{
                      lineHeight: '1.6',
                      marginBottom: '4px'
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
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            PROJECTS
          </h2>
          <div style={{ 
            borderBottom: '1px dashed #000000', 
            marginBottom: '24px' 
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '4px'
                }}>
                  {project.name}
                </h3>
                <p style={{
                  color: '#333333',
                  lineHeight: '1.6',
                  marginBottom: '8px'
                }}>
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div style={{
                    fontSize: '12px',
                    color: '#666666',
                    marginBottom: '8px'
                  }}>
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  fontSize: '12px',
                  color: '#666666'
                }}>
                  {project.link && (
                    <span>Demo: {project.link.replace('https://', '').replace('http://', '')}</span>
                  )}
                  {project.github && (
                    <span>Code: {project.github.replace('https://github.com/', '')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            EDUCATION
          </h2>
          <div style={{ 
            borderBottom: '1px dashed #000000', 
            marginBottom: '24px' 
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '4px'
                }}>
                  {edu.degree}
                </h3>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#333333',
                  marginBottom: '4px'
                }}>
                  {edu.institution}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#666666',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar style={{ width: '12px', height: '12px' }} />
                    <span>{formatDate(edu.graduationDate)}</span>
                  </div>
                  {edu.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin style={{ width: '12px', height: '12px' }} />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>
                {(edu.gpa || edu.honors) && (
                  <div style={{
                    fontSize: '12px',
                    color: '#666666',
                    marginTop: '4px'
                  }}>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    {edu.gpa && edu.honors && <span> • </span>}
                    {edu.honors && <span>{edu.honors}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            CERTIFICATION
          </h2>
          <div style={{ 
            borderBottom: '1px dashed #000000', 
            marginBottom: '24px' 
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '4px'
                }}>
                  {cert.name}
                </h3>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#333333',
                  marginBottom: '4px'
                }}>
                  {cert.issuer}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#666666',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar style={{ width: '12px', height: '12px' }} />
                    <span>
                      {formatDate(cert.issueDate)}
                      {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
                    </span>
                  </div>
                </div>
                {cert.credentialId && (
                  <div style={{
                    fontSize: '12px',
                    color: '#666666',
                    marginTop: '4px'
                  }}>
                    <strong>Credential ID:</strong> {cert.credentialId}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {data.skills.filter(skill => skill.category === 'technical').length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            TECHNICAL SKILLS
          </h2>
          <div style={{ 
            borderBottom: '1px dashed #000000', 
            marginBottom: '24px' 
          }}></div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {data.skills.filter(skill => skill.category === 'technical').map((skill) => (
              <span key={skill.id} style={{
                color: '#333333',
                fontWeight: '500'
              }}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.skills.filter(skill => skill.category === 'language').length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            LANGUAGES
          </h2>
          <div style={{ 
            borderBottom: '1px dashed #000000', 
            marginBottom: '24px' 
          }}></div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {data.skills.filter(skill => skill.category === 'language').map((skill) => (
              <span key={skill.id} style={{
                color: '#333333',
                fontWeight: '500'
              }}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Soft Skills */}
      {data.skills.filter(skill => skill.category === 'soft').length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            SOFT SKILLS
          </h2>
          <div style={{ 
            borderBottom: '1px dashed #000000', 
            marginBottom: '24px' 
          }}></div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {data.skills.filter(skill => skill.category === 'soft').map((skill) => (
              <span key={skill.id} style={{
                color: '#333333',
                fontWeight: '500'
              }}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};