"use client"
import { useState } from 'react'
import { PersonalInfoForm } from './personal-info-form'
import { EducationForm } from './education-form'
import { ExperienceForm } from './experience-form'
import { SkillsForm } from './skills-form'
import { Card } from '../ui/card'
// import { Education } from '@/types'

interface PersonalInfoData {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
}

interface ResumeData {
  personal: PersonalInfoData
  education: string[] // Update with correct education type
  experience: string[] // Update with correct experience type
  skills: string[]
}

const steps = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'education', title: 'Education' },
  { id: 'experience', title: 'Experience' },
  { id: 'skills', title: 'Skills' },
]

export function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState<string>('personal')
  const [formData, setFormData] = useState<ResumeData>({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    education: [],
    experience: [],
    skills: [],
  })

  const updateFormData = (section: keyof ResumeData, data: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalInfoForm 
            data={formData.personal} 
            onSave={(data: PersonalInfoData) => {
              updateFormData('personal', data)
              setCurrentStep('education')
            }} 
          />
        )
      case 'education':
        return (
            <EducationForm
            data={formData.education}
            onSave={(data: unknown[]) => {
              updateFormData('education', data)
              setCurrentStep('experience')
            }}
            onBack={() => setCurrentStep('personal')}
          />
          
        )
      case 'experience':
        return (
          <ExperienceForm 
            data={formData.experience}
            onSave={(data: unknown) => {
              updateFormData('experience', data)
              setCurrentStep('skills')
            }}
            onBack={() => setCurrentStep('education')}
          />
        )
      case 'skills':
        return (
          <SkillsForm 
            data={formData.skills}
            onSave={(data: unknown) => {
              updateFormData('skills', data)
              // Handle final submission
            }}
            onBack={() => setCurrentStep('experience')}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`flex items-center ${
              currentStep === step.id ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2
              ${currentStep === step.id ? 'border-blue-600' : 'border-gray-400'}`}
            >
              {steps.findIndex(s => s.id === step.id) + 1}
            </div>
            <span className="ml-2">{step.title}</span>
          </div>
        ))}
      </div>

      <Card className="p-6">
        {renderStep()}
      </Card>
    </div>
  )
}
