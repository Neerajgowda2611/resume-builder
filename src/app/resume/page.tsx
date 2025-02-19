"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import {
  ResumeData,
  Education,
  Experience,
  Project,
  Skill,
  Language,
} from "@/types/index";

export default function ResumeForm() {
  const { user } = useUser();
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
  };

  const removeItem = <T extends keyof ResumeData>(field: T, index: number) => {
    setResume((prev) => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
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

  const handleSubmit = async () => {
    try {
      console.log("Submitting resume:", resume);
      // Add your submission logic here
      // Example: await submitResume(resume);
    } catch (error) {
      console.error("Error submitting resume:", error);
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Your Resume</h1>

      {/* Personal Info */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid gap-4">
            <Input
              placeholder="Full Name"
              value={resume.name}
              onChange={(e) => setResume({ ...resume, name: e.target.value })}
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
                setResume({ ...resume, linkedIn: e.target.value })
              }
            />
            <Input
              placeholder="GitHub Profile URL"
              value={resume.github}
              onChange={(e) => setResume({ ...resume, github: e.target.value })}
            />
            <Textarea
              placeholder="About Me"
              value={resume.aboutMe}
              onChange={(e) =>
                setResume({ ...resume, aboutMe: e.target.value })
              }
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Education</h2>
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

      {/* Experience Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Work Experience</h2>
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

      {/* Certifications Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Certifications</h2>
            <Button variant="outline" size="sm" onClick={() => addItem("certifications")}>
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
                    handleArrayChange("certifications", index, e.target.value, "name")
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
                      handleArrayChange("certifications", index, e.target.value, "year")
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

      {/* Projects Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Projects</h2>
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
                    handleArrayChange("projects", index, e.target.value, "name")
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
                    handleArrayChange("projects", index, e.target.value, "link")
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

      {/* Skills Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Skills</h2>
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
                  handleArrayChange("skills", index, e.target.value, "skill")
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

      {/* Languages Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Languages</h2>
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
                  handleArrayChange("languages", index, value, "proficiency")
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

      {/* Hobbies Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Hobbies</h2>
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

      {/* Aspiring Roles Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Aspiring Roles</h2>
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

      {/* Aspiring Companies Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Target Companies</h2>
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
                placeholder="Company Name"
                value={company}
                onChange={(e) =>
                  handleArrayChange("aspiringCompanies", index, e.target.value)
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

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => {
            if (window.confirm("Are you sure you want to reset the form?")) {
              setResume({
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
            }
          }}
        >
          Reset Form
        </Button>
        <Button onClick={handleSubmit}>Save Resume</Button>
      </div>
    </main>
  );
}
