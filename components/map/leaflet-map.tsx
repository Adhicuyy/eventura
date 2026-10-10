'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { formatDateRange, getCategory, locationLabel, type EventItem } from '@/lib/events'

// Fix broken Leaflet default-icon URLs when bundled by webpack/Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function pinIcon(color: string, active: boolean) {
  const size = active ? 38 : 30
  return L.divIcon({
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 4],
    html: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C7.6 2 4 5.5 4 9.9c0 5.6 7 11.6 7.3 11.9.4.3 1 .3 1.4 0 .3-.3 7.3-6.3 7.3-11.9C20 5.5 16.4 2 12 2z" fill="${color}" stroke="#fff" stroke-width="1.6"/><circle cx="12" cy="10" r="3.2" fill="#fff"/></svg>`,
  })
}

function FlyTo({ target, zoom }: { target?: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    if (target) map.flyTo(target, zoom, { duration: 0.8 })
  }, [map, target, zoom])
  return null
}

export default function LeafletMap({
  events,
  center = [-2.5, 118],
  zoom = 5,
  selectedId,
  onSelect,
  showPopup = true,
  scrollWheelZoom = true,
}: {
  events: EventItem[]
  center?: [number, number]
  zoom?: number
  selectedId?: string
  onSelect?: (id: string) => void
  showPopup?: boolean
  scrollWheelZoom?: boolean
}) {
  const selected = useMemo(() => events.find((e) => e.id === selectedId), [events, selectedId])

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyTo target={selected?.coords} zoom={8} />
      {events.map((e) => (
        <Marker
          key={e.id}
          position={e.coords}
          icon={pinIcon(getCategory(e.category).color, e.id === selectedId)}
          eventHandlers={{ click: () => onSelect?.(e.id) }}
        >
          {showPopup && (
            <Popup>
              <div className="flex w-56 gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.image} alt="" className="size-16 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold" style={{ color: getCategory(e.category).color }}>
                    {getCategory(e.category).badge}
                  </span>
                  <p className="truncate text-sm font-semibold text-foreground">{e.name}</p>
                  <p className="text-[11px] text-muted-foreground">{formatDateRange(e.startDate, e.endDate)}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{locationLabel(e)}</p>
                  <Link href={`/events/${e.slug}`} className="mt-1 inline-block text-xs font-semibold !text-primary hover:underline">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  )
}
