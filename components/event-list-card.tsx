import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ChevronRight, MapPin } from 'lucide-react'
import { CategoryBadge } from '@/components/category-badge'
import { FavoriteButton } from '@/components/favorite-button'
import { formatDateRange, formatRupiah, minPrice, type EventItem } from '@/lib/events'

export function EventListCard({ event }: { event: EventItem }) {
  return (
    <article className="group relative flex gap-4 rounded-2xl border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-xl sm:w-44">
        <Image src={event.image || '/placeholder.svg'} alt={event.name} fill sizes="176px" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 py-1">
        <div className="flex items-start justify-between gap-2">
          <CategoryBadge category={event.category} />
          <FavoriteButton eventId={event.id} eventName={event.name} variant="plain" className="relative z-10 -mr-1 -mt-1" />
        </div>
        <h3 className="truncate font-semibold">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {event.name}
          </Link>
        </h3>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {formatDateRange(event.startDate, event.endDate)}
        </p>
        <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{event.venue}</span>
        </p>
        <div className="mt-auto flex items-end justify-between">
          <p className="text-xs text-muted-foreground">
            Mulai dari <span className="text-sm font-semibold text-foreground">{formatRupiah(minPrice(event))}</span>
          </p>
          <span className="flex size-7 items-center justify-center rounded-full border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ChevronRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  )
}
