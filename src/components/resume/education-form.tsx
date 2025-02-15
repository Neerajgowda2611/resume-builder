// src/components/resume/education-form.tsx
"use client"
import { useState } from 'react'
import { Input } from '../ui/input'

interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface EducationFormProps {
  data: Education[]
  onSave: (data: Education[]) => void
  onBack: () => void
}

export function EducationForm({ data, onSave, onBack }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(data || [])

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ])
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducations = [...educations]
    newEducations[index] = {
      ...newEducations[index],
      [field]: value
    }
    setEducations(newEducations)
  }

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(educations)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {educations.map((education, index) => (
        <div key={education.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Education #{index + 1}</h3>
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <Input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <Input
                type="text"
                value={education.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <Input
                type="text"
                value={education.location}
                onChange={(e) => updateEducation(index, 'location', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <Input
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <Input
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={education.description}
              onChange={(e) => updateEducation(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="text-blue-600 hover:text-blue-800"
      >
        + Add Education
      </button>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Next Step
        </button>
      </div>
    </form>
  )
}