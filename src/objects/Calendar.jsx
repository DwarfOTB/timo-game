import { useState } from 'react'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { InteractiveObject } from './InteractiveObject'

// April 2025 grid — 1 starts on Tuesday (index 1 in Mon-based week)
const DAYS = Array.from({ length: 30 }, (_, i) => i + 1)
const OFFSET = 1 // April 1 2025 = Tuesday, 0-indexed Mon=0

const SONG_QUOTES = [
  '"e sei acqua" — Venerus',
  '"finché non sei arrivata tu" — Emma',
  '"neo romeo, neo romeo" — Rusowsky',
  '"goofy, goofy, goofy" — Rusowsky',
  '"portami a ballare in primavera" — Faccianuvola',
]

export function Calendar({ position = [0, 0, 0] }) {
  const days  = useRoomStore(s => s.getDaysSinceApril13())
  const dSinceStart = useRoomStore(s => s.getDaysSinceStart())
  const activeModal = useRoomStore(s => s.activeModal)
  const openModal   = useRoomStore(s => s.openModal)
  const closeModal  = useRoomStore(s => s.closeModal)

  const quote = SONG_QUOTES[Math.abs(dSinceStart) % SONG_QUOTES.length]

  return (
    <group position={position}>
      {/* Physical calendar frame */}
      <InteractiveObject objectId="calendar" position={[0, 0, 0]}>
        {/* Frame */}
        <mesh castShadow>
          <boxGeometry args={[0.72, 0.88, 0.04]} />
          <meshStandardMaterial color="#f5ede0" roughness={0.9} />
        </mesh>
        {/* Red header bar */}
        <mesh position={[0, 0.34, 0.021]}>
          <boxGeometry args={[0.72, 0.20, 0.01]} />
          <meshStandardMaterial color="#d94f3d" roughness={0.8} />
        </mesh>

        {/* Html calendar content overlaid on frame */}
        <Html
          transform
          position={[0, 0, 0.025]}
          style={{ width: '144px', pointerEvents: 'none' }}
        >
          <div style={{
            width: '144px',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '9px',
            color: '#3d2b1f',
            userSelect: 'none',
          }}>
            {/* Header */}
            <div style={{
              background: '#d94f3d',
              color: '#fff',
              textAlign: 'center',
              padding: '5px 0 4px',
              fontWeight: 700,
              fontSize: '10px',
              letterSpacing: '0.5px',
            }}>
              APRILE 2025
            </div>
            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '1px',
              padding: '4px 4px 2px',
              background: '#f5ede0',
            }}>
              {['L','M','M','G','V','S','D'].map(d => (
                <div key={d} style={{ textAlign: 'center', fontWeight: 700, color: '#8a7060', fontSize: '7px', paddingBottom: '2px' }}>{d}</div>
              ))}
              {Array.from({ length: OFFSET }).map((_, i) => (
                <div key={'e' + i} />
              ))}
              {DAYS.map(d => (
                <div key={d} style={{
                  textAlign: 'center',
                  lineHeight: '14px',
                  borderRadius: '50%',
                  background: d === 13 ? '#d94f3d' : 'transparent',
                  color: d === 13 ? '#fff' : '#3d2b1f',
                  fontWeight: d === 13 ? 700 : 400,
                }}>
                  {d}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontSize: '8px', color: '#d94f3d', padding: '1px 0 3px', fontStyle: 'italic' }}>
              ❤️ quel giorno lì
            </div>
          </div>
        </Html>
      </InteractiveObject>

      {/* Modal — days counter */}
      {activeModal === 'calendar' && (
        <Html fullscreen>
          <div
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(61,43,31,0.55)',
              backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 100,
            }}
            onClick={closeModal}
          >
            <div
              style={{
                background: '#fff8f3',
                borderRadius: '20px',
                padding: '40px 48px',
                maxWidth: '380px',
                width: '90%',
                textAlign: 'center',
                boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
                fontFamily: 'system-ui, sans-serif',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🦔 + 🐞</div>
              <div style={{ fontSize: '15px', color: '#8a7060', marginBottom: '12px' }}>insieme da</div>
              <div style={{ fontSize: '72px', fontWeight: 800, color: '#d94f3d', lineHeight: 1 }}>{days}</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#3d2b1f', marginBottom: '8px' }}>giorni</div>
              <div style={{ fontSize: '13px', color: '#8a7060', marginBottom: '24px' }}>dal 13 aprile 2025</div>
              <div style={{
                fontSize: '14px',
                fontStyle: 'italic',
                color: '#5c3d2e',
                borderTop: '1px solid #e8d5b0',
                paddingTop: '16px',
              }}>
                {quote}
              </div>
              <button
                onClick={closeModal}
                style={{
                  marginTop: '24px',
                  padding: '10px 28px',
                  background: '#d94f3d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                chiudi
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
