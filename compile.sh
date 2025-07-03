#!/bin/bash

# Compile the LaTeX resume
echo "Compiling LaTeX resume..."

# First compilation
pdflatex main.tex

# Second compilation for references
pdflatex main.tex

# Clean up auxiliary files
rm -f *.aux *.log *.out *.toc *.nav *.snm *.vrb

echo "Compilation complete! Check main.pdf"