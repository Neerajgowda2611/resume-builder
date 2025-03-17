export interface Education {
  id?: string; // Added to track existing records
  degree: string;
  institution: string;
  year_of_start: string; // Changed to match API
  year_of_completion: string; // Changed to match API
}

export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  techStack: string;
  link: string;
}

export interface Language {
  language: string;
  proficiency: string;
}


export interface Certification {
  name: string;
  organization: string;
  year: string;
  credentialId?: string;
  credentialUrl?: string;
}
export interface Skill {
  skill: string | number | readonly string[] | undefined;
  name: string;
  level: string;
}

// export interface ResumeData {
//   name: string;
//   email: string;
//   profilePicture: string;
//   education: Education[];
//   experience: Experience[];
//   certifications: Certification[];
//   skills: Skill[];
//   hobbies: string[];
//   interests: string[];
// }



export interface ResumeData {
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
