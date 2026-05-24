import { useState } from 'react'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { ModalOverlay } from '../ui/ModalOverlay'
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
  const [noteIdx, setNoteIdx] = useState(0)

  if (!unlockedItems.includes('secret-drawer')) return null

  return (
    <group position={position}>
      <InteractiveObject objectId="secret-drawer" position={[0, 0, 0]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.50, 0.44, 0.40]} />
          <meshStandardMaterial color={WOOD_L} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.18, 0.205]} castShadow>
          <boxGeometry args={[0.44, 0.18, 0.012]} />
          <meshStandardMaterial color={WOOD} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.18, 0.222]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color={KNOB} roughness={0.45} metalness={0.25} />
        </mesh>
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[0.54, 0.04, 0.44]} />
          <meshStandardMaterial color={WOOD} roughness={0.9} />
        </mesh>
      </InteractiveObject>

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <ModalOverlay isOpen={activeModal === 'secret-drawer'} onClose={closeModal} dark>
          <div style={{
            width: '100%', maxWidth: '360px',
            background: '#1a1008',
            border: '1px solid rgba(200,168,122,0.15)',
            borderRadius: '16px',
            padding: '44px 36px 36px',
            fontFamily: 'Caveat, cursive',
          }}>
            <div style={{ fontSize: '11px', color: 'rgba(245,237,224,0.18)', letterSpacing: '2px', marginBottom: '32px', textAlign: 'center', fontFamily: 'Figtree, system-ui, sans-serif' }}>
              {noteIdx + 1} / {NOTES.length}
            </div>

            <div style={{
              fontSize: '24px', lineHeight: 2.0, color: '#f5ede0',
              whiteSpace: 'pre-wrap', textAlign: 'center',
              minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {NOTES[noteIdx]}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
              <button className="modal-arrow" disabled={noteIdx === 0} onClick={() => setNoteIdx(i => i - 1)}>←</button>
              <button onClick={closeModal} className="modal-close-dark">chiudi</button>
              <button className="modal-arrow" disabled={noteIdx === NOTES.length - 1} onClick={() => setNoteIdx(i => i + 1)}>→</button>
            </div>
          </div>
        </ModalOverlay>
      </Html>
    </group>
  )
}
