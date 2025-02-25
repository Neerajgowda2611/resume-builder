"use client";
import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define font type
type FontType = "inter" | "roboto" | "opensans" | "lato";

// Base props that all templates share
interface BaseTemplateProps {
  font: FontType;
  primaryColor: string;
  preview?: boolean;
}

// Helper function to get A4 container class
const getA4ContainerClass = (font: FontType, preview: boolean) => {
  return cn(
    "bg-white",
    // A4 dimensions: 210mm x 297mm - but when preview, scale down
    preview
      ? "scale-[1.5] origin-top w-[210mm]"
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
}) => {
  const containerClass = getA4ContainerClass(font, preview);

  return (
    <div className={containerClass}>
      <header className="p-8 border-b" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          John Smith
        </h1>
        <div className="text-gray-600 space-y-1">
          <p>Senior Software Engineer</p>
          <p>john.smith@email.com • (555) 123-4567</p>
          <p>San Francisco, CA</p>
        </div>
      </header>

      <main className="p-8 space-y-6">
        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-700">
            Senior Software Engineer with 8+ years of experience in full-stack
            development, specializing in React and Node.js.
          </p>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">
                Senior Software Engineer - Tech Corp
              </h3>
              <p className="text-gray-600">2020 - Present</p>
              <ul className="list-disc ml-4 mt-2 text-gray-700">
                <li>
                  Led development of microservices architecture serving 1M+
                  users
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">
                Cambridge University
              </h3>
              <p className="text-gray-600">2016 - 2020</p>
              <ul className="list-disc ml-4 mt-2 text-gray-700">
                <li>
                  Bachelor of Science in Computer Science
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "TypeScript", "AWS"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor,
                  }}
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            Hobbies
          </h2>
          <div className="flex flex-wrap gap-2">
            {["Singing", "Dancing", "Travelling", "Hiking"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor,
                  }}
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

// 2. Modern Professional Template
const ModernProfessional: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  
  return (
    <div className={containerClass}>
      {/* Header with primary color */}
      <div className="h-8" style={{ backgroundColor: primaryColor }}></div>
      <div className="grid grid-cols-3 gap-8 p-8">
        {/* Left Section (Main Content) */}
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-2">John Smith</h1>
          <p className="text-xl text-gray-600 mb-6">Senior Software Engineer</p>

          {/* About Me */}
          <section className="mb-8">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              About Me
            </h2>
            <p className="text-gray-700">
              Innovative Senior Software Engineer passionate about creating
              efficient, scalable solutions. Experienced in leading teams and
              delivering high-impact projects.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">Tech Corp</h3>
                <p className="text-gray-600 mb-2">
                  Senior Software Engineer • 2020 - Present
                </p>
                <ul className="list-disc ml-4 text-gray-700">
                  <li>Led development of microservices architecture</li>
                  <li>Improved application performance by 40%</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Education
            </h2>
            <div>
              <h3 className="font-semibold">
                University of California, Berkeley
              </h3>
              <p className="text-gray-600 mb-2">
                B.S. in Computer Science <br />• 2016 - 2020
              </p>
            </div>
          </section>
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
              <p>john@email.com</p>
              <p>(555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
          </section>
          {/* Skills */}
          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Skills
            </h2>
            <div className="space-y-2">
              {["React", "Node.js", "TypeScript", "AWS", "Docker"].map(
                (skill) => (
                  <div
                    key={skill}
                    className="p-2 rounded"
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      color: primaryColor,
                    }}
                  >
                    {skill}
                  </div>
                )
              )}
            </div>
          </section>
          {/* Hobbies */}
          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Hobbies
            </h2>
            <ul className="list-disc ml-4 text-gray-700">
              <li>Photography</li>
              <li>Hiking & Outdoor Adventures</li>
              <li>Reading Tech Blogs</li>
              <li>Playing Guitar</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

