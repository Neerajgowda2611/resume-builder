// "use client";
// import React, { useState, useEffect } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { motion } from 'framer-motion';

// const PrepareSkillsPage: React.FC = () => {
//   const { user } = useUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   const fetchSkillsData = async () => {
//     if (!user) return;
    
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch('http://localhost:8000/api/prepare', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           user_id: user.id,
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch skills data');
//       }
      
//       const result = await response.json();
//       setData(result);
//     } catch (err: any) {
//       setError(err.message || 'Something went wrong');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Automatically fetch data when component mounts and user is available
//   useEffect(() => {
//     if (user) {
//       fetchSkillsData();
//     }
//   }, [user]);

//   // Loading animation bubbles
//   const LoadingAnimation = () => (
//     <div className="flex flex-col items-center justify-center w-full h-96">
//       <motion.div 
//         className="flex space-x-4 mb-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {[...Array(5)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="w-6 h-6 rounded-full"
//             style={{ 
//               backgroundColor: `hsl(${i * 60}, 80%, 60%)`,
//             }}
//             animate={{
//               y: [0, -20, 0],
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               delay: i * 0.2,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </motion.div>
      
//       <motion.div 
//         className="text-xl font-medium text-gray-700 text-center max-w-md"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.5 }}
//       >
//         <p className="mb-4">Preparing your personalized skills assessment...</p>
//         <p className="text-sm text-gray-500">
//           We're analyzing the data to provide tailored recommendations for your growth. 
//           This might take a moment as our AI processes the information.
//         </p>
//       </motion.div>
//     </div>
//   );

//   // Function to render each skill section
//   const renderSkillSection = (title: string, skills: any[]) => (
//     <div className="mb-8">
//       <h3 className="text-xl font-bold mb-4 text-indigo-700">{title}</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {skills.map((skill, index) => (
//           <motion.div
//             key={index}
//             className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition-shadow"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <h4 className="font-bold text-gray-800 mb-2">{skill.name}</h4>
//             <p className="text-gray-600 text-sm">{skill.description}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );

//   // Function to render each experience improvement section
//   const renderExperienceSection = (title: string, items: any[]) => (
//     <div className="mb-8">
//       <h3 className="text-xl font-bold mb-4 text-green-700">{title}</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {items.map((item, index) => (
//           <motion.div
//             key={index}
//             className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
//             <p className="text-gray-600 text-sm">{item.description}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           className="text-center mb-10"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
//             Your Personalized Skills Dashboard
//           </h1>
//           <p className="text-xl text-gray-600">
//             Discover skills and opportunities tailored just for you
//           </p>
//         </motion.div>

//         {!user && (
//           <div className="bg-yellow-100 p-4 rounded-md text-yellow-800 mb-6">
//             Please log in to see your personalized recommendations.
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 p-4 rounded-md text-red-800 mb-6">
//             Error: {error}
//             <button 
//               onClick={fetchSkillsData}
//               className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {isLoading ? (
//           <LoadingAnimation />
//         ) : data ? (
//           <motion.div 
//             className="bg-white p-6 rounded-xl shadow-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="mb-10">
//               <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Recommended Skills</h2>
//               {renderSkillSection("Fundamental Skills", data.skills.suggested_skills)}
//               {renderSkillSection("Technical Skills", data.skills.technical_skills)}
//               {renderSkillSection("Soft Skills", data.skills.soft_skills)}
//             </div>
            
//             <div>
//               <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Experience Improvement</h2>
//               {renderExperienceSection("Recommended Projects", data.experience_improvement.projects)}
//               {renderExperienceSection("Valuable Certifications", data.experience_improvement.certifications)}
//               {renderExperienceSection("Internship Opportunities", data.experience_improvement.internships)}
//             </div>
//           </motion.div>
//         ) : user ? (
//           <div className="flex justify-center">
//             <button
//               onClick={fetchSkillsData}
//               className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
//             >
//               Generate Skills Recommendations
//             </button>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default PrepareSkillsPage;

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

  const fetchSkillsData = async () => {
    if (!user || dataFetched) return;
    
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
      setData(result);
      setDataFetched(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // Only fetch data once when user is available and data hasn't been fetched yet
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
              backgroundColor: `hsl(${i * 60}, 80%, 60%)`,
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
        <p className="mb-4">Preparing your personalized skills assessment...</p>
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
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-indigo-700">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displaySkills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-gray-800 mb-2">{skill.name}</h4>
              <p className="text-gray-600 text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-4 text-center">
            <button
              onClick={() => toggleExpand(sectionKey)}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {isExpanded ? 'Show Less' : 'See More'}
            </button>
          </div>
        )}
      </div>
    );
  };

  // Function to render each experience improvement section with "see more" functionality
  const renderExperienceSection = (title: string, items: any[], sectionKey: keyof typeof expandedSections) => {
    const isExpanded = expandedSections[sectionKey];
    const displayItems = isExpanded ? items : items.slice(0, 3);
    const hasMore = items.length > 3;
    
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-green-700">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-4 text-center">
            <button
              onClick={() => toggleExpand(sectionKey)}
              className="px-4 py-2 text-green-600 hover:text-green-800 font-medium"
            >
              {isExpanded ? 'Show Less' : 'See More'}
            </button>
          </div>
        )}
      </div>
    );
  };

  const retryFetch = () => {
    setDataFetched(false);
    setError(null);
    fetchSkillsData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Your Personalized Skills Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Discover skills and opportunities tailored just for you
          </p>
        </motion.div>

        {!user && (
          <div className="bg-yellow-100 p-4 rounded-md text-yellow-800 mb-6">
            Please log in to see your personalized recommendations.
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-4 rounded-md text-red-800 mb-6">
            Error: {error}
            <button 
              onClick={retryFetch}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {isLoading ? (
          <LoadingAnimation />
        ) : data ? (
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Recommended Skills</h2>
              {renderSkillSection("Fundamental Skills", data.skills.suggested_skills, "suggested_skills")}
              {renderSkillSection("Technical Skills", data.skills.technical_skills, "technical_skills")}
              {renderSkillSection("Soft Skills", data.skills.soft_skills, "soft_skills")}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Experience Improvement</h2>
              {renderExperienceSection("Recommended Projects", data.experience_improvement.projects, "projects")}
              {renderExperienceSection("Valuable Certifications", data.experience_improvement.certifications, "certifications")}
              {renderExperienceSection("Internship Opportunities", data.experience_improvement.internships, "internships")}
            </div>
          </motion.div>
        ) : user ? (
          <div className="flex justify-center">
            <button
              onClick={retryFetch}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
            >
              Generate Skills Recommendations
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PrepareSkillsPage;