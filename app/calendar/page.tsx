import type { Metadata } from 'next'
import { EventCalendar } from '@/components/calendar/event-calendar'

export const metadata: Metadata = {
  title: 'Kalender Event | Eventura',
  description: 'Lihat jadwal event wisata Indonesia dalam tampilan kalender bulanan.',
}

export default function CalendarPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-8">
      <h1 className="mb-5 text-2xl font-bold">Kalender Event</h1>
      <EventCalendar />
    </main>
  )
}
