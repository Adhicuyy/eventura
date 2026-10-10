import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EventCard } from '@/components/event-card'
import { EVENTS } from '@/lib/events'

export function PopularEvents() {
  const popular = EVENTS.slice(0, 4)
  return (
    <section aria-labelledby="popular-heading">
      <div className="mb-5 flex items-center justify-between">
        <h2 id="popular-heading" className="text-xl font-bold tracking-tight">
          Event Populer Saat Ini
        </h2>
        <Link href="/events" className="flex items-center gap-1 text-sm font-medium text-brand hover:underline">
          Lihat Semua <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {popular.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  )
}
