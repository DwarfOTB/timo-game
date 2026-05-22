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
            padding: '52px 16px 24px',
          }}
          onClick={onClose}
        >
          {/* Always-visible X button */}
          <button
            onClick={e => { e.stopPropagation(); onClose() }}
            style={{
              position: 'absolute', top: 14, right: 14,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '15px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'system-ui',
              transition: 'background 0.15s, color 0.15s',
              zIndex: 102,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.16)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          >
            ✕
          </button>

          {/* Scrollable content wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={SPRING}
            className="modal-scroll"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              width: 'min(92vw, 820px)',
              maxHeight: '84vh',
              overflowY: 'auto',
              padding: '4px 0 8px',
            }}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
