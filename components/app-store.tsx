'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { INITIAL_BOOKINGS, type Booking } from '@/lib/events'

type AppStore = {
  favorites: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  bookings: Booking[]
  addBooking: (b: Omit<Booking, 'code' | 'bookedAt'>) => Booking
}

const AppStoreContext = createContext<AppStore | null>(null)

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(['ev-01', 'ev-05'])
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS)

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }, [])

  const addBooking = useCallback((b: Omit<Booking, 'code' | 'bookedAt'>) => {
    const booking: Booking = {
      ...b,
      code: `EVT-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      bookedAt: new Date().toISOString().slice(0, 10),
    }
    setBookings((prev) => [booking, ...prev])
    return booking
  }, [])

  const value = useMemo<AppStore>(
    () => ({
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite,
      bookings,
      addBooking,
    }),
    [favorites, bookings, toggleFavorite, addBooking],
  )

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext)
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider')
  return ctx
}
