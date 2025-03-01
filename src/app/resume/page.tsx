"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, ArrowRight, ArrowLeft, Save, Check } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";

import {
  ResumeData,
  Education,
  Experience,
  Project,
  Skill,
  Language,
} from "@/types/index";

// Sections enum for tracking current section
const Sections = {
  PERSONAL: 0,
  EDUCATION: 1,
  EXPERIENCE: 2,
  CERTIFICATIONS: 3,
  PROJECTS: 4,
  SKILLS: 5,
  LANGUAGES: 6,
  HOBBIES: 7,
  ASPIRING_ROLES: 8,
  ASPIRING_COMPANIES: 9,
};

export default function ResumeForm() {
  const { user } = useUser();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(Sections.PERSONAL);
  const [isLoading, setIsLoading] = useState(false);
  const [savedSections, setSavedSections] = useState<{ [key: number]: boolean }>({});

  const [resume, setResume] = useState<ResumeData>({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    profilePicture: user?.imageUrl || "",
    aboutMe: "",
    linkedIn: "",
    github: "",
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        year: "",
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
    skills: [
      {
        skill: "",
        level: "Beginner",
        name: "",
      },
    ],
    languages: [{ language: "", proficiency: "Basic" }],
    hobbies: [""],
    aspiringRoles: [""],
    aspiringCompanies: [""],
  });

  // Load existing resume data when component mounts
  useEffect(() => {
    if (user?.id) {
      fetchResumeData();
    }
  }, [user]);

  const fetchResumeData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/users/${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setResume(data);

        // Mark all sections as saved
        const saved: { [key: number]: boolean } = {};
        Object.keys(Sections).forEach((section) => {
          if (typeof Sections[section as keyof typeof Sections] === "number") {
            saved[Sections[section as keyof typeof Sections]] = true;
          }
        });
        setSavedSections(saved);
      }
    } catch (error) {
      console.error("Error fetching resume data:", error);
    }
  };

  const handleArrayChange = <T extends keyof ResumeData>(
    field: T,
    index: number,
    value: string | Partial<ResumeData[T][number]>,
    subField?: keyof ResumeData[T][number]
  ) => {
    setResume((prev) => {
      // Ensure the field is an array before modifying
      if (!Array.isArray(prev[field])) return prev;

      // Create a shallow copy of the existing array
      const newArray = [...(prev[field] as ResumeData[T])];

      if (subField) {
        // Ensure the element exists before modifying
        if (index < newArray.length) {
          (newArray[index] as ResumeData[T][number])[subField] =
            value as ResumeData[T][number][typeof subField];
        }
      } else {
        newArray[index] = value as ResumeData[T][number];
      }

      return { ...prev, [field]: newArray };
    });

    // Mark section as unsaved when changes are made
    setSavedSections((prev) => ({ ...prev, [currentSection]: false }));
  };

  const addItem = <T extends keyof ResumeData>(field: T) => {
    setResume((prev) => {
      // Ensure the field is an array before modifying
      if (!Array.isArray(prev[field])) return prev;

      // Get an empty object of the correct type
      const emptyItem: ResumeData[T][number] = getEmptyItem(
        field
      ) as ResumeData[T][number];

      // Create a new array with the new item added
      const newArray = [...(prev[field] as ResumeData[T]), emptyItem];

      return { ...prev, [field]: newArray };
    });

    // Mark section as unsaved when changes are made
    setSavedSections((prev) => ({ ...prev, [currentSection]: false }));
  };

  const removeItem = <T extends keyof ResumeData>(field: T, index: number) => {
    setResume((prev) => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });

    // Mark section as unsaved when changes are made
    setSavedSections((prev) => ({ ...prev, [currentSection]: false }));
  };

  const getEmptyItem = (field: keyof ResumeData) => {
    switch (field) {
      case "education":
        return {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        } as unknown as Education;
      case "experience":
        return {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        } as Experience;
      case "projects":
        return {
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          techStack: "",
          link: "",
        } as Project;
      case "skills":
        return { skill: "", level: "Beginner" } as unknown as Skill;
      case "languages":
        return { language: "", proficiency: "Basic" } as Language;
      case "hobbies":
      case "aspiringRoles":
      case "aspiringCompanies":
        return "";
      default:
        return {};
    }
  };

  // Helper function to get section data for the current section
  const getCurrentSectionData = () => {
    switch (currentSection) {
      case Sections.PERSONAL:
        return {
          name: resume.name,
          email: resume.email,
          profilePicture: resume.profilePicture,
          aboutMe: resume.aboutMe,
          linkedIn: resume.linkedIn,
          github: resume.github,
        };
      case Sections.EDUCATION:
        return { education: resume.education };
      case Sections.EXPERIENCE:
        return { experience: resume.experience };
      case Sections.CERTIFICATIONS:
        return { certifications: resume.certifications };
      case Sections.PROJECTS:
        return { projects: resume.projects };
      case Sections.SKILLS:
        return { skills: resume.skills };
      case Sections.LANGUAGES:
        return { languages: resume.languages };
      case Sections.HOBBIES:
        return { hobbies: resume.hobbies };
      case Sections.ASPIRING_ROLES:
        return { aspiringRoles: resume.aspiringRoles };
      case Sections.ASPIRING_COMPANIES:
        return { aspiringCompanies: resume.aspiringCompanies };
      default:
        return {};
    }
  };

  // Get section name for API endpoint
  const getSectionEndpoint = () => {
    switch (currentSection) {
      case Sections.PERSONAL:
        return "personal";
      case Sections.EDUCATION:
        return "education";
      case Sections.EXPERIENCE:
        return "experience";
      case Sections.CERTIFICATIONS:
        return "certifications";
      case Sections.PROJECTS:
        return "projects";
      case Sections.SKILLS:
        return "skills";
      case Sections.LANGUAGES:
        return "languages";
      case Sections.HOBBIES:
        return "hobbies";
      case Sections.ASPIRING_ROLES:
        return "aspiring-roles";
      case Sections.ASPIRING_COMPANIES:
        return "aspiring-companies";
      default:
        return "";
    }
  };

  // Save the current section
  const saveCurrentSection = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "User ID is missing. Please make sure you're logged in.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const sectionData = getCurrentSectionData();
      const endpoint = getSectionEndpoint();

      const response = await fetch(`http://localhost:8000/users/${user.id}/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionData),
      });

      if (response.ok) {
        setSavedSections((prev) => ({ ...prev, [currentSection]: true }));
        toast({
          title: "Success",
          description: "Section saved successfully!",
          variant: "default",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save section");
      }
    } catch (error) {
      console.error("Error saving section:", error);
      toast({
        title: "Error",
        description: error || "Failed to save section",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle moving to next section with saving
  const handleNext = async () => {
    if (!savedSections[currentSection]) {
      await saveCurrentSection();
    }
    setCurrentSection((prev) =>
      Math.min(prev + 1, Sections.ASPIRING_COMPANIES)
    );
  };

  // Handle moving to previous section
  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, Sections.PERSONAL));
  };

  // Handle final submit
  const handleSubmit = async () => {
    if (!savedSections[currentSection]) {
      await saveCurrentSection();
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/resume/${user?.id}/finalize`, {
        method: "POST",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Resume completed and finalized successfully!",
          variant: "default",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to finalize resume");
      }
    } catch (error) {
      console.error("Error finalizing resume:", error);
      toast({
        title: "Error",
        description: error || "Failed to finalize resume",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update personal info fields
  const handlePersonalInfoChange = (field: string, value: string) => {
    setResume((prev) => ({ ...prev, [field]: value }));
    setSavedSections((prev) => ({ ...prev, [currentSection]: false }));
  };

  // Render the current section based on the currentSection state
  const renderCurrentSection = () => {
    switch (currentSection) {
      case Sections.PERSONAL:
        return (
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">
                Personal Information - Step 1
              </h2>
              <div className="grid gap-4">
                <Input
                  placeholder="Full Name"
                  value={resume.name}
                  onChange={(e) =>
                    handlePersonalInfoChange("name", e.target.value)
                  }
                />
                <Input
                  placeholder="Email"
                  value={resume.email}
                  readOnly
                  className="bg-gray-50"
                />
                <Input
                  placeholder="LinkedIn Profile URL"
                  value={resume.linkedIn}
                  onChange={(e) =>
                    handlePersonalInfoChange("linkedIn", e.target.value)
                  }
                />
                <Input
                  placeholder="GitHub Profile URL"
                  value={resume.github}
                  onChange={(e) =>
                    handlePersonalInfoChange("github", e.target.value)
                  }
                />
                <Textarea
                  placeholder="About Me"
                  value={resume.aboutMe}
                  onChange={(e) =>
                    handlePersonalInfoChange("aboutMe", e.target.value)
                  }
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        );

      case Sections.EDUCATION:
        return (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Education - Step 2</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem("education")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Education
                </Button>
              </div>
              {resume.education.map((edu, index) => (
                <div key={index} className="p-4 border rounded-lg mb-4">
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem("education", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    <Input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          e.target.value,
                          "degree"
                        )
                      }
                    />
                    <Input
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          e.target.value,
                          "institution"
                        )
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="date"
                        placeholder="Start Date"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            index,
                            e.target.value,
                            "startDate"
                          )
                        }
                      />
                      <Input
                        type="date"
                        placeholder="End Date"
                        value={edu.endDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            index,
                            e.target.value,
                            "endDate"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case Sections.EXPERIENCE:
        return (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Work Experience - Step 3</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem("experience")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Experience
                </Button>
              </div>
              {resume.experience.map((exp, index) => (
                <div key={index} className="p-4 border rounded-lg mb-4">
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem("experience", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    <Input
                      placeholder="Job Title"
                      value={exp.jobTitle}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          e.target.value,
                          "jobTitle"
                        )
                      }
                    />
                    <Input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          e.target.value,
                          "company"
                        )
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="date"
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            index,
                            e.target.value,
                            "startDate"
                          )
                        }
                      />
                      <Input
                        type="date"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            index,
                            e.target.value,
                            "endDate"
                          )
                        }
                      />
                    </div>
                    <Textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          e.target.value,
                          "description"
                        )
                      }
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case Sections.CERTIFICATIONS:
        return (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Certifications - Step 4</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem("certifications")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Certification
                </Button>
              </div>
              {resume.certifications.map((cert, index) => (
                <div key={index} className="p-4 border rounded-lg mb-4">
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem("certifications", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    <Input
                      placeholder="Certification Name"
                      value={cert.name}
                      onChange={(e) =>
                        handleArrayChange(
                          "certifications",
                          index,
                          e.target.value,
                          "name"
                        )
                      }
                    />
                    <Input
                      placeholder="Issuing Organization"
                      value={cert.organization}
                      onChange={(e) =>
                        handleArrayChange(
                          "certifications",
                          index,
                          e.target.value,
                          "organization"
                        )
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="date"
                        placeholder="Completion Date"
                        value={cert.year}
                        onChange={(e) =>
                          handleArrayChange(
                            "certifications",
                            index,
                            e.target.value,
                            "year"
                          )
                        }
                      />
                      <Input
                        placeholder="Credential ID (Optional)"
                        value={cert.credentialId || ""}
                        onChange={(e) =>
                          handleArrayChange(
                            "certifications",
                            index,
                            e.target.value,
                            "credentialId"
                          )
                        }
                      />
                    </div>
                    <Input
                      placeholder="Credential URL (Optional)"
                      value={cert.credentialUrl || ""}
                      onChange={(e) =>
                        handleArrayChange(
                          "certifications",
                          index,
                          e.target.value,
                          "credentialUrl"
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case Sections.PROJECTS:
        return (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Projects - Step 5</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem("projects")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
              </div>
              {resume.projects.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg mb-4">
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem("projects", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    <Input
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) =>
                        handleArrayChange(
                          "projects",
                          index,
                          e.target.value,
                          "name"
                        )
                      }
                    />
                    <Textarea
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) =>
                        handleArrayChange(
                          "projects",
                          index,
                          e.target.value,
                          "description"
                        )
                      }
                      className="min-h-[100px]"
                    />
                    <Input
                      placeholder="Tech Stack"
                      value={project.techStack}
                      onChange={(e) =>
                        handleArrayChange(
                          "projects",
                          index,
                          e.target.value,
                          "techStack"
                        )
                      }
                    />
                    <Input
                      placeholder="Project Link"
                      value={project.link}
                      onChange={(e) =>
                        handleArrayChange(
                          "projects",
                          index,
                          e.target.value,
                          "link"
                        )
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="date"
                        placeholder="Start Date"
                        value={project.startDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            index,
                            e.target.value,
                            "startDate"
                          )
                        }
                      />
                      <Input
                        type="date"
                        placeholder="End Date"
                        value={project.endDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            index,
                            e.target.value,
                            "endDate"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case Sections.SKILLS:
        return (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Skills - Step 6</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem("skills")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Skill
                </Button>
              </div>
              {resume.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <Input
                    placeholder="Skill"
                    value={skill.skill}
                    onChange={(e) =>
                      handleArrayChange(
                        "skills",
                        index,
                        e.target.value,
                        "skill"
                      )
                    }
                  />
                  <Select
                    value={skill.level}
                    onValueChange={(value) =>
                      handleArrayChange("skills", index, value, "level")
                    }
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem("skills", index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case Sections.LANGUAGES:
        return (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Languages - Step 7</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem("languages")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Language
                </Button>
              </div>
              {resume.languages?.map((lang, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <Input
                    placeholder="Language"
                    value={lang.language}
                    onChange={(e) =>
                      handleArrayChange(
                        "languages",
                        index,
                        e.target.value,
                        "language"
                      )
                    }
                  />
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value: string | Partial<Language>) =>
                      handleArrayChange(
                        "languages",
                        index,
                        value,
                        "proficiency"
                      )
                    }
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Fluent">Fluent</SelectItem>
                      <SelectItem value="Native">Native</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem("languages", index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case Sections.HOBBIES:
        return (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Hobbies - Step 8</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem("hobbies")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Hobby
                </Button>
              </div>
              {resume.hobbies.map((hobby, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <Input
                    placeholder="Hobby"
                    value={hobby}
                    onChange={(e) =>
                      handleArrayChange("hobbies", index, e.target.value)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem("hobbies", index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case Sections.ASPIRING_ROLES:
        return (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Aspiring Roles - Step 9</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem("aspiringRoles")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Role
                </Button>
              </div>
              {resume.aspiringRoles.map((role, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <Input
                    placeholder="Desired Role"
                    value={role}
                    onChange={(e) =>
                      handleArrayChange("aspiringRoles", index, e.target.value)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem("aspiringRoles", index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case Sections.ASPIRING_COMPANIES:
        return (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Target Companies - Step 10</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem("aspiringCompanies")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Company
                </Button>
              </div>
              {resume.aspiringCompanies.map((company, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <Input
                    placeholder="Target Company"
                    value={company}
                    onChange={(e) =>
                      handleArrayChange(
                        "aspiringCompanies",
                        index,
                        e.target.value
                      )
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem("aspiringCompanies", index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  // Calculate progress percentage
  const totalSections = Object.keys(Sections).length;
  const progressPercentage = Math.round(
    (currentSection / (totalSections - 1)) * 100
  );

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Build Your Resume</h1>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Personal Info</span>
          <span>Target Companies</span>
        </div>
      </div>

      {renderCurrentSection()}

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSection === Sections.PERSONAL}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>

        <Button
          variant="primary"
          onClick={saveCurrentSection}
          disabled={isLoading || savedSections[currentSection]}
        >
          {isLoading ? (
            "Saving..."
          ) : savedSections[currentSection] ? (
            <>
              <Check className="w-4 h-4 mr-2" /> Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" /> Save Section
            </>
          )}
        </Button>

        {currentSection < Sections.ASPIRING_COMPANIES ? (
          <Button variant="primary" onClick={handleNext}>
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Finalizing..." : "Finalize Resume"}
          </Button>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          You can come back to edit your resume anytime. All your progress is
          saved.
        </p>
      </div>
    </div>
  );
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

