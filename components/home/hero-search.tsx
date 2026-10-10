'use client'

import { useRouter } from 'next/navigation'
import { CalendarDays, LayoutGrid, MapPin } from 'lucide-react'
import { CATEGORIES, CITIES } from '@/lib/events'

const fieldClass =
  'w-full bg-transparent text-xs text-muted-foreground outline-none [&::-webkit-calendar-picker-indicator]:opacity-60'

export function HeroSearch() {
  const router = useRouter()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    for (const key of ['loc', 'date', 'cat']) {
      const v = data.get(key)?.toString()
      if (v) params.set(key, v)
    }
    router.push(`/events${params.size ? `?${params}` : ''}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Cari event"
      className="grid w-full max-w-3xl grid-cols-1 gap-2 rounded-2xl bg-card p-3 shadow-xl sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center sm:gap-0 sm:rounded-full sm:p-2 sm:pl-4"
    >
      <label className="flex items-center gap-3 rounded-xl px-2 py-2 sm:border-r sm:py-1">
        <MapPin className="size-5 shrink-0 text-foreground" aria-hidden="true" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm font-medium">Lokasi</span>
          <select name="loc" defaultValue="" className={fieldClass}>
            <option value="">Pilih lokasi</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </span>
      </label>
      <label className="flex items-center gap-3 rounded-xl px-2 py-2 sm:border-r sm:px-4 sm:py-1">
        <CalendarDays className="size-5 shrink-0 text-foreground" aria-hidden="true" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm font-medium">Tanggal</span>
          <input type="date" name="date" className={fieldClass} />
        </span>
      </label>
      <label className="flex items-center gap-3 rounded-xl px-2 py-2 sm:px-4 sm:py-1">
        <LayoutGrid className="size-5 shrink-0 text-foreground" aria-hidden="true" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm font-medium">Kategori</span>
          <select name="cat" defaultValue="" className={fieldClass}>
            <option value="">Semua kategori</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </span>
      </label>
      <button
        type="submit"
        className="h-12 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-colors hover:bg-primary/90"
      >
        Cari Event
      </button>
    </form>
  )
}
