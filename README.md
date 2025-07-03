# LaTeX Resume Template - Alok Ahirrao Style

This LaTeX template replicates the exact design and formatting from the provided resume images, with special attention to the header section styling.

## Key Header Modifications

The header section has been precisely modified to match the reference image:

### 1. Name Styling ("ALOK AHIRRAO")
- **Font**: Times New Roman (serif font) using `\rmfamily`
- **Size**: 28pt font size for prominence
- **Style**: Bold (`\bfseries`) and all uppercase (`\MakeUppercase`)
- **Spacing**: Proper vertical spacing with `\\[8pt]`

### 2. Professional Title Line
- **Content**: "Machine Learning Engineer • Data Science • Python Developer"
- **Font**: Arial (sans-serif) using `\sffamily`
- **Size**: 12pt font size
- **Separators**: Bullet points (`\textbullet`) with proper spacing
- **Alignment**: Centered

### 3. College & Portfolio Line
- **Content**: "PES Modern College of Engineering • June 2025 Pass out 🌐 alokahirrao.netlify.app"
- **Font**: Arial (sans-serif) matching the title line
- **Size**: 12pt font size
- **Globe Icon**: FontAwesome globe icon (`\faGlobe`) with proper vertical alignment
- **Link Styling**: Underlined portfolio URL (`\underline{alokahirrao.netlify.app}`)

### 4. Contact Information Line
- **Font**: Arial (sans-serif) at 10pt for compact appearance
- **Icons**: FontAwesome icons for phone, email, LinkedIn, and GitHub
- **Spacing**: Proper horizontal spacing using `\quad`
- **Links**: All contact links are underlined for consistency
- **Alignment**: All icons vertically aligned with text using `\raisebox{-0.1\height}`

## Technical Implementation

### Font Setup
```latex
\usepackage{fontspec} % For custom fonts
\setmainfont{Times New Roman} % Serif font for the name
\setsansfont{Arial} % Sans-serif for other text
```

### Custom Header Code
```latex
\begin{center}
    % Name - Large serif font, all caps, bold
    {\fontsize{28}{34}\selectfont\rmfamily\bfseries\MakeUppercase{ALOK AHIRRAO}} \\[8pt]
    
    % Professional title line
    {\fontsize{12}{14}\selectfont\sffamily Machine Learning Engineer \textbullet\ Data Science \textbullet\ Python Developer} \\[6pt]
    
    % College and portfolio line
    {\fontsize{12}{14}\selectfont\sffamily PES Modern College of Engineering \textbullet\ June 2025 Pass out \raisebox{-0.1\height}{\faGlobe}\ \underline{alokahirrao.netlify.app}} \\[6pt]
    
    % Contact information line
    {\fontsize{10}{12}\selectfont\sffamily 
    \raisebox{-0.1\height}{\faPhone}\ +91-9579472584 \quad
    \raisebox{-0.1\height}{\faEnvelope}\ \underline{alokahirrao.ai@gmail.com} \quad
    \raisebox{-0.1\height}{\faLinkedin}\ \underline{linkedin.com/in/alokahirrao} \quad
    \raisebox{-0.1\height}{\faGithub}\ \underline{github.com/alok-ahirrao}}
\end{center}
```

## Requirements

To compile this resume, you need:

1. **LaTeX Distribution**: TeX Live (recommended) or MiKTeX with XeLaTeX support
2. **Required Packages**:
   - moderncv (or use the included simplified version)
   - fontawesome
   - fontspec (for custom fonts)
   - geometry
   - xcolor
   - enumitem
   - microtype

## Compilation

**Important**: This template requires XeLaTeX for font support:

```bash
xelatex main.tex
xelatex main.tex  # Run twice for proper formatting
```

Or use the provided script:
```bash
chmod +x compile.sh
./compile.sh
```

## Font Requirements

The template uses:
- **Times New Roman** for the name (serif)
- **Arial** for all other text (sans-serif)

These fonts should be installed on your system. If not available, the template will fall back to default serif and sans-serif fonts.

## Customization

To customize the header for your own resume:

1. **Name**: Change "ALOK AHIRRAO" in the first line
2. **Title**: Modify the professional skills line
3. **College**: Update the institution and graduation information
4. **Portfolio**: Replace with your own website URL
5. **Contact**: Update phone, email, LinkedIn, and GitHub information

## Key Design Elements Replicated

- **Exact font matching**: Serif for name, sans-serif for content
- **Precise spacing**: Vertical spacing between lines matches the image
- **Icon alignment**: All icons properly aligned with text
- **Link styling**: Consistent underlining for all links
- **Bullet separators**: Proper bullet points with correct spacing
- **Font sizes**: Hierarchical sizing matching the reference

The header now precisely matches the visual appearance shown in the reference image while maintaining professional LaTeX formatting standards.