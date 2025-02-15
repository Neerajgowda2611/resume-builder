// src/lib/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const fetchResumes = async (userId: string) => {
  const response = await api.get(`/resumes?userId=${userId}`)
  return response.data
}

export const createResume = async (resumeData: Partial<Resume>) => {
  const response = await api.post('/resumes', resumeData)
  return response.data
}

export const updateResume = async (id: string, resumeData: Partial<Resume>) => {
  const response = await api.put(`/resumes/${id}`, resumeData)
  return response.data
}