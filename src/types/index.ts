export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
  category: string
  is_popular: boolean
  is_available: boolean
}

export interface Reservation {
  id: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  date: string
  time: string
  party_size: number
  special_requests?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

export interface Review {
  id: string
  customer_name: string
  rating: number
  comment: string
  created_at: string
}

export interface Coupon {
  id: string
  title: string
  description: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  code?: string
  valid_until: string
  is_active: boolean
  usage_limit?: number
  used_count: number
}

export interface RestaurantInfo {
  id: string
  name: string
  description: string
  address: string
  phone: string
  email: string
  opening_hours: OpeningHours[]
  features: string[]
}

export interface OpeningHours {
  day: string
  open_time: string
  close_time: string
  is_closed: boolean
} 