import { useState, useEffect, useCallback } from 'react'
import { db } from '@/lib/database'
import { Restaurant, MenuItem, Reservation } from '@/lib/database-types'

// 레스토랑 관련 훅
export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadRestaurants()
  }, [])

  const loadRestaurants = async () => {
    try {
      setLoading(true)
      const { data, error } = await db.restaurants.getAll()
      if (error) {
        setError(error)
      } else {
        setRestaurants((data as Restaurant[]) || [])
      }
    } catch {
      setError('Failed to load restaurants')
    } finally {
      setLoading(false)
    }
  }

  const createRestaurant = async (restaurantData: Omit<Restaurant, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await db.restaurants.create(restaurantData)
      if (error) {
        setError(error)
        return null
      }
      await loadRestaurants() // 목록 새로고침
      return data
    } catch {
      setError('Failed to create restaurant')
      return null
    }
  }

  const updateRestaurant = async (id: string, restaurantData: Partial<Restaurant>) => {
    try {
      const { data, error } = await db.restaurants.update(id, restaurantData)
      if (error) {
        setError(error)
        return null
      }
      await loadRestaurants() // 목록 새로고침
      return data
    } catch {
      setError('Failed to update restaurant')
      return null
    }
  }

  const deleteRestaurant = async (id: string) => {
    try {
      const { error } = await db.restaurants.delete(id)
      if (error) {
        setError(error)
        return false
      }
      await loadRestaurants() // 목록 새로고침
      return true
    } catch {
      setError('Failed to delete restaurant')
      return false
    }
  }

  return {
    restaurants,
    loading,
    error,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    refetch: loadRestaurants
  }
}

// 메뉴 아이템 관련 훅
export function useMenuItems(restaurantId?: string) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMenuItems = useCallback(async () => {
    if (!restaurantId) return

    try {
      setLoading(true)
      const { data, error } = await db.menuItems.getByRestaurant(restaurantId)
      if (error) {
        setError(error)
      } else {
        setMenuItems((data as MenuItem[]) || [])
      }
    } catch {
      setError('Failed to load menu items')
    } finally {
      setLoading(false)
    }
  }, [restaurantId])

  useEffect(() => {
    if (restaurantId) {
      loadMenuItems()
    }
  }, [restaurantId, loadMenuItems])

  const createMenuItem = async (menuItemData: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await db.menuItems.create(menuItemData)
      if (error) {
        setError(error)
        return null
      }
      await loadMenuItems() // 목록 새로고침
      return data
    } catch {
      setError('Failed to create menu item')
      return null
    }
  }

  return {
    menuItems,
    loading,
    error,
    createMenuItem,
    refetch: loadMenuItems
  }
}

// 예약 관련 훅
export function useReservations(restaurantId?: string) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadReservations = useCallback(async () => {
    if (!restaurantId) return

    try {
      setLoading(true)
      const { data, error } = await db.reservations.getByRestaurant(restaurantId)
      if (error) {
        setError(error)
      } else {
        setReservations((data as Reservation[]) || [])
      }
    } catch {
      setError('Failed to load reservations')
    } finally {
      setLoading(false)
    }
  }, [restaurantId])

  useEffect(() => {
    if (restaurantId) {
      loadReservations()
    }
  }, [restaurantId, loadReservations])

  const createReservation = async (reservationData: Omit<Reservation, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await db.reservations.create(reservationData)
      if (error) {
        setError(error)
        return null
      }
      await loadReservations() // 목록 새로고침
      return data
    } catch {
      setError('Failed to create reservation')
      return null
    }
  }

  const updateReservationStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      const { data, error } = await db.reservations.update(id, { status })
      if (error) {
        setError(error)
        return null
      }
      await loadReservations() // 목록 새로고침
      return data
    } catch {
      setError('Failed to update reservation')
      return null
    }
  }

  return {
    reservations,
    loading,
    error,
    createReservation,
    updateReservationStatus,
    refetch: loadReservations
  }
}

// 인증 관련 훅
export function useAuth() {
  const [user, setUser] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 현재 사용자 정보 가져오기
    const currentUser = db.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { user, error } = await db.signUp(email, password)
      if (error) {
        setError(error)
        return null
      }
      setUser(user)
      return user
    } catch {
      setError('Failed to sign up')
      return null
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { user, error } = await db.signIn(email, password)
      if (error) {
        setError(error)
        return null
      }
      setUser(user)
      return user
    } catch {
      setError('Failed to sign in')
      return null
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await db.signOut()
      if (error) {
        setError(error)
        return false
      }
      setUser(null)
      return true
    } catch {
      setError('Failed to sign out')
      return false
    }
  }

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut
  }
} 