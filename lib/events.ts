export type CategoryId =
  | 'festival'
  | 'konser'
  | 'pameran'
  | 'pasar-malam'
  | 'olahraga'
  | 'workshop'

export type Category = {
  id: CategoryId
  label: string
  badge: string
  lines: [string, string]
  color: string
  soft: string
}

export const CATEGORIES: Category[] = [
  { id: 'festival', label: 'Festival Budaya', badge: 'Festival', lines: ['Festival', 'Budaya'], color: '#ef5b5b', soft: '#fdecec' },
  { id: 'konser', label: 'Konser Musik', badge: 'Konser', lines: ['Konser', 'Musik'], color: '#7c5ce6', soft: '#f0ecfd' },
  { id: 'pameran', label: 'Pameran & Expo', badge: 'Pameran', lines: ['Pameran', '& Expo'], color: '#f08a2a', soft: '#fef2e6' },
  { id: 'pasar-malam', label: 'Pasar Malam & Kuliner', badge: 'Pasar Malam', lines: ['Pasar Malam', '& Kuliner'], color: '#17695d', soft: '#e6f2f0' },
  { id: 'olahraga', label: 'Olahraga & Petualangan', badge: 'Olahraga', lines: ['Olahraga', '& Petualangan'], color: '#2f86d6', soft: '#e8f2fb' },
  { id: 'workshop', label: 'Workshop & Edukasi', badge: 'Workshop', lines: ['Workshop', '& Edukasi'], color: '#a54fd8', soft: '#f5ebfb' },
]

export function getCategory(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)!
}

export type TicketType = { id: string; name: string; price: number; note: string }

export type EventItem = {
  id: string
  slug: string
  name: string
  category: CategoryId
  city: string
  province: string
  venue: string
  startDate: string
  endDate: string
  time: string
  image: string
  gallery: string[]
  description: string
  highlights: string[]
  coords: [number, number]
  tickets: TicketType[]
  rating: number
  reviews: { name: string; rating: number; text: string }[]
}

const REVIEWS = [
  { name: 'Sinta Maharani', rating: 5, text: 'Acaranya seru banget, tertata rapi dan suasananya hangat. Pasti datang lagi tahun depan!' },
  { name: 'Rizky Pratama', rating: 4, text: 'Lokasi mudah dijangkau, banyak spot foto menarik. Antrean tiket sedikit panjang di hari pertama.' },
  { name: 'Ayu Lestari', rating: 5, text: 'Pengalaman yang tak terlupakan. Panitia ramah dan informasinya jelas.' },
]

function tickets(regular: number, vip: number): TicketType[] {
  return [
    { id: 'reguler', name: 'Tiket Reguler', price: regular, note: 'Akses area utama' },
    { id: 'vip', name: 'Tiket VIP', price: vip, note: 'Akses prioritas & merchandise' },
  ]
}

