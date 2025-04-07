"use client";
import React, { useState, useEffect, use } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
// import { toast } from "@/components/ui/toast"; 
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

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
  // Create the base classes
  const baseClasses = cn(
    "bg-white",
    // A4 dimensions: 210mm x 297mm - but when preview, scale down
    preview
      ? "scale-[0.7] origin-top-left w-[210mm]"
      : "min-h-[297mm] w-[210mm] mx-auto shadow-lg"
  );
  
  // Add the font class based on the selection
  let fontClass = '';
  switch(font) {
    case 'inter':
      fontClass = 'font-inter';
      break;
    case 'roboto':
      fontClass = 'font-roboto';
      break;
    case 'opensans':
      fontClass = 'font-opensans';
      break;
    case 'lato':
      fontClass = 'font-lato';
      break;
    default:
      fontClass = 'font-inter'; // Default to Inter
  }
  
  return `${baseClasses} ${fontClass}`;
};


// 1. Enhanced Minimal Classic Template with proper content distribution
const MinimalClassic: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
  userData,
}) => {
  const containerClass = getA4ContainerClass(font, preview);

  // If userData is not yet loaded, show loading placeholder
  if (!userData) {
    return (
      <div className={containerClass}>
        <div className="p-8">Loading...</div>
      </div>
    );
  }

  // Define sections array
  const sections = React.useMemo(() => {
    return [
      {
        id: "summary",
        title: "Professional Summary",
        condition: !!userData.aboutMe,
        content: () => <p className="text-gray-700">{userData.aboutMe}</p>,
      },
      {
        id: "experience",
        title: "Experience",
        condition: userData.experience && userData.experience.length > 0,
        content: () => (
          <div className="space-y-4">
            {userData.experience.map((exp, index) => (
              <React.Fragment key={index}>
                <h3 className="font-semibold">
                  {exp.jobTitle} - {exp.company}
                </h3>
                <p className="text-gray-600">
                  {formatDate(exp.startDate)} -{" "}
                  {exp.endDate === "Present"
                    ? "Present"
                    : formatDate(exp.endDate)}
                </p>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </React.Fragment>
            ))}
          </div>
        ),
      },
      {
        id: "education",
        title: "Education",
        condition: userData.education && userData.education.length > 0,
        content: () => (
          <div className="space-y-4">
            {userData.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-semibold">{edu.institution}</h3>
                <p className="text-gray-700">{edu.degree}</p>
                <p className="text-gray-600">
                  {edu.year_of_start} - {edu.year_of_completion}
                </p>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "projects",
        title: "Projects",
        condition: userData.projects && userData.projects.length > 0,
        content: () => (
          <div className="space-y-4">
            {userData.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-gray-600">
                  {formatDate(project.startDate)} -{" "}
                  {project.endDate === "Present"
                    ? "Present"
                    : formatDate(project.endDate)}
                </p>
                <p className="mt-1 text-gray-700">{project.description}</p>
                {project.techStack && (
                  <p className="mt-1">
                    <span className="font-medium">Tech Stack:</span>{" "}
                    {project.techStack}
                  </p>
                )}
                {project.link && (
                  <p className="mt-1 text-blue-600">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Project Link
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "certifications",
        title: "Certifications",
        condition:
          userData.certifications && userData.certifications.length > 0,
        content: () => (
          <div className="space-y-3">
            {userData.certifications.map((cert, index) => (
              <div key={index}>
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-gray-600">
                  {cert.organization} • {cert.year}
                </p>
                {cert.credentialUrl && (
                  <p className="text-blue-600 text-sm">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Credential ID: {cert.credentialId}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "skills",
        title: "Skills",
        condition: userData.skills && userData.skills.length > 0,
        content: () => (
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
        ),
      },
      {
        id: "languages",
        title: "Languages",
        condition: userData.languages && userData.languages.length > 0,
        content: () => (
          <div className="flex flex-wrap gap-4">
            {userData.languages.map((lang, index) => (
              <div key={index} className="flex items-center">
                <span className="font-medium">{lang.language}:</span>
                <span className="ml-1 text-gray-700">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "hobbies",
        title: "Hobbies",
        condition: userData.hobbies && userData.hobbies.length > 0,
        content: () => (
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
        ),
      },
    ].filter((section) => section.condition);
  }, [userData, primaryColor]);

  // Maximum content height per page (in px)
  const A4_PAGE_HEIGHT = 1123; // Roughly 297mm in pixels
  const HEADER_HEIGHT = 120; // Approximate header height
  const FOOTER_HEIGHT = 30; // Approximate footer height
  const PAGE_PADDING = 64; // 32px top + 32px bottom
  const MAX_CONTENT_HEIGHT =
    A4_PAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - PAGE_PADDING;

  // State to track pages and their content
  const [pageContents, setPageContents] = React.useState<any[]>([]);

  // Function to distribute sections across pages
  React.useEffect(() => {
    // Function to measure rendered element height
    const measureElementHeight = (element: HTMLElement) => {
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.position = "absolute";
      clone.style.visibility = "hidden";
      clone.style.height = "auto";
      document.body.appendChild(clone);
      const height = clone.offsetHeight;
      document.body.removeChild(clone);
      return height;
    };

    // Distribute sections across pages
    const distributeContent = () => {
      const pages: any[] = [[]];
      let currentPage = 0;
      let currentPageHeight = 0;

      // Header is only on the first page, so start with its height
      if (currentPage === 0) {
        currentPageHeight += HEADER_HEIGHT;
      }

      sections.forEach((section, index) => {
        // Create a temporary element to measure section height
        const tempElement = document.createElement("div");
        tempElement.innerHTML = `<h2 class="text-xl font-semibold mb-4">${section.title}</h2>`;
        const contentContainer = document.createElement("div");
        tempElement.appendChild(contentContainer);

        // Estimate section height (in a real app, we would render and measure)
        // This is a simplified approach - in production, you'd want to use a ref or portals
        let sectionHeight = 60; // Base height for title + margins

        // Estimate content height based on section type
        switch (section.id) {
          case "summary":
            sectionHeight += userData.aboutMe.length / 5; // Rough estimate
            break;
          case "experience":
            sectionHeight += userData.experience.length * 120; // Rough estimate per item
            break;
          case "education":
            sectionHeight += userData.education.length * 100; // Rough estimate per item
            break;
          case "projects":
            sectionHeight += userData.projects.length * 140; // Rough estimate per item
            break;
          case "certifications":
            sectionHeight += userData.certifications.length * 100; // Rough estimate per item
            break;
          case "skills":
            sectionHeight += 50; // Fixed height
            break;
          case "languages":
            sectionHeight += 40; // Fixed height
            break;
          case "hobbies":
            sectionHeight += 50; // Fixed height
            break;
          default:
            sectionHeight += 100; // Default estimate
        }

        // Check if section fits on current page
        if (
          currentPageHeight + sectionHeight > MAX_CONTENT_HEIGHT &&
          pages[currentPage].length > 0
        ) {
          // Move to next page
          currentPage++;
          pages[currentPage] = [];
          currentPageHeight = 0;
        }

        // Add section to current page
        pages[currentPage].push(section);
        currentPageHeight += sectionHeight;
      });

      setPageContents(pages);
    };

    distributeContent();
  }, [sections, userData, MAX_CONTENT_HEIGHT]);

  // Render the resume with multiple pages
  return (
    <div className="resume-container">
      {pageContents.map((pageSections, pageIndex) => (
        <div
          key={pageIndex}
          className={`${containerClass} h-[297mm] mb-8 page-break-after relative overflow-hidden`}
          style={{fontFamily: 
          font === "inter" ? "Inter, sans-serif" : 
          font === "roboto" ? "Roboto, sans-serif" : 
          font === "opensans" ? "Open Sans, sans-serif" : 
          font === "lato" ? "Lato, sans-serif" : 
          "inherit" 
      }}
        >
          {/* Header only on first page */}
          {pageIndex === 0 && (
            <header
              className="p-8 border-b"
              style={{ borderColor: primaryColor }}
            >
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                {userData.name}
              </h1>
              <div className="text-gray-600 space-y-1">
                <p>
                  {userData.aspiringRoles && userData.aspiringRoles.length > 0
                    ? userData.aspiringRoles[0]
                    : "Professional"}
                </p>
                <div className="flex flex-wrap gap-4">
                  <p>{userData.email}</p>
                  {userData.linkedIn && <p>{userData.linkedIn}</p>}
                  {userData.github && <p>{userData.github}</p>}
                </div>
              </div>
            </header>
          )}

          <main className="p-8 space-y-6">
            {/* Render only sections assigned to this page */}
            {pageSections.map((section: any, sectionIndex: number) => (
              <section key={`${pageIndex}-${sectionIndex}`}>
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: primaryColor }}
                >
                  {section.title}
                </h2>
                {section.content()}
              </section>
            ))}
          </main>

          {/* Page footer with page number */}
          <footer className="absolute bottom-4 right-8 text-gray-400 text-sm">
            Page {pageIndex + 1} of {pageContents.length}
          </footer>
        </div>
      ))}
    </div>
  );
};

//2 Enhanced Modern Professional Template with pagination support
const ModernProfessional: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
  userData,
}) => {
  const containerClass = getA4ContainerClass(font, preview);

  if (!userData) {
    return (
      <div className={containerClass}>
        <div className="p-8">Loading...</div>
      </div>
    );
  }

  // Define main content sections
  const mainSections = React.useMemo(() => {
    return [
      {
        id: "about",
        title: "About Me",
        condition: !!userData.aboutMe,
        content: () => <p className="text-gray-700">{userData.aboutMe}</p>,
      },
      {
        id: "experience",
        title: "Experience",
        condition: userData.experience && userData.experience.length > 0,
        content: () => (
          <div className="space-y-6">
            {userData.experience.map((exp, index) => (
              <div key={index}>
                <h3 className="font-semibold">{exp.company}</h3>
                <p className="text-gray-600 mb-2">
                  {exp.jobTitle} • {formatDate(exp.startDate)} -{" "}
                  {exp.endDate === "Present"
                    ? "Present"
                    : formatDate(exp.endDate)}
                </p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "education",
        title: "Education",
        condition: userData.education && userData.education.length > 0,
        content: () => (
          <div className="space-y-4">
            {userData.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-semibold">{edu.institution}</h3>
                <p className="text-gray-600 mb-2">
                  {edu.degree} <br />• {edu.year_of_start} -{" "}
                  {edu.year_of_completion}
                </p>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "projects",
        title: "Projects",
        condition: userData.projects && userData.projects.length > 0,
        content: () => (
          <div className="space-y-6">
            {userData.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-gray-600 mb-2">
                  {formatDate(project.startDate)} -{" "}
                  {project.endDate === "Present"
                    ? "Present"
                    : formatDate(project.endDate)}
                </p>
                <p className="text-gray-700 mb-1">{project.description}</p>
                {project.techStack && (
                  <p className="text-gray-700">
                    <span className="font-medium">Tech Stack:</span>{" "}
                    {project.techStack}
                  </p>
                )}
                {project.link && (
                  <p className="mt-1">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Project Link
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "certifications",
        title: "Certifications",
        condition:
          userData.certifications && userData.certifications.length > 0,
        content: () => (
          <div className="space-y-4">
            {userData.certifications.map((cert, index) => (
              <div key={index}>
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-gray-600 mb-1">
                  {cert.organization} • {cert.year}
                </p>
                {cert.credentialUrl && (
                  <p>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Credential ID: {cert.credentialId}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        ),
      },
    ].filter((section) => section.condition);
  }, [userData]);

  // Define sidebar sections
  const sidebarSections = React.useMemo(() => {
    return [
      {
        id: "contact",
        title: "Contact",
        content: () => (
          <div className="space-y-2 text-gray-700">
            <p>
              <a
                href={`mailto:${userData.email}`}
                className="text-blue-600 hover:underline"
              >
                {userData.email}
              </a>
            </p>
            {userData.linkedIn && (
              <p>
                <a
                  href={userData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn
                </a>
              </p>
            )}
            {userData.github && (
              <p>
                <a
                  href={userData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub
                </a>
              </p>
            )}
          </div>
        ),
      },
      {
        id: "skills",
        title: "Skills",
        condition: userData.skills && userData.skills.length > 0,
        content: () => (
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
        ),
      },
      {
        id: "languages",
        title: "Languages",
        condition: userData.languages && userData.languages.length > 0,
        content: () => (
          <ul className="list-disc ml-4 text-gray-700">
            {userData.languages.map((lang, index) => (
              <li key={index}>
                {lang.language} - {lang.proficiency}
              </li>
            ))}
          </ul>
        ),
      },
      {
        id: "hobbies",
        title: "Hobbies",
        condition: userData.hobbies && userData.hobbies.length > 0,
        content: () => (
          <ul className="list-disc ml-4 text-gray-700">
            {userData.hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        ),
      },
    ].filter(
      (section) => section.id === "contact" || section.condition === true
    );
  }, [userData, primaryColor]);

  // Maximum content height per page (in px)
  const A4_PAGE_HEIGHT = 1123; // Roughly 297mm in pixels
  const HEADER_HEIGHT = 140; // Header + margin
  const FOOTER_HEIGHT = 30; // Footer
  const PAGE_PADDING = 64; // 32px top + 32px bottom
  const MAX_CONTENT_HEIGHT =
    A4_PAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - PAGE_PADDING;

  // State to track pages and their content
  const [mainPageContents, setMainPageContents] = React.useState<any[]>([]);
  const [sidebarPageContents, setSidebarPageContents] = React.useState<any[]>(
    []
  );

  // Distribute sections across pages
  React.useEffect(() => {
    // Main content distribution
    const distributeMainContent = () => {
      const pages: any[] = [[]];
      let currentPage = 0;
      let currentPageHeight = 0;

      if (currentPage === 0) {
        currentPageHeight += HEADER_HEIGHT;
      }

      mainSections.forEach((section) => {
        // Estimate section height based on content
        let sectionHeight = 60; // Base height for title + margins

        switch (section.id) {
          case "about":
            sectionHeight += userData.aboutMe.length / 4; // Estimate based on text length
            break;
          case "experience":
            sectionHeight += userData.experience.length * 130; // Height per item
            break;
          case "education":
            sectionHeight += userData.education.length * 100; // Height per item
            break;
          case "projects":
            sectionHeight += userData.projects.length * 160; // Height per item
            break;
          case "certifications":
            sectionHeight += userData.certifications.length * 110; // Height per item
            break;
          default:
            sectionHeight += 100; // Default
        }

        // Check if section fits on current page
        if (
          currentPageHeight + sectionHeight > MAX_CONTENT_HEIGHT &&
          pages[currentPage].length > 0
        ) {
          // Create new page
          currentPage++;
          pages[currentPage] = [];
          currentPageHeight = 0;
        }

        // Add section to current page
        pages[currentPage].push(section);
        currentPageHeight += sectionHeight;
      });

      setMainPageContents(pages);
    };

    // Sidebar content distribution
    const distributeSidebarContent = () => {
      const pages: any[] = [[]];
      let currentPage = 0;
      let currentPageHeight = 0;

      if (currentPage === 0) {
        currentPageHeight += HEADER_HEIGHT;
      }

      sidebarSections.forEach((section) => {
        // Estimate section height
        let sectionHeight = 60; // Base height

        switch (section.id) {
          case "contact":
            sectionHeight += 80; // Fixed height estimate
            break;
          case "skills":
            sectionHeight += userData.skills.length * 40; // Height per skill
            break;
          case "languages":
            sectionHeight += userData.languages.length * 25; // Height per language
            break;
          case "hobbies":
            sectionHeight += userData.hobbies.length * 25; // Height per hobby
            break;
          default:
            sectionHeight += 60; // Default
        }

        // Check if section fits on current page
        if (
          currentPageHeight + sectionHeight > MAX_CONTENT_HEIGHT &&
          pages[currentPage].length > 0
        ) {
          // Create new page
          currentPage++;
          pages[currentPage] = [];
          currentPageHeight = 0;
        }

        // Add section to current page
        pages[currentPage].push(section);
        currentPageHeight += sectionHeight;
      });

      setSidebarPageContents(pages);
    };

    distributeMainContent();
    distributeSidebarContent();
  }, [mainSections, sidebarSections, userData, MAX_CONTENT_HEIGHT]);

  // Calculate total pages needed
  const totalPages = Math.max(
    mainPageContents.length,
    sidebarPageContents.length
  );

  // Render the resume with multiple pages
  return (
    <div className="resume-container">
      {Array.from({ length: totalPages }).map((_, pageIndex) => (
        <div
          key={pageIndex}
          className={`${containerClass} h-[297mm] mb-8 page-break-after relative overflow-hidden`}
        >
          {/* Top colored bar */}
          <div className="h-8" style={{ backgroundColor: primaryColor }}></div>

          {/* Only show name and title on first page */}
          {pageIndex === 0 && (
            <div className="px-8 pt-8">
              <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
              <p className="text-xl text-gray-600 mb-6">
                {userData.aspiringRoles && userData.aspiringRoles.length > 0
                  ? userData.aspiringRoles[0]
                  : "Professional"}
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-8 p-8 pt-4">
            {/* Left Section (Main Content) */}
            <div className="col-span-2">
              {mainPageContents[pageIndex]?.map(
                (section: any, sectionIndex: number) => (
                  <section
                    key={`main-${pageIndex}-${sectionIndex}`}
                    className="mb-8"
                  >
                    <h2
                      className="text-xl font-semibold mb-4"
                      style={{ color: primaryColor }}
                    >
                      {section.title}
                    </h2>
                    {section.content()}
                  </section>
                )
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {sidebarPageContents[pageIndex]?.map(
                (section: any, sectionIndex: number) => (
                  <section key={`sidebar-${pageIndex}-${sectionIndex}`}>
                    <h2
                      className="text-xl font-semibold mb-4"
                      style={{ color: primaryColor }}
                    >
                      {section.title}
                    </h2>
                    {section.content()}
                  </section>
                )
              )}
            </div>
          </div>

          {/* Page footer with page number */}
          <footer className="absolute bottom-4 right-8 text-gray-400 text-sm">
            Page {pageIndex + 1} of {totalPages}
          </footer>
        </div>
      ))}
    </div>
  );
};

// 3. Bold Creative Template

const BoldCreative: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
  userData,
}) => {

  const fontFamilyMap = {
    inter: "'Inter', sans-serif",
    roboto: "'Roboto', sans-serif",
    opensans: "'Open Sans', sans-serif",
    lato: "'Lato', sans-serif",
  };
  
  // Get the font family string
  const fontFamily = fontFamilyMap[font] || fontFamilyMap.inter;
  
  // Use your existing containerClass for other styling
  // const containerClass = `${preview ? "" : "print:shadow-none"}`;
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
      contentSections.push({ type: "aboutMe", height: 150 });
    }

    if (userData.experience && userData.experience.length > 0) {
      // Add each experience item individually
      userData.experience.forEach((exp, index) => {
        contentSections.push({
          type: "experience",
          index,
          height: 120,
          title: exp.jobTitle,
          content: exp,
        });
      });
    }

    if (userData.education && userData.education.length > 0) {
      // Add each education item individually
      userData.education.forEach((edu, index) => {
        contentSections.push({
          type: "education",
          index,
          height: 80,
          title: edu.degree,
          content: edu,
        });
      });
    }

    if (userData.projects && userData.projects.length > 0) {
      // Add each project item individually
      userData.projects.forEach((project, index) => {
        contentSections.push({
          type: "project",
          index,
          height: 150,
          title: project.name,
          content: project,
        });
      });
    }

    // Create pages by distributing content
    const newPages = [];
    let currentPage: Page = {
      content: [],
      sectionTypes: new Set(), // Track section types on this page
    };
    let currentHeight = 0;

    // Header height for each section type
    const SECTION_HEADER_HEIGHT = 60;
    // Content margin
    const CONTENT_MARGIN = 20;
    // Maximum content height per page (accounting for margins)
    const MAX_CONTENT_HEIGHT = A4_HEIGHT - 120;

    // Add a section to the current page
    interface Section {
      type: string;
      index?: number;
      height: number;
      title?: string;
      content?: any;
    }

    interface Page {
      content: Section[];
      sectionTypes: Set<string>;
    }

    const addSectionToPage = (section: Section): void => {
      currentPage.content.push(section);

      // If this is a new section type, add the header height
      if (!currentPage.sectionTypes.has(section.type)) {
        currentPage.sectionTypes.add(section.type);
        currentHeight += SECTION_HEADER_HEIGHT;
      }

      currentHeight += section.height + CONTENT_MARGIN;
    };

    // Create a new page
    const startNewPage = () => {
      if (currentPage.content.length > 0) {
        newPages.push(currentPage);
      }
      currentPage = {
        content: [],
        sectionTypes: new Set(),
      };
      currentHeight = 0;
    };

    // Process all content sections
    contentSections.forEach((section) => {
      // If adding this section would exceed page height, create a new page
      if (
        currentHeight +
          section.height +
          (currentPage.sectionTypes.has(section.type)
            ? 0
            : SECTION_HEADER_HEIGHT) +
          CONTENT_MARGIN >
        MAX_CONTENT_HEIGHT
      ) {
        startNewPage();
      }

      addSectionToPage(section);
    });

    // Add the last page if it has content
    if (currentPage.content.length > 0) {
      newPages.push(currentPage);
    }

    setPages(newPages);
  }, [userData]);

  // const containerClass = `font-${font || "sans"} ${
  //   preview ? "" : "print:shadow-none"
  // }`;

  const containerClass = `${preview ? "" : "print:shadow-none"}`;

  if (!userData) {
    return (
      <div className={containerClass} style={{fontFamily}}>
        <div className="p-8">Loading...</div>
      </div>
    );
  }

  // Get user initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "N/A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
        <div className="w-1/3" style={{ backgroundColor: primaryColor }}></div>
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
                <img
                  src={userData.profilePicture}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-600 text-2xl">
                  {getInitials(userData.name)}
                </span>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-1">
            {userData.name}
          </h1>
          <p className="text-center opacity-90">
            {userData.aspiringRoles && userData.aspiringRoles.length > 0
              ? userData.aspiringRoles[0]
              : "Professional"}
          </p>
        </div>

        <div className="space-y-8">
          {/* <section>
            <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">
              Contact
            </h2>
            <div className="space-y-2">
              <p>{userData.email}</p>
              {userData.linkedIn && <p>{userData.linkedIn}</p>}
              {userData.github && <p>{userData.github}</p>}
            </div>
          </section> */}

          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "whitesmoke" }}
            >
              Contact
            </h2>
            <div className="space-y-2 text-white">
              <p>
                <a
                  href={`mailto:${userData.email}`}
                  className="text-white hover:underline"
                >
                  {userData.email}
                </a>
              </p>
              {userData.linkedIn && (
                <p>
                  <a
                    href={userData.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    LinkedIn
                  </a>
                </p>
              )}
              {userData.github && (
                <p>
                  <a
                    href={userData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    GitHub
                  </a>
                </p>
              )}
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
                          width:
                            skill.level === "Beginner"
                              ? "33%"
                              : skill.level === "Intermediate"
                              ? "66%"
                              : "90%",
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
                          width:
                            lang.proficiency === "Beginner"
                              ? "33%"
                              : lang.proficiency === "Intermediate"
                              ? "66%"
                              : "90%",
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

  // Function to determine if a section type exists on the current page
  const hasSectionType = (page: { content: any[] }, type: string) => {
    return page.content.some((section) => section.type === type);
  };

  // Render main content
  const renderContent = (page: { content: any }) => {
    const pageContent = page.content;
    const displaySectionHeaders = {};

    return (
      <div className="w-2/3 p-8 bg-white">
        {/* About Me Section */}
        {hasSectionType(page, "aboutMe") && userData.aboutMe && (
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
        {hasSectionType(page, "experience") &&
          userData.experience &&
          userData.experience.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-2xl font-bold mb-4 pb-2 border-b-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Experience
              </h2>
              <div className="space-y-4">
                {pageContent
                  .filter(
                    (section: { type: string }) => section.type === "experience"
                  )
                  .map((section: { index: React.Key | null | undefined }) => {
                    const exp =
                      typeof section.index === "number"
                        ? userData.experience[section.index]
                        : null;
                    return (
                      <div key={section.index} className="mb-4">
                        <div className="flex justify-between items-center">
                          {exp && <h3 className="font-bold">{exp.jobTitle}</h3>}
                          {exp && (
                            <span className="text-sm text-gray-500">
                              {formatDate(exp.startDate)} -{" "}
                              {formatDate(exp.endDate)}
                            </span>
                          )}
                        </div>
                        {exp && (
                          <p className="text-gray-600 italic mb-2">
                            {exp.company}
                          </p>
                        )}
                        <ul className="list-disc ml-4 text-gray-700">
                          {exp && <li>{exp.description}</li>}
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </section>
          )}

        {/* Education Section */}
        {hasSectionType(page, "education") &&
          userData.education &&
          userData.education.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-2xl font-bold mb-4 pb-2 border-b-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {pageContent
                  .filter(
                    (section: { type: string }) => section.type === "education"
                  )
                  .map((section: { index: React.Key | null | undefined }) => {
                    const edu =
                      typeof section.index === "number"
                        ? userData.education[section.index]
                        : null;
                    return (
                      <div key={section.index} className="mb-4">
                        <div className="flex justify-between items-center">
                          {edu && <h3 className="font-bold">{edu.degree}</h3>}
                          {edu && (
                            <span className="text-sm text-gray-500">
                              {edu.year_of_start} - {edu.year_of_completion}
                            </span>
                          )}
                        </div>
                        {edu && (
                          <p className="text-gray-600 italic">
                            {edu.institution}
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          )}

        {/* Projects Section */}
        {hasSectionType(page, "project") &&
          userData.projects &&
          userData.projects.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-2xl font-bold mb-4 pb-2 border-b-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {pageContent
                  .filter(
                    (section: { type: string }) => section.type === "project"
                  )
                  .map((section: { index: React.Key | null | undefined }) => {
                    const project =
                      typeof section.index === "number"
                        ? userData.projects[section.index]
                        : null;
                    return (
                      <div key={section.index} className="mb-4">
                        <div className="flex justify-between items-center">
                          {project && (
                            <h3 className="font-bold">{project.name}</h3>
                          )}
                          {project && (
                            <span className="text-sm text-gray-500">
                              {formatDate(project.startDate)} -{" "}
                              {formatDate(project.endDate)}
                            </span>
                          )}
                        </div>
                        {project && (
                          <p className="text-gray-600 italic mb-2">
                            {project.techStack}
                          </p>
                        )}
                        {project && (
                          <p className="text-gray-700">{project.description}</p>
                        )}
                        {project && project.link && (
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
    <div className={containerClass} style={{ fontFamily }}>
      {pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="relative mx-auto bg-white shadow-lg mb-8"
          style={{
            width: `${A4_WIDTH}px`,
            height: `${A4_HEIGHT}px`,
            breakAfter: "page",
            breakInside: "avoid",
            overflow: "hidden",
            fontFamily,
          }}
        >
          <div className="flex h-full">
            {renderSidebar(pageIndex)}
            {renderContent(page)}
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
}

// 4. Minimalist Technical Template

const MinimalistTechnical: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
  userData,
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  const [pages, setPages] = React.useState<React.ReactNode[]>([]);
  
  // A4 page can fit approximately 50-60 lines of content with normal font size
  const LINES_PER_A4_PAGE = 55;

  React.useEffect(() => {
    if (userData) {
      organizeContent();
    }
  }, [userData]);

  // Function to estimate height of each section in lines
  const estimateSectionHeight = (sectionType: string, data: any) => {
    switch(sectionType) {
      case 'header':
        return 8; // Fixed header size
      case 'skills':
        // Base + lines for each skill category with entries
        const skillCategories = Object.values(data).filter(cat => (cat as string[]).length > 0).length;
        return 4 + Math.ceil(skillCategories / 2) * 4;
      case 'experience':
        // Base + 7 lines per experience entry (title, company, dates, description)
        return data?.length ? 4 + (data.length * 7) : 0;
      case 'projects':
        // Base + 6 lines per project
        return data?.length ? 4 + (data.length * 6) : 0;
      case 'education':
        // Base + 4 lines per education entry
        return data?.length ? 4 + (data.length * 4) : 0;
      case 'certifications':
        // Base + 3 lines per certification
        return data?.length ? 4 + (data.length * 3) : 0;
      default:
        return 0;
    }
  };

  // Group skills by type
  const getGroupedSkills = () => {
    const groupedSkills: {
      Languages: string[];
      Frameworks: string[];
      Tools: string[];
      Databases: string[];
    } = {
      Languages: [],
      Frameworks: [],
      Tools: [],
      Databases: [],
    };

    if (userData?.skills && userData.skills.length > 0) {
      userData.skills.forEach((skill) => {
        if (
          skill.name.toLowerCase().includes("python") ||
          skill.name.toLowerCase().includes("java") ||
          skill.name.toLowerCase().includes("script")
        ) {
          groupedSkills.Languages.push(skill.name);
        } else if (
          skill.name.toLowerCase().includes("react") ||
          skill.name.toLowerCase().includes("node") ||
          skill.name.toLowerCase().includes("framework")
        ) {
          groupedSkills.Frameworks.push(skill.name);
        } else if (
          skill.name.toLowerCase().includes("git") ||
          skill.name.toLowerCase().includes("docker")
        ) {
          groupedSkills.Tools.push(skill.name);
        } else if (
          skill.name.toLowerCase().includes("sql") ||
          skill.name.toLowerCase().includes("mongo")
        ) {
          groupedSkills.Databases.push(skill.name);
        } else {
          // Default to Tools category
          groupedSkills.Tools.push(skill.name);
        }
      });
    }

    return groupedSkills;
  };

  // Function to organize content into pages with better page balancing
  const organizeContent = () => {
    if (!userData) return;
    
    const groupedSkills = getGroupedSkills();
    
    // Define sections and their data
    const sectionsConfig = [
      { type: 'header', render: renderHeader, data: userData },
      { type: 'skills', render: renderSkills, data: groupedSkills },
      { type: 'experience', render: renderExperience, data: userData.experience },
      { type: 'projects', render: renderProjects, data: userData.projects },
      { type: 'education', render: renderEducation, data: userData.education },
      { type: 'certifications', render: renderCertifications, data: userData.certifications }
    ];
    
    // Filter out empty sections
    const validSections = sectionsConfig.filter(section => {
      if (section.type === 'header') return true;
      if (section.type === 'skills') {
        const skillsData = section.data as { [key: string]: string[] };
        return Object.values(skillsData).some(category => category.length > 0);
      }
      return Array.isArray(section.data) && section.data.length > 0;
    });
    
    const pagesContent: React.ReactNode[] = [];
    let currentPageSections: React.ReactNode[] = [];
    let currentPageHeight = 0;
    
    // Distribute sections across pages
    validSections.forEach(section => {
      const sectionHeight = estimateSectionHeight(section.type, section.data);
      
      // If adding this section would exceed page height and we already have content,
      // finalize current page and start a new one
      if (currentPageHeight + sectionHeight > LINES_PER_A4_PAGE && currentPageSections.length > 0) {
        pagesContent.push(renderPage(currentPageSections));
        currentPageSections = [];
        currentPageHeight = 0;
      }
      
      // If a single section is too big for a page, it will get its own page
      const renderedSection = section.render();
      if (renderedSection) {
        currentPageSections.push(renderedSection);
        currentPageHeight += sectionHeight;
      }
    });
    
    // Add the last page if there's content left
    if (currentPageSections.length > 0) {
      pagesContent.push(renderPage(currentPageSections));
    }
    
    setPages(pagesContent);
  };

  // Render a page with given sections
  const renderPage = (sections: React.ReactNode[]) => (
    <div className="p-8">
      {sections}
    </div>
  );

  // Header Section
  const renderHeader = () => (
    <header className="mb-8 text-center">
      <h1
        className="text-4xl font-bold mb-2"
        style={{ color: primaryColor }}
      >
        {userData?.name?.toUpperCase() || ""}
      </h1>
      <p className="text-xl mb-4">
        {userData?.aspiringRoles && userData.aspiringRoles.length > 0
          ? userData.aspiringRoles[0]
          : "Software Engineer"}
      </p>
      <div className="flex justify-center space-x-4 text-sm text-gray-600">
       {userData && <span>{userData.email}</span>}
        <span>•</span>
        {userData && userData.linkedIn && (
          <>
            <span>
              <a 
                href={userData.linkedIn.startsWith("http") ? userData.linkedIn : `https://www.linkedin.com/in/${userData.linkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: primaryColor }}
                className="truncate inline-block max-w-xs"
              >
                {userData.linkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
              </a>
            </span>
            <span>•</span>
          </>
        )}
        {userData && userData.github && (
          <span>
            <a 
              href={userData.github.startsWith("http") ? userData.github : `https://github.com/${userData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: primaryColor }}
              className="truncate inline-block max-w-xs"
            >
              {userData.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
            </a>
          </span>
        )}
      </div>
    </header>
  );

  // Technical Skills Section
  const renderSkills = () => {
    const groupedSkills = getGroupedSkills();
    const hasSkills = Object.values(groupedSkills).some(category => category.length > 0);
    
    if (!hasSkills) return null;
    
    return (
      <section className="mb-8">
        <h2
          className="text-lg font-bold mb-4 uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(groupedSkills).map(
            ([category, skills]) =>
              skills.length > 0 && (
                <div key={category}>
                  <h3 className="font-semibold mb-2">{category}</h3>
                  <p className="text-gray-700">{skills.join(", ")}</p>
                </div>
              )
          )}
        </div>
      </section>
    );
  };

  // Experience Section
  const renderExperience = () => {
    if (!userData||!userData.experience || userData.experience.length === 0) return null;
    
    return (
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
                <span>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{exp.company}</p>
              <ul className="list-disc ml-4 text-gray-700">
                <li>{exp.description}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Projects Section
  const renderProjects = () => {
    if (!userData||!userData.projects || userData.projects.length === 0) return null;
    
    return (
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
              <p className="text-gray-700 mb-2">{project.techStack}</p>
              <p className="text-gray-700">{project.description}</p>
              {project.link && (
                <p className="mt-1">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: primaryColor }}
                    className="text-sm"
                  >
                    View Project
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Education Section
  const renderEducation = () => {
    if (!userData||!userData.education || userData.education.length === 0) return null;
    
    return (
      <section className="mb-8">
        <h2
          className="text-lg font-bold mb-4 uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          Education
        </h2>
        <div className="space-y-4">
          {userData.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{edu.degree}</h3>
                <span>
                  {edu.year_of_start} - {edu.year_of_completion}
                </span>
              </div>
              <p className="text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Certifications Section
  const renderCertifications = () => {
    if (!userData||!userData.certifications || userData.certifications.length === 0) return null;
    
    return (
      <section className="mb-8">
        <h2
          className="text-lg font-bold mb-4 uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          Certifications
        </h2>
        <div className="space-y-3">
          {userData.certifications.map((cert, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{cert.name}</h3>
                <span>{cert.year}</span>
              </div>
              <p className="text-gray-600">{cert.organization}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Loading state
  if (!userData) {
    return (
      <div className={containerClass}>
        <div className="p-8">Loading...</div>
      </div>
    );
  }

  // Wait for pages to be generated
  if (pages.length === 0) {
    return (
      <div className={containerClass}>
        <div className="p-8">Organizing content...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {pages.map((page, index) => (
        <div 
          key={index} 
          className={`${containerClass} mb-6 print:mb-0 ${index < pages.length - 1 ? 'print:page-break-after-always' : ''}`}
        >
          {page}
          {index < pages.length - 1 && (
            <div className="text-right text-gray-500 text-sm pr-4 pb-2">
              Page {index + 1} of {pages.length}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// 5. Academic CV Template
const AcademicCV: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
  userData,
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  const [pages, setPages] = React.useState<React.ReactNode[]>([]);

  // A4 page can fit approximately 50-60 lines of content with normal font size
  // This constant represents approximate content lines that can fit on one A4 page
  const LINES_PER_A4_PAGE = 55;

  React.useEffect(() => {
    if (userData) {
      organizeContent();
    }
  }, [userData]);

  // Function to estimate height of each section in lines
  const estimateSectionHeight = (sectionType: string, data: any) => {
    switch (sectionType) {
      case "header":
        return 8; // Fixed header size
      case "education":
        // Base + 5 lines per education entry
        return data?.length ? 4 + data.length * 5 : 0;
      case "experience":
        // Base + 7 lines per experience entry (including description)
        return data?.length ? 4 + data.length * 7 : 0;
      case "projects":
        // Base + 7 lines per project (including description and link)
        return data?.length ? 4 + data.length * 7 : 0;
      case "skills":
        // Base + 1 line per 2 skills (grid layout)
        return data?.length ? 4 + Math.ceil(data.length / 2) : 0;
      case "languages":
        // Base + 1 line per 2 languages (grid layout)
        return data?.length ? 4 + Math.ceil(data.length / 2) : 0;
      case "certifications":
        // Base + 3 lines per certification
        return data?.length ? 4 + data.length * 3 : 0;
      default:
        return 0;
    }
  };

  // Function to organize content into pages with better page balancing
  const organizeContent = () => {
    if (!userData) return;

    // Define sections and their data
    const sectionsConfig = [
      { type: "header", render: renderHeader, data: userData },
      { type: "education", render: renderEducation, data: userData.education },
      {
        type: "experience",
        render: renderResearchExperience,
        data: userData.experience,
      },
      {
        type: "projects",
        render: renderPublicationsProjects,
        data: userData.projects,
      },
      { type: "skills", render: renderSkills, data: userData.skills },
      { type: "languages", render: renderLanguages, data: userData.languages },
      {
        type: "certifications",
        render: renderCertifications,
        data: userData.certifications,
      },
    ];

    // Filter out empty sections
    const validSections = sectionsConfig.filter((section) => {
      if (section.type === "header") return true;
      return Array.isArray(section.data) && section.data.length > 0;
    });

    const pagesContent: React.ReactNode[] = [];
    let currentPageSections: React.ReactNode[] = [];
    let currentPageHeight = 0;

    // Distribute sections across pages
    validSections.forEach((section) => {
      const sectionHeight = estimateSectionHeight(section.type, section.data);

      // If adding this section would exceed page height and we already have content,
      // finalize current page and start a new one
      if (
        currentPageHeight + sectionHeight > LINES_PER_A4_PAGE &&
        currentPageSections.length > 0
      ) {
        pagesContent.push(renderPage(currentPageSections));
        currentPageSections = [];
        currentPageHeight = 0;
      }

      // If a single section is too big for a page, it will get its own page
      const renderedSection = section.render();
      if (renderedSection) {
        currentPageSections.push(renderedSection);
        currentPageHeight += sectionHeight;
      }
    });

    // Add the last page if there's content left
    if (currentPageSections.length > 0) {
      pagesContent.push(renderPage(currentPageSections));
    }

    setPages(pagesContent);
  };

  // Render a page with given sections
  const renderPage = (sections: React.ReactNode[]) => (
    <div className="p-8">{sections}</div>
  );

  // Header section
  const renderHeader = () => (
    <header
      className="mb-8 pb-4 border-b-2"
      style={{ borderColor: primaryColor }}
    >
      <h1 className="text-3xl font-bold mb-2">
        {userData?.name || "Loading..."}
      </h1>
      {userData && (
        <p className="text-gray-700 mb-4">
          {userData.aspiringRoles && userData.aspiringRoles.length > 0
            ? userData.aspiringRoles[0]
            : "Academic Professional"}
        </p>
      )}
      {userData && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            {userData.education && userData.education.length > 0 && (
              <p>{userData.education[0].institution}</p>
            )}
            <p>Email: {userData.email}</p>
          </div>
          <div>
            {userData.linkedIn && (
              <p>
                🔗{" "}
                <a
                  href={
                    userData.linkedIn.startsWith("http")
                      ? userData.linkedIn
                      : `https://www.linkedin.com/in/${userData.linkedIn}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: primaryColor,
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  LinkedIn
                </a>
              </p>
            )}
            {userData.github && (
              <p>
                🐙{" "}
                <a
                  href={
                    userData.github.startsWith("http")
                      ? userData.github
                      : `https://github.com/${userData.github}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: primaryColor,
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  GitHub
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );

  // Education section
  const renderEducation = () => {
    if (!userData || !userData.education || userData.education.length === 0)
      return null;

    return (
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
              <p className="italic">
                {edu.institution}, {edu.year_of_start} -{" "}
                {edu.year_of_completion}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Research Experience section
  const renderResearchExperience = () => {
    if (!userData || !userData.experience || userData.experience.length === 0)
      return null;

    return (
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
              <p className="italic">
                {exp.company}, {formatDate(exp.startDate)} -{" "}
                {formatDate(exp.endDate)}
              </p>
              <ul className="list-disc ml-4 mt-2 text-gray-700">
                <li>{exp.description}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Publications & Projects section
  const renderPublicationsProjects = () => {
    if (!userData || !userData.projects || userData.projects.length === 0)
      return null;

    return (
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
              <p className="italic">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </p>
              <p className="mt-1 text-gray-700">{project.description}</p>
              {project.link && (
                <p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: primaryColor }}
                    className="truncate inline-block max-w-full"
                  >
                    Link to publication
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Skills section
  const renderSkills = () => {
    if (!userData || !userData.skills || userData.skills.length === 0)
      return null;

    return (
      <section className="mb-8">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: primaryColor }}
        >
          Research Skills & Methods
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {userData.skills.map((skill, index) => (
            <p key={index} className="text-gray-700">
              • {skill.name}
            </p>
          ))}
        </div>
      </section>
    );
  };

  // Languages section
  const renderLanguages = () => {
    if (!userData || !userData.languages || userData.languages.length === 0)
      return null;

    return (
      <section className="mb-8">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: primaryColor }}
        >
          Languages
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {userData.languages.map((lang, index) => (
            <p key={index} className="text-gray-700">
              • {lang.language}: {lang.proficiency}
            </p>
          ))}
        </div>
      </section>
    );
  };

  // Certifications section
  const renderCertifications = () => {
    if (
      !userData ||
      !userData.certifications ||
      userData.certifications.length === 0
    )
      return null;

    return (
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
              <p className="italic">
                {cert.organization}, {cert.year}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Loading state
  if (!userData) {
    return (
      <div className={containerClass}>
        <div className="p-8">Loading...</div>
      </div>
    );
  }

  // For first page, always include header and try to fit more sections
  if (pages.length === 0) {
    return (
      <div className={containerClass}>
        <div className="p-8">Organizing content...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {pages.map((page, index) => (
        <div
          key={index}
          className={`${containerClass} mb-6 print:mb-0 ${
            index < pages.length - 1 ? "print:page-break-after-always" : ""
          }`}
        >
          {page}
          {index < pages.length - 1 && (
            <div className="text-right text-gray-500 text-sm pr-4 pb-2">
              Page {index + 1} of {pages.length}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main Resume Builder Component with side-by-side layout
export default function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState("bold");
  const [selectedFont, setSelectedFont] = useState<FontType>("inter");
  const [primaryColor, setPrimaryColor] = useState("#2563eb"); // Default blue
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [exportLoading, setExportLoading] = useState(false);
  const { userId } = useAuth();
  // Reference to the resume container
  const resumeContainerRef = React.useRef<HTMLDivElement>(null);

  // Get template component based on selection
  const getTemplateComponent = () => {
    switch (selectedTemplate) {
      case "minimal":
        return (
          <MinimalClassic
            font={selectedFont}
            primaryColor={primaryColor}
            userData={userData}
          />
        );
      case "modern":
        return (
          <ModernProfessional
            font={selectedFont}
            primaryColor={primaryColor}
            userData={userData}
          />
        );
      case "bold":
        return (
          <BoldCreative
            font={selectedFont}
            primaryColor={primaryColor}
            userData={userData}
          />
        );
      case "academic":
        return (
          <AcademicCV
            font={selectedFont}
            primaryColor={primaryColor}
            userData={userData}
          />
        );
      case "technical":
        return (
          <MinimalistTechnical
            font={selectedFont}
            primaryColor={primaryColor}
            userData={userData}
          />
        );
      default:
        return (
          <BoldCreative
            font={selectedFont}
            primaryColor={primaryColor}
            userData={userData}
          />
        );
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
        const response = await fetch(
          `http://localhost:8000/api/resume?user_id=${userId}`
        );

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
          aboutMe:
            "Driven software engineer with 5+ years of experience in web development. Passionate about creating clean, efficient code and solving complex problems.",
          linkedIn: "linkedin.com/in/janedoe",
          github: "github.com/janedoe",
          education: [
            {
              degree: "BSc in Computer Science",
              institution: "University of Technology",
              year_of_start: "2015",
              year_of_completion: "2019",
            },
          ],
          experience: [
            {
              jobTitle: "Senior Frontend Developer",
              company: "Tech Solutions Inc.",
              startDate: "01-06-2021",
              endDate: "Present",
              description:
                "Led a team of 5 developers in building a SaaS platform that increased client retention by 25%.",
            },
            {
              jobTitle: "Frontend Developer",
              company: "Digital Innovations",
              startDate: "01-04-2019",
              endDate: "31-05-2021",
              description:
                "Developed responsive web applications using React and Next.js.",
            },
          ],
          projects: [
            {
              name: "E-commerce Platform",
              description:
                "Built a scalable e-commerce platform with React, Node.js, and MongoDB.",
              startDate: "01-01-2020",
              endDate: "01-06-2020",
              techStack: "React, Node.js, MongoDB",
              link: "github.com/janedoe/ecommerce",
            },
          ],
          certifications: [
            {
              name: "AWS Certified Developer",
              organization: "Amazon Web Services",
              year: "2021",
              credentialId: "AWS-DEV-12345",
              credentialUrl: "aws.amazon.com/certification",
            },
          ],
          skills: [
            {
              skill: "frontend",
              name: "React",
              level: "Expert",
            },
            {
              skill: "frontend",
              name: "JavaScript",
              level: "Expert",
            },
            {
              skill: "backend",
              name: "Node.js",
              level: "Intermediate",
            },
          ],
          languages: [
            {
              language: "English",
              proficiency: "Native",
            },
            {
              language: "Spanish",
              proficiency: "Intermediate",
            },
          ],
          hobbies: ["Hiking", "Photography", "Coding"],
          aspiringRoles: ["Senior Frontend Developer", "Tech Lead"],
          aspiringCompanies: ["Google", "Microsoft", "Airbnb"],
        };

        setUserData(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Function to handle PDF export

  const handleExportPDF = async () => {
    if (!resumeContainerRef.current || !userData) {
      console.log("No resume container or user data available");
      return;
    }
  
    try {
      setExportLoading(true);
      console.log("Preparing PDF...");
  
      // Get the main resume container
      const resumeContainer = resumeContainerRef.current;
      
      // First try to find pages with the class 'page-break-after'
      let resumePages = resumeContainer.querySelectorAll('.page-break-after');
      
      // If no pages found with that class, fall back to other selectors based on template
      if (resumePages.length === 0) {
        console.log("No '.page-break-after' elements found. Trying alternative selectors...");
        
        // Try different selectors based on template structure
        // This assumes each template might have a different structure
        const possibleSelectors = [
          '.resume-page', 
          '.resume-container', 
          '.template-container',
          `.${selectedTemplate}-container`,
          '.cv-page'
        ];
        
        // Try each selector until we find something
        for (const selector of possibleSelectors) {
          const elements = resumeContainer.querySelectorAll(selector);
          if (elements.length > 0) {
            resumePages = elements;
            console.log(`Found ${elements.length} pages using selector: ${selector}`);
            break;
          }
        }
        
        // If still no pages found with alternative selectors, use the container itself
        if (resumePages.length === 0) {
          console.log("Using the main resume container as a single page");
          const fragment = document.createDocumentFragment();
          fragment.appendChild(resumeContainer.cloneNode(true));
          resumePages = fragment.childNodes as NodeListOf<Element>;
        }
      }
      
      console.log(`Found ${resumePages.length} pages to export`);
      
      // Create a new PDF document (A4 size)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Process each page
      for (let i = 0; i < resumePages.length; i++) {
        const page = resumePages[i] as HTMLElement;
        
        console.log(`Processing page ${i}:`, {
          width: page.offsetWidth,
          height: page.offsetHeight,
          classList: Array.from(page.classList)
        });
        
        // Create a temporary container for rendering
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '-9999px';
        document.body.appendChild(tempContainer);
        
        // Clone the page into the temporary container
        const clonedPage = page.cloneNode(true) as HTMLElement;
        tempContainer.appendChild(clonedPage);
        
        // Apply necessary styles for proper rendering
        clonedPage.style.width = '210mm';
        clonedPage.style.height = '297mm';
        clonedPage.style.margin = '0';
        clonedPage.style.padding = '0';
        clonedPage.style.transform = 'none';
        clonedPage.style.display = 'block';
        clonedPage.style.visibility = 'visible';
        clonedPage.style.opacity = '1';
        clonedPage.style.position = 'relative';
        clonedPage.style.overflow = 'visible';
        clonedPage.style.backgroundColor = '#ffffff';
        
        // Ensure all child elements are visible and properly rendered
        const allElements = clonedPage.querySelectorAll('*');
        allElements.forEach((el) => {
          const element = el as HTMLElement;
          if (element.style) {
            element.style.visibility = 'visible';
            element.style.display = element.style.display === 'none' ? 'block' : element.style.display;
            element.style.opacity = '1';
          }
        });
        
        // Wait for any images to load
        const images = clonedPage.querySelectorAll('img');
        if (images.length > 0) {
          console.log(`Waiting for ${images.length} images to load on page ${i}`);
          await Promise.all(Array.from(images).map(img => {
            return new Promise((resolve) => {
              if (img.complete) resolve(null);
              else {
                img.onload = () => resolve(null);
                img.onerror = () => resolve(null);
              }
            });
          }));
        }
        
        // Wait a moment for any rendering to complete
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
          // Capture the cloned page as canvas
          const canvas = await html2canvas(clonedPage, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: true,
            windowWidth: 1000, // Set a fixed window width
            windowHeight: 1414, // A4 equivalent in pixels at 96 DPI
          });
          
          // Convert to image
          const imgData = canvas.toDataURL('image/jpeg', 1.0);
          
          // Check if we got valid image data
          if (imgData === 'data:,' || imgData === 'data:image/jpeg;base64,') {
            console.error(`Failed to capture page ${i} - empty canvas returned`);
            continue;
          }
          
          // Add a new page for all pages except the first one
          if (i > 0) {
            pdf.addPage();
          }
          
          // Add the image to the PDF
          pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
          console.log(`Successfully added page ${i} to PDF`);
        } catch (error) {
          console.error(`Error capturing page ${i}:`, error);
        } finally {
          // Clean up temporary container
          document.body.removeChild(tempContainer);
        }
      }
      
      // Generate filename based on user data and template
      const fileName = `${userData.name.replace(/\s+/g, '_')}_Resume_${selectedTemplate}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Save the PDF
      pdf.save(fileName);
      
      console.log("PDF generated successfully");
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Failed to generate PDF: ${error}`);
    } finally {
      setExportLoading(false);
    }
  };

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
                    <SelectItem value="bold">Bold Creative</SelectItem>
                    <SelectItem value="modern">
                        Modern Professional
                      </SelectItem>
                      <SelectItem value="minimal">Minimal Classic</SelectItem>
                      <SelectItem value="technical">
                        Minimalist Technical
                      </SelectItem>
                      <SelectItem value="academic">Academic CV</SelectItem>
                      {/* You can add the other templates here */}
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Font</label>
                  <Select
                    value={selectedFont}
                    onValueChange={(value) =>
                      setSelectedFont(value as FontType)
                    }
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

                <Button 
                  className="w-full mt-8" 
                  onClick={handleExportPDF}
                  disabled={isLoading || exportLoading}
                >
                  {exportLoading ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full"></div>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Export as PDF
                    </>
                  )}
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
                <div className="flex justify-center" ref={resumeContainerRef}>
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
