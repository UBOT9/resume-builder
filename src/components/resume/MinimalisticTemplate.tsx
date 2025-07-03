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

  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    const start = new Date(startDate + '-01');
    const startYear = start.getFullYear();
    
    if (current) {
      return `${startYear} – Present`;
    }
    
    if (endDate) {
      const end = new Date(endDate + '-01');
      const endYear = end.getFullYear();
      return `${startYear} – ${endYear}`;
    }
    
    return `${startYear}`;
  };

  // Generate dynamic header content
  const getTopSkillsLine = () => {
    const skills = data.personalInfo.topSkills || ['Machine Learning Engineer', 'Data Science', 'Python Developer'];
    return skills.filter(skill => skill.trim()).join(' • ');
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
        width: '794px',
        maxWidth: '794px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header - Exact LaTeX Computer Modern styling matching the reference */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '20pt',
        width: '100%'
      }}>
        {/* Name - Large serif font with LaTeX styling, all caps, bold */}
        <h1 style={{
          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
          fontSize: '24pt',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '6pt',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          lineHeight: '1.1',
          textAlign: 'center',
          fontVariant: 'small-caps'
        }}>
          {data.personalInfo.fullName}
        </h1>
        
        {/* Professional title line - serif font with bullet separators */}
        <p style={{
          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
          fontSize: '11pt',
          color: '#000000',
          marginBottom: '4pt',
          lineHeight: '1.2',
          textAlign: 'center',
          fontWeight: 'normal'
        }}>
          {getTopSkillsLine()}
        </p>
        
        {/* Website line */}
        <div style={{
          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
          fontSize: '11pt',
          color: '#000000',
          marginBottom: '4pt',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          flexWrap: 'wrap',
          fontWeight: 'normal'
        }}>
          <Globe style={{ width: '11px', height: '11px', flexShrink: 0 }} />
          <span style={{ textDecoration: 'underline' }}>
            {data.personalInfo.website ? 
              data.personalInfo.website.replace('https://', '').replace('http://', '') : 
              'alokahirrao.netlify.app'
            }
          </span>
        </div>
        
        {/* Contact information line */}
        <div style={{ 
          fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
          fontSize: '10pt', 
          color: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginTop: '2pt',
          fontWeight: 'normal'
        }}>
          {data.personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Phone style={{ width: '9px', height: '9px' }} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Mail style={{ width: '9px', height: '9px' }} />
              <span style={{ textDecoration: 'underline' }}>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Linkedin style={{ width: '9px', height: '9px' }} />
              <span style={{ textDecoration: 'underline' }}>
                {data.personalInfo.linkedin.replace('https://linkedin.com/in/', '').replace('https://www.linkedin.com/in/', 'linkedin.com/in/')}
              </span>
            </div>
          )}
          {data.personalInfo.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Github style={{ width: '9px', height: '9px' }} />
              <span style={{ textDecoration: 'underline' }}>
                {data.personalInfo.github.replace('https://github.com/', 'github.com/')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Education Section - Matching exact layout from reference with marks below year */}
      {data.education.length > 0 && (
        <section style={{ marginBottom: '16pt' }}>
          <h2 style={{
            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
            fontSize: '12pt',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '6pt',
            borderBottom: '0.8pt solid #000000',
            paddingBottom: '2pt'
          }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8pt' }}>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: '1' }}>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '11pt',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '1pt'
                    }}>
                      {edu.institution}{edu.location && `, ${edu.location}`}
                    </div>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '10pt',
                      fontStyle: 'italic',
                      color: '#000000'
                    }}>
                      {edu.degree}{edu.specialization && `, ${edu.specialization}`}
                    </div>
                  </div>
                  <div style={{
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
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

      {/* Technical Skills Section - Matching exact categorization from reference */}
      {data.skills.length > 0 && (
        <section style={{ marginBottom: '16pt' }}>
          <h2 style={{
            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
            fontSize: '12pt',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '6pt',
            borderBottom: '0.8pt solid #000000',
            paddingBottom: '2pt'
          }}>
            Technical Skills
          </h2>
          
          {/* Categorized skills matching the reference layout */}
          {[
            { label: 'Programming Languages:', skills: ['Python', 'SQL'] },
            { label: 'Machine Learning & Data Science:', skills: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'OpenCV'] },
            { label: 'Deep Learning:', skills: ['PyTorch', 'TensorFlow (basic)', 'CNNs', 'RNNs', 'Transformers (basic)'] },
            { label: 'Backend & APIs:', skills: ['FastAPI', 'Flask', 'RESTful APIs', 'MongoDB', 'PostgreSQL', 'JWT Authentication'] },
            { label: 'Tools & Platforms:', skills: ['Git', 'Docker', 'Postman', 'Streamlit', 'Gradio'] },
            { label: 'Deployment & DevOps:', skills: ['Docker', 'GitHub Actions (basic CI/CD)', 'AWS EC2/S3 (basic)'] }
          ].map((category, index) => {
            // Use actual skills from data if available, otherwise use default categories
            const actualSkills = data.skills.filter(skill => skill.category === 'technical');
            const skillsToShow = actualSkills.length > 0 ? 
              actualSkills.slice(index * 2, (index + 1) * 2).map(s => s.name) : 
              category.skills;
            
            if (skillsToShow.length === 0 && actualSkills.length > 0) return null;
            
            return (
              <div key={index} style={{ marginBottom: '4pt' }}>
                <div style={{
                  fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                  fontSize: '10pt',
                  color: '#000000',
                  lineHeight: '1.3'
                }}>
                  <span style={{ fontWeight: 'bold' }}>{category.label}</span>{' '}
                  {actualSkills.length > 0 ? skillsToShow.join(', ') : category.skills.join(', ')}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Work Experience Section */}
      {data.experience.length > 0 && (
        <section style={{ marginBottom: '16pt' }}>
          <h2 style={{
            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
            fontSize: '12pt',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '6pt',
            borderBottom: '0.8pt solid #000000',
            paddingBottom: '2pt'
          }}>
            Work Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12pt' }}>
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2pt' }}>
                  <div style={{ flex: '1' }}>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '11pt',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '1pt'
                    }}>
                      {exp.company}, {exp.location}
                    </div>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '10pt',
                      fontStyle: 'italic',
                      color: '#000000'
                    }}>
                      {exp.position}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                    fontSize: '11pt',
                    fontWeight: 'bold',
                    color: '#000000',
                    textAlign: 'right'
                  }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    <div style={{ fontSize: '9pt', fontWeight: 'normal', fontStyle: 'italic' }}>
                      9.5 months
                    </div>
                  </div>
                </div>
                <ul style={{
                  listStyleType: 'disc',
                  paddingLeft: '16pt',
                  margin: '4pt 0 0 0',
                  color: '#000000'
                }}>
                  {exp.description.map((desc, index) => (
                    <li key={index} style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '10pt',
                      lineHeight: '1.3',
                      marginBottom: '2pt'
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

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section style={{ marginBottom: '16pt' }}>
          <h2 style={{
            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
            fontSize: '12pt',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '6pt',
            borderBottom: '0.8pt solid #000000',
            paddingBottom: '2pt'
          }}>
            Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12pt' }}>
            {data.projects.map((project) => (
              <div key={project.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2pt' }}>
                  <div style={{ flex: '1' }}>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '11pt',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '1pt'
                    }}>
                      {project.name}
                    </div>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '10pt',
                      fontStyle: 'italic',
                      color: '#000000',
                      marginBottom: '2pt'
                    }}>
                      {project.technologies.join(', ')}
                      {project.link && ' | Demo'}
                      {project.github && ' | GitHub'}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                    fontSize: '11pt',
                    fontWeight: 'bold',
                    color: '#000000'
                  }}>
                    2024
                  </div>
                </div>
                <ul style={{
                  listStyleType: 'disc',
                  paddingLeft: '16pt',
                  margin: '2pt 0 0 0',
                  color: '#000000'
                }}>
                  <li style={{
                    fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                    fontSize: '10pt',
                    lineHeight: '1.3'
                  }}>
                    {project.description}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications.length > 0 && (
        <section style={{ marginBottom: '16pt' }}>
          <h2 style={{
            fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
            fontSize: '12pt',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '6pt',
            borderBottom: '0.8pt solid #000000',
            paddingBottom: '2pt'
          }}>
            Certifications
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6pt' }}>
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: '1' }}>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '11pt',
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: '1pt'
                    }}>
                      {cert.name}
                    </div>
                    <div style={{
                      fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                      fontSize: '10pt',
                      fontStyle: 'italic',
                      color: '#000000'
                    }}>
                      {cert.issuer}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif',
                    fontSize: '11pt',
                    fontWeight: 'bold',
                    color: '#000000'
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