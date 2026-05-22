import '@fontsource/caveat'
import { useRef, useState, useEffect } from 'react'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { ModalOverlay } from '../ui/ModalOverlay'
import { LETTER } from '../data/messages'
import { InteractiveObject } from './InteractiveObject'

const COVER_COLOR = '#e8c4b0'
const COVER_DARK  = '#c8a48a'
const SPINE_COLOR = '#c09070'
const PAGE_COLOR  = '#fdf8f2'

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
      if (idx.current >= text.length) { clearInterval(iv); _typedThisSession = true }
    }, 28)
    return () => clearInterval(iv)
  }, [text, instant])

  return <span style={{ whiteSpace: 'pre-wrap' }}>{displayed}</span>
}

export function Notebook({ position = [0, 0, 0] }) {
  const activeModal   = useRoomStore(s => s.activeModal)
  const closeModal    = useRoomStore(s => s.closeModal)
  const unlockedItems = useRoomStore(s => s.unlockedItems)
  const hasPage2      = unlockedItems.includes('letter-page-2')
  const [openedOnce, setOpenedOnce] = useState(false)

  return (
    <group position={position}>
      <InteractiveObject objectId="notebook" name="taccuino" position={[0, 0, 0]}>
        <mesh position={[0.01, 0, 0.01]} castShadow>
          <boxGeometry args={[0.48, 0.08, 0.36]} />
          <meshStandardMaterial color={COVER_DARK} roughness={0.9} />
        </mesh>
        <mesh position={[-0.02, 0.04, -0.02]} rotation={[0, 0, -0.18]} castShadow>
          <boxGeometry args={[0.46, 0.08, 0.34]} />
          <meshStandardMaterial color={COVER_COLOR} roughness={0.85} />
        </mesh>
        <mesh position={[0.22, 0.01, 0]} castShadow>
          <boxGeometry args={[0.06, 0.10, 0.36]} />
          <meshStandardMaterial color={SPINE_COLOR} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.04, 0]} rotation={[0, 0, -0.09]}>
          <boxGeometry args={[0.44, 0.06, 0.32]} />
          <meshStandardMaterial color={PAGE_COLOR} roughness={0.95} />
        </mesh>
        <mesh position={[-0.12, 0.08, 0]} rotation={[0, 0, -0.18]}>
          <boxGeometry args={[0.02, 0.005, 0.36]} />
          <meshStandardMaterial color={SPINE_COLOR} roughness={0.8} />
        </mesh>
      </InteractiveObject>

      <Html fullscreen>
        <ModalOverlay isOpen={activeModal === 'notebook'} onClose={closeModal}>
          <div
            style={{
              display: 'flex',
              maxWidth: '760px', width: '94%',
              background: PAGE_COLOR,
              borderRadius: '6px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              overflow: 'hidden',
              minHeight: '400px',
            }}
          >
            {/* Page 1 */}
            <div style={{
              flex: 1, padding: '48px 38px',
              borderRight: '3px solid #d4b89a',
              background: 'linear-gradient(to right, #fdf8f2, #faf4ec)',
            }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: '22px', lineHeight: 1.85, color: '#3d2b1f' }}>
                <TypewriterText text={LETTER.page1.content} instant={_typedThisSession || openedOnce} />
              </div>
            </div>

            {/* Page 2 */}
            <div style={{
              flex: 1, padding: '48px 38px',
              background: 'linear-gradient(to left, #fdf8f2, #faf4ec)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              {hasPage2 ? (
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: '22px', lineHeight: 1.85, color: '#3d2b1f', whiteSpace: 'pre-wrap' }}>
                  {LETTER.page2.content}
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#c8a87a', fontFamily: 'Caveat, cursive', fontSize: '19px', opacity: 0.55, userSelect: 'none' }}>
                  ancora qualche visita...
                </div>
              )}
            </div>
          </div>

          <button onClick={closeModal} className="modal-close-dark" style={{ marginTop: '24px' }}>
            chiudi
          </button>
        </ModalOverlay>
      </Html>
    </group>
  )
}
