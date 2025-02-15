// src/components/resume/skills-form.tsx
"use client"
import { useState } from 'react'
import { Input } from '../ui/input'

interface Skill {
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

interface SkillsFormProps {
  data: Skill[]
  onSave: (data: Skill[]) => void
  onBack: () => void
}

export function SkillsForm({ data, onSave, onBack }: SkillsFormProps) {
  const [skills, setSkills] = useState<Skill[]>(data || [])

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: Date.now().toString(),
        name: '',
        level: 'Intermediate'
      }
    ])
  }

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...skills]
    newSkills[index] = {
      ...newSkills[index],
      [field]: value
    }
    setSkills(newSkills)
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(skills)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {skills.map((skill, index) => (
        <div key={skill.id} className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              value={skill.name}
              onChange={(e) => updateSkill(index, 'name', e.target.value)}
              placeholder="Skill name"
              required
            />
          </div>

          <div className="w-48">
            <select
              value={skill.level}
              onChange={(e) => updateSkill(index, 'level', e.target.value as Skill['level'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => removeSkill(index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        className="text-blue-600 hover:text-blue-800"
      >
        + Add Skill
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
          Finish
        </button>
      </div>
    </form>
  )
}