import { create } from 'zustand'

interface GmailService {
  setLoadingMessages: (loading: boolean) => void
  loadingMessages: boolean
}

export const useGmailStore = create<GmailService>((set) => ({
  loadingMessages: true,
  setLoadingMessages: (loading: boolean) => { set(() => ({ loadingMessages: loading })) }
}))
