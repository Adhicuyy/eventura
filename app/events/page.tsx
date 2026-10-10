import { Suspense } from 'react'
import type { Metadata } from 'next'
import { EventsExplorer } from '@/components/events/events-explorer'

export const metadata: Metadata = {
  title: 'Daftar Event | Eventura',
  description: 'Cari dan filter event wisata di seluruh Indonesia berdasarkan lokasi, tanggal, kategori, dan harga.',
}

export default function EventsPage() {
  return (
    <Suspense>
      <EventsExplorer />
    </Suspense>
  )
}
