import { NavbarAlt } from '@/components/layout/navbar-alt'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Filter, Calendar, Trophy, Users, Award, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Dummy data untuk kompetisi
const dummyCompetitions = [
  {
    id: 1,
    title: "Gemastik XV 2025",
    organizer: "Kementerian Pendidikan dan Kebudayaan",
    category: "Teknologi",
    deadline: "2025-06-15",
    prizePool: "Rp 250.000.000",
    location: "Nasional",
    tags: ["Pemrograman", "Data Mining", "UI/UX", "Keamanan Siber"],
    image: "https://placehold.co/400x250/4F46E5/FFFFFF?text=Gemastik+XV"
  },
  {
    id: 2,
    title: "Hackathon Indonesia Maju 2025",
    organizer: "Kementerian Komunikasi dan Informatika",
    category: "Teknologi",
    deadline: "2025-05-20",
    prizePool: "Rp 175.000.000",
    location: "Jakarta",
    tags: ["Hackathon", "Inovasi Digital", "Startup"],
    image: "https://placehold.co/400x250/6D28D9/FFFFFF?text=Hackathon+IM"
  },
  {
    id: 3,
    title: "Kompetisi Bisnis Plan Nasional",
    organizer: "Universitas Indonesia",
    category: "Bisnis",
    deadline: "2025-07-10",
    prizePool: "Rp 100.000.000",
    location: "Depok",
    tags: ["Business Plan", "Kewirausahaan", "Startup"],
    image: "https://placehold.co/400x250/0EA5E9/FFFFFF?text=Bisnis+Plan"
  },
  {
    id: 4,
    title: "Lomba Karya Tulis Ilmiah Nasional",
    organizer: "Institut Teknologi Bandung",
    category: "Akademik",
    deadline: "2025-08-05",
    prizePool: "Rp 75.000.000",
    location: "Bandung",
    tags: ["Karya Tulis", "Penelitian", "Inovasi"],
    image: "https://placehold.co/400x250/EC4899/FFFFFF?text=LKTIN"
  },
  {
    id: 5,
    title: "Competitive Programming Contest 2025",
    organizer: "Google Indonesia",
    category: "Teknologi",
    deadline: "2025-04-30",
    prizePool: "Rp 150.000.000",
    location: "Online",
    tags: ["Pemrograman", "Algoritma", "Kompetitif"],
    image: "https://placehold.co/400x250/8B5CF6/FFFFFF?text=CP+Contest"
  },
  {
    id: 6,
    title: "Data Science Competition",
    organizer: "Tokopedia",
    category: "Teknologi",
    deadline: "2025-05-25",
    prizePool: "Rp 125.000.000",
    location: "Jakarta",
    tags: ["Data Science", "Machine Learning", "AI"],
    image: "https://placehold.co/400x250/10B981/FFFFFF?text=Data+Science"
  },
  {
    id: 7,
    title: "Olimpiade Matematika Nasional",
    organizer: "Perhimpunan Matematika Indonesia",
    category: "Akademik",
    deadline: "2025-06-30",
    prizePool: "Rp 50.000.000",
    location: "Surabaya",
    tags: ["Matematika", "Olimpiade", "Sains"],
    image: "https://placehold.co/400x250/F59E0B/FFFFFF?text=Olimpiade+Mat"
  },
  {
    id: 8,
    title: "UI/UX Design Challenge 2025",
    organizer: "Gojek",
    category: "Desain",
    deadline: "2025-07-15",
    prizePool: "Rp 100.000.000",
    location: "Jakarta",
    tags: ["UI/UX", "Desain", "Produk Digital"],
    image: "https://placehold.co/400x250/3B82F6/FFFFFF?text=UI/UX+Design"
  }
];

// Fungsi untuk menghitung sisa hari hingga deadline
function getDaysUntilDeadline(deadlineStr: string): number {
  const deadline = new Date(deadlineStr);
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Komponen Card untuk kompetisi
function CompetitionCard({ competition }: { competition: any }) {
  const daysUntilDeadline = getDaysUntilDeadline(competition.deadline);
  const isExpired = daysUntilDeadline < 0;
  
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-lg group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={competition.image} 
          alt={competition.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={isExpired ? "destructive" : "secondary"} className="font-medium">
            {isExpired 
              ? "Berakhir" 
              : daysUntilDeadline === 0 
                ? "Hari Terakhir!" 
                : `${daysUntilDeadline} hari lagi`}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
            {competition.category}
          </Badge>
          <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
            {competition.location}
          </Badge>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{competition.title}</h3>
        <p className="text-muted-foreground text-sm mb-3">
          Diselenggarakan oleh {competition.organizer}
        </p>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{new Date(competition.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{competition.prizePool}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {competition.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
          {competition.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs font-normal">
              +{competition.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <Button asChild className="w-full" variant={isExpired ? "outline" : "default"}>
          <Link href={`/kompetisi/${competition.id}`}>
            {isExpired ? "Lihat Detail" : "Daftar Sekarang"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function KompetisiPage() {
  return (
    <>
      <NavbarAlt />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Jelajahi Kompetisi</h1>
            <p className="text-muted-foreground">Temukan kompetisi terbaik untuk mengembangkan potensimu</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue="terbaru">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="terbaru">Terbaru</SelectItem>
                <SelectItem value="deadline">Deadline Terdekat</SelectItem>
                <SelectItem value="prize">Hadiah Terbesar</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari kompetisi..." 
              className="pl-9"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Select defaultValue="semua">
              <SelectTrigger>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Kategori</SelectItem>
                <SelectItem value="teknologi">Teknologi</SelectItem>
                <SelectItem value="bisnis">Bisnis</SelectItem>
                <SelectItem value="akademik">Akademik</SelectItem>
                <SelectItem value="desain">Desain</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="semua">
              <SelectTrigger>
                <SelectValue placeholder="Lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Lokasi</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="jakarta">Jakarta</SelectItem>
                <SelectItem value="bandung">Bandung</SelectItem>
                <SelectItem value="surabaya">Surabaya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="semua" className="mb-8">
          <TabsList>
            <TabsTrigger value="semua">Semua</TabsTrigger>
            <TabsTrigger value="aktif">Aktif</TabsTrigger>
            <TabsTrigger value="akan-datang">Akan Datang</TabsTrigger>
            <TabsTrigger value="berakhir">Telah Berakhir</TabsTrigger>
          </TabsList>
          
          <TabsContent value="semua" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dummyCompetitions.map((competition) => (
                <CompetitionCard key={competition.id} competition={competition} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="aktif" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dummyCompetitions
                .filter(comp => getDaysUntilDeadline(comp.deadline) >= 0)
                .map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="akan-datang" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dummyCompetitions
                .filter(comp => getDaysUntilDeadline(comp.deadline) > 30)
                .map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="berakhir" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dummyCompetitions
                .filter(comp => getDaysUntilDeadline(comp.deadline) < 0)
                .map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center">
          <Button variant="outline" className="gap-2">
            Muat Lebih Banyak
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
