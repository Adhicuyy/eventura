'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, Share2 } from 'lucide-react'
import { FavoriteButton } from '@/components/favorite-button'

export function HeroActions({ eventId, eventName }: { eventId: string; eventName: string }) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: eventName, url })
      else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } catch {}
  }

  const btn = 'flex size-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur hover:bg-card'

  return (
    <div className="absolute inset-x-4 top-4 flex items-center justify-between">
      <button type="button" onClick={() => router.back()} className={btn} aria-label="Kembali">
        <ArrowLeft className="size-5" />
      </button>
      <div className="flex gap-2">
        <FavoriteButton eventId={eventId} eventName={eventName} />
        <button type="button" onClick={share} className={btn} aria-label={copied ? 'Tautan disalin' : 'Bagikan event'}>
          {copied ? <Check className="size-5 text-brand" /> : <Share2 className="size-5" />}
        </button>
      </div>
    </div>
  )
}
