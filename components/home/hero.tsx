import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { HeroSearch } from '@/components/home/hero-search'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/hero.png"
        alt="Pura Bali di perbukitan saat matahari terbenam"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d2a2a]/85 via-[#0d2a2a]/45 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-24 pt-14 md:px-6 md:pb-28 md:pt-20">
        <div className="max-w-xl text-white">
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Temukan Event Menarik di Setiap{' '}
            <span className="font-script text-5xl font-normal text-primary md:text-6xl">Destinasi</span>
          </h1>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-white/85">
            Dari festival budaya, konser, hingga pasar malam semua ada di sini. Rencanakan perjalananmu berdasarkan event
            yang kamu suka!
          </p>
        </div>
        <div className="flex items-end justify-between gap-6">
          <HeroSearch />
          <p className="hidden items-start gap-2 text-lg font-semibold leading-snug text-white xl:flex">
            <Sparkles className="mt-1 size-5 text-primary" aria-hidden="true" />
            <span>
              Jelajahi
              <br />
              Cerita di Balik
              <br />
              Setiap Acara
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
