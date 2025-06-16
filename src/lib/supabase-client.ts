import { supabase } from './supabase'
import { DatabaseClient, QueryOptions } from './database-types'

export class SupabaseClient implements DatabaseClient {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { user: data.user, error: error?.message }
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { user: data.user, error: error?.message }
  }

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error: error?.message }
  }

  getCurrentUser() {
    return supabase.auth.getUser()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(table: string, data: any) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single()
    
    return { data: result, error: error?.message }
  }

  async read(table: string, id?: string) {
    if (id) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single()
      
      return { data, error: error?.message }
    } else {
      const { data, error } = await supabase
        .from(table)
        .select('*')
      
      return { data, error: error?.message }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(table: string, id: string, data: any) {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single()
    
    return { data: result, error: error?.message }
  }

  async delete(table: string, id: string) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    
    return { error: error?.message }
  }

  async query(table: string, options?: QueryOptions) {
    let query = supabase.from(table).select('*')

    if (options?.where) {
      options.where.forEach(condition => {
        switch (condition.operator) {
          case '==':
            query = query.eq(condition.field, condition.value)
            break
          case '!=':
            query = query.neq(condition.field, condition.value)
            break
          case '<':
            query = query.lt(condition.field, condition.value)
            break
          case '<=':
            query = query.lte(condition.field, condition.value)
            break
          case '>':
            query = query.gt(condition.field, condition.value)
            break
          case '>=':
            query = query.gte(condition.field, condition.value)
            break
          case 'in':
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query = query.in(condition.field, condition.value as any)
            break
          case 'array-contains':
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query = query.contains(condition.field, condition.value as any)
            break
        }
      })
    }

    if (options?.orderBy) {
      options.orderBy.forEach(order => {
        query = query.order(order.field, { ascending: order.direction === 'asc' })
      })
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    return { data: data || [], error: error?.message }
  }
} 