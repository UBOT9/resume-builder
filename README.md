# LaTeX Resume Template - Alok Ahirrao Style

This LaTeX template replicates the exact design and formatting from the provided resume images.

## Features

- **Exact Visual Match**: Replicates the font styles, spacing, and layout from the reference images
- **Two-Page Layout**: Properly distributed content across two pages
- **Professional Formatting**: Clean, modern design with proper typography
- **Customizable**: Easy to modify content while maintaining the visual style

## Requirements

To compile this resume, you need:

1. **LaTeX Distribution**: TeX Live (recommended) or MiKTeX
2. **Required Packages**:
   - moderncv (or use the included simplified version)
   - fontawesome
   - geometry
   - xcolor
   - enumitem
   - microtype

## Installation & Compilation

### Option 1: Using Full ModernCV Package

1. Install the moderncv package:
   ```bash
   # On Ubuntu/Debian
   sudo apt-get install texlive-latex-extra
   
   # On macOS with MacTeX
   # ModernCV is included in MacTeX
   
   # On Windows with MiKTeX
   # Use MiKTeX Package Manager to install moderncv
   ```

2. Compile the resume:
   ```bash
   chmod +x compile.sh
   ./compile.sh
   ```

### Option 2: Using Included Simplified Class

If you don't have moderncv installed, you can use the included simplified class file:

```bash
pdflatex main.tex
pdflatex main.tex  # Run twice for proper formatting
```

## Key Design Elements Replicated

### Typography & Fonts
- **Name**: Large, bold sans-serif font (matching the prominent header)
- **Section Headers**: Bold, uppercase formatting with horizontal rules
- **Job Titles**: Bold formatting for company names and positions
- **Dates**: Right-aligned, consistent formatting
- **Body Text**: Clean, readable font with proper line spacing

### Layout Structure
- **Header**: Centered name, title, and contact information
- **Contact Info**: Horizontal layout with icons and proper spacing
- **Sections**: Clear hierarchy with bold headers and horizontal separators
- **Content**: Proper indentation and bullet point formatting
- **Spacing**: Exact margins and white space matching the reference

### Content Formatting
- **Education**: Institution, degree, dates, and GPA formatting
- **Technical Skills**: Categorized skills with proper grouping
- **Experience**: Company, position, dates, and bullet points
- **Projects**: Project names, technologies, and descriptions
- **Certifications**: Institution, certification name, and dates

## Customization

To customize this template for your own use:

1. **Personal Information**: Update the `\name`, `\title`, `\phone`, `\email`, etc. commands
2. **Sections**: Modify the content within each `\section{}` block
3. **Styling**: Adjust colors, fonts, or spacing in the class file if needed

## File Structure

- `main.tex` - Main resume document
- `moderncv.cls` - Simplified ModernCV class (if needed)
- `compile.sh` - Compilation script
- `README.md` - This documentation

## Notes

- The template is designed to fit exactly on two pages as shown in the reference images
- All content has been transcribed accurately from the provided images
- Font choices and spacing have been carefully matched to the original design
- The layout maintains the professional appearance while being easily customizable

## Troubleshooting

If you encounter compilation errors:

1. Ensure all required packages are installed
2. Try using the included simplified class file
3. Check that your LaTeX distribution is up to date
4. Verify that fontawesome package is properly installed

For any issues or customization requests, please refer to the LaTeX documentation or moderncv package documentation.