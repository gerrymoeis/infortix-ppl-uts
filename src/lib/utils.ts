import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  // Ensure we're parsing the date correctly
  const parsedDate = new Date(date)
  return parsedDate.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function getDaysUntilDeadline(deadline: string) {
  const today = new Date()
  
  // Reset time to start of day for both dates to ensure accurate day calculation
  today.setHours(0, 0, 0, 0)
  
  // Parse the deadline date properly
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  
  // Calculate the difference in days
  const diffTime = deadlineDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}
