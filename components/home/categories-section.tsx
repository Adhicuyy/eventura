import Link from 'next/link'
import { CATEGORY_ICONS } from '@/components/category-icon'
import { CATEGORIES } from '@/lib/events'

export function CategoriesSection() {
  return (
    <section aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="mb-5 text-xl font-bold tracking-tight">
        Kategori Event
      </h2>
      <ul className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c.id]
          return (
            <li key={c.id}>
              <Link
                href={`/events?cat=${c.id}`}
                className="group flex flex-col items-center gap-2 rounded-xl p-2 text-center text-xs font-medium leading-tight"
              >
                <span
                  className="flex size-14 items-center justify-center rounded-2xl transition-transform group-hover:-translate-y-1"
                  style={{ backgroundColor: c.soft, color: c.color }}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span>
                  {c.lines[0]}
                  <br />
                  {c.lines[1]}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
