'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Star } from 'lucide-react'
import { CATEGORY_ICONS } from '@/components/category-icon'
import { EventMap } from '@/components/map/event-map'
import { formatRupiah, getCategory, locationLabel, type EventItem } from '@/lib/events'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'tentang', label: 'Tentang' },
  { id: 'lokasi', label: 'Lokasi' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'tiket', label: 'Tiket' },
  { id: 'ulasan', label: 'Ulasan' },
] as const

type TabId = (typeof TABS)[number]['id']

export function DetailTabs({ event }: { event: EventItem }) {
  const [tab, setTab] = useState<TabId>('tentang')
  const cat = getCategory(event.category)
  const Icon = CATEGORY_ICONS[event.category]

  return (
    <div>
      <div role="tablist" aria-label="Informasi event" className="flex gap-1 overflow-x-auto border-b">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={cn(
              '-mb-px shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              tab === t.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-5">
        {tab === 'tentang' && (
          <div className="flex flex-col gap-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {event.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm">
                  <span className="flex size-9 items-center justify-center rounded-lg" style={{ backgroundColor: cat.soft, color: cat.color }}>
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'lokasi' && (
          <div className="flex flex-col gap-3">
            <div className="h-72 overflow-hidden rounded-xl border">
              <EventMap events={[event]} center={event.coords} zoom={12} showPopup={false} scrollWheelZoom={false} />
            </div>
            <p className="flex items-center gap-2 text-sm">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              {event.venue} · {locationLabel(event)}
            </p>
          </div>
        )}

        {tab === 'galeri' && (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {event.gallery.map((src, i) => (
              <li key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={src || '/placeholder.svg'} alt={`${event.name} foto ${i + 1}`} fill sizes="(min-width: 640px) 200px, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        )}

        {tab === 'tiket' && (
          <ul className="flex flex-col gap-3">
            {event.tickets.map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.note}</p>
                </div>
                <p className="font-bold text-primary">{formatRupiah(t.price)}</p>
              </li>
            ))}
          </ul>
        )}

        {tab === 'ulasan' && (
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 text-sm">
              <Star className="size-4 fill-primary text-primary" aria-hidden="true" />
              <span className="font-semibold">{event.rating}</span>
              <span className="text-muted-foreground">dari {event.reviews.length} ulasan</span>
            </p>
            <ul className="flex flex-col gap-3">
              {event.reviews.map((r) => (
                <li key={r.name} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{r.name}</p>
                    <span className="flex" aria-label={`${r.rating} dari 5 bintang`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={cn('size-3.5', i < r.rating ? 'fill-primary text-primary' : 'text-border')} aria-hidden="true" />
                      ))}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