export const EVENTS: EventItem[] = [
  {
    id: 'ev-01',
    slug: 'ubud-food-festival',
    name: 'Ubud Food Festival',
    category: 'festival',
    city: 'Ubud',
    province: 'Bali',
    venue: 'Taman Kuliner, Ubud',
    startDate: '2025-06-12',
    endDate: '2025-06-14',
    time: '10:00 - 22:00',
    image: '/images/ubud-food.png',
    gallery: ['/images/ubud-food.png', '/images/seminyak-market.png', '/images/hero.png', '/images/makassar-culinary.png'],
    description:
      'Ubud Food Festival adalah perayaan kuliner tahunan yang menghadirkan cita rasa terbaik dari lokal hingga internasional. Nikmati berbagai hidangan, pertunjukan budaya, dan kelas memasak bersama chef ternama.',
    highlights: ['Kuliner Lokal & Internasional', 'Live Cooking Demo', 'Pertunjukan Budaya', 'Booth UMKM'],
    coords: [-8.5069, 115.2625],
    tickets: tickets(150000, 350000),
    rating: 4.8,
    reviews: REVIEWS,
  },
  {
    id: 'ev-02',
    slug: 'dewa-19-live-yogyakarta',
    name: 'Dewa 19 Live in Yogyakarta',
    category: 'konser',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    venue: 'Stadion Kridosono, Yogyakarta',
    startDate: '2025-06-20',
    endDate: '2025-06-20',
    time: '19:00 - 23:00',
    image: '/images/dewa19.png',
    gallery: ['/images/dewa19.png', '/images/java-jazz.png', '/images/dewa19.png', '/images/java-jazz.png'],
    description:
      'Konser reuni legendaris Dewa 19 kembali menyapa Yogyakarta. Bernyanyi bersama lagu-lagu hits lintas generasi dengan tata panggung dan cahaya spektakuler.',
    highlights: ['Setlist Lagu Hits', 'Tata Cahaya Megah', 'Area Food Court', 'Merchandise Resmi'],
    coords: [-7.7829, 110.3765],
    tickets: tickets(200000, 650000),
    rating: 4.9,
    reviews: REVIEWS,
  },
  {
    id: 'ev-03',
    slug: 'festival-lembah-baliem',
    name: 'Festival Lembah Baliem',
    category: 'festival',
    city: 'Wamena',
    province: 'Papua',
    venue: 'Distrik Walesi, Wamena',
    startDate: '2025-07-05',
    endDate: '2025-07-07',
    time: '09:00 - 17:00',
    image: '/images/baliem.png',
    gallery: ['/images/baliem.png', '/images/toba.png', '/images/rajaampat-dive.png', '/images/baliem.png'],
    description:
      'Festival budaya terbesar di Papua yang menampilkan simulasi perang antarsuku, tarian adat, musik pikon, dan karapan babi di tengah lanskap Lembah Baliem yang memukau.',
    highlights: ['Atraksi Perang Adat', 'Tarian Tradisional', 'Kerajinan Noken', 'Kuliner Bakar Batu'],
    coords: [-4.0957, 138.9446],
    tickets: tickets(100000, 250000),
    rating: 4.7,
    reviews: REVIEWS,
  },
  {
    id: 'ev-04',
    slug: 'pasar-malam-seminyak',
    name: 'Pasar Malam Seminyak',
    category: 'pasar-malam',
    city: 'Seminyak',
    province: 'Bali',
    venue: 'Jl. Kayu Aya, Seminyak',
    startDate: '2025-07-25',
    endDate: '2025-07-27',
    time: '16:00 - 23:00',
    image: '/images/seminyak-market.png',
    gallery: ['/images/seminyak-market.png', '/images/ubud-food.png', '/images/makassar-culinary.png', '/images/seminyak-market.png'],
    description:
      'Pasar malam dengan ratusan tenant jajanan, fashion lokal, dan musik akustik. Tempat sempurna untuk menikmati malam santai di Seminyak.',
    highlights: ['100+ Tenant Kuliner', 'Musik Akustik', 'Produk Kreatif Lokal', 'Area Keluarga'],
    coords: [-8.6913, 115.1683],
    tickets: tickets(75000, 175000),
    rating: 4.6,
    reviews: REVIEWS,
  },
  {
    id: 'ev-05',
    slug: 'java-jazz-festival',
    name: 'Java Jazz Festival',
    category: 'konser',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    venue: 'JIExpo Kemayoran, Jakarta',
    startDate: '2025-08-01',
    endDate: '2025-08-03',
    time: '14:00 - 00:00',
    image: '/images/java-jazz.png',
    gallery: ['/images/java-jazz.png', '/images/dewa19.png', '/images/java-jazz.png', '/images/dewa19.png'],
    description:
      'Salah satu festival jazz terbesar di dunia dengan puluhan musisi lokal dan internasional tampil di berbagai panggung selama tiga hari.',
    highlights: ['10+ Panggung', 'Musisi Internasional', 'Jam Session', 'Food Village'],
    coords: [-6.1468, 106.8456],
    tickets: tickets(300000, 900000),
    rating: 4.8,
    reviews: REVIEWS,
  },
  {
    id: 'ev-06',
    slug: 'pameran-seni-nusantara',
    name: 'Pameran Seni Nusantara',
    category: 'pameran',
    city: 'Denpasar',
    province: 'Bali',
    venue: 'Taman Budaya, Denpasar',
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    time: '09:00 - 17:00',
    image: '/images/nusantara-art.png',
    gallery: ['/images/nusantara-art.png', '/images/batik-workshop.png', '/images/coffee-expo.png', '/images/nusantara-art.png'],
    description:
      'Pameran karya seni rupa dan wastra dari berbagai daerah di Indonesia, lengkap dengan tur kurator dan diskusi bersama seniman.',
    highlights: ['Tur Kurator', 'Instalasi Interaktif', 'Pameran Wastra', 'Diskusi Seniman'],
    coords: [-8.6705, 115.2126],
    tickets: tickets(50000, 120000),
    rating: 4.5,
    reviews: REVIEWS,
  },
  {
    id: 'ev-07',
    slug: 'workshop-batik-kotagede',
    name: 'Workshop Batik Kotagede',
    category: 'workshop',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    venue: 'Sanggar Batik Kotagede',
    startDate: '2025-06-12',
    endDate: '2025-06-12',
    time: '09:00 - 15:00',
    image: '/images/batik-workshop.png',
    gallery: ['/images/batik-workshop.png', '/images/nusantara-art.png', '/images/batik-workshop.png', '/images/nusantara-art.png'],
    description:
      'Belajar membatik tulis langsung dari pengrajin Kotagede. Peserta akan membawa pulang kain batik buatan sendiri.',
    highlights: ['Bahan Disediakan', 'Pendamping Pengrajin', 'Sertifikat', 'Makan Siang'],
    coords: [-7.8296, 110.4003],
    tickets: tickets(125000, 275000),
    rating: 4.9,
    reviews: REVIEWS,
  },
  {
    id: 'ev-08',
    slug: 'indonesia-coffee-expo',
    name: 'Indonesia Coffee Expo',
    category: 'pameran',
    city: 'Bandung',
    province: 'Jawa Barat',
    venue: 'Sabuga ITB, Bandung',
    startDate: '2025-06-18',
    endDate: '2025-06-20',
    time: '10:00 - 21:00',
    image: '/images/coffee-expo.png',
    gallery: ['/images/coffee-expo.png', '/images/nusantara-art.png', '/images/coffee-expo.png', '/images/batik-workshop.png'],
    description:
      'Pameran kopi nusantara dengan kompetisi barista, cupping session, dan ratusan roastery lokal dari Aceh hingga Papua.',
    highlights: ['Cupping Session', 'Kompetisi Barista', '100+ Roastery', 'Kelas Brewing'],
    coords: [-6.8873, 107.6105],
    tickets: tickets(40000, 150000),
    rating: 4.6,
    reviews: REVIEWS,
  },
  {
    id: 'ev-09',
    slug: 'festival-kuliner-losari',
    name: 'Festival Kuliner Losari',
    category: 'pasar-malam',
    city: 'Makassar',
    province: 'Sulawesi Selatan',
    venue: 'Pantai Losari, Makassar',
    startDate: '2025-06-27',
    endDate: '2025-06-29',
    time: '16:00 - 23:00',
    image: '/images/makassar-culinary.png',
    gallery: ['/images/makassar-culinary.png', '/images/seminyak-market.png', '/images/ubud-food.png', '/images/makassar-culinary.png'],
    description:
      'Nikmati ikan bakar, coto, dan pisang epe sambil menikmati senja di Pantai Losari. Festival kuliner khas Makassar dengan hiburan musik daerah.',
    highlights: ['Seafood Segar', 'Kuliner Khas Bugis', 'Panggung Musik', 'Sunset View'],
    coords: [-5.143, 119.4077],
    tickets: tickets(25000, 100000),
    rating: 4.5,
    reviews: REVIEWS,
  },
  {
    id: 'ev-10',
    slug: 'festival-danau-toba',
    name: 'Festival Danau Toba',
    category: 'festival',
    city: 'Parapat',
    province: 'Sumatera Utara',
    venue: 'Pantai Bebas, Parapat',
    startDate: '2025-08-22',
    endDate: '2025-08-24',
    time: '08:00 - 22:00',
    image: '/images/toba.png',
    gallery: ['/images/toba.png', '/images/baliem.png', '/images/toba.png', '/images/rajaampat-dive.png'],
    description:
      'Perayaan budaya Batak di tepi Danau Toba dengan tari tortor, lomba solu bolon, dan pagelaran musik gondang.',
    highlights: ['Tari Tortor', 'Lomba Solu Bolon', 'Pameran Ulos', 'Kuliner Batak'],
    coords: [2.6697, 98.935],
    tickets: tickets(75000, 200000),
    rating: 4.6,
    reviews: REVIEWS,
  },
  {
    id: 'ev-11',
    slug: 'bromo-marathon',
    name: 'Bromo Marathon',
    category: 'olahraga',
    city: 'Probolinggo',
    province: 'Jawa Timur',
    venue: 'Kawasan Bromo Tengger',
    startDate: '2025-09-07',
    endDate: '2025-09-07',
    time: '05:00 - 13:00',
    image: '/images/bromo-run.png',
    gallery: ['/images/bromo-run.png', '/images/rajaampat-dive.png', '/images/bromo-run.png', '/images/nearby.png'],
    description:
      'Lari menembus lautan pasir dan desa Tengger dengan latar Gunung Bromo. Tersedia kategori 10K, 21K, dan 42K.',
    highlights: ['Kategori 10K - 42K', 'Medali Finisher', 'Pos Hidrasi', 'Jersey Eksklusif'],
    coords: [-7.9425, 112.953],
    tickets: tickets(450000, 850000),
    rating: 4.8,
    reviews: REVIEWS,
  },
  {
    id: 'ev-12',
    slug: 'jember-fashion-carnaval',
    name: 'Jember Fashion Carnaval',
    category: 'festival',
    city: 'Jember',
    province: 'Jawa Timur',
    venue: 'Alun-alun Jember',
    startDate: '2025-08-16',
    endDate: '2025-08-17',
    time: '13:00 - 18:00',
    image: '/images/jember-carnival.png',
    gallery: ['/images/jember-carnival.png', '/images/baliem.png', '/images/jember-carnival.png', '/images/toba.png'],
    description:
      'Parade kostum spektakuler kelas dunia sepanjang 3,6 km yang menampilkan kreativitas desainer dan talenta muda Jember.',
    highlights: ['Parade 3,6 km', 'Kostum Spektakuler', 'Tribun Penonton', 'Photo Session'],
    coords: [-8.1724, 113.7],
    tickets: tickets(50000, 300000),
    rating: 4.7,
    reviews: REVIEWS,
  },
  {
    id: 'ev-13',
    slug: 'raja-ampat-dive-festival',
    name: 'Raja Ampat Dive Festival',
    category: 'olahraga',
    city: 'Waisai',
    province: 'Papua Barat Daya',
    venue: 'Pantai WTC, Waisai',
    startDate: '2025-10-17',
    endDate: '2025-10-19',
    time: '07:00 - 18:00',
    image: '/images/rajaampat-dive.png',
    gallery: ['/images/rajaampat-dive.png', '/images/nearby.png', '/images/rajaampat-dive.png', '/images/baliem.png'],
    description:
      'Festival bahari dengan fun dive, edukasi konservasi terumbu karang, dan pertunjukan budaya masyarakat Raja Ampat.',
    highlights: ['Fun Dive', 'Edukasi Konservasi', 'Tur Pulau', 'Pentas Budaya'],
    coords: [-0.4233, 130.8167],
    tickets: tickets(350000, 1200000),
    rating: 4.9,
    reviews: REVIEWS,
  },
]

