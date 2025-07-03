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
      
      pdf.setFontSize(fontSize);
      pdf.setFont('times', fontStyle);
      
      if (align === 'center') {
        pdf.text(text, pageWidth / 2, y, { align: 'center', maxWidth });
      } else if (align === 'right') {
        pdf.text(text, pageWidth - margin, y, { align: 'right', maxWidth });
      } else {
        pdf.text(text, x, y, { maxWidth });
      }
      
      return y + (fontSize * 0.35277778); // Convert pt to mm
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

    // Header Section
    yPosition = addText(resumeData.personalInfo.fullName.toUpperCase(), 0, yPosition, {
      fontSize: 24,
      fontStyle: 'bold',
      align: 'center'
    });
    
    yPosition += 3;

    // Professional skills line
    const topSkills = resumeData.personalInfo.topSkills || [];
    if (topSkills.length > 0) {
      yPosition = addText(topSkills.join(' • '), 0, yPosition, {
        fontSize: 12,
        align: 'center'
      });
      yPosition += 2;
    }

    // Website
    if (resumeData.personalInfo.website) {
      const websiteText = `🌐 ${resumeData.personalInfo.website.replace('https://', '').replace('http://', '')}`;
      yPosition = addText(websiteText, 0, yPosition, {
        fontSize: 11,
        align: 'center'
      });
      yPosition += 2;
    }

    // Contact information
    const contactInfo = [];
    if (resumeData.personalInfo.phone) contactInfo.push(`📞 ${resumeData.personalInfo.phone}`);
    if (resumeData.personalInfo.email) contactInfo.push(`✉ ${resumeData.personalInfo.email}`);
    if (resumeData.personalInfo.linkedin) {
      const linkedinText = resumeData.personalInfo.linkedin.replace('https://linkedin.com/in/', '').replace('https://www.linkedin.com/in/', '');
      contactInfo.push(`🔗 ${linkedinText}`);
    }
    if (resumeData.personalInfo.github) {
      const githubText = resumeData.personalInfo.github.replace('https://github.com/', '');
      contactInfo.push(`🐙 ${githubText}`);
    }

    if (contactInfo.length > 0) {
      yPosition = addText(contactInfo.join('   '), 0, yPosition, {
        fontSize: 10,
        align: 'center'
      });
    }

    yPosition += 8;

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
        pdf.setFontSize(11);
        pdf.setFont('times', 'bold');
        pdf.text(edu.institution + (edu.location ? `, ${edu.location}` : ''), margin, yPosition);
        pdf.text(`${edu.startYear} – ${edu.endYear}`, pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 4;

        // Degree and specialization
        pdf.setFont('times', 'italic');
        pdf.text(edu.degree + (edu.specialization ? `, ${edu.specialization}` : ''), margin, yPosition);
        
        // GPA on right
        if (edu.gpa) {
          const gradeText = `${edu.gradeType === 'percentage' ? 'Percentage' : 'CGPA'}: ${edu.gpa}`;
          pdf.text(gradeText, pageWidth - margin, yPosition, { align: 'right' });
        }
        yPosition += 6;
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

      // Group skills by category
      const skillCategories = [
        { label: 'Programming Languages:', skills: resumeData.skills.filter(s => s.name.includes('Python') || s.name.includes('SQL')).map(s => s.name) },
        { label: 'Machine Learning & Data Science:', skills: resumeData.skills.filter(s => s.name.includes('Scikit') || s.name.includes('Pandas') || s.name.includes('NumPy')).map(s => s.name) },
        { label: 'Deep Learning:', skills: resumeData.skills.filter(s => s.name.includes('PyTorch') || s.name.includes('TensorFlow')).map(s => s.name) },
        { label: 'Backend & APIs:', skills: resumeData.skills.filter(s => s.name.includes('FastAPI') || s.name.includes('Flask')).map(s => s.name) },
        { label: 'Tools & Platforms:', skills: resumeData.skills.filter(s => s.name.includes('Git') || s.name.includes('Docker')).map(s => s.name) },
        { label: 'Deployment & DevOps:', skills: resumeData.skills.filter(s => s.name.includes('AWS') || s.name.includes('GitHub')).map(s => s.name) }
      ];

      // If no categorized skills found, use all technical skills
      if (skillCategories.every(cat => cat.skills.length === 0)) {
        const technicalSkills = resumeData.skills.filter(s => s.category === 'technical').map(s => s.name);
        if (technicalSkills.length > 0) {
          pdf.setFontSize(10);
          pdf.setFont('times', 'bold');
          pdf.text('Technical Skills:', margin, yPosition);
          pdf.setFont('times', 'normal');
          pdf.text(technicalSkills.join(', '), margin + 35, yPosition);
          yPosition += 5;
        }
      } else {
        skillCategories.forEach((category) => {
          if (category.skills.length > 0) {
            pdf.setFontSize(10);
            pdf.setFont('times', 'bold');
            pdf.text(category.label, margin, yPosition);
            pdf.setFont('times', 'normal');
            pdf.text(category.skills.join(', '), margin + 50, yPosition);
            yPosition += 4;
          }
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
        pdf.setFontSize(11);
        pdf.setFont('times', 'bold');
        pdf.text(`${exp.company}, ${exp.location}`, margin, yPosition);
        
        const startYear = new Date(exp.startDate + '-01').getFullYear();
        const endText = exp.current ? 'Present' : new Date(exp.endDate + '-01').getFullYear();
        pdf.text(`${startYear} – ${endText}`, pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 4;

        // Position
        pdf.setFont('times', 'italic');
        pdf.text(exp.position, margin, yPosition);
        yPosition += 5;

        // Description points
        exp.description.forEach((desc) => {
          if (desc.trim()) {
            pdf.setFontSize(10);
            pdf.setFont('times', 'normal');
            pdf.text('• ' + desc, margin + 5, yPosition, { maxWidth: contentWidth - 10 });
            yPosition += 4;
          }
        });
        yPosition += 3;
      });
    }

    // Projects Section
    if (resumeData.projects.length > 0) {
      // Check if we need a new page
      if (yPosition > 250) {
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
        pdf.setFontSize(11);
        pdf.setFont('times', 'bold');
        pdf.text(project.name, margin, yPosition);
        pdf.text('2024', pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 4;

        // Technologies
        if (project.technologies.length > 0) {
          pdf.setFont('times', 'italic');
          const techText = project.technologies.join(', ');
          const linkText = [];
          if (project.link) linkText.push('Demo');
          if (project.github) linkText.push('GitHub');
          const fullTechText = techText + (linkText.length > 0 ? ' | ' + linkText.join(' | ') : '');
          pdf.text(fullTechText, margin, yPosition);
          yPosition += 4;
        }

        // Description
        pdf.setFontSize(10);
        pdf.setFont('times', 'normal');
        pdf.text('• ' + project.description, margin + 5, yPosition, { maxWidth: contentWidth - 10 });
        yPosition += 6;
      });
    }

    // Certifications Section
    if (resumeData.certifications.length > 0) {
      // Check if we need a new page
      if (yPosition > 250) {
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
        pdf.setFontSize(11);
        pdf.setFont('times', 'bold');
        pdf.text(cert.name, margin, yPosition);
        
        const certDate = new Date(cert.issueDate + '-01');
        const dateText = certDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        pdf.text(dateText, pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 4;

        // Issuer
        pdf.setFont('times', 'italic');
        pdf.text(cert.issuer, margin, yPosition);
        yPosition += 6;
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