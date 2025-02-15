// src/types/index.ts
export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
  }
  
  export interface Resume {
    id: string;
    userId: string;
    title: string;
    summary: string;
    createdAt: Date;
    updatedAt: Date;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
  }
  
  export interface Education {
    id: string;
    resumeId: string;
    degree: string;
    institution: string;
    yearOfCompletion: number;
  }
  
  export interface Experience {
    id: string;
    resumeId: string;
    jobTitle: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    description: string;
  }
  
  export interface Skill {
    id: string;
    resumeId: string;
    name: string;
    proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  }