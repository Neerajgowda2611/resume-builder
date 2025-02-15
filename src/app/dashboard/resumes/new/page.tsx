// src/app/dashboard/resumes/new/page.tsx
"use client"
import { ResumeBuilder } from '@/components/resume/resume-builder'

export default function NewResumePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Resume</h1>
      <ResumeBuilder />
    </div>
  )
}
