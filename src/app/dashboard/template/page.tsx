"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";

// Define types for our data (keeping the same interfaces)
interface Education {
  degree: string;
  institution: string;
  year_of_start: string;
  year_of_completion: string;
}

interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  techStack: string;
  link: string;
}

interface Certification {
  name: string;
  organization: string;
  year: string;
  credentialId: string;
  credentialUrl: string;
}

interface Skill {
  skill: string;
  name: string;
  level: string;
}

interface Language {
  language: string;
  proficiency: string;
}

interface UserData {
  name: string;
  email: string;
  profilePicture: string;
  aboutMe: string;
  linkedIn: string;
  github: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  skills: Skill[];
  languages: Language[];
  hobbies: string[];
  aspiringRoles: string[];
  aspiringCompanies: string[];
}

// Define font type
type FontType = "inter" | "roboto" | "opensans" | "lato";

// Base props that all templates share
interface BaseTemplateProps {
  font: FontType;
  primaryColor: string;
  preview?: boolean;
  userData: UserData | null;
}

// Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  
  try {
    const [day, month, year] = dateString.split("-");
    return `${month}/${year}`;
  } catch (e) {
    return dateString;
  }
};

// Helper function to get A4 container class
const getA4ContainerClass = (font: FontType, preview: boolean) => {
  return cn(
    "bg-white",
    // A4 dimensions: 210mm x 297mm - but when preview, scale down
    preview
      ? "scale-[0.7] origin-top-left w-[210mm]"
      : "min-h-[297mm] w-[210mm] mx-auto shadow-lg", 
    font === "inter" && "font-inter",
    font === "roboto" && "font-roboto",
    font === "opensans" && "font-opensans",
    font === "lato" && "font-lato"
  );
};

