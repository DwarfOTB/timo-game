import { useEffect } from 'react'
import { useRoomStore } from '../store/useRoomStore'
import { UNLOCKS } from '../data/unlocks'

export function useVisitSystem() {
  useEffect(() => {
    const { isNewVisitDay, registerVisit } = useRoomStore.getState()

    if (isNewVisitDay()) registerVisit()

    // Read updated state after possible registerVisit
    const { visitCount, unlockedItems, unlockItem } = useRoomStore.getState()

    UNLOCKS.forEach(u => {
      if (u.type === 'visit' && visitCount >= u.threshold && !unlockedItems.includes(u.id)) {
        unlockItem(u.id)
        window.dispatchEvent(new CustomEvent('casa-timo-unlock', { detail: { message: u.message } }))
      }
    })
  }, []) // runs once on mount
}
