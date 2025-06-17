import React from 'react';
import { FileText, Download, Eye, Zap, Shield, Palette, ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Build your professional resume in minutes, not hours. Our intuitive interface makes it easy."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Multiple Templates",
      description: "Choose from various professional templates designed to make you stand out."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export to PDF",
      description: "Download your resume as a high-quality PDF ready for job applications."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Live Preview",
      description: "See your resume update in real-time as you make changes."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "Your data stays in your browser. We don't store or share your personal information."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "ATS Friendly",
      description: "Our templates are optimized for Applicant Tracking Systems used by employers."
    }
  ];

  const benefits = [
    "Professional templates designed by experts",
    "Easy-to-use drag and drop interface",
    "Real-time preview of your resume",
    "Export to PDF with one click",
    "Mobile-friendly responsive design",
    "No registration required",
    "Completely free to use"
  ];

  const handleFeedbackClick = () => {
    window.open('https://forms.gle/UYSN9GwFQdQeHjbh9', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFeedbackClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Feedback</span>
              </button>
              <button
                onClick={onGetStarted}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Build Your Perfect
              <span className="text-blue-600 block">Resume</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create a professional resume that gets you noticed. Our easy-to-use builder helps you craft 
              the perfect resume with beautiful templates and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <span>Build My Resume</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={handleFeedbackClick}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Give Feedback</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our resume builder comes packed with features to help you create a standout resume
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Resume Builder?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We've designed the most intuitive and powerful resume builder to help you land your dream job.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-lg mb-6">
                <h3 className="text-2xl font-bold mb-2">JOHN DOE</h3>
                <p className="opacity-90">Software Engineer</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 border-b border-dashed border-gray-300 pb-1 mb-2">
                    EXPERIENCE
                  </h4>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Senior Developer</p>
                    <p>Tech Company • 2020 - Present</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 border-b border-dashed border-gray-300 pb-1 mb-2">
                    SKILLS
                  </h4>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 px-2 py-1 rounded">JavaScript</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">React</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">Node.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who have successfully landed their dream jobs with our resume builder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg inline-flex items-center justify-center space-x-2"
            >
              <span>Start Building Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={handleFeedbackClick}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg inline-flex items-center justify-center space-x-2"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Share Feedback</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-blue-400" />
              <h3 className="text-2xl font-bold">Resume Builder</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Build professional resumes that get you hired.
            </p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500">
                © 2025 Resume Builder. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};