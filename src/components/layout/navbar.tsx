"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Alternative Home', href: '/home-alt' },
    { name: 'Lomba', href: '/lomba' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-3">
            {/* Only show Himafortic logo on pages other than the alternative home page */}
            {pathname !== '/home-alt' && (
              <Image
                src="/images/himafortic-logo.png"
                alt="Himafortic Logo"
                width={40}
                height={40}
                className="h-12 w-16"
              />
            )}
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Infortic
              </span>
              <p className="text-xs text-muted-foreground">
                {pathname !== '/home-alt' ? 'by Himafortic' : 'Competition Portal'}
              </p>
            </div>
          </Link>
          <nav className="hidden md:flex gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  pathname === item.href
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-primary/10"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
