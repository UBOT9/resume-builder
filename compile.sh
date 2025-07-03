#!/bin/bash

# Compile the LaTeX resume with XeLaTeX for font support
echo "Compiling LaTeX resume with XeLaTeX..."

# First compilation
xelatex main.tex

# Second compilation for references
xelatex main.tex

# Clean up auxiliary files
rm -f *.aux *.log *.out *.toc *.nav *.snm *.vrb *.fls *.fdb_latexmk

echo "Compilation complete! Check main.pdf"
echo "Note: This template requires XeLaTeX for proper font rendering."