import { useState } from 'react'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { InteractiveObject } from './InteractiveObject'

const WOOD   = '#6b4c30'
const WOOD_L = '#8a6540'
const KNOB   = '#c8a87a'

const NOTES = [
  `Il primo giorno che ci siamo visti,
avevo paura di dire la cosa sbagliata.
Poi ho detto tutto sbagliato,
e tu hai riso.
È stato il momento più bello.`,

  `Mi mancheresti
anche solo dopo cinque minuti.`,

  `A volte ti guardo
e penso:
"questa è la mia persona".

È la cosa più tranquilla
che abbia mai sentito.`,

  `Non ho mai avuto
una casa preferita
prima di te.`,

  `Timo.
Solo così.
Per sempre.`,
]

export function SecretDrawer({ position = [0, 0, 0] }) {
  const unlockedItems = useRoomStore(s => s.unlockedItems)
  const activeModal   = useRoomStore(s => s.activeModal)
  const closeModal    = useRoomStore(s => s.closeModal)
  const [noteIdx, setNoteIdx]   = useState(0)

  if (!unlockedItems.includes('secret-drawer')) return null

  return (
    <group position={position}>
      <InteractiveObject objectId="secret-drawer" position={[0, 0, 0]}>
        {/* Nightstand body */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.50, 0.44, 0.40]} />
          <meshStandardMaterial color={WOOD_L} roughness={0.9} />
        </mesh>
        {/* Drawer face */}
        <mesh position={[0, 0.18, 0.205]} castShadow>
          <boxGeometry args={[0.44, 0.18, 0.012]} />
          <meshStandardMaterial color={WOOD} roughness={0.85} />
        </mesh>
        {/* Drawer knob */}
        <mesh position={[0, 0.18, 0.222]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color={KNOB} roughness={0.45} metalness={0.25} />
        </mesh>
        {/* Table top */}
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[0.54, 0.04, 0.44]} />
          <meshStandardMaterial color={WOOD} roughness={0.9} />
        </mesh>
      </InteractiveObject>

      {activeModal === 'secret-drawer' && (
        <Html fullscreen>
          <div
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(26,16,8,0.94)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 100,
            }}
            onClick={closeModal}
          >
            <div
              style={{
                maxWidth: '340px', width: '88%',
                background: '#1e1108',
                border: '1px solid rgba(200,168,122,0.18)',
                borderRadius: '14px',
                padding: '44px 36px 36px',
                fontFamily: 'Caveat, cursive',
                cursor: 'default',
                position: 'relative',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{
                fontSize: '11px',
                color: 'rgba(245,237,224,0.2)',
                letterSpacing: '2px',
                marginBottom: '32px',
                textAlign: 'center',
                fontFamily: 'system-ui',
              }}>
                {noteIdx + 1} / {NOTES.length}
              </div>

              <div style={{
                fontSize: '24px',
                lineHeight: 1.95,
                color: '#f5ede0',
                whiteSpace: 'pre-wrap',
                textAlign: 'center',
                minHeight: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {NOTES[noteIdx]}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '40px',
              }}>
                <button
                  onClick={() => setNoteIdx(i => Math.max(0, i - 1))}
                  style={{
                    background: 'none', border: 'none',
                    color: noteIdx === 0 ? 'rgba(245,237,224,0.1)' : 'rgba(245,237,224,0.4)',
                    cursor: noteIdx === 0 ? 'default' : 'pointer',
                    fontSize: '20px', padding: '8px',
                  }}
                >←</button>

                <button
                  onClick={closeModal}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(245,237,224,0.3)',
                    padding: '7px 22px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontFamily: 'system-ui',
                    fontSize: '12px',
                  }}
                >
                  chiudi
                </button>

                <button
                  onClick={() => setNoteIdx(i => Math.min(NOTES.length - 1, i + 1))}
                  style={{
                    background: 'none', border: 'none',
                    color: noteIdx === NOTES.length - 1 ? 'rgba(245,237,224,0.1)' : 'rgba(245,237,224,0.4)',
                    cursor: noteIdx === NOTES.length - 1 ? 'default' : 'pointer',
                    fontSize: '20px', padding: '8px',
                  }}
                >→</button>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
