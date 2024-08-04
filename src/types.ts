import type { Url } from 'url'

export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: string
}

export interface Student {
  id: number
  studentId: string
  name: string
  surname: string
  gpa: number
  image: Url
  penAmount: number
  description: string
}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}
