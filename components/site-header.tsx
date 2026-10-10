'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, Search } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Beranda' },
  { href: '/events', label: 'Event' },
  { href: '/map', label: 'Destinasi' },
  { href: '/calendar', label: 'Kalender' },
  { href: '/about', label: 'Tentang Kami' },
]

export function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')?.toString().trim() ?? ''
    router.push(q ? `/events?q=${encodeURIComponent(q)}` : '/events')
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 md:px-6">
        <Logo />
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
                {active && <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary" />}
              </Link>
            )
          })}
        </nav>
        <form onSubmit={onSubmit} role="search" className="ml-auto hidden max-w-xs flex-1 lg:block">
          <label htmlFor="header-search" className="sr-only">
            Cari event
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="header-search"
              name="q"
              placeholder="Cari event, destinasi, atau lokasi..."
              className="h-10 w-full rounded-full border bg-secondary/60 pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          </div>
        </form>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            href="/events"
            className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-secondary lg:hidden"
            aria-label="Cari event"
          >
            <Search className="size-5" />
          </Link>
          <button
            type="button"
            className="relative flex size-9 items-center justify-center rounded-full text-foreground hover:bg-secondary"
            aria-label="Notifikasi"
          >
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-card" />
          </button>
          <Link href="/my-events" aria-label="Profil Andi Pratama" className="rounded-full ring-2 ring-transparent hover:ring-primary/40">
            <Image src="/images/avatar.png" alt="" width={36} height={36} className="size-9 rounded-full object-cover" />
          </Link>
        </div>
      </div>
    </header>
  )
}
