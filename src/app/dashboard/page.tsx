"use client";

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">AI-Powered Resume Builder</h1>
        <p className="mb-8 text-xl text-gray-600">
          Create professional resumes with AI-powered suggestions and ATS optimization.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/resume">
            <Button size="lg">Create Resume</Button>
          </Link>
          <Link href="/dashboard/template">
            <Button variant="outline" size="lg">
              View Templates
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}