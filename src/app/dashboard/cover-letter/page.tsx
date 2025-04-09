"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/text-area";

const CoverLetterPage: React.FC = () => {
  const { user } = useUser();
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Networking data
  const [networkingData, setNetworkingData] = useState<any>(null);
  const [isLoadingNetworking, setIsLoadingNetworking] = useState(false);
  const [networkingError, setNetworkingError] = useState<string | null>(null);
  const [lastFetchDate, setLastFetchDate] = useState<string | null>(null);

  // Fetch networking data when component mounts
  useEffect(() => {
    if (user) {
      // Check if networking data exists in localStorage
      const storedData = localStorage.getItem(`networking_data_${user.id}`);
      const storedDate = localStorage.getItem(`networking_date_${user.id}`);
      
      if (storedData && storedDate) {
        try {
          const parsedData = JSON.parse(storedData);
          setNetworkingData(parsedData);
          setLastFetchDate(storedDate);
          
          // Check if the data is from today
          const today = new Date().toDateString();
          if (storedDate !== today) {
            // Data is not from today, but we'll use it while we fetch new data
            fetchNetworkingData();
          }
        } catch (err) {
          // If there's an error parsing the stored data, fetch fresh data
          fetchNetworkingData();
        }
      } else {
        // No data in localStorage, fetch from API
        fetchNetworkingData();
      }
    }
  }, [user]);

  const fetchNetworkingData = async () => {
    if (!user) return;
    
    setIsLoadingNetworking(true);
    setNetworkingError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/networking-prepare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch networking data');
      }
      
      const data = await response.json();
      setNetworkingData(data);
      
      // Store in localStorage with today's date
      const today = new Date().toDateString();
      localStorage.setItem(`networking_data_${user.id}`, JSON.stringify(data));
      localStorage.setItem(`networking_date_${user.id}`, today);
      setLastFetchDate(today);
    } catch (err: any) {
      setNetworkingError(err.message || 'Failed to load networking resources');
    } finally {
      setIsLoadingNetworking(false);
    }
  };

  const generateCoverLetter = async () => {
    if (!user) {
      setError('Please sign in to generate a cover letter');
      return;
    }
    
    if (!companyName || !jobRole || !requiredSkills) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          company_name: companyName,
          job_role: jobRole,
          required_skills: requiredSkills.split(',').map(skill => skill.trim())
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }
      
      const data = await response.json();
      setCoverLetter(data.cover_letter);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
    }
  };

  // Loading animation for cover letter generation
  const LoadingAnimation = () => (
    <div className="flex space-x-2 justify-center my-4">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full bg-blue-500"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Loading animation for networking data
  const NetworkingLoadingAnimation = () => (
    <div className="flex space-x-2 justify-center my-8">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-purple-500"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
            Cover Letter Generator
          </h1>
          <p className="text-xl text-blue-100">
            Create personalized cover letters for your job applications
          </p>
        </motion.div>

        {/* Cover Letter Generator Form */}
        <motion.div 
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700/30 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text pb-2 border-b border-gray-700/30">
            Generate Your Cover Letter
          </h2>
          
          {!user && (
            <div className="bg-yellow-100/90 backdrop-blur p-4 rounded-xl text-yellow-800 mb-6 shadow-lg">
              Please sign in to generate a cover letter.
            </div>
          )}

          {error && (
            <div className="bg-red-100/90 backdrop-blur p-4 rounded-xl text-red-800 mb-6 shadow-lg">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <Label htmlFor="company-name" className="text-gray-200">Company Name</Label>
              <Input 
                id="company-name" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Inc."
                className="bg-white/5 border-gray-700 focus:border-blue-500 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="job-role" className="text-gray-200">Job Role</Label>
              <Input 
                id="job-role" 
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="bg-white/5 border-gray-700 focus:border-blue-500 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="required-skills" className="text-gray-200">Required Skills (comma separated)</Label>
              <Input 
                id="required-skills" 
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                placeholder="e.g. React, TypeScript, Node.js"
                className="bg-white/5 border-gray-700 focus:border-blue-500 text-white"
              />
            </div>
            
            <Button
              onClick={generateCoverLetter}
              disabled={isGenerating || !user}
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/40"
            >
              {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
            </Button>
          </div>

          {isGenerating && <LoadingAnimation />}
          
          {coverLetter && (
            <motion.div 
              className="mt-8 bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-inner border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Your Cover Letter</h3>
                <Button 
                  onClick={handleCopy} 
                  variant="outline"
                  className="border-blue-400 text-blue-300 hover:bg-blue-900/20"
                >
                  Copy
                </Button>
              </div>
              <Textarea 
                value={coverLetter} 
                readOnly 
                className="h-96 bg-white/5 border-gray-700 text-gray-200 font-mono"
              />
            </motion.div>
          )}
        </motion.div>
        
        {/* Networking Resources Section - Now below cover letter */}
        <motion.div 
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text pb-2">
              Networking Resources
            </h2>
            
            {lastFetchDate && (
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">Last updated: {formatDate(lastFetchDate)}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchNetworkingData}
                  disabled={isLoadingNetworking}
                  className="border-blue-400 text-blue-300 hover:bg-blue-900/20 text-xs"
                >
                  {isLoadingNetworking ? 'Refreshing...' : 'Refresh Data'}
                </Button>
              </div>
            )}
          </div>
          
          {networkingError && (
            <div className="bg-red-100/90 backdrop-blur p-4 rounded-xl text-red-800 mb-6 shadow-lg">
              {networkingError}
            </div>
          )}
          
          {isLoadingNetworking && !networkingData ? (
            <NetworkingLoadingAnimation />
          ) : networkingData ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Online Communities */}
              <div>
                <h3 className="text-lg font-bold text-blue-300 mb-3 border-b border-gray-700/30 pb-2">Online Communities</h3>
                <div className="space-y-3">
                  {networkingData.networking.online_communities.slice(0, 3).map((community: any, index: number) => (
                    <motion.div 
                      key={index}
                      className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="font-bold text-white">{community.name}</h4>
                      <p className="text-sm text-gray-400">{community.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Conferences */}
              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-3 border-b border-gray-700/30 pb-2">Conferences</h3>
                <div className="space-y-3">
                  {networkingData.networking.conferences.slice(0, 2).map((conference: any, index: number) => (
                    <motion.div 
                      key={index}
                      className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="font-bold text-white">{conference.name}</h4>
                      <p className="text-sm text-gray-400">{conference.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Mentorship */}
              <div>
                <h3 className="text-lg font-bold text-blue-300 mb-3 border-b border-gray-700/30 pb-2">Mentorship Programs</h3>
                <div className="space-y-3">
                  {networkingData.networking.mentorship.slice(0, 2).map((program: any, index: number) => (
                    <motion.div 
                      key={index}
                      className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="font-bold text-white">{program.program}</h4>
                      <p className="text-sm text-gray-400">{program.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              {user ? "No networking data available" : "Please sign in to view networking resources"}
            </div>
          )}
          
          {networkingData && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-purple-400 text-purple-300 hover:bg-purple-900/20"
                onClick={() => window.open("/networking", "_self")}
              >
                View All Resources
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CoverLetterPage;