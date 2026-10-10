'use client'

import { Slider } from '@/components/ui/slider'
import { CATEGORIES, CITIES, formatRupiah, type CategoryId } from '@/lib/events'

export const PRICE_MAX = 1500000

export type Filters = {
  q: string
  loc: string
  from: string
  to: string
  cats: CategoryId[]
  price: [number, number]
  sort: string
}

const fieldClass =
  'h-10 w-full rounded-lg border bg-card px-3 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20'

export function EventFilters({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  onReset: () => void
}) {
  function toggleCat(id: CategoryId) {
    onChange({ cats: filters.cats.includes(id) ? filters.cats.filter((c) => c !== id) : [...filters.cats, id] })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Filter</h2>
        <button type="button" onClick={onReset} className="text-xs font-medium text-primary hover:underline">
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="f-loc" className="text-xs font-semibold">
          Lokasi
        </label>
        <select id="f-loc" value={filters.loc} onChange={(e) => onChange({ loc: e.target.value })} className={fieldClass}>
          <option value="">Semua lokasi</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-xs font-semibold">Tanggal</legend>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1 text-[11px] text-muted-foreground">
            Dari
            <input type="date" value={filters.from} onChange={(e) => onChange({ from: e.target.value })} className={fieldClass} />
          </label>
          <label className="flex flex-col gap-1 text-[11px] text-muted-foreground">
            Sampai
            <input type="date" value={filters.to} min={filters.from || undefined} onChange={(e) => onChange({ to: e.target.value })} className={fieldClass} />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold">Kategori</legend>
        <div className="flex flex-col gap-2.5">
          {CATEGORIES.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                checked={filters.cats.includes(c.id)}
                onChange={() => toggleCat(c.id)}
                className="size-4 rounded accent-brand"
              />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        <span id="f-price" className="text-xs font-semibold">
          Harga
        </span>
        <p className="text-xs text-muted-foreground">
          {formatRupiah(filters.price[0])} - {formatRupiah(filters.price[1])}
        </p>
        <Slider
          aria-labelledby="f-price"
          min={0}
          max={PRICE_MAX}
          step={25000}
          value={filters.price}
          onValueChange={(v) => onChange({ price: v as [number, number] })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="f-sort" className="text-xs font-semibold">
          Urutkan
        </label>
        <select id="f-sort" value={filters.sort} onChange={(e) => onChange({ sort: e.target.value })} className={fieldClass}>
          <option value="popular">Terpopuler</option>
          <option value="date">Tanggal Terdekat</option>
          <option value="price-asc">Harga Terendah</option>
          <option value="price-desc">Harga Tertinggi</option>
        </select>
      </div>
    </div>
  )
}
