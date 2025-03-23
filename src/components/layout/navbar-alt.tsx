"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Search } from 'lucide-react'
import { useTheme } from 'next-themes'

export function NavbarAlt() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: 'Beranda', href: '/beranda' },
    { name: 'Kompetisi', href: '/kompetisi' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-800/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/beranda" className="flex items-center space-x-3" data-testid="logo-link">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Infortix
              </span>
              <p className="text-xs text-muted-foreground">Portal Kompetisi</p>
            </div>
          </Link>
          <nav className="hidden md:flex gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-testid={`nav-item-${item.href}`}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-purple-400/30 text-purple-400 hover:text-purple-300 hover:border-purple-300/50 hover:bg-purple-950/30"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Cari</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-primary/10"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            data-testid="theme-toggle-button"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-primary" />
            ) : (
              <Sun className="h-5 w-5 text-primary" />
            )}
            <span className="sr-only">Ganti tema</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
