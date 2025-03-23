"use client"

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 bottom-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary opacity-5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary opacity-5 blur-3xl" />
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/himafortic-logo.png"
                alt="Himafortic Logo"
                width={40}
                height={40}
                className="h-12 w-16"
              />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Infortic
                </span>
                <p className="text-sm text-muted-foreground">by Himafortic</p>
              </div>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Platform informasi lomba dan kompetisi terlengkap untuk mahasiswa dan pelajar Indonesia.
              Temukan peluang untuk mengembangkan potensimu dan raih prestasi.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Navigasi</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-base text-muted-foreground hover:text-primary transition-colors">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/lomba" className="text-base text-muted-foreground hover:text-primary transition-colors">
                    Lomba
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Himafortic</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://himafortic.mi.unesa.ac.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    Website
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/himafortic_unesa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Kontak</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:himafortic.mi@unesa.ac.id"
                    className="text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base text-muted-foreground text-center md:text-left">
            © {currentYear > 2025 ? '2025 -' : ''} {currentYear} Infortic. Developed with by <a href="https://himafortic.mi.unesa.ac.id" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Himafortic</a>
          </p>
          <div className="flex items-center space-x-4">
            <Image
              src="/images/himafortic-logo.png"
              alt="Himafortic Logo"
              width={24}
              height={24}
              className="h-6 w-8"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
