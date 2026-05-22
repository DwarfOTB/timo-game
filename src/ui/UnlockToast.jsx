import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function UnlockToast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now() + Math.random()
      setToasts(prev => [...prev, { id, message: e.detail.message }])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 4500)
    }
    window.addEventListener('casa-timo-unlock', handler)
    return () => window.removeEventListener('casa-timo-unlock', handler)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
      zIndex: 300, pointerEvents: 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
    }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ y: -20, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              background: 'rgba(26,16,8,0.92)',
              border: '1px solid rgba(200,168,122,0.3)',
              color: '#c8a87a',
              fontFamily: 'Caveat, cursive',
              fontSize: '16px',
              padding: '10px 22px',
              borderRadius: '50px',
              backdropFilter: 'blur(12px)',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
          >
            ✦ {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
