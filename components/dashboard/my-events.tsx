'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CalendarDays, Heart, LayoutDashboard, MapPin, Receipt, Settings, Ticket } from 'lucide-react'
import { useAppStore } from '@/components/app-store'
import { EventCard } from '@/components/event-card'
import {
  DEMO_TODAY,
  PAST_BOOKINGS,
  formatDateRange,
  formatRupiah,
  getEventById,
  locationLabel,
  type Booking,
} from '@/lib/events'
import { cn } from '@/lib/utils'

const SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'event-saya', label: 'Event Saya', icon: Ticket },
  { id: 'favorit', label: 'Favorit', icon: Heart },
  { id: 'riwayat', label: 'Riwayat Transaksi', icon: Receipt },
  { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

function BookingRow({ booking, done }: { booking: Booking; done?: boolean }) {
  const e = getEventById(booking.eventId)
  if (!e) return null
  const ticket = e.tickets.find((t) => t.id === booking.ticketId)
  return (
    <li className="flex flex-col gap-3 rounded-2xl border bg-card p-3 sm:flex-row sm:items-center">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl sm:size-24 sm:aspect-auto">
        <Image src={e.image || '/placeholder.svg'} alt={e.name} fill sizes="(min-width: 640px) 96px, 100vw" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{e.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {formatDateRange(e.startDate, e.endDate)} · {e.time}
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden="true" />
          {locationLabel(e)}
        </p>
        <p className="mt-1.5 text-xs">
          <span className="text-muted-foreground">{booking.code} · </span>
          {booking.quantity}x {ticket?.name} · <span className="font-semibold">{formatRupiah(booking.total)}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 sm:flex-col sm:items-end">
        <span className={cn('rounded-full px-2.5 py-0.5 text-[11px] font-semibold', done ? 'bg-secondary text-muted-foreground' : 'bg-brand/10 text-brand')}>
          {done ? 'Selesai' : 'Terkonfirmasi'}
        </span>
        <Link
          href={`/events/${e.slug}`}
          className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/5"
        >
          Lihat Detail
        </Link>
      </div>
    </li>
  )
}

export function MyEvents() {
  const params = useSearchParams()
  const initial = (SECTIONS.find((s) => s.id === params.get('section'))?.id ?? 'event-saya') as SectionId
  const [section, setSection] = useState<SectionId>(initial)
  const [tab, setTab] = useState<'upcoming' | 'done'>('upcoming')
  const { bookings, favorites } = useAppStore()

  const upcoming = bookings.filter((b) => (getEventById(b.eventId)?.endDate ?? '') >= DEMO_TODAY)
  const done = [...bookings.filter((b) => (getEventById(b.eventId)?.endDate ?? '') < DEMO_TODAY), ...PAST_BOOKINGS]
  const all = [...bookings, ...PAST_BOOKINGS]
  const spent = all.reduce((s, b) => s + b.total, 0)

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-2xl border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3 border-b pb-4">
          <Image src="/images/avatar.png" alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate font-semibold">Andi Pratama</p>
            <p className="truncate text-xs text-muted-foreground">andipratama@email.com</p>
          </div>
        </div>
        <nav aria-label="Menu akun" className="-mx-1 mt-3 flex gap-1 overflow-x-auto px-1 lg:flex-col">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              aria-current={section === id ? 'page' : undefined}
              className={cn(
                'flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                section === id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="min-w-0 rounded-2xl border bg-card p-4 shadow-sm md:p-6" aria-labelledby="section-title">
        <h1 id="section-title" className="text-xl font-bold">
          {SECTIONS.find((s) => s.id === section)?.label}
        </h1>

        {section === 'dashboard' && (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Event Mendatang', value: upcoming.length },
              { label: 'Event Favorit', value: favorites.length },
              { label: 'Total Belanja', value: formatRupiah(spent) },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border p-4">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-xl font-bold">{s.value}</p>
              </div>
            ))}
            <div className="sm:col-span-3">
              <h2 className="mb-3 mt-2 text-sm font-semibold">Event Terdekat</h2>
              <ul className="flex flex-col gap-3">
                {upcoming.slice(0, 2).map((b) => (
                  <BookingRow key={b.code} booking={b} />
                ))}
              </ul>
            </div>
          </div>
        )}

        {section === 'event-saya' && (
          <>
            <div role="tablist" aria-label="Status event" className="mt-4 inline-flex gap-1 rounded-full bg-secondary p-1">
              {(
                [
                  ['upcoming', 'Mendatang'],
                  ['done', 'Selesai'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
                    tab === id ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <ul role="tabpanel" className="mt-4 flex flex-col gap-3">
              {(tab === 'upcoming' ? upcoming : done).map((b) => (
                <BookingRow key={b.code} booking={b} done={tab === 'done'} />
              ))}
            </ul>
          </>
        )}

        {section === 'favorit' &&
          (favorites.length ? (
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {favorites.map((id) => {
                const e = getEventById(id)
                return e ? (
                  <li key={id}>
                    <EventCard event={e} />
                  </li>
                ) : null
              })}
            </ul>
          ) : (
            <p className="mt-5 rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              Belum ada event favorit.{' '}
              <Link href="/events" className="font-semibold text-primary">
                Jelajahi event
              </Link>
            </p>
          ))}

        {section === 'riwayat' && (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2 font-medium">Kode</th>
                  <th className="py-2 font-medium">Event</th>
                  <th className="py-2 font-medium">Tanggal Pesan</th>
                  <th className="py-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {all.map((b) => (
                  <tr key={b.code} className="border-b last:border-0">
                    <td className="py-3 text-xs text-muted-foreground">{b.code}</td>
                    <td className="py-3 font-medium">{getEventById(b.eventId)?.name}</td>
                    <td className="py-3 text-muted-foreground">{b.bookedAt}</td>
                    <td className="py-3 text-right font-semibold">{formatRupiah(b.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {section === 'pengaturan' && (
          <form className="mt-5 grid max-w-md gap-4" onSubmit={(e) => e.preventDefault()}>
            {[
              ['Nama Lengkap', 'Andi Pratama', 'text'],
              ['Email', 'andipratama@email.com', 'email'],
              ['Nomor Telepon', '0812 3456 7890', 'tel'],
            ].map(([label, value, type]) => (
              <label key={label} className="flex flex-col gap-1.5 text-xs font-semibold">
                {label}
                <input
                  type={type}
                  defaultValue={value}
                  className="h-10 rounded-lg border px-3 text-sm font-normal outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                />
              </label>
            ))}
            <button type="submit" className="h-10 w-fit rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground">
              Simpan Perubahan
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
