import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  QueryConstraint
} from 'firebase/firestore'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { firestore, auth } from './firebase'
import { DatabaseClient, QueryOptions } from './database-types'

export class FirebaseClient implements DatabaseClient {
  private currentUser: User | null = null

  constructor() {
    // 인증 상태 변화 감지
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user
    })
  }

  async signUp(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return { user: result.user, error: null }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      return { user: null, error: errorMessage }
    }
  }

  async signIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return { user: result.user, error: null }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      return { user: null, error: errorMessage }
    }
  }

  async signOut() {
    try {
      await firebaseSignOut(auth)
      return { error: null }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      return { error: errorMessage }
    }
  }

  getCurrentUser() {
    return this.currentUser
  }

  async create(table: string, data: Record<string, unknown>) {
    try {
      const now = Timestamp.now()
      const docData = {
        ...data,
        created_at: now,
        updated_at: now
      }
      
      const docRef = await addDoc(collection(firestore, table), docData)
      const newDoc = await getDoc(docRef)
      
      return { 
        data: { id: docRef.id, ...newDoc.data() }, 
        error: null 
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      return { data: null, error: errorMessage }
    }
  }

  async read(table: string, id?: string) {
    try {
      if (id) {
        const docRef = doc(firestore, table, id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          return { 
            data: { id: docSnap.id, ...docSnap.data() }, 
            error: null 
          }
        } else {
          return { data: null, error: 'Document not found' }
        }
      } else {
        const querySnapshot = await getDocs(collection(firestore, table))
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        return { data, error: null }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      return { data: null, error: errorMessage }
    }
  }

  async update(table: string, id: string, data: Record<string, unknown>) {
    try {
      const docRef = doc(firestore, table, id)
      const updateData = {
        ...data,
        updated_at: Timestamp.now()
      }
      
      await updateDoc(docRef, updateData)
      const updatedDoc = await getDoc(docRef)
      
      return { 
        data: { id: updatedDoc.id, ...updatedDoc.data() }, 
        error: null 
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      return { data: null, error: errorMessage }
    }
  }

  async delete(table: string, id: string) {
    try {
      const docRef = doc(firestore, table, id)
      await deleteDoc(docRef)
      return { error: null }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      return { error: errorMessage }
    }
  }

  async query(table: string, options?: QueryOptions) {
    try {
      const q = collection(firestore, table)
      const constraints: QueryConstraint[] = []

      if (options?.where) {
        options.where.forEach(condition => {
          constraints.push(where(condition.field, condition.operator, condition.value))
        })
      }

      if (options?.orderBy) {
        options.orderBy.forEach(order => {
          constraints.push(orderBy(order.field, order.direction))
        })
      }

      if (options?.limit) {
        constraints.push(limit(options.limit))
      }

      const finalQuery = constraints.length > 0 ? query(q, ...constraints) : q
      const querySnapshot = await getDocs(finalQuery)
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return { data, error: null }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      return { data: [], error: errorMessage }
    }
  }
} 