export const DEMO_TODAY = '2025-06-12'

export function getEventBySlug(slug: string) {
  return EVENTS.find((e) => e.slug === slug)
}

export function getEventById(id: string) {
  return EVENTS.find((e) => e.id === id)
}

export function minPrice(e: EventItem) {
  return Math.min(...e.tickets.map((t) => t.price))
}

export function formatRupiah(value: number) {
  return 'Rp ' + value.toLocaleString('id-ID')
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
export const MONTHS_FULL = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

function parts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m: m - 1, d }
}

export function formatDateRange(start: string, end: string) {
  const s = parts(start)
  const e = parts(end)
  if (start === end) return `${s.d} ${MONTHS[s.m]} ${s.y}`
  if (s.m === e.m && s.y === e.y) return `${s.d} - ${e.d} ${MONTHS[e.m]} ${e.y}`
  return `${s.d} ${MONTHS[s.m]} - ${e.d} ${MONTHS[e.m]} ${e.y}`
}

export function locationLabel(e: EventItem) {
  return `${e.city}, ${e.province}`
}

export function isOnDate(e: EventItem, iso: string) {
  return e.startDate <= iso && iso <= e.endDate
}

export function toIso(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

export const CITIES = Array.from(new Set(EVENTS.map((e) => e.province))).sort()

export type Booking = {
  code: string
  eventId: string
  ticketId: string
  quantity: number
  total: number
  bookedAt: string
}

export const INITIAL_BOOKINGS: Booking[] = [
  { code: 'EVT-2506-0012', eventId: 'ev-01', ticketId: 'reguler', quantity: 2, total: 300000, bookedAt: '2025-05-28' },
  { code: 'EVT-2506-0047', eventId: 'ev-02', ticketId: 'vip', quantity: 1, total: 650000, bookedAt: '2025-06-01' },
  { code: 'EVT-2507-0103', eventId: 'ev-03', ticketId: 'reguler', quantity: 2, total: 200000, bookedAt: '2025-06-05' },
  { code: 'EVT-2504-0008', eventId: 'ev-06', ticketId: 'reguler', quantity: 1, total: 50000, bookedAt: '2025-04-20' },
]

export const PAST_BOOKINGS: Booking[] = [
  { code: 'EVT-2503-0221', eventId: 'ev-12', ticketId: 'reguler', quantity: 3, total: 150000, bookedAt: '2024-08-01' },
  { code: 'EVT-2502-0190', eventId: 'ev-05', ticketId: 'vip', quantity: 2, total: 1800000, bookedAt: '2024-07-10' },
]