// 1. Minimal Classic Template
const MinimalClassic: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
  userData
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  
  // If userData is not yet loaded, show loading placeholder
  if (!userData) {
    return <div className={containerClass}><div className="p-8">Loading...</div></div>;
  }

  return (
    <div className={containerClass}>
      <header className="p-8 border-b" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          {userData.name}
        </h1>
        <div className="text-gray-600 space-y-1">
          <p>{userData.aspiringRoles && userData.aspiringRoles.length > 0 ? userData.aspiringRoles[0] : "Professional"}</p>
          <p>{userData.email} • {userData.linkedIn}</p>
        </div>
      </header>

      <main className="p-8 space-y-6">
        {userData.aboutMe && (
          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700">
              {userData.aboutMe}
            </p>
          </section>
        )}

        {userData.experience && userData.experience.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {userData.experience.map((exp, index) => (
                <div key={index}>
                  <h3 className="font-semibold">
                    {exp.jobTitle} - {exp.company}
                  </h3>
                  <p className="text-gray-600">
                    {formatDate(exp.startDate)} - {exp.endDate === "Present" ? "Present" : formatDate(exp.endDate)}
                  </p>
                  <ul className="list-disc ml-4 mt-2 text-gray-700">
                    <li>{exp.description}</li>
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {userData.education && userData.education.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {userData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-gray-600">{edu.year_of_start} - {edu.year_of_completion}</p>
                  <ul className="list-disc ml-4 mt-2 text-gray-700">
                    <li>{edu.degree}</li>
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {userData.skills && userData.skills.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Hobbies
            </h2>
            <div className="flex flex-wrap gap-2">
              {userData.hobbies.map((hobby, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor,
                  }}
                >
                  {hobby}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

// 2. Modern Professional Template
const ModernProfessional: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
  userData
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  
  if (!userData) {
    return <div className={containerClass}><div className="p-8">Loading...</div></div>;
  }
  
  return (
    <div className={containerClass}>
      {/* Header with primary color */}
      <div className="h-8" style={{ backgroundColor: primaryColor }}></div>
      <div className="grid grid-cols-3 gap-8 p-8">
        {/* Left Section (Main Content) */}
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
          <p className="text-xl text-gray-600 mb-6">
            {userData.aspiringRoles && userData.aspiringRoles.length > 0 ? userData.aspiringRoles[0] : "Professional"}
          </p>

          {/* About Me */}
          {userData.aboutMe && (
            <section className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                About Me
              </h2>
              <p className="text-gray-700">{userData.aboutMe}</p>
            </section>
          )}

          {/* Experience */}
          {userData.experience && userData.experience.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                Experience
              </h2>
              <div className="space-y-6">
                {userData.experience.map((exp, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{exp.company}</h3>
                    <p className="text-gray-600 mb-2">
                      {exp.jobTitle} • {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </p>
                    <ul className="list-disc ml-4 text-gray-700">
                      <li>{exp.description}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {userData.education && userData.education.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                Education
              </h2>
              {userData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-gray-600 mb-2">
                    {edu.degree} <br />• {edu.year_of_start} - {edu.year_of_completion}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Contact Information */}
          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Contact
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>{userData.email}</p>
              {userData.linkedIn && <p>{userData.linkedIn}</p>}
              {userData.github && <p>{userData.github}</p>}
            </div>
          </section>
          
          {/* Skills */}
          {userData.skills && userData.skills.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                Skills
              </h2>
              <div className="space-y-2">
                {userData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-2 rounded"
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      color: primaryColor,
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Hobbies */}
          {userData.hobbies && userData.hobbies.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                Hobbies
              </h2>
              <ul className="list-disc ml-4 text-gray-700">
                {userData.hobbies.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {userData.languages && userData.languages.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                Languages
              </h2>
              <ul className="list-disc ml-4 text-gray-700">
                {userData.languages.map((lang, index) => (
                  <li key={index}>{lang.language} - {lang.proficiency}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const BoldCreative: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
  userData
}) => {
  // Define A4 dimensions in pixels (at 96 DPI)
  // A4: 210mm × 297mm ≈ 793px × 1123px
  const A4_WIDTH = 793;
  const A4_HEIGHT = 1123;
  
  // State to track pagination
  const [pages, setPages] = React.useState<any[]>([]);
  
  // Function to split content across pages
  React.useEffect(() => {
    if (!userData) return;
    
    // Determine how to split content
    const contentSections = [];
    
    // Add sections in order of importance
    if (userData.aboutMe) {
      contentSections.push({ type: 'aboutMe', height: 150 });
    }
    
    if (userData.experience && userData.experience.length > 0) {
      // Estimate 120px per experience entry
      userData.experience.forEach((exp, index) => {
        contentSections.push({ type: 'experience', index, height: 120 });
      });
    }
    
    if (userData.education && userData.education.length > 0) {
      // Estimate 80px per education entry
      userData.education.forEach((edu, index) => {
        contentSections.push({ type: 'education', index, height: 80 });
      });
    }
    
    if (userData.projects && userData.projects.length > 0) {
      // Estimate 150px per project entry
      userData.projects.forEach((project, index) => {
        contentSections.push({ type: 'project', index, height: 150 });
      });
    }
    
    // Create pages by distributing content
    const newPages = [];
    let currentPage: any = { content: [] };
    let currentHeight = 0;
    
    // Header height (About Me title etc.)
    const HEADER_HEIGHT = 80;
    // Maximum content height per page (accounting for margins)
    const MAX_CONTENT_HEIGHT = A4_HEIGHT - 120;
    
    contentSections.forEach((section) => {
      // If adding this section would exceed page height, create a new page
      if (currentHeight + section.height + (currentPage.content.length > 0 ? HEADER_HEIGHT : 0) > MAX_CONTENT_HEIGHT) {
        newPages.push(currentPage);
        currentPage = { content: [] };
        currentHeight = 0;
      }
      
      currentPage.content.push(section);
      currentHeight += section.height;
    });
    
    // Add the last page
    if (currentPage.content.length > 0) {
      newPages.push(currentPage);
    }
    
    setPages(newPages);
  }, [userData]);
  
  const containerClass = `font-${font || 'sans'} ${preview ? '' : 'print:shadow-none'}`;

  if (!userData) {
    return <div className={containerClass}><div className="p-8">Loading...</div></div>;
  }
  
  // Get user initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "N/A";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "Present";
    return dateString;
  };
  
  // Render sidebar content - only for the first page
  const renderSidebar = (pageIndex: number) => {
    // For pages after the first one, render an empty sidebar with the same background color
    if (pageIndex > 0) {
      return (
        <div 
          className="w-1/3" 
          style={{ backgroundColor: primaryColor }}
        ></div>
      );
    }
    
    // For the first page, render the full sidebar
    return (
      <div 
        className="w-1/3 p-8 text-white" 
        style={{ backgroundColor: primaryColor }}
      >
        <div className="mb-12">
          <div className="w-32 h-32 rounded-full bg-white mb-4 mx-auto overflow-hidden">
            {/* Profile Image or Placeholder */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              {userData.profilePicture ? (
                <img src={userData.profilePicture} alt={userData.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 text-2xl">{getInitials(userData.name)}</span>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-1">{userData.name}</h1>
          <p className="text-center opacity-90">
            {userData.aspiringRoles && userData.aspiringRoles.length > 0 ? userData.aspiringRoles[0] : "Professional"}
          </p>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">
              Contact
            </h2>
            <div className="space-y-2">
              <p>{userData.email}</p>
              {userData.linkedIn && <p>{userData.linkedIn}</p>}
              {userData.github && <p>{userData.github}</p>}
            </div>
          </section>
          
          {userData.skills && userData.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">
                Skills
              </h2>
              <div className="space-y-1">
                {userData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24">{skill.name}</div>
                    <div className="flex-1 bg-white bg-opacity-20 h-2 rounded-full">
                      <div 
                        className="bg-white h-2 rounded-full" 
                        style={{ 
                          width: skill.level === "Beginner" ? "33%" : 
                                skill.level === "Intermediate" ? "66%" : "90%" 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {userData.hobbies && userData.hobbies.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">
                Hobbies
              </h2>
              <div className="flex flex-wrap gap-2">
                {userData.hobbies.map((hobby, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-white bg-opacity-20 rounded text-sm"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </section>
          )}

          {userData.languages && userData.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">
                Languages
              </h2>
              <div className="space-y-1">
                {userData.languages.map((lang, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24">{lang.language}</div>
                    <div className="flex-1 bg-white bg-opacity-20 h-2 rounded-full">
                      <div 
                        className="bg-white h-2 rounded-full" 
                        style={{ 
                          width: lang.proficiency === "Beginner" ? "33%" : 
                                lang.proficiency === "Intermediate" ? "66%" : "90%" 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  };
  
  // Render main content
  const renderContent = (pageContent: any[]) => {
    return (
      <div className="w-2/3 p-8 bg-white">
        {/* About Me Section */}
        {pageContent.some(section => section.type === 'aboutMe') && userData.aboutMe && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-4 pb-2 border-b-2" 
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              About Me
            </h2>
            <p className="text-gray-700">{userData.aboutMe}</p>
          </section>
        )}
        
        {/* Experience Section */}
        {pageContent.some(section => section.type === 'experience') && userData.experience && userData.experience.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-4 pb-2 border-b-2" 
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {pageContent
                .filter(section => section.type === 'experience')
                .map(section => {
                  const exp = userData.experience[section.index];
                  return (
                    <div key={section.index}>
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">{exp.jobTitle}</h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-gray-600 italic mb-2">{exp.company}</p>
                      <ul className="list-disc ml-4 text-gray-700">
                        <li>{exp.description}</li>
                      </ul>
                    </div>
                  );
                })}
            </div>
          </section>
        )}
        
        {/* Education Section */}
        {pageContent.some(section => section.type === 'education') && userData.education && userData.education.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-4 pb-2 border-b-2" 
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Education
            </h2>
            {pageContent
              .filter(section => section.type === 'education')
              .map(section => {
                const edu = userData.education[section.index];
                return (
                  <div key={section.index}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold">{edu.degree}</h3>
                      <span className="text-sm text-gray-500">{edu.year_of_start} - {edu.year_of_completion}</span>
                    </div>
                    <p className="text-gray-600 italic">{edu.institution}</p>
                  </div>
                );
              })}
          </section>
        )}

        {/* Projects Section */}
        {pageContent.some(section => section.type === 'project') && userData.projects && userData.projects.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-4 pb-2 border-b-2" 
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {pageContent
                .filter(section => section.type === 'project')
                .map(section => {
                  const project = userData.projects[section.index];
                  return (
                    <div key={section.index}>
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">{project.name}</h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </span>
                      </div>
                      <p className="text-gray-600 italic mb-2">{project.techStack}</p>
                      <p className="text-gray-700">{project.description}</p>
                      {project.link && (
                        <p className="text-sm mt-1">
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: primaryColor }}
                          >
                            View Project
                          </a>
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        )}
      </div>
    );
  };
  
  return (
    <div className={containerClass}>
      {pages.map((page, pageIndex) => (
        <div 
          key={pageIndex}
          className="relative mx-auto bg-white shadow-lg mb-8"
          style={{ 
            width: `${A4_WIDTH}px`, 
            height: `${A4_HEIGHT}px`,
            breakAfter: 'page',
            breakInside: 'avoid',
            overflow: 'hidden'
          }}
        >
          <div className="flex h-full">
            {renderSidebar(pageIndex)}
            {renderContent(page.content)}
          </div>
          
          {/* Page number */}
          {pages.length > 1 && (
            <div className="absolute bottom-4 right-4 text-sm text-gray-500">
              Page {pageIndex + 1} of {pages.length}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// 4. Minimalist Technical Template
const MinimalistTechnical: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
  userData
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  
  if (!userData) {
    return <div className={containerClass}><div className="p-8">Loading...</div></div>;
  }

  // Group skills by type
  const groupedSkills: {
    Languages: string[];
    Frameworks: string[];
    Tools: string[];
    Databases: string[];
  } = {
    Languages: [],
    Frameworks: [],
    Tools: [],
    Databases: []
  };

  if (userData.skills && userData.skills.length > 0) {
    userData.skills.forEach(skill => {
      if (skill.name.toLowerCase().includes('python') || 
          skill.name.toLowerCase().includes('java') || 
          skill.name.toLowerCase().includes('script')) {
        groupedSkills.Languages.push(skill.name);
      } else if (skill.name.toLowerCase().includes('react') || 
                skill.name.toLowerCase().includes('node') || 
                skill.name.toLowerCase().includes('framework')) {
        groupedSkills.Frameworks.push(skill.name);
      } else if (skill.name.toLowerCase().includes('git') || 
                skill.name.toLowerCase().includes('docker')) {
        groupedSkills.Tools.push(skill.name);
      } else if (skill.name.toLowerCase().includes('sql') || 
                skill.name.toLowerCase().includes('mongo')) {
        groupedSkills.Databases.push(skill.name);
      } else {
        // Default to Tools category
        groupedSkills.Tools.push(skill.name);
      }
    });
  }
  
  return (
    <div className={containerClass}>
      <div className="p-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 
            className="text-4xl font-bold mb-2" 
            style={{ color: primaryColor }}
          >
            {userData.name.toUpperCase()}
          </h1>
          <p className="text-xl mb-4">
            {userData.aspiringRoles && userData.aspiringRoles.length > 0 ? userData.aspiringRoles[0] : "Software Engineer"}
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-600">
            <span>{userData.email}</span>
            <span>•</span>
            {userData.linkedIn && (
              <>
                <span>{userData.linkedIn}</span>
                <span>•</span>
              </>
            )}
            {userData.github && <span>{userData.github}</span>}
          </div>
        </header>
        
        {/* Technical Skills */}
        <section className="mb-8">
          <h2 
            className="text-lg font-bold mb-4 uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(groupedSkills).map(([category, skills]) => (
              skills.length > 0 && (
                <div key={category}>
                  <h3 className="font-semibold mb-2">{category}</h3>
                  <p className="text-gray-700">{skills.join(', ')}</p>
                </div>
              )
            ))}
          </div>
        </section>
        
        {/* Experience */}
        {userData.experience && userData.experience.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-lg font-bold mb-4 uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {userData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{exp.jobTitle}</h3>
                    <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{exp.company}</p>
                  <ul className="list-disc ml-4 text-gray-700">
                    <li>{exp.description}</li>
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {userData.projects && userData.projects.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-lg font-bold mb-4 uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              Technical Projects
            </h2>
            <div className="space-y-4">
              {userData.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-gray-700 mb-2">
                    {project.techStack}
                  </p>
                  <p className="text-gray-700">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education */}
        {userData.education && userData.education.length > 0 && (
          <section>
            <h2 
              className="text-lg font-bold mb-4 uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              Education
            </h2>
            {userData.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span>{edu.year_of_start} - {edu.year_of_completion}</span>
                </div>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {userData.certifications && userData.certifications.length > 0 && (
          <section className="mt-8">
            <h2 
              className="text-lg font-bold mb-4 uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              Certifications
            </h2>
            {userData.certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <span>{cert.year}</span>
                </div>
                <p className="text-gray-600">{cert.organization}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

// 5. Academic CV Template
const AcademicCV: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
  userData
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  
  if (!userData) {
    return <div className={containerClass}><div className="p-8">Loading...</div></div>;
  }
  
  return (
    <div className={containerClass}>
      <div className="p-8">
        {/* Header */}
        <header className="mb-8 pb-4 border-b-2" style={{ borderColor: primaryColor }}>
          <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
          <p className="text-gray-700 mb-4">
            {userData.aspiringRoles && userData.aspiringRoles.length > 0 ? userData.aspiringRoles[0] : "Academic Professional"}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              {userData.education && userData.education.length > 0 && (
                <p>{userData.education[0].institution}</p>
              )}
              <p>Email: {userData.email}</p>
            </div>
            <div>
              {userData.linkedIn && <p>LinkedIn: {userData.linkedIn}</p>}
              {userData.github && <p>GitHub: {userData.github}</p>}
            </div>
          </div>
        </header>
        
        {/* Education */}
        {userData.education && userData.education.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Education
            </h2>
            <div className="space-y-6">
              {userData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="italic">{edu.institution}, {edu.year_of_start} - {edu.year_of_completion}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Research Experience */}
        {userData.experience && userData.experience.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Research Experience
            </h2>
            <div className="space-y-6">
              {userData.experience.map((exp, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{exp.jobTitle}</h3>
                  <p className="italic">{exp.company}, {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                  <ul className="list-disc ml-4 mt-2 text-gray-700">
                    <li>{exp.description}</li>
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Publications/Projects */}
        {userData.projects && userData.projects.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Publications & Projects
            </h2>
            <div className="space-y-4">
              {userData.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="italic">{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
                  <p className="mt-1 text-gray-700">{project.description}</p>
                  {project.link && (
                    <p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: primaryColor }}
                      >
                        Link to publication
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Skills and Methods */}
        {userData.skills && userData.skills.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Research Skills & Methods
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {userData.skills.map((skill, index) => (
                <p key={index} className="text-gray-700">• {skill.name}</p>
              ))}
            </div>
          </section>
        )}
        
        {/* Languages */}
        {userData.languages && userData.languages.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {userData.languages.map((lang, index) => (
                <p key={index} className="text-gray-700">• {lang.language}: {lang.proficiency}</p>
              ))}
            </div>
          </section>
        )}
        
        {/* Certifications */}
        {userData.certifications && userData.certifications.length > 0 && (
          <section>
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Certifications & Additional Training
            </h2>
            <div className="space-y-2">
              {userData.certifications.map((cert, index) => (
                <div key={index}>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="italic">{cert.organization}, {cert.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Main Resume Builder Component with side-by-side layout
export default function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");
  const [selectedFont, setSelectedFont] = useState<FontType>("inter");
  const [primaryColor, setPrimaryColor] = useState("#2563eb"); // Default blue
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();
  
  // Get template component based on selection
  const getTemplateComponent = () => {
    switch (selectedTemplate) {
      case "minimal":
        return <MinimalClassic font={selectedFont} primaryColor={primaryColor} userData={userData} />;
      case "modern":
        return <ModernProfessional font={selectedFont} primaryColor={primaryColor} userData={userData} />;
      case "bold":
        return <BoldCreative font={selectedFont} primaryColor={primaryColor} userData={userData} />;
      case "academic": 
        return <AcademicCV font={selectedFont} primaryColor={primaryColor} userData={userData} />;
      case "technical": 
        return <MinimalistTechnical font={selectedFont} primaryColor={primaryColor} userData={userData} />;
      default:
        return <BoldCreative font={selectedFont} primaryColor={primaryColor} userData={userData} />;
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Get user ID from Clerk
        if (!userId) {
          console.log("No user ID available yet");
          return;
        }
        
        // Fetch data from the specified API endpoint
        const response = await fetch(`http://localhost:8000/api/resume?user_id=${userId }`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        
        // Fallback to mock data if API request fails
        const mockData: UserData = {
          name: "Jane Doe",
          email: "jane.doe@example.com",
          profilePicture: "",
          aboutMe: "Driven software engineer with 5+ years of experience in web development. Passionate about creating clean, efficient code and solving complex problems.",
          linkedIn: "linkedin.com/in/janedoe",
          github: "github.com/janedoe",
          education: [
            {
              degree: "BSc in Computer Science",
              institution: "University of Technology",
              year_of_start: "2015",
              year_of_completion: "2019"
            }
          ],
          experience: [
            {
              jobTitle: "Senior Frontend Developer",
              company: "Tech Solutions Inc.",
              startDate: "01-06-2021",
              endDate: "Present",
              description: "Led a team of 5 developers in building a SaaS platform that increased client retention by 25%."
            },
            {
              jobTitle: "Frontend Developer",
              company: "Digital Innovations",
              startDate: "01-04-2019",
              endDate: "31-05-2021",
              description: "Developed responsive web applications using React and Next.js."
            }
          ],
          projects: [
            {
              name: "E-commerce Platform",
              description: "Built a scalable e-commerce platform with React, Node.js, and MongoDB.",
              startDate: "01-01-2020",
              endDate: "01-06-2020",
              techStack: "React, Node.js, MongoDB",
              link: "github.com/janedoe/ecommerce"
            }
          ],
          certifications: [
            {
              name: "AWS Certified Developer",
              organization: "Amazon Web Services",
              year: "2021",
              credentialId: "AWS-DEV-12345",
              credentialUrl: "aws.amazon.com/certification"
            }
          ],
          skills: [
            {
              skill: "frontend",
              name: "React",
              level: "Expert"
            },
            {
              skill: "frontend",
              name: "JavaScript",
              level: "Expert"
            },
            {
              skill: "backend",
              name: "Node.js",
              level: "Intermediate"
            }
          ],
          languages: [
            {
              language: "English",
              proficiency: "Native"
            },
            {
              language: "Spanish",
              proficiency: "Intermediate"
            }
          ],
          hobbies: ["Hiking", "Photography", "Coding"],
          aspiringRoles: ["Senior Frontend Developer", "Tech Lead"],
          aspiringCompanies: ["Google", "Microsoft", "Airbnb"]
        };
        
        setUserData(mockData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId]);

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6"></h1>
      
      {/* Side-by-side layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Styling options */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Customize Your Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Template
                  </label>
                  <Select
                    value={selectedTemplate}
                    onValueChange={setSelectedTemplate}
                    defaultOpen={false}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="minimal">Minimal Classic</SelectItem>
                      <SelectItem value="modern">Modern Professional</SelectItem>
                      <SelectItem value="bold">Bold Creative</SelectItem>
                      <SelectItem value="academic">Academic CV</SelectItem>
                      <SelectItem value="technical">Minimalist Technical</SelectItem>
                      {/* You can add the other templates here */}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Font Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Font
                  </label>
                  <Select
                    value={selectedFont}
                    onValueChange={(value) => setSelectedFont(value as FontType)}
                    defaultOpen={false}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                {/* Export Button */}
                <Button className="w-full mt-8">
                  <Eye className="w-4 h-4 mr-2" />
                  Export as PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Preview */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto max-h-[800px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading your data...</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  {getTemplateComponent()}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}