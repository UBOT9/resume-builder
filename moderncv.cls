% Modern CV class file
% This is a simplified version - you would need the full moderncv package
% For a complete implementation, install the moderncv package from CTAN

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{moderncv}[2015/07/28 v2.0.0 modern curriculum vitae and letter document class]

% Base class
\LoadClass[11pt,a4paper]{article}

% Required packages
\RequirePackage{ifthen}
\RequirePackage{xcolor}
\RequirePackage{fontawesome}
\RequirePackage{url}
\RequirePackage{hyperref}
\RequirePackage{geometry}
\RequirePackage{fancyhdr}
\RequirePackage{calc}
\RequirePackage{xparse}
\RequirePackage{etoolbox}
\RequirePackage{microtype}

% Page setup
\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}

% Colors
\definecolor{color0}{rgb}{0,0,0}% black
\definecolor{color1}{rgb}{0.22,0.45,0.70}% light blue
\definecolor{color2}{rgb}{0.45,0.45,0.45}% dark grey

% Fonts
\renewcommand{\familydefault}{\sfdefault}

% Symbols
\newcommand*{\addresssymbol}{}
\newcommand*{\mobilephonesymbol}{\faPhone}
\newcommand*{\phonesymbol}{\faPhone}
\newcommand*{\faxsymbol}{\faFax}
\newcommand*{\emailsymbol}{\faEnvelope}
\newcommand*{\homepagesymbol}{\faGlobe}
\newcommand*{\linkedinsymbol}{\faLinkedin}
\newcommand*{\githubsymbol}{\faGithub}

% Personal data
\newcommand*{\name}[2]{\def\@firstname{#1}\def\@lastname{#2}}
\newcommand*{\title}[1]{\def\@title{#1}}
\newcommand*{\address}[3]{\def\@addressstreet{#1}\def\@addresscity{#2}\def\@addresscountry{#3}}
\newcommand*{\phone}[2][mobile]{\def\@phone{#2}}
\newcommand*{\email}[1]{\def\@email{#1}}
\newcommand*{\homepage}[1]{\def\@homepage{#1}}
\newcommand*{\social}[2][linkedin]{\expandafter\def\csname @#1\endcsname{#2}}

% CV style
\newcommand*{\moderncvstyle}[1]{}
\newcommand*{\moderncvcolor}[1]{}

% Section formatting
\newcommand*{\sectionfont}{\Large\bfseries}
\renewcommand{\section}[1]{%
  \vspace{1em}%
  {\sectionfont\textcolor{color0}{#1}}%
  \par\vspace{0.5em}%
  \hrule height 0.4pt%
  \vspace{0.5em}%
}

% CV entries
\newcommand*{\cventry}[7][.25em]{%
  \begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}%
    \textbf{#4} & \textbf{#5} \\%
    \textit{#3} & \textit{#6} \\%
  \end{tabular*}%
  \ifx&#2&%
  \else{%
    \newline{}%
    \begin{minipage}{\maincolumnwidth}%
      \small#2%
    \end{minipage}}\fi%
  \ifx&#7&%
  \else{%
    \newline{}%
    \begin{minipage}{\maincolumnwidth}%
      \small#7%
    \end{minipage}}\fi%
  \par\addvspace{#1}}

\newcommand*{\cvitem}[3][.25em]{%
  \begin{tabular*}{\textwidth}{p{0.3\textwidth}@{\extracolsep{\fill}}p{0.65\textwidth}}%
    \textbf{#2} & #3 \\%
  \end{tabular*}%
  \par\addvspace{#1}}

% Header
\newcommand*{\makecvtitle}{%
  \begin{center}%
    {\Huge\bfseries\textcolor{color0}{\@firstname~\@lastname}}\\[0.5em]%
    {\large\textcolor{color2}{\@title}}\\[0.3em]%
    {\textcolor{color2}{\@addressstreet}}\\[0.2em]%
    \begin{tabular*}{\textwidth}{@{}c@{\hspace{2em}}c@{\hspace{2em}}c@{\hspace{2em}}c@{\hspace{2em}}c@{}}%
      \mobilephonesymbol~\@phone & 
      \emailsymbol~\@email & 
      \linkedinsymbol~\@linkedin & 
      \githubsymbol~\@github &
      \homepagesymbol~\@homepage%
    \end{tabular*}%
  \end{center}%
  \vspace{1em}%
}

% Dimensions
\newlength{\maincolumnwidth}
\setlength{\maincolumnwidth}{\textwidth}
\newlength{\listdoubleitemcolumnwidth}
\setlength{\listdoubleitemcolumnwidth}{0.475\textwidth}

\endinput