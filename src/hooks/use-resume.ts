// src/hooks/use-resume.ts
import { Resume } from '@/types'
import { useState } from 'react'
import { createResume, updateResume } from '@/lib/api'

export const useResume = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async (data: Partial<Resume>) => {
    setIsLoading(true)
    setError(null)
    try {
      const resume = await createResume(data)
      return resume
    } catch (err) {
      setError('Failed to create resume')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const update = async (id: string, data: Partial<Resume>) => {
    setIsLoading(true)
    setError(null)
    try {
      const resume = await updateResume(id, data)
      return resume
    } catch (err) {
      setError('Failed to update resume')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    create,
    update,
    isLoading,
    error,
  }
}