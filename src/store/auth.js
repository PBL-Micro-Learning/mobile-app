import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  token: '',
  data: null,
  setAuthToken: (data) => set(() => ({ token: data })),
  setAuthData: (data) => set(() => ({ data: data })),
  removeAuthToken: () => set({ token: '' }),
}))