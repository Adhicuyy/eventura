import { getCategory, type CategoryId } from '@/lib/events'
import { cn } from '@/lib/utils'

export function CategoryBadge({
  category,
  solid = false,
  className,
}: {
  category: CategoryId
  solid?: boolean
  className?: string
}) {
  const c = getCategory(category)
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold', className)}
      style={solid ? { backgroundColor: c.color, color: '#fff' } : { backgroundColor: c.soft, color: c.color }}
    >
      {c.badge}
    </span>
  )
}
