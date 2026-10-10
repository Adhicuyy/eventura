'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, Heart, Home, Map, User } from 'lucide-react'
import { isActive } from '@/components/site-header'
import { cn } from '@/lib/utils'

const ITEMS = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/events', label: 'Event', icon: CalendarDays },
  { href: '/map', label: 'Peta', icon: Map },
  { href: '/my-events?section=favorit', label: 'Favorit', icon: Heart, match: '#favorit' },
  { href: '/my-events', label: 'Akun', icon: User },
]

export function MobileNav() {
  const pathname = usePathname()
  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ href, label, icon: Icon, match }) => {
          const active = isActive(pathname, match ?? href)
          return (
            <li key={label}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
