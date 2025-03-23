import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Search, 
  Trophy, 
  Calendar, 
  Globe, 
  Users, 
  Star,
  Zap
} from 'lucide-react'
import { NavbarAlt } from '@/components/layout/navbar-alt'

export default function AlternativeHome() {
  return (
    <>
      <NavbarAlt />
      
      {/* Hero Section with different design */}
      <section className="relative bg-gradient-to-br from-violet-950 via-indigo-900 to-purple-900 py-24 md:py-32 overflow-hidden animate-gradient-shift">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/20 animate-float-particle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600/30 blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600/30 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-purple-300/40 px-4 py-1.5 text-sm font-medium text-purple-100 mb-8">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-purple-200" />
                Temukan Kompetisi Terbaikmu
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              <span className="block">Wujudkan</span>
              <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Potensi Kompetitifmu
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-purple-100">
              Temukan kompetisi yang sempurna untuk menunjukkan bakat dan keterampilanmu.
              Platform kami menghubungkanmu dengan berbagai peluang di seluruh Indonesia.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-6 text-base bg-white text-purple-900 hover:bg-purple-100">
                <Link href="/kompetisi">
                  Jelajahi Kompetisi
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - New section not in original */}
      <section className="py-16 bg-gradient-to-b from-purple-900/50 to-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">500+</p>
              <p className="text-muted-foreground mt-2 font-medium">Kompetisi Aktif</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">50+</p>
              <p className="text-muted-foreground mt-2 font-medium">Kategori</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">10K+</p>
              <p className="text-muted-foreground mt-2 font-medium">Pengguna Bulanan</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-pink-400 bg-clip-text text-transparent">100%</p>
              <p className="text-muted-foreground mt-2 font-medium">Akses Gratis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with different design */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Platform Kami?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
              Kami menyediakan pengalaman pencarian kompetisi yang komprehensif dengan fitur-fitur yang dirancang untuk membantumu sukses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-muted/50 rounded-xl p-6 backdrop-blur-sm border border-muted transition-all hover:border-primary/30 hover:shadow-md hover:translate-y-[-5px] duration-300">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pencarian Cerdas</h3>
              <p className="text-foreground/80">
                Temukan kompetisi yang sesuai dengan minat, keterampilan, dan ketersediaan waktumu dengan filter canggih kami.
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-xl p-6 backdrop-blur-sm border border-muted transition-all hover:border-primary/30 hover:shadow-md hover:translate-y-[-5px] duration-300">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pengingat Tenggat Waktu</h3>
              <p className="text-foreground/80">
                Jangan pernah lewatkan tenggat waktu penting dengan sistem notifikasi dan penghitung mundur kami.
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-xl p-6 backdrop-blur-sm border border-muted transition-all hover:border-primary/30 hover:shadow-md hover:translate-y-[-5px] duration-300">
              <div className="bg-gradient-to-br from-indigo-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cakupan Nasional</h3>
              <p className="text-foreground/80">
                Akses kompetisi dari seluruh Indonesia, mulai dari acara lokal hingga kejuaraan nasional.
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-xl p-6 backdrop-blur-sm border border-muted transition-all hover:border-primary/30 hover:shadow-md hover:translate-y-[-5px] duration-300">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wawasan Komunitas</h3>
              <p className="text-foreground/80">
                Dapatkan tips dan wawasan dari peserta sebelumnya untuk meningkatkan peluang keberhasilanmu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Different from original */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-10 md:p-16 animate-gradient-shift">
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/40 blur-3xl animate-pulse-glow"></div>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/40 blur-3xl animate-pulse-glow" style={{ animationDelay: '2.5s' }}></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold text-white mb-4">Siap Menemukan Tantangan Berikutnya?</h2>
                <p className="text-indigo-50">
                  Jelajahi koleksi kompetisi kami yang luas dan temukan peluang sempurna untuk menunjukkan bakatmu.
                </p>
              </div>
              <Button asChild size="lg" className="h-12 px-8 text-base bg-white text-indigo-700 hover:bg-indigo-50">
                <Link href="/kompetisi">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
