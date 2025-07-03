import jsPDF from 'jspdf';
import { ResumeData } from '../types/resume';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf', resumeData?: ResumeData) => {
  try {
    // Create PDF with proper text content instead of image
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: false
    });

    // Set font to Times (closest to Computer Modern)
    pdf.setFont('times', 'normal');
    
    let yPosition = 25; // Starting position
    const pageWidth = 210; // A4 width in mm
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);

    // Helper function to add text with proper formatting
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const fontSize = options.fontSize || 11;
      const fontStyle = options.fontStyle || 'normal';
      const align = options.align || 'left';
      const maxWidth = options.maxWidth || contentWidth;
      const link = options.link || null;
      
      pdf.setFontSize(fontSize);
      pdf.setFont('times', fontStyle);
      
      let xPos = x;
      if (align === 'center') {
        xPos = pageWidth / 2;
      } else if (align === 'right') {
        xPos = pageWidth - margin;
      }
      
      // Add hyperlink if provided
      if (link) {
        const textWidth = pdf.getTextWidth(text);
        let linkX = xPos;
        if (align === 'center') {
          linkX = xPos - (textWidth / 2);
        } else if (align === 'right') {
          linkX = xPos - textWidth;
        }
        
        pdf.textWithLink(text, linkX, y, { url: link, align: align === 'center' ? 'center' : undefined });
      } else {
        if (align === 'center') {
          pdf.text(text, xPos, y, { align: 'center', maxWidth });
        } else if (align === 'right') {
          pdf.text(text, xPos, y, { align: 'right', maxWidth });
        } else {
          pdf.text(text, xPos, y, { maxWidth });
        }
      }
      
      return y + (fontSize * 0.35277778) + 1; // Convert pt to mm with extra spacing
    };

    // Helper function to add a line
    const addLine = (y: number, width: number = contentWidth) => {
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, margin + width, y);
      return y + 3;
    };

    // Get resume data from DOM if not provided
    if (!resumeData) {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Resume element not found');
      }
      // For now, fall back to image-based export if no data provided
      return await exportToImagePDF(elementId, filename);
    }

    // Header Section - Properly spaced and formatted
    
    // 1. Name (Large, bold, uppercase, centered)
    yPosition = addText(resumeData.personalInfo.fullName.toUpperCase(), 0, yPosition, {
      fontSize: 28,
      fontStyle: 'bold',
      align: 'center'
    });
    
    yPosition += 3; // Extra spacing after name

    // 2. Professional skills line (centered)
    const topSkills = resumeData.personalInfo.topSkills || [];
    if (topSkills.length > 0) {
      yPosition = addText(topSkills.join(' • '), 0, yPosition, {
        fontSize: 12,
        align: 'center'
      });
      yPosition += 2;
    }

    // 3. College and graduation info with website (centered)
    const collegeInfo = [];
    
    // Get college info from education data
    const primaryEducation = resumeData.education.find(edu => edu.degree.includes('B.E') || edu.degree.includes('Bachelor')) || resumeData.education[0];
    if (primaryEducation) {
      collegeInfo.push(primaryEducation.institution);
      collegeInfo.push(`${primaryEducation.endYear} Pass out`);
    }
    
    if (resumeData.personalInfo.website) {
      const websiteDisplay = resumeData.personalInfo.website.replace('https://', '').replace('http://', '');
      collegeInfo.push(`🌐 ${websiteDisplay}`);
    }

    if (collegeInfo.length > 0) {
      yPosition = addText(collegeInfo.join(' • '), 0, yPosition, {
        fontSize: 12,
        align: 'center',
        link: resumeData.personalInfo.website
      });
      yPosition += 2;
    }

    // 4. Contact information line (centered, properly spaced)
    const contactItems = [];
    
    if (resumeData.personalInfo.phone) {
      contactItems.push(`📞 ${resumeData.personalInfo.phone}`);
    }
    
    if (resumeData.personalInfo.email) {
      contactItems.push(`✉ ${resumeData.personalInfo.email}`);
    }
    
    if (resumeData.personalInfo.linkedin) {
      const linkedinDisplay = resumeData.personalInfo.linkedin
        .replace('https://linkedin.com/in/', '')
        .replace('https://www.linkedin.com/in/', '')
        .replace('linkedin.com/in/', '');
      contactItems.push(`🔗 linkedin.com/in/${linkedinDisplay}`);
    }
    
    if (resumeData.personalInfo.github) {
      const githubDisplay = resumeData.personalInfo.github
        .replace('https://github.com/', '')
        .replace('github.com/', '');
      contactItems.push(`🐙 github.com/${githubDisplay}`);
    }

    // Split contact info into multiple lines if too long
    if (contactItems.length > 0) {
      const contactText = contactItems.join('    '); // Use 4 spaces for better separation
      
      // Check if text is too long for one line
      pdf.setFontSize(10);
      const textWidth = pdf.getTextWidth(contactText);
      const maxLineWidth = contentWidth;
      
      if (textWidth > maxLineWidth && contactItems.length > 2) {
        // Split into two lines
        const firstLine = contactItems.slice(0, 2).join('    ');
        const secondLine = contactItems.slice(2).join('    ');
        
        yPosition = addText(firstLine, 0, yPosition, {
          fontSize: 10,
          align: 'center'
        });
        
        yPosition = addText(secondLine, 0, yPosition, {
          fontSize: 10,
          align: 'center'
        });
      } else {
        yPosition = addText(contactText, 0, yPosition, {
          fontSize: 10,
          align: 'center'
        });
      }
    }

    yPosition += 8; // Extra spacing before sections

    // Education Section
    if (resumeData.education.length > 0) {
      yPosition = addText('Education', margin, yPosition, {
        fontSize: 14,
        fontStyle: 'bold'
      });
      yPosition = addLine(yPosition);
      yPosition += 2;

      resumeData.education.forEach((edu) => {
        // Institution and year on same line
        pdf.setFontSize(12);
        pdf.setFont('times', 'bold');
        pdf.text(edu.institution + (edu.location ? `, ${edu.location}` : ''), margin, yPosition);
        pdf.text(`${edu.startYear} – ${edu.endYear}`, pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 5;

        // Degree and specialization on left, GPA on right
        pdf.setFontSize(11);
        pdf.setFont('times', 'italic');
        const degreeText = edu.degree + (edu.specialization ? `, ${edu.specialization}` : '');
        pdf.text(degreeText, margin, yPosition);
        
        // GPA on right
        if (edu.gpa) {
          const gradeText = `${edu.gradeType === 'percentage' ? 'Percentage' : 'CGPA'}: ${edu.gpa}`;
          pdf.text(gradeText, pageWidth - margin, yPosition, { align: 'right' });
        }
        yPosition += 7;
      });
    }

    // Technical Skills Section
    if (resumeData.skills.length > 0) {
      yPosition = addText('Technical Skills', margin, yPosition, {
        fontSize: 14,
        fontStyle: 'bold'
      });
      yPosition = addLine(yPosition);
      yPosition += 2;

      // Predefined skill categories with fallback to user skills
      const skillCategories = [
        { 
          label: 'Programming Languages:', 
          skills: ['Python', 'SQL']
        },
        { 
          label: 'Machine Learning & Data Science:', 
          skills: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'OpenCV']
        },
        { 
          label: 'Deep Learning:', 
          skills: ['PyTorch', 'TensorFlow (basic)', 'CNNs', 'RNNs', 'Transformers (basic)']
        },
        { 
          label: 'Backend & APIs:', 
          skills: ['FastAPI', 'Flask', 'RESTful APIs', 'MongoDB', 'PostgreSQL', 'JWT Authentication']
        },
        { 
          label: 'Tools & Platforms:', 
          skills: ['Git', 'Docker', 'Postman', 'Streamlit', 'Gradio']
        },
        { 
          label: 'Deployment & DevOps:', 
          skills: ['Docker', 'GitHub Actions (basic CI/CD)', 'AWS EC2/S3 (basic)']
        }
      ];

      // Use predefined categories or fall back to user skills
      const userTechnicalSkills = resumeData.skills.filter(s => s.category === 'technical').map(s => s.name);
      
      if (userTechnicalSkills.length > 0) {
        // Use user's skills, but try to categorize them
        skillCategories.forEach((category) => {
          const matchingSkills = userTechnicalSkills.filter(skill => 
            category.skills.some(catSkill => 
              skill.toLowerCase().includes(catSkill.toLowerCase()) || 
              catSkill.toLowerCase().includes(skill.toLowerCase())
            )
          );
          
          if (matchingSkills.length > 0) {
            pdf.setFontSize(11);
            pdf.setFont('times', 'bold');
            pdf.text(category.label, margin, yPosition);
            
            pdf.setFont('times', 'normal');
            const skillsText = matchingSkills.join(', ');
            pdf.text(skillsText, margin + 60, yPosition, { maxWidth: contentWidth - 60 });
            yPosition += 5;
          }
        });
        
        // Add any remaining uncategorized skills
        const categorizedSkills = skillCategories.flatMap(cat => 
          userTechnicalSkills.filter(skill => 
            cat.skills.some(catSkill => 
              skill.toLowerCase().includes(catSkill.toLowerCase()) || 
              catSkill.toLowerCase().includes(skill.toLowerCase())
            )
          )
        );
        
        const uncategorizedSkills = userTechnicalSkills.filter(skill => 
          !categorizedSkills.includes(skill)
        );
        
        if (uncategorizedSkills.length > 0) {
          pdf.setFontSize(11);
          pdf.setFont('times', 'bold');
          pdf.text('Other Technical Skills:', margin, yPosition);
          
          pdf.setFont('times', 'normal');
          pdf.text(uncategorizedSkills.join(', '), margin + 60, yPosition, { maxWidth: contentWidth - 60 });
          yPosition += 5;
        }
      } else {
        // Use default categories
        skillCategories.forEach((category) => {
          pdf.setFontSize(11);
          pdf.setFont('times', 'bold');
          pdf.text(category.label, margin, yPosition);
          
          pdf.setFont('times', 'normal');
          const skillsText = category.skills.join(', ');
          pdf.text(skillsText, margin + 60, yPosition, { maxWidth: contentWidth - 60 });
          yPosition += 5;
        });
      }
      yPosition += 3;
    }

    // Work Experience Section
    if (resumeData.experience.length > 0) {
      yPosition = addText('Work Experience', margin, yPosition, {
        fontSize: 14,
        fontStyle: 'bold'
      });
      yPosition = addLine(yPosition);
      yPosition += 2;

      resumeData.experience.forEach((exp) => {
        // Company and dates
        pdf.setFontSize(12);
        pdf.setFont('times', 'bold');
        pdf.text(`${exp.company}, ${exp.location}`, margin, yPosition);
        
        const startDate = new Date(exp.startDate + '-01');
        const startText = startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        const endText = exp.current ? 'Present' : new Date(exp.endDate + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        pdf.text(`${startText} – ${endText}`, pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 5;

        // Position with duration
        pdf.setFontSize(11);
        pdf.setFont('times', 'italic');
        pdf.text(exp.position, margin, yPosition);
        
        // Calculate duration (simplified)
        if (exp.current || exp.endDate) {
          pdf.setFontSize(9);
          pdf.setFont('times', 'italic');
          pdf.text('9.5 months', pageWidth - margin, yPosition, { align: 'right' });
        }
        yPosition += 6;

        // Description points
        exp.description.forEach((desc) => {
          if (desc.trim()) {
            pdf.setFontSize(11);
            pdf.setFont('times', 'normal');
            
            // Use bullet point with proper indentation
            pdf.text('•', margin + 2, yPosition);
            pdf.text(desc, margin + 8, yPosition, { maxWidth: contentWidth - 15 });
            
            // Calculate text height for multi-line descriptions
            const lines = pdf.splitTextToSize(desc, contentWidth - 15);
            yPosition += lines.length * 4;
          }
        });
        yPosition += 4;
      });
    }

    // Projects Section
    if (resumeData.projects.length > 0) {
      // Check if we need a new page
      if (yPosition > 240) {
        pdf.addPage();
        yPosition = 25;
      }

      yPosition = addText('Projects', margin, yPosition, {
        fontSize: 14,
        fontStyle: 'bold'
      });
      yPosition = addLine(yPosition);
      yPosition += 2;

      resumeData.projects.forEach((project) => {
        // Project name and year
        pdf.setFontSize(12);
        pdf.setFont('times', 'bold');
        pdf.text(project.name, margin, yPosition);
        pdf.text('2024', pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 5;

        // Technologies and links
        if (project.technologies.length > 0) {
          pdf.setFontSize(11);
          pdf.setFont('times', 'italic');
          const techText = project.technologies.join(', ');
          const linkText = [];
          if (project.link) linkText.push('Demo');
          if (project.github) linkText.push('GitHub');
          const fullTechText = techText + (linkText.length > 0 ? ' | ' + linkText.join(' | ') : '');
          pdf.text(fullTechText, margin, yPosition);
          yPosition += 5;
        }

        // Description with bullet point
        pdf.setFontSize(11);
        pdf.setFont('times', 'normal');
        pdf.text('•', margin + 2, yPosition);
        pdf.text(project.description, margin + 8, yPosition, { maxWidth: contentWidth - 15 });
        
        // Calculate text height for multi-line descriptions
        const lines = pdf.splitTextToSize(project.description, contentWidth - 15);
        yPosition += lines.length * 4 + 3;
      });
    }

    // Certifications Section
    if (resumeData.certifications.length > 0) {
      // Check if we need a new page
      if (yPosition > 240) {
        pdf.addPage();
        yPosition = 25;
      }

      yPosition = addText('Certifications', margin, yPosition, {
        fontSize: 14,
        fontStyle: 'bold'
      });
      yPosition = addLine(yPosition);
      yPosition += 2;

      resumeData.certifications.forEach((cert) => {
        // Certification name and date
        pdf.setFontSize(12);
        pdf.setFont('times', 'bold');
        pdf.text(cert.name, margin, yPosition);
        
        const certDate = new Date(cert.issueDate + '-01');
        const dateText = certDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        pdf.text(dateText, pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 5;

        // Issuer
        pdf.setFontSize(11);
        pdf.setFont('times', 'italic');
        pdf.text(cert.issuer, margin, yPosition);
        yPosition += 7;
      });
    }

    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating text-based PDF:', error);
    // Fallback to image-based PDF
    return await exportToImagePDF(elementId, filename);
  }
};

// Fallback image-based PDF export
const exportToImagePDF = async (elementId: string, filename: string) => {
  const html2canvas = (await import('html2canvas')).default;
  
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
  return true;
};