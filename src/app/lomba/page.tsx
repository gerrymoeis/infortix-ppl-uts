"use client"

import { useEffect, useState } from 'react'
import { CompetitionCard } from '@/components/ui/competition-card'
import { CompetitionSkeleton } from '@/components/ui/competition-skeleton'
import { Button } from '@/components/ui/button'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Competition, CompetitionFilter } from '@/types/competition'
import { getCompetitions } from '@/lib/supabase'
import { FilterDialog } from '@/components/ui/filter-dialog'
import { BackgroundElements } from '@/components/ui/background-elements'
import { Navbar } from '@/components/layout/navbar'

const ITEMS_PER_PAGE = 9
const months = [
  "januari", "februari", "maret", "april", "mei", "juni",
  "juli", "agustus", "september", "oktober", "november", "desember"
]

export default function CompetitionPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<CompetitionFilter>({})
  const [filteredCompetitions, setFilteredCompetitions] = useState<Competition[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchCompetitions() {
      setLoading(true)
      try {
        // Get competitions with categories
        const data = await getCompetitions()
        console.log('Fetched competitions:', data)
        
        if (data && data.length > 0) {
          setCompetitions(data)
          setFilteredCompetitions(data)
        } else {
          console.log('No competitions found')
        }
      } catch (error) {
        console.error('Error in fetchCompetitions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompetitions()
  }, [])

  useEffect(() => {
    let filtered = [...competitions]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const searchTerms = query.split(' ')
      
      filtered = filtered.filter(comp => {
        const searchableText = `
          ${comp.title.toLowerCase()}
          ${comp.description?.toLowerCase() || ''}
          ${comp.organizer.toLowerCase()}
          ${comp.source_platform.toLowerCase()}
        `
        
        // Check if any month name is mentioned in the search
        const monthMentioned = months.findIndex(month => query.includes(month))
        if (monthMentioned !== -1) {
          const deadline = new Date(comp.deadline)
          if (deadline.getMonth() !== monthMentioned) return false
        }

        // Check if any year is mentioned in the search
        const yearMatch = query.match(/\b20\d{2}\b/)
        if (yearMatch) {
          const deadline = new Date(comp.deadline)
          if (deadline.getFullYear().toString() !== yearMatch[0]) return false
        }

        // Check if all search terms are found in the searchable text
        return searchTerms.every(term => searchableText.includes(term))
      })
    }

    // Apply filters
    if (filter.source_platform) {
      filtered = filtered.filter(comp => 
        comp.source_platform.toLowerCase() === filter.source_platform!.toLowerCase()
      )
    }
    if (filter.month !== undefined) {
      filtered = filtered.filter(comp => {
        const deadline = new Date(comp.deadline)
        return deadline.getMonth() + 1 === filter.month
      })
    }
    if (filter.year !== undefined) {
      filtered = filtered.filter(comp => {
        const deadline = new Date(comp.deadline)
        return deadline.getFullYear() === filter.year
      })
    }

    setFilteredCompetitions(filtered)
    setCurrentPage(1)
  }, [searchQuery, filter, competitions])

  const totalPages = Math.ceil(filteredCompetitions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCompetitions = filteredCompetitions.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <BackgroundElements />

      <div className="min-h-screen bg-background/25">
        {/* Search Section */}
        <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container py-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari lomba berdasarkan judul, penyelenggara, bulan, atau tahun..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <FilterDialog filter={filter} onFilterChange={setFilter} />
            </div>
          </div>
        </div>

        {/* Competitions Grid */}
        <section className="py-8">
          <div className="container">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <CompetitionSkeleton key={i} />
                ))}
              </div>
            ) : filteredCompetitions.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCompetitions.map((competition) => (
                    <CompetitionCard key={competition.id} competition={competition} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Tidak ada lomba yang ditemukan</p>
                {(searchQuery || Object.keys(filter).length > 0) && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('')
                      setFilter({})
                    }}
                  >
                    Reset Pencarian & Filter
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
