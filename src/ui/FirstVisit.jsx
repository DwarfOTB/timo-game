import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRoomStore } from '../store/useRoomStore'

export function FirstVisit() {
  const visitCount = useRoomStore(s => s.visitCount)
  const [visible, setVisible] = useState(false)
  const triggeredRef = useRef(false)

  // Fires when visitSystem increments to 1 (first ever visit)
  useEffect(() => {
    if (visitCount === 1 && !triggeredRef.current) {
      triggeredRef.current = true
      setVisible(true)
    }
  }, [visitCount])

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), 9000)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            position: 'fixed', inset: 0,
            background: '#1a1008',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 200,
            cursor: 'pointer',
            pointerEvents: 'all',
          }}
          onClick={() => setVisible(false)}
        >
          <div style={{ textAlign: 'center', maxWidth: '300px', padding: '0 24px' }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              style={{
                fontFamily: 'Figtree, system-ui, sans-serif',
                fontSize: '11px',
                letterSpacing: '4px',
                color: 'rgba(245,237,224,0.3)',
                marginBottom: '32px',
                textTransform: 'uppercase',
              }}
            >
              Casa Timo
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1.2 }}
              style={{
                fontFamily: 'Caveat, cursive',
                fontSize: '28px',
                lineHeight: 1.8,
                color: '#f5ede0',
                whiteSpace: 'pre-wrap',
              }}
            >
              {`Benvenuta a casa.\nQuesta stanza è tua.`}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 1.5 }}
              style={{
                marginTop: '56px',
                fontFamily: 'Figtree, system-ui, sans-serif',
                fontSize: '11px',
                color: 'rgba(245,237,224,0.2)',
                letterSpacing: '1px',
              }}
            >
              tocca per continuare
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
