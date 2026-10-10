'use client'

import dynamic from 'next/dynamic'

export const EventMap = dynamic(() => import('@/components/map/leaflet-map'), {
  ssr: false,
  loading: () => <div style={{ height: '100%', width: '100%' }} className="animate-pulse bg-secondary" aria-label="Memuat peta" />,
})
