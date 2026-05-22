import '@fontsource/caveat'
import { useRef, useState, useEffect } from 'react'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { LETTER } from '../data/messages'
import { InteractiveObject } from './InteractiveObject'

const COVER_COLOR  = '#e8c4b0'
const COVER_DARK   = '#c8a48a'
const SPINE_COLOR  = '#c09070'
const PAGE_COLOR   = '#fdf8f2'

// Session-level: track whether typewriter has run this session
let _typedThisSession = false

function TypewriterText({ text, instant }) {
  const [displayed, setDisplayed] = useState(instant ? text : '')
  const idx = useRef(instant ? text.length : 0)

  useEffect(() => {
    if (instant) { setDisplayed(text); return }
    if (idx.current >= text.length) return
    const iv = setInterval(() => {
      idx.current++
      setDisplayed(text.slice(0, idx.current))
      if (idx.current >= text.length) {
        clearInterval(iv)
        _typedThisSession = true
      }
    }, 28)
    return () => clearInterval(iv)
  }, [text, instant])

  return <span style={{ whiteSpace: 'pre-wrap' }}>{displayed}</span>
}

export function Notebook({ position = [0, 0, 0] }) {
  const activeModal   = useRoomStore(s => s.activeModal)
  const closeModal    = useRoomStore(s => s.closeModal)
  const unlockedItems = useRoomStore(s => s.unlockedItems)

  const hasPage2 = unlockedItems.includes('letter-page-2')
  const [openedOnce, setOpenedOnce] = useState(false)

  const handleOpen = () => { setOpenedOnce(true) }

  return (
    <group position={position}>
      <InteractiveObject objectId="notebook" position={[0, 0, 0]}>
        {/* Back cover (slightly larger, peeking out) */}
        <mesh position={[0.01, 0, 0.01]} castShadow>
          <boxGeometry args={[0.48, 0.08, 0.36]} />
          <meshStandardMaterial color={COVER_DARK} roughness={0.9} />
        </mesh>
        {/* Front cover (slightly tilted open) */}
        <mesh position={[-0.02, 0.04, -0.02]} rotation={[0, 0, -0.18]} castShadow>
          <boxGeometry args={[0.46, 0.08, 0.34]} />
          <meshStandardMaterial color={COVER_COLOR} roughness={0.85} />
        </mesh>
        {/* Spine */}
        <mesh position={[0.22, 0.01, 0]} castShadow>
          <boxGeometry args={[0.06, 0.10, 0.36]} />
          <meshStandardMaterial color={SPINE_COLOR} roughness={0.9} />
        </mesh>
        {/* Pages visible between covers */}
        <mesh position={[0, 0.04, 0]} rotation={[0, 0, -0.09]}>
          <boxGeometry args={[0.44, 0.06, 0.32]} />
          <meshStandardMaterial color={PAGE_COLOR} roughness={0.95} />
        </mesh>
        {/* Elastic band */}
        <mesh position={[-0.12, 0.08, 0]} rotation={[0, 0, -0.18]}>
          <boxGeometry args={[0.02, 0.005, 0.36]} />
          <meshStandardMaterial color={SPINE_COLOR} roughness={0.8} />
        </mesh>
      </InteractiveObject>

      {/* Open book modal */}
      {activeModal === 'notebook' && (
        <Html fullscreen>
          <div
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(61,43,31,0.80)',
              backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 100,
            }}
            onClick={closeModal}
          >
            {/* Open book container */}
            <div
              style={{
                display: 'flex',
                maxWidth: '800px', width: '95%',
                background: PAGE_COLOR,
                borderRadius: '4px 4px 4px 4px',
                boxShadow: '0 20px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                minHeight: '420px',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Page 1 */}
              <div style={{
                flex: 1, padding: '44px 36px',
                borderRight: '3px solid #d4b89a',
                background: 'linear-gradient(to right, #fdf8f2, #faf4ec)',
              }}>
                <div style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '22px',
                  lineHeight: 1.75,
                  color: '#3d2b1f',
                }}>
                  <TypewriterText
                    text={LETTER.page1.content}
                    instant={_typedThisSession || openedOnce}
                  />
                </div>
              </div>

              {/* Page 2 */}
              <div style={{
                flex: 1, padding: '44px 36px',
                background: 'linear-gradient(to left, #fdf8f2, #faf4ec)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
              }}>
                {hasPage2 ? (
                  <div style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '22px',
                    lineHeight: 1.75,
                    color: '#3d2b1f',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {LETTER.page2.content}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center', color: '#c8a87a',
                    fontFamily: 'Caveat, cursive', fontSize: '18px',
                    opacity: 0.6, userSelect: 'none',
                  }}>
                    ancora qualche visita...
                  </div>
                )}
              </div>
            </div>

            <button onClick={closeModal} style={{
              position: 'absolute', bottom: '28px',
              padding: '10px 32px', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.7)',
              borderRadius: '50px', fontSize: '13px', cursor: 'pointer',
              fontFamily: 'system-ui',
            }}>
              chiudi
            </button>
          </div>
        </Html>
      )}
    </group>
  )
}
