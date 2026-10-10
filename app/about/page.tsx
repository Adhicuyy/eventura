import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Users,
  Calendar,
  Globe,
  Heart,
  Shield,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tentang Kami | Eventura',
  description:
    'Eventura adalah platform event wisata Indonesia yang membantu wisatawan menemukan festival budaya, konser, pameran, dan berbagai event menarik di seluruh Nusantara.',
}

const STATS = [
  { icon: Calendar, label: 'Event Aktif', value: '500+', color: '#f4773b' },
  { icon: MapPin, label: 'Kota di Indonesia', value: '30+', color: '#17695d' },
  { icon: Users, label: 'Pengguna Aktif', value: '120K+', color: '#7c5ce6' },
  { icon: Star, label: 'Rating Rata-rata', value: '4.8', color: '#f08a2a' },
]

const VALUES = [
  {
    icon: Globe,
    title: 'Jelajahi Nusantara',
    desc: 'Kami percaya setiap sudut Indonesia menyimpan cerita dan pengalaman unik yang layak untuk ditemukan dan dinikmati.',
    color: '#17695d',
    soft: '#e6f2f0',
  },
  {
    icon: Heart,
    title: 'Cinta Budaya Lokal',
    desc: 'Mendukung event lokal berarti menjaga warisan budaya bangsa tetap hidup dan berkembang untuk generasi mendatang.',
    color: '#ef5b5b',
    soft: '#fdecec',
  },
  {
    icon: Shield,
    title: 'Terpercaya & Aman',
    desc: 'Setiap event yang kami tampilkan telah terverifikasi. Transaksi tiket terjamin aman dengan sistem enkripsi terkini.',
    color: '#2f86d6',
    soft: '#e8f2fb',
  },
  {
    icon: TrendingUp,
    title: 'Terus Berkembang',
    desc: 'Kami selalu berinovasi untuk memberikan pengalaman terbaik — dari pencarian event hingga pembelian tiket yang mudah.',
    color: '#7c5ce6',
    soft: '#f0ecfd',
  },
]

const TEAM = [
  {
    name: 'Andi Pratama',
    role: 'Co-Founder & CEO',
    img: '/images/avatar.png',
    bio: 'Pecinta wisata budaya yang terobsesi membangun ekosistem event Indonesia.',
  },
  {
    name: 'Sinta Maharani',
    role: 'Head of Product',
    img: '/images/ubud-food.png',
    bio: 'Desainer UX berpengalaman yang memastikan setiap perjalanan pengguna terasa mulus.',
  },
  {
    name: 'Rizky Pratama',
    role: 'CTO',
    img: '/images/dewa19.png',
    bio: 'Insinyur software yang membangun infrastruktur Eventura dari nol hingga skala nasional.',
  },
]

const MILESTONES = [
  { year: '2022', title: 'Eventura Lahir', desc: 'Diluncurkan di Bali dengan 20 event perdana.' },
  { year: '2023', title: 'Ekspansi Nasional', desc: 'Meraih 50+ kota dan 50.000 pengguna aktif.' },
  { year: '2024', title: 'Platform Terpercaya', desc: 'Meraih penghargaan Best Travel-Tech Startup Indonesia.' },
  { year: '2025', title: 'Lebih dari 500 Event', desc: 'Kini melayani 120.000+ wisatawan di seluruh Nusantara.' },
]

