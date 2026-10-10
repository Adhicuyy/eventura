'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'
import { EventListCard } from '@/components/event-list-card'
import { EventFilters, PRICE_MAX, type Filters } from '@/components/events/event-filters'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CATEGORIES, EVENTS, minPrice, type CategoryId } from '@/lib/events'

const DEFAULTS: Filters = { q: '', loc: '', from: '', to: '', cats: [], price: [0, PRICE_MAX], sort: 'popular' }

function initialFilters(params: URLSearchParams): Filters {
  const cat = params.get('cat') as CategoryId | null
  const date = params.get('date') ?? ''
  return {
    ...DEFAULTS,
    q: params.get('q') ?? '',
    loc: params.get('loc') ?? '',
    from: date,
    to: date,
    cats: cat && CATEGORIES.some((c) => c.id === cat) ? [cat] : [],
  }
}

export function EventsExplorer() {
  const params = useSearchParams()
  const [filters, setFilters] = useState<Filters>(() => initialFilters(params))
  const update = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }))
  const reset = () => setFilters(DEFAULTS)

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    const list = EVENTS.filter((e) => {
      if (q && ![e.name, e.city, e.province, e.venue].some((s) => s.toLowerCase().includes(q))) return false
      if (filters.loc && e.province !== filters.loc) return false
      if (filters.cats.length && !filters.cats.includes(e.category)) return false
      if (filters.from && e.endDate < filters.from) return false
      if (filters.to && e.startDate > filters.to) return false
      const p = minPrice(e)
      return p >= filters.price[0] && p <= filters.price[1]
    })
    const sorters: Record<string, (a: (typeof EVENTS)[number], b: (typeof EVENTS)[number]) => number> = {
      popular: (a, b) => b.rating - a.rating,
      date: (a, b) => a.startDate.localeCompare(b.startDate),
      'price-asc': (a, b) => minPrice(a) - minPrice(b),
      'price-desc': (a, b) => minPrice(b) - minPrice(a),
    }
    return list.sort(sorters[filters.sort])
  }, [filters])

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[260px_1fr] lg:py-8">
      <aside className="hidden h-fit rounded-2xl border bg-card p-5 shadow-sm lg:sticky lg:top-24 lg:block" aria-label="Filter event">
        <EventFilters filters={filters} onChange={update} onReset={reset} />
      </aside>

      <section aria-labelledby="results-title" className="min-w-0">
        <div className="mb-4 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <label htmlFor="events-q" className="sr-only">
                Cari event
              </label>
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                id="events-q"
                type="search"
                value={filters.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Cari event, kota, atau venue..."
                className="h-11 w-full rounded-xl border bg-card pl-9 pr-3 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              />
            </div>
            <Sheet>
              <SheetTrigger className="flex h-11 items-center gap-2 rounded-xl border bg-card px-4 text-sm font-medium lg:hidden">
                <SlidersHorizontal className="size-4" aria-hidden="true" />
                Filter
              </SheetTrigger>
              <SheetContent side="left" className="w-[88%] overflow-y-auto p-5">
                <SheetTitle className="sr-only">Filter event</SheetTitle>
                <EventFilters filters={filters} onChange={update} onReset={reset} />
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex items-center justify-between gap-3">
            <h1 id="results-title" className="text-lg font-semibold">
              {results.length} Event Ditemukan
            </h1>
            <label className="sr-only" htmlFor="sort-top">
              Urutkan
            </label>
            <select
              id="sort-top"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value })}
              className="h-9 rounded-lg border bg-card px-3 text-xs outline-none focus-visible:border-primary"
            >
              <option value="popular">Paling Populer</option>
              <option value="date">Tanggal Terdekat</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {results.length ? (
          <ul className="flex flex-col gap-4">
            {results.map((e) => (
              <li key={e.id}>
                <EventListCard event={e} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
            <p className="font-semibold">Tidak ada event yang cocok</p>
            <p className="mt-1 text-sm text-muted-foreground">Coba ubah kata kunci atau filter pencarian.</p>
            <button type="button" onClick={reset} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
              Reset Filter
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
