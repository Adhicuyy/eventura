import Link from 'next/link'
import { Hero } from '@/components/home/hero'
import { PopularEvents } from '@/components/home/popular-events'
import { CategoriesSection } from '@/components/home/categories-section'
import { NearbyBanner } from '@/components/home/nearby-banner'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="relative mx-auto -mt-10 max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-10 rounded-3xl bg-card p-5 shadow-sm md:p-8">
          <PopularEvents />
          <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-center">
            <CategoriesSection />
            <NearbyBanner />
          </div>
        </div>
      </div>
      <footer
        id="tentang"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 md:px-6"
      >
        <div className="flex flex-col items-center gap-4 border-t pt-8 text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/events" className="hover:text-foreground hover:underline">Event</Link>
            <Link href="/map" className="hover:text-foreground hover:underline">Destinasi</Link>
            <Link href="/calendar" className="hover:text-foreground hover:underline">Kalender</Link>
            <Link href="/about" className="hover:text-foreground hover:underline">Tentang Kami</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 Eventura. Jelajahi Indonesia lewat setiap acaranya.</p>
        </div>
      </footer>
    </main>
  )
}

