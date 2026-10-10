import { Suspense } from 'react'
import type { Metadata } from 'next'
import { MyEvents } from '@/components/dashboard/my-events'

export const metadata: Metadata = {
  title: 'Event Saya | Eventura',
  description: 'Kelola tiket, event favorit, dan riwayat transaksi kamu di Eventura.',
}

export default function MyEventsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-8">
      <Suspense>
        <MyEvents />
      </Suspense>
    </main>
  )
}
