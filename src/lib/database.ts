import { DatabaseClient, QueryOptions } from './database-types'
import { FirebaseClient } from './firebase-client'
import { SupabaseClient } from './supabase-client'

// 환경 변수로 데이터베이스 provider 설정
const DATABASE_PROVIDER = process.env.NEXT_PUBLIC_DATABASE_PROVIDER || 'firebase'

export function createDatabaseClient(): DatabaseClient {
  switch (DATABASE_PROVIDER.toLowerCase()) {
    case 'supabase':
      return new SupabaseClient()
    case 'firebase':
    default:
      return new FirebaseClient()
  }
}

// 싱글톤 패턴으로 데이터베이스 클라이언트 인스턴스 관리
let databaseClient: DatabaseClient | null = null

export function getDatabaseClient(): DatabaseClient {
  if (!databaseClient) {
    databaseClient = createDatabaseClient()
  }
  return databaseClient
}

// 편의 함수들
export const db = {
  // 인증
  signUp: (email: string, password: string) => getDatabaseClient().signUp(email, password),
  signIn: (email: string, password: string) => getDatabaseClient().signIn(email, password),
  signOut: () => getDatabaseClient().signOut(),
  getCurrentUser: () => getDatabaseClient().getCurrentUser(),
  
  // CRUD 작업
  create: (table: string, data: Record<string, unknown>) => getDatabaseClient().create(table, data),
  read: (table: string, id?: string) => getDatabaseClient().read(table, id),
  update: (table: string, id: string, data: Record<string, unknown>) => getDatabaseClient().update(table, id, data),
  delete: (table: string, id: string) => getDatabaseClient().delete(table, id),
  query: (table: string, options?: QueryOptions) => getDatabaseClient().query(table, options),
  
  // 레스토랑 특화 함수들
  restaurants: {
    getAll: () => getDatabaseClient().read('restaurants'),
    getById: (id: string) => getDatabaseClient().read('restaurants', id),
    create: (data: Record<string, unknown>) => getDatabaseClient().create('restaurants', data),
    update: (id: string, data: Record<string, unknown>) => getDatabaseClient().update('restaurants', id, data),
    delete: (id: string) => getDatabaseClient().delete('restaurants', id),
    searchByCuisine: (cuisine: string) => getDatabaseClient().query('restaurants', {
      where: [{ field: 'cuisine_type', operator: '==', value: cuisine }]
    }),
  },
  
  menuItems: {
    getAll: () => getDatabaseClient().read('menu_items'),
    getById: (id: string) => getDatabaseClient().read('menu_items', id),
    getByRestaurant: (restaurantId: string) => getDatabaseClient().query('menu_items', {
      where: [{ field: 'restaurant_id', operator: '==', value: restaurantId }]
    }),
    create: (data: Record<string, unknown>) => getDatabaseClient().create('menu_items', data),
    update: (id: string, data: Record<string, unknown>) => getDatabaseClient().update('menu_items', id, data),
    delete: (id: string) => getDatabaseClient().delete('menu_items', id),
  },
  
  reservations: {
    getAll: () => getDatabaseClient().read('reservations'),
    getById: (id: string) => getDatabaseClient().read('reservations', id),
    getByRestaurant: (restaurantId: string) => getDatabaseClient().query('reservations', {
      where: [{ field: 'restaurant_id', operator: '==', value: restaurantId }]
    }),
    create: (data: Record<string, unknown>) => getDatabaseClient().create('reservations', data),
    update: (id: string, data: Record<string, unknown>) => getDatabaseClient().update('reservations', id, data),
    delete: (id: string) => getDatabaseClient().delete('reservations', id),
  }
} 