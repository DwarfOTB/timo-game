import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function isMobile() {
  return navigator.maxTouchPoints > 1 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
}

function isPortrait() {
  return window.matchMedia('(orientation: portrait)').matches
}

export function RotatePrompt() {
  const [show, setShow] = useState(() => isMobile() && isPortrait())

  useEffect(() => {
    const update = () => setShow(isMobile() && isPortrait())
    window.addEventListener('orientationchange', update)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('orientationchange', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0,
            background: '#1a1008',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 500,
            pointerEvents: 'all',
          }}
        >
          <div style={{ textAlign: 'center', padding: '0 32px' }}>
            <motion.div
              animate={{ rotate: [0, 90, 90, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
              style={{ fontSize: '52px', marginBottom: '36px', display: 'inline-block' }}
            >
              📱
            </motion.div>

            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '26px',
              color: '#f5ede0',
              lineHeight: 1.8,
              marginBottom: '16px',
            }}>
              Ruota il telefono
            </div>

            <div style={{
              fontFamily: 'Figtree, system-ui, sans-serif',
              fontSize: '13px',
              color: 'rgba(245,237,224,0.35)',
              letterSpacing: '0.5px',
              lineHeight: 1.7,
            }}>
              Casa Timo funziona in orizzontale
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