// 3. Bold Creative Template (New)
const BoldCreative: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  
  return (
    <div className={containerClass}>
      <div className="flex h-full">
        {/* Sidebar */}
        <div 
          className="w-1/3 p-8 text-white" 
          style={{ backgroundColor: primaryColor }}
        >
          <div className="mb-12">
            <div className="w-32 h-32 rounded-full bg-white mb-4 mx-auto overflow-hidden">
              {/* Profile Image Placeholder */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-2xl">JS</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-1">John Smith</h1>
            <p className="text-center opacity-90">Software Engineer</p>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">
                Contact
              </h2>
              <div className="space-y-2">
                <p>john.smith@email.com</p>
                <p>(555) 123-4567</p>
                <p>San Francisco, CA</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">
                Skills
              </h2>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-24">React</div>
                  <div className="flex-1 bg-white bg-opacity-20 h-2 rounded-full">
                    <div className="bg-white h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24">Node.js</div>
                  <div className="flex-1 bg-white bg-opacity-20 h-2 rounded-full">
                    <div className="bg-white h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24">TypeScript</div>
                  <div className="flex-1 bg-white bg-opacity-20 h-2 rounded-full">
                    <div className="bg-white h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24">AWS</div>
                  <div className="flex-1 bg-white bg-opacity-20 h-2 rounded-full">
                    <div className="bg-white h-2 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">
                Hobbies
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Music", "Travel", "Photography", "Cycling"].map((hobby) => (
                  <span 
                    key={hobby}
                    className="px-2 py-1 bg-white bg-opacity-20 rounded text-sm"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-2/3 p-8 bg-white">
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-4 pb-2 border-b-2" 
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              About Me
            </h2>
            <p className="text-gray-700">
              Creative and detail-oriented Software Engineer with 8+ years of experience
              developing innovative solutions. Passionate about clean code and user-centered design.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-4 pb-2 border-b-2" 
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">Senior Software Engineer</h3>
                  <span className="text-sm text-gray-500">2020 - Present</span>
                </div>
                <p className="text-gray-600 italic mb-2">Tech Corp, San Francisco</p>
                <ul className="list-disc ml-4 text-gray-700">
                  <li>Led frontend development for flagship product</li>
                  <li>Improved app performance by 40% through code optimization</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 
              className="text-2xl font-bold mb-4 pb-2 border-b-2" 
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Education
            </h2>
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold">B.S. Computer Science</h3>
                <span className="text-sm text-gray-500">2016 - 2020</span>
              </div>
              <p className="text-gray-600 italic">University of California, Berkeley</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// 4. Minimalist Technical Template (New)
const MinimalistTechnical: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  
  return (
    <div className={containerClass}>
      <div className="p-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 
            className="text-4xl font-bold mb-2" 
            style={{ color: primaryColor }}
          >
            JOHN SMITH
          </h1>
          <p className="text-xl mb-4">Software Engineer</p>
          <div className="flex justify-center space-x-4 text-sm text-gray-600">
            <span>john.smith@email.com</span>
            <span>•</span>
            <span>(555) 123-4567</span>
            <span>•</span>
            <span>San Francisco, CA</span>
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
            <div>
              <h3 className="font-semibold mb-2">Languages</h3>
              <p className="text-gray-700">JavaScript, TypeScript, Python, SQL</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Frameworks</h3>
              <p className="text-gray-700">React, Node.js, Express, Next.js</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tools</h3>
              <p className="text-gray-700">Git, Docker, AWS, CI/CD</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Databases</h3>
              <p className="text-gray-700">MongoDB, PostgreSQL, Redis</p>
            </div>
          </div>
        </section>
        
        {/* Experience */}
        <section className="mb-8">
          <h2 
            className="text-lg font-bold mb-4 uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            Experience
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Senior Software Engineer</h3>
                <span>2020 - Present</span>
              </div>
              <p className="text-gray-600 mb-2">Tech Corp, San Francisco, CA</p>
              <ul className="list-disc ml-4 text-gray-700">
                <li>Designed and implemented microservice architecture using Node.js and Docker</li>
                <li>Led team of 5 engineers in development of real-time data processing pipeline</li>
                <li>Reduced API response time by 60% through code optimization and caching strategies</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Projects */}
        <section className="mb-8">
          <h2 
            className="text-lg font-bold mb-4 uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            Technical Projects
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Data Visualization Dashboard</h3>
              <p className="text-gray-700 mb-2">
                React, D3.js, Express, MongoDB
              </p>
              <p className="text-gray-700">
                Developed interactive dashboard for visualizing complex datasets with real-time filtering capabilities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Distributed Task Queue</h3>
              <p className="text-gray-700 mb-2">
                Python, Redis, Docker
              </p>
              <p className="text-gray-700">
                Created scalable distributed task queue system with fault tolerance and automatic retries.
              </p>
            </div>
          </div>
        </section>
        
        {/* Education */}
        <section>
          <h2 
            className="text-lg font-bold mb-4 uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            Education
          </h2>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">B.S. Computer Science</h3>
              <span>2016 - 2020</span>
            </div>
            <p className="text-gray-600">University of California, Berkeley</p>
          </div>
        </section>
      </div>
    </div>
  );
};

