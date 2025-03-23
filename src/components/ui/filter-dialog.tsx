"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Filter } from "lucide-react"
import { Label } from "@/components/ui/label"
import { CompetitionFilter } from "@/types/competition"

interface FilterDialogProps {
  filter: CompetitionFilter
  onFilterChange: (filter: CompetitionFilter) => void
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 2 }, (_, i) => currentYear + i)
const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
]
const platforms = ["Dicoding", "Devcode", "Kompetisi.id"]

export function FilterDialog({ filter, onFilterChange }: FilterDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-4">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Lomba</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="platform">Platform</Label>
            <Select
              value={filter.source_platform || "all"}
              onValueChange={(value) =>
                onFilterChange({ 
                  ...filter, 
                  source_platform: value === "all" ? undefined : value 
                })
              }
            >
              <SelectTrigger id="platform">
                <SelectValue placeholder="Semua Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Platform</SelectItem>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform.toLowerCase()}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="month">Bulan Deadline</Label>
            <Select
              value={filter.month?.toString() || "all"}
              onValueChange={(value) =>
                onFilterChange({
                  ...filter,
                  month: value === "all" ? undefined : parseInt(value),
                })
              }
            >
              <SelectTrigger id="month">
                <SelectValue placeholder="Semua Bulan" />
              </SelectTrigger>
              
              <SelectContent>
                <SelectItem value="all">Semua Bulan</SelectItem>
                {months.map((month, index) => (
                  <SelectItem key={month} value={(index + 1).toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Tahun Deadline</Label>
            <Select
              value={filter.year?.toString() || "all"}
              onValueChange={(value) =>
                onFilterChange({
                  ...filter,
                  year: value === "all" ? undefined : parseInt(value),
                })
              }
            >
              <SelectTrigger id="year">
                <SelectValue placeholder="Semua Tahun" />
              </SelectTrigger>
              
              <SelectContent>
                <SelectItem value="all">Semua Tahun</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => onFilterChange({ source_platform: undefined, month: undefined, year: undefined })}
          >
            Reset Filter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
