import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCourseStore = create(
  persist((set) => ({
    mode: 'LIST',
    setMode: (data) => set(() => ({ mode: data })),
    course: null,
    content: null,
    lesson: null,
    setCourseData: (data) => set(() => ({ course: data })),
    setContentData: (data) => set(() => ({ content: data })),
    setLessonData: (data) => set(() => ({ lesson: data })),
  }),
    {
      name: 'course-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    },
  ))