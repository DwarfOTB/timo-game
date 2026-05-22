import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

const SPRING = { duration: 0.32, ease: [0.16, 1, 0.3, 1] }

export function ModalOverlay({ isOpen, onClose, dark = false, children }) {
  useEffect(() => {
    if (!isOpen) return
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed', inset: 0,
            background: dark ? 'rgba(14,8,3,0.96)' : 'rgba(14,8,3,0.82)',
            backdropFilter: dark ? 'none' : 'blur(14px)',
            WebkitBackdropFilter: dark ? 'none' : 'blur(14px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 100,
            pointerEvents: 'auto',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={SPRING}
            style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
