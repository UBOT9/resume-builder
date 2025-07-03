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
      className="mx-auto bg-white" 
      id="resume-preview" 
      style={{ 
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '1.4',
        color: '#000000',
        padding: '30px',
        minHeight: '1123px',
        width: '100%',
        maxWidth: '850px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header - Matching the LaTeX style exactly with proper centering */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '32px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 20px'
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

      {/* Education Section */}
      {data.education.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            EDUCATION
          </h2>
          <div style={{ 
            borderBottom: '0.4px solid #000000', 
            marginBottom: '16px' 
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <h3 style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '2px'
                    }}>
                      {edu.institution}
                    </h3>
                    <div style={{
                      fontSize: '11px',
                      fontStyle: 'italic',
                      color: '#000000',
                      marginBottom: '2px'
                    }}>
                      {edu.degree}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#000000',
                    textAlign: 'right',
                    flexShrink: 0
                  }}>
                    {formatDate(edu.graduationDate)}
                  </div>
                </div>
                {edu.gpa && (
                  <div style={{
                    fontSize: '11px',
                    color: '#000000',
                    marginTop: '2px'
                  }}>
                    CGPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {data.skills.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            TECHNICAL SKILLS
          </h2>
          <div style={{ 
            borderBottom: '0.4px solid #000000', 
            marginBottom: '16px' 
          }}></div>
          
          {/* Group skills by category */}
          {['technical', 'soft', 'language'].map((category) => {
            const categorySkills = data.skills.filter(skill => skill.category === category);
            if (categorySkills.length === 0) return null;
            
            const categoryName = category === 'technical' ? 'Programming Languages' : 
                               category === 'soft' ? 'Soft Skills' : 'Languages';
            
            return (
              <div key={category} style={{ marginBottom: '12px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '4px'
                }}>
                  {categoryName}:
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#000000',
                  lineHeight: '1.4',
                  wordWrap: 'break-word'
                }}>
                  {categorySkills.map(skill => skill.name).join(', ')}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Work Experience */}
      {data.experience.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            WORK EXPERIENCE
          </h2>
          <div style={{ 
            borderBottom: '0.4px solid #000000', 
            marginBottom: '24px' 
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <h3 style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '2px'
                    }}>
                      {exp.company}
                    </h3>
                    <div style={{
                      fontSize: '11px',
                      fontStyle: 'italic',
                      color: '#000000'
                    }}>
                      {exp.position}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#000000',
                    textAlign: 'right',
                    flexShrink: 0
                  }}>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    {exp.location && (
                      <div style={{ fontSize: '10px', fontWeight: 'normal', fontStyle: 'italic' }}>
                        {exp.location}
                      </div>
                    )}
                  </div>
                </div>
                <ul style={{
                  listStyleType: 'disc',
                  paddingLeft: '20px',
                  margin: '8px 0 0 0',
                  color: '#000000'
                }}>
                  {exp.description.map((desc, index) => (
                    <li key={index} style={{
                      fontSize: '11px',
                      lineHeight: '1.4',
                      marginBottom: '4px',
                      wordWrap: 'break-word'
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
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            PROJECTS
          </h2>
          <div style={{ 
            borderBottom: '0.4px solid #000000', 
            marginBottom: '24px' 
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {data.projects.map((project) => (
              <div key={project.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#000000',
                    flex: '1',
                    minWidth: '200px'
                  }}>
                    {project.name}
                  </h3>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#000000',
                    flexShrink: 0
                  }}>
                    2024
                  </div>
                </div>
                {project.technologies.length > 0 && (
                  <div style={{
                    fontSize: '11px',
                    fontStyle: 'italic',
                    color: '#000000',
                    marginBottom: '4px',
                    wordWrap: 'break-word'
                  }}>
                    {project.technologies.join(', ')} | 
                    {project.link && ' Demo |'}
                    {project.github && ' GitHub'}
                  </div>
                )}
                <ul style={{
                  listStyleType: 'disc',
                  paddingLeft: '20px',
                  margin: '4px 0 0 0',
                  color: '#000000'
                }}>
                  <li style={{
                    fontSize: '11px',
                    lineHeight: '1.4',
                    wordWrap: 'break-word'
                  }}>
                    {project.description}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            CERTIFICATIONS
          </h2>
          <div style={{ 
            borderBottom: '0.4px solid #000000', 
            marginBottom: '24px' 
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <h3 style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '2px'
                    }}>
                      {cert.name}
                    </h3>
                    <div style={{
                      fontSize: '11px',
                      fontStyle: 'italic',
                      color: '#000000'
                    }}>
                      {cert.issuer}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#000000',
                    flexShrink: 0
                  }}>
                    {formatDate(cert.issueDate)}
                  </div>
                </div>
                {cert.credentialId && (
                  <div style={{
                    fontSize: '10px',
                    color: '#000000',
                    marginTop: '2px',
                    wordWrap: 'break-word'
                  }}>
                    Credential ID: {cert.credentialId}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};