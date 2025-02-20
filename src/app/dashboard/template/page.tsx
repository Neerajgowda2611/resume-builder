"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define font type
type FontType = "inter" | "roboto" | "opensans" | "lato";

interface MinimalClassicProps {
  font: FontType;
  primaryColor: string;
  preview?: boolean;
}

const MinimalClassic: React.FC<MinimalClassicProps> = ({
  font,
  primaryColor,
  preview = false,
}) => {
  const containerClass = cn(
    "bg-white w-full",
    preview
      ? "scale-[0.4] origin-top"
      : "min-h-[297mm] w-[210mm] mx-auto shadow-lg",
    font === "inter" && "font-inter",
    font === "roboto" && "font-roboto",
    font === "opensans" && "font-opensans",
    font === "lato" && "font-lato"
  );

  return (
    <div className={containerClass}>
      <header className="p-8 border-b" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          John Smith
        </h1>
        <div className="text-gray-600 space-y-1">
          <p>Senior Software Engineer</p>
          <p>john.smith@email.com • (555) 123-4567</p>
          <p>San Francisco, CA</p>
        </div>
      </header>

      <main className="p-8 space-y-6">
        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-700">
            Senior Software Engineer with 8+ years of experience in full-stack
            development, specializing in React and Node.js. Led multiple
            successful projects and mentored junior developers.
          </p>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">
                Senior Software Engineer - Tech Corp
              </h3>
              <p className="text-gray-600">2020 - Present</p>
              <ul className="list-disc ml-4 mt-2 text-gray-700">
                <li>
                  Led development of microservices architecture serving 1M+
                  users
                </li>
                <li>
                  Improved application performance by 40% through optimization
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "TypeScript", "AWS", "Docker"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor,
                  }}
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

interface ModernProfessionalProps {
  font: FontType;
  primaryColor: string;
  preview?: boolean;
}

const ModernProfessional: React.FC<ModernProfessionalProps> = ({
  font,
  primaryColor,
  preview = false,
}) => {
  const containerClass = cn(
    "bg-white",
    preview
      ? "scale-[0.4] origin-top"
      : "min-h-[297mm] w-[210mm] mx-auto shadow-lg",
    font === "inter" && "font-inter",
    font === "roboto" && "font-roboto",
    font === "opensans" && "font-opensans",
    font === "lato" && "font-lato"
  );

  return (
    <div className={containerClass}>
      <div className="h-8" style={{ backgroundColor: primaryColor }}></div>
      <div className="grid grid-cols-3 gap-8 p-8">
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-2">John Smith</h1>
          <p className="text-xl text-gray-600 mb-6">Senior Software Engineer</p>

          <section className="mb-8">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              About Me
            </h2>
            <p className="text-gray-700">
              Innovative Senior Software Engineer passionate about creating
              efficient, scalable solutions. Experienced in leading teams and
              delivering high-impact projects.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">Tech Corp</h3>
                <p className="text-gray-600 mb-2">
                  Senior Software Engineer • 2020 - Present
                </p>
                <ul className="list-disc ml-4 text-gray-700">
                  <li>Led development of microservices architecture</li>
                  <li>Improved application performance by 40%</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Contact
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>john.smith@email.com</p>
              <p>(555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
          </section>

          <section>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: primaryColor }}
            >
              Skills
            </h2>
            <div className="space-y-2">
              {["React", "Node.js", "TypeScript", "AWS", "Docker"].map(
                (skill) => (
                  <div
                    key={skill}
                    className="p-2 rounded"
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      color: primaryColor,
                    }}
                  >
                    {skill}
                  </div>
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Define template map with proper typing
const TEMPLATES: Record<
  string,
  React.FC<{ font: FontType; primaryColor: string; preview?: boolean }>
> = {
  minimal: MinimalClassic,
  modern: ModernProfessional,
};

type TemplateKey = keyof typeof TEMPLATES;

interface TemplateCardProps {
  id: TemplateKey;
  title: string;
  description: string;
  font: FontType;
  primaryColor: string;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  font,
  primaryColor,
  onSelect,
}) => {
  const Template = TEMPLATES[id];

  //   return (
  //     <Card className="w-full">
  //       <CardHeader>
  //         <CardTitle className="text-lg">{title}</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="aspect-[8.5/11] w-full bg-gray-100 mb-4 overflow-hidden relative">
  //           <div className="absolute top-0 left-0 w-full">
  //             <div className="transform scale-[0.35] origin-top">
  //               <Template
  //                 font={font}
  //                 primaryColor={primaryColor}
  //                 preview={true}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //         <p className="text-sm text-gray-600 mb-4">{description}</p>
  //         <div className="flex space-x-2">
  //           <Button onClick={onSelect} className="w-full">
  //             Use Template
  //           </Button>
  //           <Button variant="outline">
  //             <Eye className="h-4 w-4" />
  //           </Button>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // };

  return (
    <Card className="w-full">
  <CardHeader>
    <CardTitle className="text-lg">{title}</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Ensuring it takes full space and fits perfectly */}
    <div className="w-full h-[400px] bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
      <div className="w-full h-full">
        <Template font={font} primaryColor={primaryColor} preview={true} />
      </div>
    </div>
    
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    
    <div className="flex space-x-2">
      <Button onClick={onSelect} className="w-full">
        Use Template
      </Button>
      <Button variant="outline">
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  </CardContent>
</Card>

  );
};

const TemplatesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFont, setSelectedFont] = useState<FontType>("inter");
  const [primaryColor, setPrimaryColor] = useState("#0f172a");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey | null>(
    null
  );

  const templates = [
    {
      id: "minimal" as TemplateKey,
      title: "Minimal Classic",
      description:
        "Clean and professional design with optimal ATS compatibility. Perfect for traditional industries.",
      category: "professional",
    },
    {
      id: "modern" as TemplateKey,
      title: "Modern Professional",
      description:
        "Contemporary layout with a perfect balance of white space and content. Ideal for tech and creative roles.",
      category: "creative",
    },
  ];

  const handleTemplateSelect = (templateId: TemplateKey) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Resume Templates</h1>
        <div className="flex space-x-4">
          <Select
            value={selectedFont}
            onValueChange={(value: FontType) => setSelectedFont(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="opensans">Open Sans</SelectItem>
              <SelectItem value="lato">Lato</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-12 h-10 p-1 cursor-pointer"
          />
        </div>
      </div>

      {selectedTemplate ? (
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setSelectedTemplate(null)}
            className="mb-4"
          >
            Back to Templates
          </Button>
          {React.createElement(TEMPLATES[selectedTemplate], {
            font: selectedFont,
            primaryColor,
          })}
        </div>
      ) : (
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  id={template.id}
                  title={template.title}
                  description={template.description}
                  font={selectedFont}
                  primaryColor={primaryColor}
                  onSelect={() => handleTemplateSelect(template.id)}
                />
              ))}
            </div>
          </TabsContent>

          {["professional", "creative", "technical"].map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates
                  .filter((t) => t.category === category)
                  .map((template) => (
                    <TemplateCard
                      key={template.id}
                      id={template.id}
                      title={template.title}
                      description={template.description}
                      font={selectedFont}
                      primaryColor={primaryColor}
                      onSelect={() => handleTemplateSelect(template.id)}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default TemplatesPage;
