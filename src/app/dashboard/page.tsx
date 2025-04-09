"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    // Make API call to sync Clerk users when page loads
    fetch('http://localhost:8000/api/sync-clerk-users', {
      method: 'POST',
    }).catch(error => {
      // Silent failure - we don't need to handle the response as requested
      console.log('Background sync initiated');
    });
  }, []);

  const features = [
    {
      title: "Create / Update Resume",
      description: "Build and update your professional resume with us",
      href: "/resume",
      primary: true,
      icon: "📝",
    },
    {
      title: "View Templates",
      description: "Browse our collection of professional resume templates",
      href: "/dashboard/template",
      primary: false,
      icon: "🎨",
    },
    {
      title: "Skills Recommendations",
      description: "Get AI-powered skill recommendations to improve your Job Search",
      href: "/dashboard/prepare",
      primary: false,
      icon: "🚀",
    },
    {
      title: "Job Recommendations",
      description: "Discover AI-curated job openings that match your skills and experience",
      href: "dashboard/jobs",
      primary: false,
      icon: "💼",
    },
    {
      title: "Cover Letter Generator",
      description: "Create customized cover letters by AI  for specific job applications",
      href: "dashboard/cover-letter",
      primary: false,
      icon: "✉️",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-20 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 relative">
      {/* Background Pattern (only rendered after hydration) */}
      {loaded && (
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      )}

      {/* Header Section */}
      <motion.div 
        className="relative max-w-3xl text-center bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-4 text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          AI-Powered Resume Builder
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          Create professional resumes with ATS optimization and AI-powered suggestions, job recommendations and more.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link href="/resume">
            <Button
              size="lg"
              className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/40"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </motion.div>
      
      {/* Features Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="group"
            variants={item}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href={feature.href} className="h-full block">
              <div className={`h-full flex flex-col p-6 rounded-xl backdrop-blur-md border transition-all duration-300 ${
                feature.primary 
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-blue-400/30 hover:border-blue-400/50 shadow-lg hover:shadow-blue-500/20" 
                  : "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30 shadow-lg hover:shadow-purple-500/10"
              }`}>
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h2 className={`text-xl font-bold mb-2 ${
                  feature.primary 
                    ? "bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text" 
                    : "text-gray-200"
                }`}>
                  {feature.title}
                </h2>
                <p className="text-gray-400 flex-grow mb-4">{feature.description}</p>
                <div className="text-right mt-auto">
                  <span className={`inline-flex items-center text-sm font-medium ${
                    feature.primary 
                      ? "text-blue-400" 
                      : "text-purple-400"
                  } group-hover:translate-x-1 transition-transform duration-300`}>
                    Explore {feature.title} <ArrowIcon />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Additional Stats or Info */}
      <motion.div 
        className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-4xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">5+</p>
            <p className="text-gray-400">Resume Templates</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 text-transparent bg-clip-text">10+</p>
            <p className="text-gray-400">Job Listings</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">24/7</p>
            <p className="text-gray-400">AI Support</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

// Arrow Icon Component
const ArrowIcon = () => (
  <svg 
    className="ml-1 w-4 h-4" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M9 5l7 7-7 7"
    />
  </svg>
);