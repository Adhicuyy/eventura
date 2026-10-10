import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, MapPin } from 'lucide-react'
import { CategoryBadge } from '@/components/category-badge'
import { FavoriteButton } from '@/components/favorite-button'
import { formatDateRange, formatRupiah, locationLabel, minPrice, type EventItem } from '@/lib/events'

export function EventCard({ event, className }: { event: EventItem; className?: string }) {
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md ${className ?? ''}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image || '/placeholder.svg'}
          alt={event.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <CategoryBadge category={event.category} solid className="absolute left-3 top-3" />
        <FavoriteButton eventId={event.id} eventName={event.name} className="absolute right-3 top-3 z-10" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs text-muted-foreground">{formatDateRange(event.startDate, event.endDate)}</p>
        <h3 className="text-pretty font-semibold leading-snug">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {event.name}
          </Link>
        </h3>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden="true" />
          {locationLabel(event)}
        </p>
        <div className="mt-auto flex items-end justify-between pt-3">
          <p className="text-xs text-muted-foreground">
            Mulai dari <span className="text-sm font-semibold text-primary">{formatRupiah(minPrice(event))}</span>
          </p>
          <span className="flex size-7 items-center justify-center rounded-full border text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ChevronRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  )
}