// 5. Academic CV Template (New)
const AcademicCV: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  
  return (
    <div className={containerClass}>
      <div className="p-8">
        {/* Header */}
        <header className="mb-8 pb-4 border-b-2" style={{ borderColor: primaryColor }}>
          <h1 className="text-3xl font-bold mb-2">John Smith, Ph.D.</h1>
          <p className="text-gray-700 mb-4">Associate Professor of Computer Science</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p>Department of Computer Science</p>
              <p>University of Technology</p>
              <p>San Francisco, CA 94105</p>
            </div>
            <div>
              <p>Email: john.smith@university.edu</p>
              <p>Phone: (555) 123-4567</p>
              <p>Website: www.jsmith-academic.edu</p>
            </div>
          </div>
        </header>
        
        {/* Education */}
        <section className="mb-6">
          <h2 
            className="text-xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">Ph.D. in Computer Science</p>
                <p>2015-2019</p>
              </div>
              <p className="italic">Stanford University, Stanford, CA</p>
              <p className="text-sm">Dissertation: Machine Learning Approaches for Natural Language Understanding</p>
              <p className="text-sm">Advisor: Prof. Jane Doe</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">M.S. in Computer Science</p>
                <p>2013-2015</p>
              </div>
              <p className="italic">Massachusetts Institute of Technology, Cambridge, MA</p>
            </div>
          </div>
        </section>
        
        {/* Publications */}
        <section className="mb-6">
          <h2 
            className="text-xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Selected Publications
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Smith, J.</strong>, Jones, A., & Brown, B. (2023). Advances in Natural Language Processing for Technical Documentation. 
              <em>Journal of Artificial Intelligence Research</em>, 68, 112-145.
            </p>
            <p>
              <strong>Smith, J.</strong>, & Anderson, C. (2022). Transformer-based Approaches to Code Generation.
              <em>Proceedings of the International Conference on Software Engineering</em>, 234-248.
            </p>
            <p>
              Lee, M., <strong>Smith, J.</strong>, & Wilson, D. (2021). Semantic Analysis of Programming Languages.
              <em>ACM Transactions on Programming Languages and Systems</em>, 43(2), 15:1-15:32.
            </p>
          </div>
        </section>
        
        {/* Teaching */}
        <section className="mb-6">
          <h2 
            className="text-xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Teaching Experience
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">Associate Professor</p>
                <p>2022-Present</p>
              </div>
              <p className="italic">University of Technology, San Francisco, CA</p>
              <ul className="list-disc ml-4 text-sm">
                <li>CS401: Advanced Algorithms</li>
                <li>CS510: Natural Language Processing</li>
                <li>CS655: Graduate Research Methods</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">Assistant Professor</p>
                <p>2019-2022</p>
              </div>
              <p className="italic">University of Technology, San Francisco, CA</p>
            </div>
          </div>
        </section>
        
        {/* Grants and Awards */}
        <section className="mb-6">
          <h2 
            className="text-xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Grants and Awards
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p>National Science Foundation Research Grant</p>
              <p>2023-2025</p>
            </div>
            <div className="flex justify-between">
              <p>University Excellence in Teaching Award</p>
              <p>2022</p>
            </div>
            <div className="flex justify-between">
              <p>ACM SIGAI Outstanding Dissertation Award</p>
              <p>2020</p>
            </div>
          </div>
        </section>
        
        {/* Professional Service */}
        <section>
          <h2 
            className="text-xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Professional Service
          </h2>
          <div className="space-y-2 text-sm">
            <p>Program Committee Member, International Conference on Artificial Intelligence, 2021-Present</p>
            <p>Reviewer, Journal of Machine Learning Research, 2020-Present</p>
            <p>Faculty Advisor, Computer Science Graduate Student Association, 2021-Present</p>
          </div>
        </section>
      </div>
    </div>
  );
};

