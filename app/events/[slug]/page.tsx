import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react'
import { CategoryBadge } from '@/components/category-badge'
import { BookingPanel } from '@/components/event-detail/booking-panel'
import { DetailTabs } from '@/components/event-detail/detail-tabs'
import { HeroActions } from '@/components/event-detail/hero-actions'
import { EVENTS, formatDateRange, formatRupiah, getEventBySlug, locationLabel, minPrice } from '@/lib/events'

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) return { title: 'Event tidak ditemukan | Eventura' }
  return { title: `${event.name} | Eventura`, description: event.description }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) notFound()

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[21/8]">
        <Image src={event.image || '/placeholder.svg'} alt={event.name} fill priority sizes="(min-width: 1280px) 1240px, 100vw" className="object-cover" />
        <HeroActions eventId={event.id} eventName={event.name} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 rounded-2xl border bg-card p-5 shadow-sm md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-balance text-2xl font-bold md:text-3xl">{event.name}</h1>
            <CategoryBadge category={event.category} solid />
          </div>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6">
            <li className="flex items-center gap-2">
              <CalendarDays className="size-4" aria-hidden="true" />
              {formatDateRange(event.startDate, event.endDate)}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4" aria-hidden="true" />
              {event.time}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              {event.venue}, {event.province}
            </li>
            <li className="flex items-center gap-2">
              <Ticket className="size-4" aria-hidden="true" />
              Mulai dari <span className="font-bold text-foreground">{formatRupiah(minPrice(event))}</span>
            </li>
          </ul>
          <div className="mt-6">
            <DetailTabs event={event} />
          </div>
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:h-fit" aria-label="Pemesanan tiket">
          <BookingPanel event={event} />
          <div className="rounded-2xl border bg-card p-5 text-sm shadow-sm">
            <h2 className="font-semibold">Lokasi Event</h2>
            <p className="mt-2 flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {event.venue} · {locationLabel(event)}
            </p>
            <a
              href={`https://www.google.com/maps?q=${event.coords[0]},${event.coords[1]}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
            >
              Lihat di Google Maps
            </a>
          </div>
        </aside>
      </div>
    </main>
  )
}
