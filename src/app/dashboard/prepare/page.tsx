"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const PrepareSkillsPage: React.FC = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState(false);
  
  // Toggle states for "see more" functionality
  const [expandedSections, setExpandedSections] = useState({
    suggested_skills: false,
    technical_skills: false,
    soft_skills: false,
    projects: false,
    certifications: false,
    internships: false
  });

  const toggleExpand = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Check cache and fetch data if needed
  const fetchSkillsData = async (forceFetch = false) => {
    if (!user) return;
    
    // Create unique cache key for this user
    const cacheKey = `skills_data_${user.id}`;
    
    // Check for cached data first (unless force fetch is requested)
    if (!forceFetch) {
      try {
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
          const { data: storedData, timestamp } = JSON.parse(cachedData);
          const currentTime = new Date().getTime();
          const cacheAge = currentTime - timestamp;
          
          // Cache is valid for 24 hours (86400000 ms)
          if (cacheAge < 86400000) {
            setData(storedData);
            setDataFetched(true);
            return;
          }
        }
      } catch (err) {
        // If there's any error reading from cache, proceed with fetching
        console.log("Cache read error:", err);
      }
    }
    
    // If we reached here, we need to fetch fresh data
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/prepare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch skills data');
      }
      
      const result = await response.json();
      
      // Store in state
      setData(result);
      setDataFetched(true);
      
      // Save to cache with timestamp
      const cacheData = {
        data: result,
        timestamp: new Date().getTime()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts and user is available
  useEffect(() => {
    if (user && !dataFetched && !isLoading) {
      fetchSkillsData();
    }
  }, [user, dataFetched, isLoading]);

  // Loading animation bubbles
  const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center w-full h-96">
      <motion.div 
        className="flex space-x-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-6 h-6 rounded-full"
            style={{ 
              backgroundColor: `hsl(${220 + i * 15}, 85%, ${65 - i * 5}%)`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      <motion.div 
        className="text-xl font-medium text-gray-700 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="mb-4 font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Preparing your personalized skills assessment...</p>
        <p className="text-sm text-gray-500">
          We're analyzing the data to provide tailored recommendations for your growth. 
          This might take a moment as our AI processes the information.
        </p>
      </motion.div>
    </div>
  );

  // Function to render each skill section with "see more" functionality
  const renderSkillSection = (title: string, skills: any[], sectionKey: keyof typeof expandedSections) => {
    const isExpanded = expandedSections[sectionKey];
    const displaySkills = isExpanded ? skills : skills.slice(0, 3);
    const hasMore = skills.length > 3;
    
    return (
      <motion.div 
        className="mb-10 p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 group hover:shadow-lg hover:shadow-blue-500/10"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text group-hover:scale-105 transition-transform duration-300">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displaySkills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur p-5 rounded-xl shadow-lg border-l-4 border-blue-500 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
              }}
            >
              <h4 className="font-bold text-gray-800 mb-2">{skill.name}</h4>
              <p className="text-gray-600 text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-5 text-center">
            <button
              onClick={() => toggleExpand(sectionKey)}
              className="px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium transform hover:-translate-y-1"
            >
              {isExpanded ? 'Show Less' : 'See More'}
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  // Function to render each experience improvement section with "see more" functionality
  const renderExperienceSection = (title: string, items: any[], sectionKey: keyof typeof expandedSections) => {
    const isExpanded = expandedSections[sectionKey];
    const displayItems = isExpanded ? items : items.slice(0, 3);
    const hasMore = items.length > 3;
    
    return (
      <motion.div 
        className="mb-10 p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 group hover:shadow-lg hover:shadow-purple-500/10"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text group-hover:scale-105 transition-transform duration-300">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur p-5 rounded-xl shadow-lg border-l-4 border-purple-500 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.5)",
              }}
            >
              <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-5 text-center">
            <button
              onClick={() => toggleExpand(sectionKey)}
              className="px-5 py-2 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 font-medium transform hover:-translate-y-1"
            >
              {isExpanded ? 'Show Less' : 'See More'}
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  const retryFetch = () => {
    // Pass true to force a new fetch regardless of cache
    fetchSkillsData(true);
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
            AI SKILLS RECOMMENDATIONS
          </h1>
          <p className="text-xl text-blue-100">
            Discover skills and opportunities tailored just for you
          </p>
        </motion.div>

        {!user && (
          <div className="bg-yellow-100/90 backdrop-blur p-4 rounded-xl text-yellow-800 mb-6 shadow-lg">
            Please log in to see your personalized recommendations.
          </div>
        )}

        {error && (
          <div className="bg-red-100/90 backdrop-blur p-4 rounded-xl text-red-800 mb-6 shadow-lg">
            Error: {error}
            <button 
              onClick={retryFetch}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {isLoading ? (
          <LoadingAnimation />
        ) : data ? (
          <motion.div 
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                YOUR PERSONALIZED RECOMMENDATIONS
              </h2>
              <button
                onClick={retryFetch}
                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
                title="Generate fresh recommendations"
              >
                Refresh
              </button>
            </div>
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text pb-2 border-b border-gray-700/30 hover:scale-105 transition-transform duration-300">
                AI RECOMMENDED SKILLS FOR YOUR DREAM JOB
              </h2>
              {renderSkillSection("Fundamental Skills", data.skills.suggested_skills, "suggested_skills")}
              {renderSkillSection("Technical Skills", data.skills.technical_skills, "technical_skills")}
              {renderSkillSection("Soft Skills", data.skills.soft_skills, "soft_skills")}
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text pb-2 border-b border-gray-700/30 hover:scale-105 transition-transform duration-300">
                AI RECOMMENDED TIPS TO IMPROVE YOUR EXPERIENCE
              </h2>
              {renderExperienceSection("Recommended Projects", data.experience_improvement.projects, "projects")}
              {renderExperienceSection("Valuable Certifications", data.experience_improvement.certifications, "certifications")}
              {renderExperienceSection("Internship Opportunities", data.experience_improvement.internships, "internships")}
            </div>
          </motion.div>
        ) : user ? (
          <div className="flex justify-center">
            <motion.button
              onClick={retryFetch}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 25px -5px rgba(59, 130, 246, 0.5)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Skills Recommendations
            </motion.button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PrepareSkillsPage;