// 6. Professional Business Template (New)
const ProfessionalBusiness: React.FC<BaseTemplateProps> = ({
  font,
  primaryColor,
  preview = false,
}) => {
  const containerClass = getA4ContainerClass(font, preview);
  
  return (
    <div className={containerClass}>
      <div className="p-8">
        {/* Header with horizontal rule */}
        <header className="mb-8">
          <h1 
            className="text-3xl font-bold mb-2 text-center" 
            style={{ color: primaryColor }}
          >
            JOHN SMITH
          </h1>
          <p className="text-center mb-4 text-gray-600">Marketing Director & Business Strategist</p>
          <hr className="border-t-2 w-32 mx-auto mb-4" style={{ borderColor: primaryColor }} />
          <div className="flex justify-center space-x-6 text-sm">
            <span>john.smith@email.com</span>
            <span>(555) 123-4567</span>
            <span>San Francisco, CA</span>
            <span>linkedin.com/in/johnsmith</span>
          </div>
        </header>
        
        {/* Professional Profile */}
        <section className="mb-8">
          <h2 
            className="text-lg font-bold mb-3 uppercase"
            style={{ color: primaryColor }}
          >
            Professional Profile
          </h2>
          <p className="text-gray-700">
            Results-driven Marketing Director with over 10 years of experience developing award-winning strategies 
            for Fortune 500 companies. Expertise in digital transformation, brand development, and integrated 
            marketing communications. Known for driving revenue growth while optimizing marketing ROI.
          </p>
        </section>
        
        {/* Key Skills */}
        <section className="mb-8">
          <h2 
            className="text-lg font-bold mb-3 uppercase"
            style={{ color: primaryColor }}
          >
            Core Competencies
          </h2>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="p-2 border rounded text-center">Strategic Planning</div>
            <div className="p-2 border rounded text-center">Team Leadership</div>
            <div className="p-2 border rounded text-center">Digital Marketing</div>
            <div className="p-2 border rounded text-center">Budget Management</div>
            <div className="p-2 border rounded text-center">Brand Development</div>
            <div className="p-2 border rounded text-center">Market Analysis</div>
          </div>
        </section>
        
        {/* Professional Experience */}
        <section className="mb-8">
          <h2 
            className="text-lg font-bold mb-3 uppercase"
            style={{ color: primaryColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Marketing Director</h3>
                <p className="text-sm">2018 - Present</p>
              </div>
              <p className="text-gray-600 italic mb-2">Global Innovations Inc., San Francisco, CA</p>
              <ul className="list-disc ml-4 text-sm text-gray-700">
                <li>Developed and executed comprehensive marketing strategies resulting in 35% revenue growth</li>
                <li>Developed and executed comprehensive marketing strategies resulting in 35% revenue growth</li>
                <li>Led rebranding initiative that increased brand awareness by 48% and customer engagement by 62%</li>
                <li>Managed a team of 12 marketing professionals and a $3.5M annual budget</li>
                <li>Implemented data-driven marketing approach that improved campaign ROI by 40%</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Senior Marketing Manager</h3>
                <p className="text-sm">2015 - 2018</p>
              </div>
              <p className="text-gray-600 italic mb-2">TechSolutions Corp., San Francisco, CA</p>
              <ul className="list-disc ml-4 text-sm text-gray-700">
                <li>Spearheaded digital marketing transformation, resulting in 28% growth in online sales</li>
                <li>Developed strategic partnerships with key industry influencers to expand market reach</li>
                <li>Optimized marketing spend across channels to achieve 22% reduction in cost per acquisition</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Education */}
        <section className="mb-8">
          <h2 
            className="text-lg font-bold mb-3 uppercase"
            style={{ color: primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">MBA, Marketing & Strategic Management</p>
                <p className="text-sm">2013 - 2015</p>
              </div>
              <p className="text-gray-600 italic">Harvard Business School, Boston, MA</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">B.S. Business Administration</p>
                <p className="text-sm">2009 - 2013</p>
              </div>
              <p className="text-gray-600 italic">University of Pennsylvania, Philadelphia, PA</p>
            </div>
          </div>
        </section>
        
        {/* Achievements */}
        <section>
          <h2 
            className="text-lg font-bold mb-3 uppercase"
            style={{ color: primaryColor }}
          >
            Professional Achievements
          </h2>
          <ul className="list-disc ml-4 text-sm text-gray-700">
            <li>AdWeek Marketing Innovator of the Year Award, 2022</li>
            <li>Led team that won three MarCom Awards for excellence in integrated marketing, 2021</li>
            <li>Published author in Harvard Business Review on digital marketing strategies</li>
            <li>Keynote speaker at International Marketing Summit, 2020 & 2022</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

// Template Component and Form
export default function ResumeTemplates() {
  const [font, setFont] = useState<FontType>("inter");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6"); // Default blue
  const [template, setTemplate] = useState("minimal-classic");
  
  // Helper function to get template component
  const getTemplateComponent = () => {
    switch (template) {
      case "minimal-classic":
        return <MinimalClassic font={font} primaryColor={primaryColor} />;
      case "modern-professional":
        return <ModernProfessional font={font} primaryColor={primaryColor} />;
      case "bold-creative":
        return <BoldCreative font={font} primaryColor={primaryColor} />;
      case "minimalist-technical":
        return <MinimalistTechnical font={font} primaryColor={primaryColor} />;
      case "academic-cv":
        return <AcademicCV font={font} primaryColor={primaryColor} />;
      case "professional-business":
        return <ProfessionalBusiness font={font} primaryColor={primaryColor} />;
      default:
        return <MinimalClassic font={font} primaryColor={primaryColor} />;
    }
  };
  
  // Helper function to get template preview
  const getTemplatePreview = () => {
    switch (template) {
      case "minimal-classic":
        return <MinimalClassic font={font} primaryColor={primaryColor} preview={true} />;
      case "modern-professional":
        return <ModernProfessional font={font} primaryColor={primaryColor} preview={true} />;
      case "bold-creative":
        return <BoldCreative font={font} primaryColor={primaryColor} preview={true} />;
      case "minimalist-technical":
        return <MinimalistTechnical font={font} primaryColor={primaryColor} preview={true} />;
      case "academic-cv":
        return <AcademicCV font={font} primaryColor={primaryColor} preview={true} />;
      case "professional-business":
        return <ProfessionalBusiness font={font} primaryColor={primaryColor} preview={true} />;
      default:
        return <MinimalClassic font={font} primaryColor={primaryColor} preview={true} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Resume Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Template Selection */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Template Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="template" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="template">Template</TabsTrigger>
                  <TabsTrigger value="styling">Styling</TabsTrigger>
                </TabsList>
                <TabsContent value="template" className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Choose Template</label>
                    <Select
                      value={template}
                      onValueChange={(value) => setTemplate(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal-classic">Minimal Classic</SelectItem>
                        <SelectItem value="modern-professional">Modern Professional</SelectItem>
                        <SelectItem value="bold-creative">Bold Creative</SelectItem>
                        <SelectItem value="minimalist-technical">Minimalist Technical</SelectItem>
                        <SelectItem value="academic-cv">Academic CV</SelectItem>
                        <SelectItem value="professional-business">Professional Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border rounded-md p-2 h-[600px] overflow-hidden flex items-start justify-center">
                  <div className="transform scale-[0.3] origin-top">
                    {getTemplatePreview()}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="styling" className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Font</label>
                    <Select
                      value={font}
                      onValueChange={(value) => setFont(value as FontType)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="lato">Lato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Primary Color</label>
                    <div className="flex gap-2">
                      <Input 
                        type="color" 
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input 
                        type="text" 
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Right Panel: Preview */}
          <Card className="lg:col-span-2 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Preview</CardTitle>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </CardHeader>
            <CardContent className="relative h-[80vh] overflow-auto bg-gray-100 p-0">
              <div className="p-8 flex justify-center">
                {getTemplateComponent()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}