import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const FIRST_DATE = new Date('2025-04-13')

export const useRoomStore = create(
  persist(
    (set, get) => ({
      // Persisted state
      visitCount: 0,
      lastVisitDate: null,
      firstOpenDate: null,
      unlockedItems: [],
      dailyActions: {},

      // Session state
      activeModal: null,
      audioPlaying: null,

      // Computed
      getDaysSinceStart: () => {
        const first = get().firstOpenDate
        if (!first) return 0
        return Math.floor((Date.now() - new Date(first)) / 86400000)
      },
      getDaysSinceApril13: () => {
        return Math.floor((Date.now() - FIRST_DATE) / 86400000)
      },
      isNewVisitDay: () => {
        const last = get().lastVisitDate
        if (!last) return true
        return new Date(last).toDateString() !== new Date().toDateString()
      },

      // Actions
      registerVisit: () => set(state => ({
        visitCount: state.visitCount + 1,
        lastVisitDate: new Date().toISOString(),
        firstOpenDate: state.firstOpenDate || new Date().toISOString(),
      })),
      unlockItem: (itemId) => set(state => ({
        unlockedItems: [...new Set([...state.unlockedItems, itemId])],
      })),
      setDailyAction: (actionKey) => set(state => ({
        dailyActions: { ...state.dailyActions, [actionKey]: new Date().toISOString() },
      })),
      openModal:  (objectId) => set({ activeModal: objectId }),
      closeModal: ()         => set({ activeModal: null }),
      setAudio:   (songId)   => set({ audioPlaying: songId }),
    }),
    {
      name: 'casa-timo-state',
      partialize: (state) => ({
        visitCount:     state.visitCount,
        lastVisitDate:  state.lastVisitDate,
        firstOpenDate:  state.firstOpenDate,
        unlockedItems:  state.unlockedItems,
        dailyActions:   state.dailyActions,
      }),
    }
  )
)
