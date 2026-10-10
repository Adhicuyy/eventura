import { Drama, Mountain, Music, Palette, Presentation, UtensilsCrossed, type LucideIcon } from 'lucide-react'
import type { CategoryId } from '@/lib/events'

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  festival: Drama,
  konser: Music,
  pameran: Presentation,
  'pasar-malam': UtensilsCrossed,
  olahraga: Mountain,
  workshop: Palette,
}
