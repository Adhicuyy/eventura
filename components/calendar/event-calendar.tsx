'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react'
import { CategoryBadge } from '@/components/category-badge'
import { DEMO_TODAY, EVENTS, MONTHS_FULL, getCategory, isOnDate, locationLabel, toIso } from '@/lib/events'
import { cn } from '@/lib/utils'

const WEEKDAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

export function EventCalendar() {
  const [year, setYear] = useState(2025)
  const [month, setMonth] = useState(5)
  const [selected, setSelected] = useState(DEMO_TODAY)

  const cells = useMemo(() => {
    const offset = (new Date(year, month, 1).getDay() + 6) % 7
    const days = new Date(year, month + 1, 0).getDate()
    return [...Array<null>(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
  }, [year, month])

  const dayEvents = useMemo(() => EVENTS.filter((e) => isOnDate(e, selected)), [selected])
  const [sy, sm, sd] = selected.split('-').map(Number)

  function shift(delta: number) {
    const d = new Date(year, month + delta, 1)
    setYear(d.getFullYear())
    setMonth(d.getMonth())
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <section aria-labelledby="cal-title" className="rounded-2xl border bg-card p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="cal-title" className="font-semibold" aria-live="polite">
            {MONTHS_FULL[month]} {year}
          </h2>
          <div className="flex gap-1">
            <button type="button" onClick={() => shift(-1)} className="flex size-9 items-center justify-center rounded-full border hover:bg-secondary" aria-label="Bulan sebelumnya">
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" onClick={() => shift(1)} className="flex size-9 items-center justify-center rounded-full border hover:bg-secondary" aria-label="Bulan berikutnya">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center" role="grid" aria-labelledby="cal-title">
          {WEEKDAYS.map((w) => (
            <div key={w} role="columnheader" className="py-2 text-xs font-medium text-muted-foreground">
              {w}
            </div>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={`e-${i}`} aria-hidden="true" />
            const iso = toIso(year, month, d)
            const events = EVENTS.filter((e) => isOnDate(e, iso))
            const isSelected = iso === selected
            const isToday = iso === DEMO_TODAY
            return (
              <button
                key={iso}
                type="button"
                role="gridcell"
                aria-selected={isSelected}
                aria-label={`${d} ${MONTHS_FULL[month]}, ${events.length} event`}
                onClick={() => setSelected(iso)}
                className={cn(
                  'mx-auto flex aspect-square w-full max-w-14 flex-col items-center justify-center gap-1 rounded-full text-sm transition-colors',
                  isSelected ? 'bg-primary font-semibold text-primary-foreground' : 'hover:bg-secondary',
                  !isSelected && isToday && 'ring-1 ring-primary',
                )}
              >
                {d}
                <span className="flex h-1.5 gap-0.5" aria-hidden="true">
                  {events.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: isSelected ? '#fff' : getCategory(e.category).color }}
                    />
                  ))}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="day-title" className="rounded-2xl border bg-card p-4 shadow-sm md:p-6">
        <h2 id="day-title" className="font-semibold">
          {selected === DEMO_TODAY ? 'Event Hari Ini' : `Event ${sd} ${MONTHS_FULL[sm - 1]} ${sy}`}
        </h2>
        {dayEvents.length ? (
          <ul className="mt-4 flex flex-col gap-3">
            {dayEvents.map((e) => (
              <li key={e.id} className="relative flex gap-3 rounded-xl border p-3 hover:shadow-sm">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                  <Image src={e.image || '/placeholder.svg'} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/events/${e.slug}`} className="truncate text-sm font-semibold after:absolute after:inset-0">
                      {e.name}
                    </Link>
                    <CategoryBadge category={e.category} className="shrink-0" />
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3" aria-hidden="true" />
                    <span className="truncate">{locationLabel(e)}</span>
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3" aria-hidden="true" />
                    {e.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            Belum ada event pada tanggal ini.
          </p>
        )}
        <Link
          href="/events"
          className="mt-4 flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Lihat Semua Event
        </Link>
      </section>
    </div>
  )
}
