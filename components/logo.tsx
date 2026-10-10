import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold text-foreground" aria-label="Eventura beranda">
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
        <path d="M16 2 L22 10 L16 16 Z" fill="#17695d" />
        <path d="M30 16 L22 22 L16 16 Z" fill="#17695d" />
        <path d="M16 30 L10 22 L16 16 Z" fill="#17695d" />
        <path d="M2 16 L10 10 L16 16 Z" fill="#17695d" />
        <path d="M16 2 L10 10 L16 16 Z" fill="#2a9483" />
        <path d="M30 16 L22 10 L16 16 Z" fill="#2a9483" />
        <path d="M16 30 L22 22 L16 16 Z" fill="#2a9483" />
        <path d="M2 16 L10 22 L16 16 Z" fill="#2a9483" />
      </svg>
      <span className="text-lg tracking-tight">Eventura</span>
    </Link>
  )
}
