import type { Metadata } from 'next'
import { MapExplorer } from '@/components/map/map-explorer'

export const metadata: Metadata = {
  title: 'Peta Event | Eventura',
  description: 'Jelajahi lokasi event wisata di seluruh Indonesia melalui peta interaktif.',
}

export default function MapPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Peta Event</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Temukan event di sekitarmu dengan peta interaktif. Klik penanda untuk melihat detail.
        </p>
      </div>
      <MapExplorer />
    </main>
  )
}

