import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useRoomStore } from '../store/useRoomStore'
import { ModalOverlay } from '../ui/ModalOverlay'
import { InteractiveObject } from './InteractiveObject'

// April 2026: April 1 = Wednesday → Mon-based offset = 2
const OFFSET = 2

const SONG_QUOTES = [
  '"e sei acqua" — Venerus',
  '"finché non sei arrivata tu" — Emma',
  '"neo romeo, neo romeo" — Rusowsky',
  '"goofy, goofy, goofy" — Rusowsky',
  '"portami a ballare in primavera" — Faccianuvola',
]

function makeCalendarTexture() {
  const W = 288, H = 352
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f5ede0'
  ctx.fillRect(0, 0, W, H)

  // Red header
  const headerH = 72
  ctx.fillStyle = '#d94f3d'
  ctx.fillRect(0, 0, W, headerH)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 20px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('APRILE 2026', W / 2, headerH / 2)

  // Day labels
  const DAY_LABELS = ['L', 'M', 'M', 'G', 'V', 'S', 'D']
  const colW = W / 7
  const labelY = headerH + 22
  ctx.fillStyle = '#8a7060'
  ctx.font = 'bold 14px system-ui, sans-serif'
  DAY_LABELS.forEach((d, i) => {
    ctx.fillText(d, colW * i + colW / 2, labelY)
  })

  // Day numbers
  const gridStartY = labelY + 22
  const rowH = (H - gridStartY - 24) / 5

  for (let d = 1; d <= 30; d++) {
    const idx = d - 1 + OFFSET
    const col = idx % 7
    const row = Math.floor(idx / 7)
    const x = colW * col + colW / 2
    const y = gridStartY + row * rowH + rowH / 2

    if (d === 13) {
      ctx.fillStyle = '#d94f3d'
      ctx.beginPath()
      ctx.arc(x, y, 13, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 15px system-ui, sans-serif'
    } else {
      ctx.fillStyle = '#3d2b1f'
      ctx.font = '14px system-ui, sans-serif'
    }
    ctx.fillText(String(d), x, y)
  }

  // Footer
  ctx.fillStyle = '#d94f3d'
  ctx.font = 'italic 12px system-ui, sans-serif'
  ctx.fillText('quel giorno li', W / 2, H - 9)

  return canvas
}

export function Calendar({ position = [0, 0, 0] }) {
  const days        = useRoomStore(s => s.getDaysSinceApril13())
  const dSinceStart = useRoomStore(s => s.getDaysSinceStart())
  const activeModal = useRoomStore(s => s.activeModal)
  const closeModal  = useRoomStore(s => s.closeModal)

  const quote = SONG_QUOTES[Math.abs(dSinceStart) % SONG_QUOTES.length]

  const calTexture = useMemo(() => {
    const tex = new THREE.CanvasTexture(makeCalendarTexture())
    tex.needsUpdate = true
    return tex
  }, [])

  return (
    <group position={position}>
      <InteractiveObject objectId="calendar" name="calendario" position={[0, 0, 0]}>
        {/* Frame */}
        <mesh castShadow>
          <boxGeometry args={[0.72, 0.88, 0.04]} />
          <meshStandardMaterial color="#f5ede0" roughness={0.9} />
        </mesh>

        {/* Calendar face as texture — depth-tested, no DOM overlay */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.70, 0.86]} />
          <meshStandardMaterial map={calTexture} roughness={0.85} />
        </mesh>
      </InteractiveObject>

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <ModalOverlay isOpen={activeModal === 'calendar'} onClose={closeModal}>
          <div style={{
            background: '#fff8f3',
            borderRadius: '22px',
            padding: '44px 52px 36px',
            width: '100%', maxWidth: '380px',
            textAlign: 'center',
            boxShadow: '0 24px 80px rgba(0,0,0,0.22)',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '20px' }}>🦔 + 🐞</div>

            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '88px',
              fontWeight: 700,
              color: '#d94f3d',
              lineHeight: 1,
              letterSpacing: '-2px',
            }}>
              {days}
            </div>

            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '28px',
              color: '#3d2b1f',
              marginTop: '4px',
              marginBottom: '4px',
            }}>
              giorni insieme
            </div>

            <div style={{ fontSize: '12px', color: '#a08060', marginBottom: '28px', letterSpacing: '0.5px' }}>
              dal 13 aprile 2026
            </div>

            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '19px',
              fontStyle: 'italic',
              color: '#5c3d2e',
              borderTop: '1px solid #e8d5b0',
              paddingTop: '20px',
              lineHeight: 1.7,
            }}>
              {quote}
            </div>

            <button onClick={closeModal} className="modal-close" style={{ marginTop: '28px' }}>
              chiudi
            </button>
          </div>
        </ModalOverlay>
      </Html>
    </group>
  )
}
