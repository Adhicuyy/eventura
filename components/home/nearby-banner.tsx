import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

export function NearbyBanner() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl p-6 text-white" aria-labelledby="nearby-heading">
      <Image src="/images/nearby.png" alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d2a2a]/90 to-[#0d2a2a]/40" />
      <div className="flex items-end justify-between gap-4">
        <div className="max-w-56">
          <h2 id="nearby-heading" className="text-lg font-bold leading-snug">
            Temukan Event Di Sekitar Kamu
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-white/80">
            Gunakan lokasi saat ini untuk melihat event terdekat dari posisimu.
          </p>
          <Link
            href="/map?near=1"
            className="mt-4 inline-flex rounded-lg bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-card/90"
          >
            Lihat Event Terdekat
          </Link>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-card text-brand shadow-lg">
          <MapPin className="size-5" aria-hidden="true" />
        </span>
      </div>
    </section>
  )
}
