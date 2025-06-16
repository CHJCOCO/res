// 데이터베이스 추상화를 위한 공통 타입 정의

export interface DatabaseClient {
  // 인증 관련
  signUp(email: string, password: string): Promise<{ user: unknown; error?: string | null }>
  signIn(email: string, password: string): Promise<{ user: unknown; error?: string | null }>
  signOut(): Promise<{ error?: string | null }>
  getCurrentUser(): unknown | null
  
  // 데이터 조작
  create(table: string, data: Record<string, unknown>): Promise<{ data: unknown; error?: string | null }>
  read(table: string, id?: string): Promise<{ data: unknown; error?: string | null }>
  update(table: string, id: string, data: Record<string, unknown>): Promise<{ data: unknown; error?: string | null }>
  delete(table: string, id: string): Promise<{ error?: string | null }>
  
  // 쿼리
  query(table: string, options?: QueryOptions): Promise<{ data: unknown[]; error?: string | null }>
}

export interface QueryOptions {
  where?: Array<{
    field: string
    operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'in' | 'array-contains'
    value: unknown
  }>
  orderBy?: Array<{
    field: string
    direction: 'asc' | 'desc'
  }>
  limit?: number
  offset?: number
}

// 레스토랑 관련 타입들
export interface Restaurant {
  id?: string
  name: string
  description: string
  cuisine_type: string
  price_range: string
  rating?: number
  address: string
  phone: string
  email: string
  hours: string
  image_url?: string
  created_at?: string
  updated_at?: string
}

export interface MenuItem {
  id?: string
  restaurant_id: string
  name: string
  description: string
  price: number
  category: string
  image_url?: string
  is_available: boolean
  created_at?: string
  updated_at?: string
}

export interface Reservation {
  id?: string
  restaurant_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  party_size: number
  reservation_date: string
  reservation_time: string
  status: 'pending' | 'confirmed' | 'cancelled'
  special_requests?: string
  created_at?: string
  updated_at?: string
} 