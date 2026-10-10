'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarDays, CheckCircle2, Minus, Plus } from 'lucide-react'
import { useAppStore } from '@/components/app-store'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { formatDateRange, formatRupiah, type Booking, type EventItem } from '@/lib/events'

const MAX_QTY = 10

export function BookingPanel({ event }: { event: EventItem }) {
  const { addBooking } = useAppStore()
  const [qty, setQty] = useState<Record<string, number>>({ [event.tickets[0].id]: 1 })
  const [confirmed, setConfirmed] = useState<Booking[] | null>(null)

  const total = event.tickets.reduce((sum, t) => sum + (qty[t.id] ?? 0) * t.price, 0)
  const count = Object.values(qty).reduce((a, b) => a + b, 0)

  function change(id: string, delta: number) {
    setQty((q) => ({ ...q, [id]: Math.min(MAX_QTY, Math.max(0, (q[id] ?? 0) + delta)) }))
  }

  function book() {
    const created = event.tickets
      .filter((t) => (qty[t.id] ?? 0) > 0)
      .map((t) => addBooking({ eventId: event.id, ticketId: t.id, quantity: qty[t.id], total: qty[t.id] * t.price }))
    setConfirmed(created)
  }

  return (
    <div id="booking" className="scroll-mt-24 rounded-2xl border bg-card p-5 shadow-sm">
      <h2 className="font-semibold">Tanggal & Tiket</h2>
      <div className="mt-4 flex items-center gap-3 rounded-xl border px-3 py-2.5">
        <CalendarDays className="size-4 text-muted-foreground" aria-hidden="true" />
        <div className="text-xs">
          <p className="font-semibold">{formatDateRange(event.startDate, event.endDate)}</p>
          <p className="text-muted-foreground">{event.time}</p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {event.tickets.map((t) => (
          <li key={t.id} className="flex items-center justify-between gap-3 rounded-xl border px-3 py-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{t.name}</p>
              <p className="text-sm font-bold">{formatRupiah(t.price)}</p>
            </div>
            <div className="flex items-center gap-1 rounded-lg border">
              <button
                type="button"
                onClick={() => change(t.id, -1)}
                disabled={!qty[t.id]}
                className="flex size-8 items-center justify-center disabled:opacity-40"
                aria-label={`Kurangi ${t.name}`}
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-semibold" aria-live="polite">
                {qty[t.id] ?? 0}
              </span>
              <button
                type="button"
                onClick={() => change(t.id, 1)}
                disabled={(qty[t.id] ?? 0) >= MAX_QTY}
                className="flex size-8 items-center justify-center disabled:opacity-40"
                aria-label={`Tambah ${t.name}`}
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">Total ({count} tiket)</span>
        <span className="text-lg font-bold text-primary">{formatRupiah(total)}</span>
      </div>
      <button
        type="button"
        onClick={book}
        disabled={count === 0}
        className="mt-4 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        Pesan Sekarang
      </button>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">Mode demo - tidak ada pembayaran sungguhan.</p>

      <Dialog open={!!confirmed} onOpenChange={(o) => !o && setConfirmed(null)}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center text-center">
            <CheckCircle2 className="size-12 text-brand" aria-hidden="true" />
            <DialogTitle className="mt-3 text-lg">Pemesanan Berhasil!</DialogTitle>
            <DialogDescription className="mt-1">
              Tiket {event.name} sudah tersimpan di Event Saya.
            </DialogDescription>
          </div>
          <ul className="flex flex-col gap-2 rounded-xl bg-secondary p-3 text-sm">
            {confirmed?.map((b) => (
              <li key={b.code} className="flex justify-between gap-2">
                <span className="text-muted-foreground">
                  {b.code} · {b.quantity}x
                </span>
                <span className="font-semibold">{formatRupiah(b.total)}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/my-events"
            className="flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
          >
            Lihat Event Saya
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  )
}
