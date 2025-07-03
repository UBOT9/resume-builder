import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume element not found');
    }

    // Create a clone of the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Apply specific styles for PDF export to match LaTeX output
    clonedElement.style.width = '794px'; // A4 width in pixels at 96 DPI
    clonedElement.style.minHeight = '1123px'; // A4 height in pixels at 96 DPI
    clonedElement.style.maxWidth = '794px';
    clonedElement.style.padding = '40px';
    clonedElement.style.backgroundColor = '#ffffff';
    clonedElement.style.fontFamily = '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif';
    clonedElement.style.fontSize = '11pt';
    clonedElement.style.lineHeight = '1.2';
    clonedElement.style.color = '#000000';
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.zIndex = '-1';
    clonedElement.style.boxSizing = 'border-box';

    // Ensure all text elements have proper styling for LaTeX-like appearance
    const textElements = clonedElement.querySelectorAll('*');
    textElements.forEach((el: any) => {
      if (el.style) {
        el.style.webkitFontSmoothing = 'antialiased';
        el.style.mozOsxFontSmoothing = 'grayscale';
        el.style.textRendering = 'optimizeLegibility';
        // Ensure consistent font family
        if (!el.style.fontFamily || el.style.fontFamily === '') {
          el.style.fontFamily = '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif';
        }
      }
    });

    // Add the cloned element to the document temporarily
    document.body.appendChild(clonedElement);

    // Wait for fonts and images to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create canvas with high quality settings optimized for LaTeX-style output
    const canvas = await html2canvas(clonedElement, {
      scale: 2.5, // Higher scale for better quality
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: 794,
      height: clonedElement.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
      windowHeight: clonedElement.scrollHeight,
      onclone: (clonedDoc) => {
        // Ensure all styles are properly applied in the cloned document
        const clonedBody = clonedDoc.body;
        clonedBody.style.margin = '0';
        clonedBody.style.padding = '0';
        clonedBody.style.fontFamily = '"Computer Modern Serif", "Latin Modern Roman", "Times New Roman", "Times", serif';
      }
    });

    // Remove the temporary element
    document.body.removeChild(clonedElement);

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Calculate dimensions for A4 with exact LaTeX margins
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF with high quality settings matching LaTeX output
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: false // Disable compression for better quality
    });

    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};