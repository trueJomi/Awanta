import { create } from 'zustand'

interface UserProgressive {
  setCurrentUser: (value: any) => void
  currentUser: any
}

export const useUserProgressiveStore = create<UserProgressive>((set) => ({
  currentUser: {},
  setCurrentUser: (value: any) => { set(() => ({ currentUser: { ...value } })) }
}))
