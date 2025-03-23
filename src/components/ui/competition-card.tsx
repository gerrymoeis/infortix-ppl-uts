"use client"

import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Trophy, ExternalLink, Building, Clock } from 'lucide-react'
import { formatDate, getDaysUntilDeadline } from '@/lib/utils'
import { Competition } from '@/types/competition'

interface CompetitionCardProps {
  competition: Competition
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const daysUntilDeadline = getDaysUntilDeadline(competition.deadline)
  const isExpired = daysUntilDeadline < 0

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-[1.02] hover:border-[#4F46E5]/30 bg-background/80 backdrop-blur-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={competition.image_url || '/images/placeholder-competition.jpg'}
          alt={competition.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Glowing overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Source platform badge */}
        <span className="absolute top-3 left-3 text-sm font-medium px-3 py-1 rounded-full bg-black/50 text-white border border-[#4F46E5]/30 backdrop-blur-sm">
          {competition.source_platform}
        </span>
        
        {/* Deadline badge */}
        <span className={`absolute top-3 right-3 text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm border ${
          isExpired 
            ? 'bg-destructive/10 text-destructive border-destructive/30' 
            : daysUntilDeadline <= 7
              ? 'bg-amber-950/50 text-amber-300 border-amber-500/30'
              : 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
        }`}>
          {isExpired 
            ? 'Expired' 
            : daysUntilDeadline === 0 
              ? 'Last day' 
              : daysUntilDeadline === 1 
                ? '1 day left' 
                : `${daysUntilDeadline} days left`
          }
        </span>
      </div>
      <CardHeader className="space-y-2 relative">
        <CardTitle className="line-clamp-2 text-xl group-hover:text-[#8B5CF6] transition-colors duration-300">
          {competition.title}
        </CardTitle>
        <div className="flex items-center text-base text-muted-foreground">
          <Building className="mr-2 h-4 w-4 text-[#EC4899]/70" />
          <p className="line-clamp-1">{competition.organizer}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center text-base">
            <Calendar className="mr-2 h-5 w-5 text-[#4F46E5]" />
            <span>Deadline: {formatDate(competition.deadline)}</span>
          </div>
          {!isExpired && (
            <div className="flex items-center text-base">
              <Clock className="mr-2 h-5 w-5 text-[#8B5CF6]" />
              <span className="text-[#8B5CF6]">
                {daysUntilDeadline === 0 
                  ? 'Last day to register!' 
                  : daysUntilDeadline === 1 
                    ? 'Only 1 day left!' 
                    : `${daysUntilDeadline} days remaining`
                }
              </span>
            </div>
          )}
          {competition.prize_pool && (
            <div className="flex items-center text-base">
              <Trophy className="mr-2 h-5 w-5 text-[#EC4899]" />
              <span>Prize Pool: {competition.prize_pool}</span>
            </div>
          )}
          {competition.description && (
            <p className="text-base text-muted-foreground line-clamp-2">
              {competition.description}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          asChild 
          className={`w-full h-11 text-base transition-all duration-300 ${
            isExpired 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#EC4899] text-white shadow-[0_4px_10px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.4)]'
          }`}
          size="lg"
          disabled={isExpired}
        >
          <a 
            href={competition.registration_link || competition.source_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            {isExpired ? 'Competition Ended' : 'View Details'}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
