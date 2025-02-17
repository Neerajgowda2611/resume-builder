// app/resume-builder/page.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ResumeBuilder() {
  const [title, setTitle] = useState("");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Resume Builder</h1>
      <div className="mt-4">
        <label className="block">Resume Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your resume"
        />
        <Button className="mt-4">Save Resume</Button>
      </div>
    </main>
  );
}
