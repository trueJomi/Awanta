import { create } from 'zustand'
import { type Transaccion } from '../models/Transaccion.model'

interface CurrentTransaction {
  setCurrentTransaction: (value: Transaccion) => void
  currentTransaction: Transaccion | undefined
}

export const useCurrentTransactionStore = create<CurrentTransaction>((set) => ({
  currentTransaction: undefined,
  setCurrentTransaction: (value: Transaccion) => { set(() => ({ currentTransaction: value })) }
}))
