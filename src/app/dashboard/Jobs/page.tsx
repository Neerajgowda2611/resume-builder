"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, ExternalLinkIcon, RefreshCwIcon } from 'lucide-react';

interface Job {
  job_position: string;
  job_link: string;
  job_id: string;
  company_name: string;
  company_profile: string;
  job_location: string;
  job_posting_date: string;
  company_logo_url: string;
}

const JobsPage: React.FC = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchDate, setLastFetchDate] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadJobsData();
    }
  }, [user]);

  const loadJobsData = async () => {
    if (!user) return;
    
    // Check localStorage first
    const storedJobs = localStorage.getItem(`jobs_data_${user.id}`);
    const storedDate = localStorage.getItem(`jobs_date_${user.id}`);
    
    // Check if we have stored data and it's from today
    const today = new Date().toDateString();
    
    if (storedJobs && storedDate) {
      try {
        const parsedJobs = JSON.parse(storedJobs);
        setJobs(parsedJobs);
        setIsLoading(false);
        setLastFetchDate(storedDate);
        
        // If data is not from today, fetch fresh data in the background
        if (storedDate !== today) {
          fetchJobs(true);
        }
      } catch (err) {
        // If there's an error parsing stored data, fetch fresh
        fetchJobs();
      }
    } else {
      // No stored data, fetch from API
      fetchJobs();
    }
  };

  const fetchJobs = async (isBackgroundFetch = false) => {
    if (!user) return;
    
    if (!isBackgroundFetch) {
      setIsLoading(true);
    }
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/get-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const data = await response.json();
      setJobs(data);
      
      // Store in localStorage with today's date
      const today = new Date().toDateString();
      localStorage.setItem(`jobs_data_${user.id}`, JSON.stringify(data));
      localStorage.setItem(`jobs_date_${user.id}`, today);
      setLastFetchDate(today);
    } catch (err: any) {
      setError(err.message || 'Failed to load jobs');
      // If this is a background fetch, don't show the error to avoid confusion
      if (isBackgroundFetch) {
        console.error('Background job fetch failed:', err);
        setError(null);
      }
    } finally {
      if (!isBackgroundFetch) {
        setIsLoading(false);
      }
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate how recent a job is
  const getJobFreshness = (dateString: string) => {
    const postDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Loading animation
  const LoadingAnimation = () => (
    <div className="flex space-x-2 justify-center my-12">
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

  // Format the last fetch timestamp
  const formatFetchTime = (dateString: string) => {
    if (!dateString) return '';
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
            Personalized Job Recommendations
          </h1>
          <p className="text-xl text-blue-100">
            Discover job opportunities tailored to your profile
          </p>
        </motion.div>

        {/* Status and Refresh Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="mb-4 sm:mb-0">
            {!user ? (
              <div className="bg-yellow-100/90 backdrop-blur p-4 rounded-xl text-yellow-800 shadow-lg">
                Please sign in to view personalized job recommendations.
              </div>
            ) : error ? (
              <div className="bg-red-100/90 backdrop-blur p-4 rounded-xl text-red-800 shadow-lg">
                {error}
              </div>
            ) : jobs.length > 0 ? (
              <div className="text-gray-300">
                <span className="font-medium">{jobs.length}</span> jobs found based on your profile
              </div>
            ) : null}
          </div>
          
          {user && lastFetchDate && (
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">Last updated: {formatFetchTime(lastFetchDate)}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchJobs()}
                disabled={isLoading}
                className="border-blue-400 text-blue-300 hover:bg-blue-900/20 text-xs flex items-center gap-2"
              >
                <RefreshCwIcon size={14} />
                {isLoading ? 'Refreshing...' : 'Refresh Jobs'}
              </Button>
            </div>
          )}
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <LoadingAnimation />
        ) : jobs.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {jobs.map((job) => (
              <motion.div
                key={job.job_id}
                className="group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-md border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-white/10 mr-4">
                        <img 
                          src={job.company_logo_url} 
                          alt={`${job.company_name} logo`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // If image fails to load, show first letter of company name
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-blue-900 text-white text-xl font-bold">${job.company_name.charAt(0)}</div>`;
                          }} 
                        />
                      </div>
                      <div>
                        <div className="flex items-start justify-between w-full">
                          <h3 className="font-bold text-lg text-white mb-1 leading-tight group-hover:text-blue-400 transition-colors duration-200">
                            {job.job_position}
                          </h3>
                        </div>
                        <a 
                          href={job.company_profile} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
                        >
                          {job.company_name}
                        </a>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPinIcon size={16} className="mr-2 text-gray-500" />
                        {job.job_location}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <CalendarIcon size={16} className="mr-2 text-gray-500" />
                        <span>Posted {getJobFreshness(job.job_posting_date)}</span>
                      </div>
                    </div>
                    
                    <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-4">
                      {formatDate(job.job_posting_date)}
                    </Badge>
                    
                    <a 
                      href={job.job_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full border-blue-400 text-blue-300 hover:bg-blue-500/20 transition-all duration-300 group-hover:border-blue-500 flex items-center justify-center gap-2"
                      >
                        <span>View on LinkedIn</span>
                        <ExternalLinkIcon size={16} />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : !isLoading && !error ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-xl">No job recommendations found</p>
            <p className="mt-2">Try refreshing or check back later</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default JobsPage;