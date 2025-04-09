  "use client";

  import React, { useState, useEffect } from "react";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/text-area";
  import { Button } from "@/components/ui/button";
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import {Toaster} from "react-hot-toast";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import {
    CheckCircle,
    AlertCircle,
    Loader2,
    Plus,
    Trash2,
    Save,
    X,
  } from "lucide-react";
  import { useAuth } from "@clerk/nextjs";

  // Interfaces remain the same as your original code
  export interface Education {
    id?: string;
    degree: string;
    institution: string;
    year_of_start: string;
    year_of_completion: string;
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
    // Add a resume ID field for tracking updates
    resumeId?: string;
  }

  // Proficiency levels for languages and skills
  const proficiencyLevels = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Fluent",
    "Native",
  ];
  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const ResumeForm: React.FC = () => {
    // Get userId from Clerk authentication
    const { userId } = useAuth();

    const [formData, setFormData] = useState<ResumeData>({
      name: "",
      email: "",
      profilePicture: "",
      aboutMe: "",
      linkedIn: "",
      github: "",
      education: [
        {
          degree: "",
          institution: "",
          year_of_start: "",
          year_of_completion: "",
        },
      ],
      experience: [
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      projects: [
        {
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          techStack: "",
          link: "",
        },
      ],
      certifications: [{ name: "", organization: "", year: "" }],
      skills: [{ skill: "", name: "", level: "Intermediate" }],
      languages: [{ language: "", proficiency: "Intermediate" }],
      hobbies: [""],
      aspiringRoles: [""],
      aspiringCompanies: [""],
    });

    // Track if a resume already exists for this user
    const [resumeExists, setResumeExists] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    // Message to show on success (create vs update)
    const [successMessage, setSuccessMessage] = useState<string>(
      "Resume information saved successfully!"
    );

    useEffect(() => {
      const fetchResumeData = async () => {
        if (!userId) {
          console.log("No user ID available, user may not be authenticated");
          return;
        }

        setLoading(true);
        setError(null);
        console.log("User ID from Clerk:", userId);

        try {
          const response = await fetch(
            `http://localhost:8000/api/resume?user_id=${userId}`
          );

          if (!response.ok) {
            if (response.status === 404) {
              // User not found, which is fine - we'll start with an empty form
              console.log(
                "No existing resume data found, starting with empty form"
              );
              setResumeExists(false);
              return;
            }
            throw new Error(`Error fetching data: ${response.status}`);
          }

          const data = await response.json();
          setFormData(data);
          // If we got data back, the resume exists
          setResumeExists(true);
        } catch (err) {
          console.error("Failed to fetch resume data:", err);
          setError("Failed to load resume data. Please try again later.");
          setResumeExists(false);
        } finally {
          setLoading(false);
        }
      };

      fetchResumeData();
    }, [userId]);

    // Generic handlers for simple fields
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    // Handler for arrays of simple strings (hobbies, aspiringRoles, etc.)
    const handleArrayChange = (
      arrayName: "hobbies" | "aspiringRoles" | "aspiringCompanies",
      index: number,
      value: string
    ) => {
      setFormData((prev) => {
        const newArray = [...prev[arrayName]];
        newArray[index] = value;
        return {
          ...prev,
          [arrayName]: newArray,
        };
      });
    };

    // Add item to an array of strings
    const addStringItem = (
      arrayName: "hobbies" | "aspiringRoles" | "aspiringCompanies"
    ) => {
      setFormData((prev) => ({
        ...prev,
        [arrayName]: [...prev[arrayName], ""],
      }));
    };

    // Remove item from an array of strings
    const removeStringItem = (
      arrayName: "hobbies" | "aspiringRoles" | "aspiringCompanies",
      index: number
    ) => {
      setFormData((prev) => {
        const newArray = [...prev[arrayName]];
        newArray.splice(index, 1);
        return {
          ...prev,
          [arrayName]: newArray,
        };
      });
    };

    // Generic handler for complex objects in arrays
    const handleObjectChange = <T extends keyof ResumeData>(
      arrayName: T,
      index: number,
      field: string,
      value: string
    ) => {
      setFormData((prev) => {
        const array = [...(prev[arrayName] as Array<unknown>)];
        array[index] = { ...(array[index] as object), [field]: value };
        return {
          ...prev,
          [arrayName]: array,
        };
      });
    };

    // Add item to an array of objects
    const addObjectToArray = <T extends keyof ResumeData>(
      arrayName: T,
      emptyObject: unknown
    ) => {
      setFormData((prev) => {
        const array = Array.isArray(prev[arrayName]) ? [...prev[arrayName]] : [];
        return {
          ...prev,
          [arrayName]: [...array, emptyObject],
        };
      });
    };

    // Remove item from an array of objects
    const removeObjectFromArray = <T extends keyof ResumeData>(
      arrayName: T,
      index: number
    ) => {
      setFormData((prev) => {
        const array = Array.isArray(prev[arrayName]) ? [...prev[arrayName]] : [];
        array.splice(index, 1);
        return {
          ...prev,
          [arrayName]: array,
        };
      });
    };
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Submitting form data::::::::::::::::::::::::::", formData);
    
      if (!userId) {
        setError("User not authenticated. Please log in.");
        return;
      }
    
      setLoading(true);
      setError(null);
      setSuccess(false);
    
      try {
        const method = resumeExists ? "PATCH" : "POST";
    
        const response = await fetch(`http://localhost:8000/api/resume?user_id=${userId}`, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          throw new Error(`Error ${resumeExists ? "updating" : "submitting"} data: ${response.status}`);
        }
    
        console.log("Response received:", response);
    
        const updatedData = await response.json();
        console.log("Updated data received:", updatedData);
    
        // ✅ Ensure `updatedData` has the required structure
        if (!updatedData || typeof updatedData !== "object") {
          throw new Error("Invalid response data received");
        }
    
        // ✅ Merge `updatedData` with existing form data to avoid losing fields
        setFormData((prevData) => ({
          ...prevData,
          ...updatedData, // Update only the new fields
        }));
    
        setSuccessMessage(resumeExists ? "Resume updated successfully!" : "Resume created successfully!");
        setSuccess(true);
    
        if (!resumeExists) {
          setResumeExists(true);
        }
    
        // ✅ Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        console.error(`Failed to ${resumeExists ? "update" : "create"} resume data:`, err);
        setError(`Failed to ${resumeExists ? "update" : "create"} resume data. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    
    // Add a function to handle deleting the entire resume
    const handleDeleteResume = async () => {
      if (!userId || !resumeExists) {
        setError("No resume data to delete or user not authenticated.");
        return;
      }

      if (
        !window.confirm(
          "Are you sure you want to delete your entire resume? This action cannot be undone."
        )
      ) {
        return;
      }

      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await fetch(
          `http://localhost:8000/api/resume?user_id=${userId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`Error deleting data: ${response.status}`);
        }

        // Reset the form after successful deletion
        setFormData({
          name: "",
          email: "",
          profilePicture: "",
          aboutMe: "",
          linkedIn: "",
          github: "",
          education: [
            {
              degree: "",
              institution: "",
              year_of_start: "",
              year_of_completion: "",
            },
          ],
          experience: [
            {
              jobTitle: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ],
          projects: [
            {
              name: "",
              description: "",
              startDate: "",
              endDate: "",
              techStack: "",
              link: "",
            },
          ],
          certifications: [{ name: "", organization: "", year: "" }],
          skills: [{ skill: "", name: "", level: "Intermediate" }],
          languages: [{ language: "", proficiency: "Intermediate" }],
          hobbies: [""],
          aspiringRoles: [""],
          aspiringCompanies: [""],
        });

        setResumeExists(false);
        setSuccessMessage("Resume deleted successfully!");
        setSuccess(true);
      } catch (err) {
        console.error("Failed to delete resume data:", err);
        setError("Failed to delete resume data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="container mx-auto py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">
              Complete Resume Information
            </CardTitle>
            <CardDescription>
              Fill in your details below to {resumeExists ? "update" : "create"}{" "}
              your resume. You can add or remove sections as needed.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!userId && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authentication Required</AlertTitle>
                <AlertDescription>
                  Please sign in to create or edit your resume.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Accordion type="multiple" defaultValue={["personal-info"]}>
                {/* All accordion sections remain the same as your original code */}
                {/* Personal Information Section */}
                <AccordionItem value="personal-info">
                  <AccordionTrigger className="text-xl font-medium">
                    Personal Information
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john.doe@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profilePicture">Profile Picture URL</Label>
                      <Input
                        id="profilePicture"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleChange}
                        placeholder="https://example.com/your-photo.jpg"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                        <Input
                          id="linkedIn"
                          name="linkedIn"
                          value={formData.linkedIn}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/johndoe"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub Profile</Label>
                        <Input
                          id="github"
                          name="github"
                          value={formData.github}
                          onChange={handleChange}
                          placeholder="https://github.com/johndoe"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aboutMe">About Me</Label>
                      <Textarea
                        id="aboutMe"
                        name="aboutMe"
                        value={formData.aboutMe}
                        onChange={handleChange}
                        placeholder="Write a brief summary about yourself..."
                        className="min-h-32"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* Education Section */}
                <AccordionItem value="education-section">
                  <AccordionTrigger className="text-xl font-medium">
                    Education
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    {formData.education.map((edu, index) => (
                      <div
                        key={`edu-${index}`}
                        className="p-4 border rounded-lg space-y-4 relative"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            removeObjectFromArray("education", index)
                          }
                          disabled={formData.education.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`edu-degree-${index}`}>
                              Degree/Certification
                            </Label>
                            <Input
                              id={`edu-degree-${index}`}
                              value={edu.degree}
                              onChange={(e) =>
                                handleObjectChange(
                                  "education",
                                  index,
                                  "degree",
                                  e.target.value
                                )
                              }
                              placeholder="Bachelor of Science in Computer Science"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`edu-institution-${index}`}>
                              Institution
                            </Label>
                            <Input
                              id={`edu-institution-${index}`}
                              value={edu.institution}
                              onChange={(e) =>
                                handleObjectChange(
                                  "education",
                                  index,
                                  "institution",
                                  e.target.value
                                )
                              }
                              placeholder="University of Technology"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`edu-year-start-${index}`}>
                              Year of Start
                            </Label>
                            <Input
                              id={`edu-year-start-${index}`}
                              value={edu.year_of_start}
                              onChange={(e) =>
                                handleObjectChange(
                                  "education",
                                  index,
                                  "year_of_start",
                                  e.target.value
                                )
                              }
                              placeholder="2018"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`edu-year-end-${index}`}>
                              Year of Completion
                            </Label>
                            <Input
                              id={`edu-year-end-${index}`}
                              value={edu.year_of_completion}
                              onChange={(e) =>
                                handleObjectChange(
                                  "education",
                                  index,
                                  "year_of_completion",
                                  e.target.value
                                )
                              }
                              placeholder="2022"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        addObjectToArray("education", {
                          degree: "",
                          institution: "",
                          year_of_start: "",
                          year_of_completion: "",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Education
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Experience Section */}
                <AccordionItem value="experience-section">
                  <AccordionTrigger className="text-xl font-medium">
                    Work Experience
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    {formData.experience.map((exp, index) => (
                      <div
                        key={`exp-${index}`}
                        className="p-4 border rounded-lg space-y-4 relative"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            removeObjectFromArray("experience", index)
                          }
                          disabled={formData.experience.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`exp-title-${index}`}>
                              Job Title
                            </Label>
                            <Input
                              id={`exp-title-${index}`}
                              value={exp.jobTitle}
                              onChange={(e) =>
                                handleObjectChange(
                                  "experience",
                                  index,
                                  "jobTitle",
                                  e.target.value
                                )
                              }
                              placeholder="Software Engineer"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`exp-company-${index}`}>
                              Company
                            </Label>
                            <Input
                              id={`exp-company-${index}`}
                              value={exp.company}
                              onChange={(e) =>
                                handleObjectChange(
                                  "experience",
                                  index,
                                  "company",
                                  e.target.value
                                )
                              }
                              placeholder="Tech Solutions Inc."
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`exp-start-${index}`}>
                              Start Date
                            </Label>
                            <Input
                              id={`exp-start-${index}`}
                              value={exp.startDate}
                              onChange={(e) =>
                                handleObjectChange(
                                  "experience",
                                  index,
                                  "startdate",
                                  e.target.value
                                )
                              }
                              placeholder="Jan 2020"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                            <Input
                              id={`exp-end-${index}`}
                              value={exp.endDate}
                              onChange={(e) =>
                                handleObjectChange(
                                  "experience",
                                  index,
                                  "endDate",
                                  e.target.value
                                )
                              }
                              placeholder="Present"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`exp-description-${index}`}>
                            Description
                          </Label>
                          <Textarea
                            id={`exp-description-${index}`}
                            value={exp.description}
                            onChange={(e) =>
                              handleObjectChange(
                                "experience",
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Describe your responsibilities and achievements..."
                            className="min-h-24"
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        addObjectToArray("experience", {
                          jobTitle: "",
                          company: "",
                          startDate: "",
                          endDate: "",
                          description: "",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Experience
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                {/* Projects Section */}
                <AccordionItem value="projects-section">
                  <AccordionTrigger className="text-xl font-medium">
                    Projects
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    {formData.projects.map((project, index) => (
                      <div
                        key={`project-${index}`}
                        className="p-4 border rounded-lg space-y-4 relative"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeObjectFromArray("projects", index)}
                          disabled={formData.projects.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`project-name-${index}`}>
                              Project Name
                            </Label>
                            <Input
                              id={`project-name-${index}`}
                              value={project.name}
                              onChange={(e) =>
                                handleObjectChange(
                                  "projects",
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="E-commerce Platform"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`project-link-${index}`}>
                              Project Link
                            </Label>
                            <Input
                              id={`project-link-${index}`}
                              value={project.link}
                              onChange={(e) =>
                                handleObjectChange(
                                  "projects",
                                  index,
                                  "link",
                                  e.target.value
                                )
                              }
                              placeholder="https://github.com/username/project"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`project-start-${index}`}>
                              Start Date
                            </Label>
                            <Input
                              id={`project-start-${index}`}
                              value={project.startDate}
                              onChange={(e) =>
                                handleObjectChange(
                                  "projects",
                                  index,
                                  "startdate",
                                  e.target.value
                                )
                              }
                              placeholder="Jan 2021"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`project-end-${index}`}>
                              End Date
                            </Label>
                            <Input
                              id={`project-end-${index}`}
                              value={project.endDate}
                              onChange={(e) =>
                                handleObjectChange(
                                  "projects",
                                  index,
                                  "endDate",
                                  e.target.value
                                )
                              }
                              placeholder="Mar 2021"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`project-tech-${index}`}>
                            Tech Stack
                          </Label>
                          <Input
                            id={`project-tech-${index}`}
                            value={project.techStack}
                            onChange={(e) =>
                              handleObjectChange(
                                "projects",
                                index,
                                "techStack",
                                e.target.value
                              )
                            }
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`project-description-${index}`}>
                            Description
                          </Label>
                          <Textarea
                            id={`project-description-${index}`}
                            value={project.description}
                            onChange={(e) =>
                              handleObjectChange(
                                "projects",
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Describe the project, your role, and its impact..."
                            className="min-h-20"
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        addObjectToArray("projects", {
                          name: "",
                          description: "",
                          startDate: "",
                          endDate: "",
                          techStack: "",
                          link: "",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Project
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                {/* Skills Section */}
                <AccordionItem value="skills-section">
                  <AccordionTrigger className="text-xl font-medium">
                    Skills
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    {formData.skills.map((skill, index) => (
                      <div
                        key={`skill-${index}`}
                        className="p-4 border rounded-lg space-y-4 relative"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeObjectFromArray("skills", index)}
                          disabled={formData.skills.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`skill-name-${index}`}>
                              Skill Name
                            </Label>
                            <Input
                              id={`skill-name-${index}`}
                              value={skill.name}
                              onChange={(e) =>
                                handleObjectChange(
                                  "skills",
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="JavaScript"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`skill-level-${index}`}>
                              Proficiency Level
                            </Label>
                            <Select
                              value={skill.level}
                              onValueChange={(value) =>
                                handleObjectChange(
                                  "skills",
                                  index,
                                  "level",
                                  value
                                )
                              }
                            >
                              <SelectTrigger id={`skill-level-${index}`}>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                {skillLevels.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        addObjectToArray("skills", {
                          skill: "",
                          name: "",
                          level: "Intermediate",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Skill
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                {/* Languages Section */}
                <AccordionItem value="languages-section">
                  <AccordionTrigger className="text-xl font-medium">
                    Languages
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    {formData.languages.map((lang, index) => (
                      <div
                        key={`lang-${index}`}
                        className="p-4 border rounded-lg space-y-4 relative"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            removeObjectFromArray("languages", index)
                          }
                          disabled={formData.languages.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`lang-name-${index}`}>Language</Label>
                            <Input
                              id={`lang-name-${index}`}
                              value={lang.language}
                              onChange={(e) =>
                                handleObjectChange(
                                  "languages",
                                  index,
                                  "language",
                                  e.target.value
                                )
                              }
                              placeholder="English"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`lang-proficiency-${index}`}>
                              Proficiency
                            </Label>
                            <Select
                              value={lang.proficiency}
                              onValueChange={(value) =>
                                handleObjectChange(
                                  "languages",
                                  index,
                                  "proficiency",
                                  value
                                )
                              }
                            >
                              <SelectTrigger id={`lang-proficiency-${index}`}>
                                <SelectValue placeholder="Select proficiency" />
                              </SelectTrigger>
                              <SelectContent>
                                {proficiencyLevels.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        addObjectToArray("languages", {
                          language: "",
                          proficiency: "Intermediate",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Language
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                {/* Certifications Section */}
                <AccordionItem value="certifications-section">
                  <AccordionTrigger className="text-xl font-medium">
                    Certifications
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    {formData.certifications.map((cert, index) => (
                      <div
                        key={`cert-${index}`}
                        className="p-4 border rounded-lg space-y-4 relative"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            removeObjectFromArray("certifications", index)
                          }
                          disabled={formData.certifications.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`cert-name-${index}`}>
                              Certification Name
                            </Label>
                            <Input
                              id={`cert-name-${index}`}
                              value={cert.name}
                              onChange={(e) =>
                                handleObjectChange(
                                  "certifications",
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="AWS Certified Developer"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`cert-org-${index}`}>
                              Issuing Organization
                            </Label>
                            <Input
                              id={`cert-org-${index}`}
                              value={cert.organization}
                              onChange={(e) =>
                                handleObjectChange(
                                  "certifications",
                                  index,
                                  "organization",
                                  e.target.value
                                )
                              }
                              placeholder="Amazon Web Services"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`cert-year-${index}`}>Year</Label>
                            <Input
                              id={`cert-year-${index}`}
                              value={cert.year}
                              onChange={(e) =>
                                handleObjectChange(
                                  "certifications",
                                  index,
                                  "year",
                                  e.target.value
                                )
                              }
                              placeholder="2022"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`cert-id-${index}`}>
                              Credential ID
                            </Label>
                            <Input
                              id={`cert-id-${index}`}
                              value={cert.credentialId || ""}
                              onChange={(e) =>
                                handleObjectChange(
                                  "certifications",
                                  index,
                                  "credentialId",
                                  e.target.value
                                )
                              }
                              placeholder="ABC123DEF456"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`cert-url-${index}`}>
                              Credential URL
                            </Label>
                            <Input
                              id={`cert-url-${index}`}
                              value={cert.credentialUrl || ""}
                              onChange={(e) =>
                                handleObjectChange(
                                  "certifications",
                                  index,
                                  "credentialUrl",
                                  e.target.value
                                )
                              }
                              placeholder="https://credential.verify.com/abc123"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        addObjectToArray("certifications", {
                          name: "",
                          organization: "",
                          year: "",
                          credentialId:"",
                          credentialUrl: "",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Certification
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                {/* Hobbies Section */}
                <AccordionItem value="hobbies-section">
                  <AccordionTrigger className="text-xl font-medium">
                    Hobbies & Interests
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    {formData.hobbies.map((hobby, index) => (
                      <div
                        key={`hobby-${index}`}
                        className="flex items-center space-x-2"
                      >
                        <Input
                          value={hobby}
                          onChange={(e) =>
                            handleArrayChange("hobbies", index, e.target.value)
                          }
                          placeholder="Photography"
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStringItem("hobbies", index)}
                          disabled={formData.hobbies.length === 1}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => addStringItem("hobbies")}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Hobby
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                {/* Career Goals Section */}
                <AccordionItem value="career-goals-section">
                  <AccordionTrigger className="text-xl font-medium">
                    Career Goals
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Aspiring Roles</h3>
                      {formData.aspiringRoles.map((role, index) => (
                        <div
                          key={`role-${index}`}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={role}
                            onChange={(e) =>
                              handleArrayChange(
                                "aspiringRoles",
                                index,
                                e.target.value
                              )
                            }
                            placeholder="Senior Developer"
                            className="flex-grow"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeStringItem("aspiringRoles", index)
                            }
                            disabled={formData.aspiringRoles.length === 1}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => addStringItem("aspiringRoles")}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Role
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Target Companies</h3>
                      {formData.aspiringCompanies.map((company, index) => (
                        <div
                          key={`company-${index}`}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={company}
                            onChange={(e) =>
                              handleArrayChange(
                                "aspiringCompanies",
                                index,
                                e.target.value
                              )
                            }
                            placeholder="Google"
                            className="flex-grow"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeStringItem("aspiringCompanies", index)
                            }
                            disabled={formData.aspiringCompanies.length === 1}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => addStringItem("aspiringCompanies")}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Company
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <CardFooter className="flex justify-between space-x-4 px-0">
                {/* Add a Delete button that only shows when a resume exists */}
                {resumeExists && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDeleteResume}
                    disabled={loading || !userId}
                    className="min-w-32"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Resume
                      </>
                    )}
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={loading || !userId}
                  className="min-w-32 ml-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {resumeExists ? "Updating..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {resumeExists ? "Update Resume" : "Save Resume"}
                    </>
                  )}
                </Button>
                
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  export default ResumeForm;
