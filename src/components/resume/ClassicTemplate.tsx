import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
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
      className="mx-auto bg-white" 
      id="resume-preview" 
      style={{ 
        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
        fontSize: '11pt',
        lineHeight: '1.2',
        color: '#000000',
        padding: '40px',
        minHeight: '1123px',
        width: '100%',
        maxWidth: '850px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header - Exact LaTeX Computer Modern styling */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '24pt',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 20px',
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

      {/* Education Section with marks below year */}
      {data.education.length > 0 && (
        <section style={{ marginBottom: '18pt' }}>
          <h2 style={{
            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
            fontSize: '14pt',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '8pt',
            borderBottom: '2px solid #000000',
            paddingBottom: '4pt'
          }}>
            EDUCATION
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12pt' }}>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <h3 style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '12pt',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '2pt',
                      wordWrap: 'break-word'
                    }}>
                      {edu.institution}{edu.location && `, ${edu.location}`}
                    </h3>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '11pt',
                      fontStyle: 'italic',
                      color: '#000000',
                      marginBottom: '2pt',
                      wordWrap: 'break-word'
                    }}>
                      {edu.degree}{edu.specialization && `, ${edu.specialization}`}
                    </div>
                  </div>
                  <div style={{
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    flexShrink: 0
                  }}>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '11pt',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '1pt'
                    }}>
                      {edu.startYear} – {edu.endYear}
                    </div>
                    {edu.gpa && (
                      <div style={{
                        fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                        fontSize: '10pt',
                        fontStyle: 'italic',
                        color: '#000000'
                      }}>
                        {edu.gradeType === 'percentage' ? 'Percentage' : 'CGPA'}: {edu.gpa}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section style={{ marginBottom: '18pt' }}>
          <h2 style={{
            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
            fontSize: '14pt',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '8pt',
            borderBottom: '2px solid #000000',
            paddingBottom: '4pt'
          }}>
            EXPERIENCE
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16pt' }}>
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4pt', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <h3 style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '12pt',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '2pt',
                      wordWrap: 'break-word'
                    }}>
                      {exp.position}
                    </h3>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '11pt',
                      color: '#000000',
                      wordWrap: 'break-word'
                    }}>
                      {exp.company}, {exp.location}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                    fontSize: '11pt',
                    fontWeight: 'bold',
                    color: '#000000',
                    flexShrink: 0
                  }}>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <ul style={{
                  listStyleType: 'disc',
                  paddingLeft: '20pt',
                  margin: '6pt 0 0 0',
                  color: '#000000'
                }}>
                  {exp.description.map((desc, index) => (
                    <li key={index} style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '11pt',
                      lineHeight: '1.3',
                      marginBottom: '3pt',
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

      {/* Skills */}
      {data.skills.length > 0 && (
        <section style={{ marginBottom: '18pt' }}>
          <h2 style={{
            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
            fontSize: '14pt',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '8pt',
            borderBottom: '2px solid #000000',
            paddingBottom: '4pt'
          }}>
            SKILLS
          </h2>
          {['technical', 'soft', 'language'].map((category) => {
            const categorySkills = data.skills.filter(skill => skill.category === category);
            if (categorySkills.length === 0) return null;
            
            const categoryName = category === 'technical' ? 'Technical Skills' : 
                               category === 'soft' ? 'Soft Skills' : 'Languages';
            
            return (
              <div key={category} style={{ marginBottom: '8pt' }}>
                <div style={{
                  fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                  fontSize: '11pt',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '2pt'
                }}>
                  {categoryName}:
                </div>
                <div style={{
                  fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                  fontSize: '11pt',
                  color: '#000000',
                  lineHeight: '1.3',
                  wordWrap: 'break-word'
                }}>
                  {categorySkills.map(skill => skill.name).join(', ')}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Projects - Fixed bullet point formatting */}
      {data.projects.length > 0 && (
        <section style={{ marginBottom: '18pt' }}>
          <h2 style={{
            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
            fontSize: '14pt',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '8pt',
            borderBottom: '2px solid #000000',
            paddingBottom: '4pt'
          }}>
            PROJECTS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16pt' }}>
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 style={{
                  fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                  fontSize: '12pt',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '4pt',
                  wordWrap: 'break-word'
                }}>
                  {project.name}
                </h3>
                {/* Fixed bullet point formatting to prevent line breaks */}
                <div style={{
                  fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                  fontSize: '11pt',
                  color: '#000000',
                  lineHeight: '1.3',
                  paddingLeft: '20pt',
                  textIndent: '-20pt',
                  marginBottom: '4pt',
                  wordWrap: 'break-word'
                }}>
                  <span style={{ 
                    display: 'inline-block', 
                    width: '20pt',
                    textAlign: 'left'
                  }}>•</span>
                  <span style={{ display: 'inline' }}>{project.description}</span>
                </div>
                {project.technologies.length > 0 && (
                  <div style={{
                    fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                    fontSize: '10pt',
                    color: '#000000',
                    marginBottom: '4pt',
                    wordWrap: 'break-word'
                  }}>
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section style={{ marginBottom: '18pt' }}>
          <h2 style={{
            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
            fontSize: '14pt',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '8pt',
            borderBottom: '2px solid #000000',
            paddingBottom: '4pt'
          }}>
            CERTIFICATIONS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12pt' }}>
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <h3 style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '11pt',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '2pt',
                      wordWrap: 'break-word'
                    }}>
                      {cert.name}
                    </h3>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '10pt',
                      color: '#000000',
                      wordWrap: 'break-word'
                    }}>
                      {cert.issuer}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                    fontSize: '10pt',
                    fontWeight: 'bold',
                    color: '#000000',
                    flexShrink: 0
                  }}>
                    {formatDate(cert.issueDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};