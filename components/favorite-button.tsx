'use client'

import { Heart } from 'lucide-react'
import { useAppStore } from '@/components/app-store'
import { cn } from '@/lib/utils'

export function FavoriteButton({
  eventId,
  eventName,
  variant = 'overlay',
  className,
}: {
  eventId: string
  eventName: string
  variant?: 'overlay' | 'plain'
  className?: string
}) {
  const { isFavorite, toggleFavorite } = useAppStore()
  const active = isFavorite(eventId)
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Hapus ${eventName} dari favorit` : `Simpan ${eventName} ke favorit`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(eventId)
      }}
      className={cn(
        'flex size-8 items-center justify-center rounded-full transition-colors',
        variant === 'overlay'
          ? 'bg-black/25 text-white backdrop-blur-sm hover:bg-black/40'
          : 'text-primary hover:bg-accent',
        className,
      )}
    >
      <Heart className={cn('size-4', active && 'fill-current', variant === 'overlay' && active && 'text-primary')} />
    </button>
  )
}
