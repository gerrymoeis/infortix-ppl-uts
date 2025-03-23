"use client"

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export function CompetitionSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 w-full bg-gray-200" />
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
        {/* Title placeholder */}
        <div className="h-6 w-full bg-gray-200 rounded mt-2" />
        {/* Organizer placeholder */}
        <div className="h-4 w-2/3 bg-gray-200 rounded mt-2" />
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {/* Deadline placeholder */}
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 rounded-full mr-2" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
          {/* Prize pool placeholder */}
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 rounded-full mr-2" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>
          {/* Description placeholder */}
          <div className="space-y-1">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="h-10 w-full bg-gray-200 rounded" />
      </CardFooter>
    </Card>
  )
}
