import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TARGET = 'timo'

export function EasterEgg() {
  const [active, setActive] = useState(false)
  const bufRef = useRef('')

  useEffect(() => {
    const handler = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      bufRef.current = (bufRef.current + e.key.toLowerCase()).slice(-TARGET.length)
      if (bufRef.current === TARGET) {
        setActive(true)
        bufRef.current = ''
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {/* Hidden touch corner — bottom right */}
      <div
        style={{
          position: 'fixed', bottom: 0, right: 0,
          width: '56px', height: '56px',
          zIndex: 50, pointerEvents: 'all',
        }}
        onDoubleClick={() => setActive(true)}
      />

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              position: 'fixed', inset: 0,
              background: '#1a1008',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 400, cursor: 'pointer',
              pointerEvents: 'all',
            }}
            onClick={() => setActive(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 1.1, ease: 'easeOut' }}
              style={{
                textAlign: 'center',
                fontFamily: 'Caveat, cursive',
                color: '#f5ede0',
                maxWidth: '280px',
                padding: '0 24px',
              }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 120 }}
                style={{ fontSize: '52px', marginBottom: '36px' }}
              >
                🦔
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 1 }}
                style={{ fontSize: '32px', lineHeight: 2, letterSpacing: '6px', color: '#f5ede0' }}
              >
                t · i · m · o
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1.2 }}
                style={{ fontSize: '22px', color: 'rgba(245,237,224,0.55)', marginTop: '16px' }}
              >
                ti amo.
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
                style={{ marginTop: '56px', fontSize: '11px', color: 'rgba(245,237,224,0.2)', letterSpacing: '1px', fontFamily: 'Figtree, system-ui, sans-serif' }}
              >
                tocca per chiudere
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