export default function AboutPage() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Destinasi wisata Indonesia"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d2a2a]/90 via-[#0d2a2a]/60 to-[#0d2a2a]/30" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-20 pt-16 md:px-6 md:pb-28 md:pt-24">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            Tentang Eventura
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Menghubungkan Wisatawan dengan{' '}
            <span className="font-script text-5xl font-normal text-primary md:text-6xl lg:text-7xl">
              Cerita Nusantara
            </span>
          </h1>
          <p className="max-w-xl text-pretty leading-relaxed text-white/80 md:text-lg">
            Eventura hadir untuk memudahkan setiap orang menemukan dan menikmati ribuan event menarik — dari festival
            budaya, konser musik, pameran seni, hingga pasar malam di seluruh Indonesia.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/events"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Jelajahi Event <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/map"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-white/20 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
            >
              <MapPin className="size-4" aria-hidden="true" /> Lihat Peta
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section aria-label="Statistik Eventura" className="mx-auto -mt-8 max-w-5xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-card p-4 shadow-lg md:grid-cols-4 md:gap-4 md:p-6">
          {STATS.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex flex-col items-center gap-2 rounded-xl p-4 text-center">
              <span
                className="flex size-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: color + '1a', color }}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="text-2xl font-bold tracking-tight" style={{ color }}>
                {value}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">Misi Kami</p>
            <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Setiap Perjalanan Punya{' '}
              <span className="text-primary">Cerita yang Layak Diceritakan</span>
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Kami percaya bahwa perjalanan terbaik bukan hanya soal destinasi, melainkan tentang pengalaman yang kamu
              rasakan di sana. Eventura hadir untuk memastikan setiap wisatawan tidak melewatkan satu pun momen berharga.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Dengan menggabungkan teknologi modern dan kecintaan kami pada budaya Indonesia, kami membangun platform yang
              memudahkan kamu menemukan event terbaik, memesan tiket, dan merencanakan perjalanan impian — semuanya
              dalam satu tempat.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/images/baliem.png" alt="Festival Lembah Baliem" fill sizes="(min-width:1024px) 25vw,50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mt-6">
              <Image src="/images/toba.png" alt="Festival Danau Toba" fill sizes="(min-width:1024px) 25vw,50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/images/seminyak-market.png" alt="Pasar Malam Seminyak" fill sizes="(min-width:1024px) 25vw,50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mt-6">
              <Image src="/images/java-jazz.png" alt="Java Jazz Festival" fill sizes="(min-width:1024px) 25vw,50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────── */}
      <section className="bg-card py-16 md:py-20" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">Nilai Kami</p>
            <h2 id="values-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
              Prinsip yang Memandu Setiap Langkah
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, desc, color, soft }) => (
              <div
                key={title}
                className="group rounded-2xl border bg-background p-6 transition-shadow hover:shadow-md"
              >
                <span
                  className="mb-4 flex size-12 items-center justify-center rounded-2xl transition-transform group-hover:-translate-y-1"
                  style={{ backgroundColor: soft, color }}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mb-2 font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20" aria-labelledby="timeline-heading">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">Perjalanan Kami</p>
          <h2 id="timeline-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
            Milestone Eventura
          </h2>
        </div>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" aria-hidden="true" />
          <ol className="flex flex-col gap-8">
            {MILESTONES.map((m, i) => (
              <li key={m.year} className={`relative flex items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-1 rounded-2xl border bg-card p-5 shadow-sm ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="text-xs font-bold text-primary">{m.year}</span>
                  <h3 className="mt-1 font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                </div>
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md">
                  <Award className="size-4" aria-hidden="true" />
                </div>
                <div className="flex-1" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────── */}
      <section className="bg-card py-16 md:py-20" aria-labelledby="team-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">Tim Kami</p>
            <h2 id="team-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
              Orang-orang di Balik Eventura
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Kami adalah tim kecil yang penuh semangat, bersatu oleh kecintaan terhadap Indonesia dan hasrat untuk
              menciptakan pengalaman wisata yang tak terlupakan.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="group overflow-hidden rounded-2xl border bg-background transition-shadow hover:shadow-md">
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden py-20 md:py-28" aria-labelledby="cta-heading">
        <Image src="/images/nearby.png" alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[#0d2a2a]/80" />
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 id="cta-heading" className="text-3xl font-bold text-white md:text-4xl">
            Siap Mulai Petualanganmu?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Temukan ratusan event seru di seluruh Indonesia dan buat momen perjalananmu menjadi cerita yang tak terlupakan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/events"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Jelajahi Semua Event <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/map"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-white/20 px-8 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
            >
              <MapPin className="size-4" aria-hidden="true" /> Lihat Peta Event
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-muted-foreground md:px-6">
        {'© 2025 Eventura. Jelajahi Indonesia lewat setiap acaranya.'}
      </footer>
    </main>
  )
}
