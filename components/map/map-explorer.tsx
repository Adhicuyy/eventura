'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Search } from 'lucide-react'
import { EventMap } from '@/components/map/event-map'
import { CATEGORIES, EVENTS, formatDateRange, getCategory, locationLabel, type CategoryId } from '@/lib/events'
import { cn } from '@/lib/utils'

export function MapExplorer() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<CategoryId | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string>()

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    return EVENTS.filter(
      (e) =>
        (cat === 'all' || e.category === cat) &&
        (!term || [e.name, e.city, e.province, e.venue].some((s) => s.toLowerCase().includes(term))),
    )
  }, [q, cat])

  const chip = (active: boolean) =>
    cn(
      'shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors',
      active ? 'border-brand bg-brand text-brand-foreground' : 'bg-card text-muted-foreground hover:text-foreground',
    )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:w-72">
          <label htmlFor="map-q" className="sr-only">
            Cari lokasi event
          </label>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="map-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari lokasi event..."
            className="h-10 w-full rounded-full border bg-card pl-9 pr-3 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0" role="group" aria-label="Filter kategori">
          <button type="button" aria-pressed={cat === 'all'} onClick={() => setCat('all')} className={chip(cat === 'all')}>
            Semua
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)} className={chip(cat === c.id)}>
              {c.badge}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="relative z-0 h-[350px] md:h-[450px] lg:h-[600px] w-full overflow-hidden rounded-2xl border shadow-sm">
          <EventMap events={results} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <section aria-label="Daftar event di peta" className="flex flex-col rounded-2xl border bg-card p-3 shadow-sm h-[400px] lg:h-[600px]">
          <p className="shrink-0 px-1 pb-2 text-xs text-muted-foreground">{results.length} event ditemukan</p>
          <ul className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
            {results.map((e) => (
              <li key={e.id}>
                <div
                  className={cn(
                    'flex gap-3 rounded-xl border p-2.5 transition-colors',
                    selectedId === e.id ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-secondary',
                  )}
                >
                  <button type="button" onClick={() => setSelectedId(e.id)} className="flex min-w-0 flex-1 gap-3 text-left" aria-label={`Tampilkan ${e.name} di peta`}>
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                      <Image src={e.image || '/placeholder.svg'} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="text-[10px] font-semibold" style={{ color: getCategory(e.category).color }}>
                        {getCategory(e.category).badge}
                      </span>
                      <span className="block truncate text-sm font-semibold">{e.name}</span>
                      <span className="block text-[11px] text-muted-foreground">{formatDateRange(e.startDate, e.endDate)}</span>
                      <span className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                        <MapPin className="size-3 shrink-0" aria-hidden="true" />
                        {locationLabel(e)}
                      </span>
                    </span>
                  </button>
                  <Link href={`/events/${e.slug}`} className="self-center whitespace-nowrap text-xs font-semibold text-primary hover:underline">
                    Detail
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
