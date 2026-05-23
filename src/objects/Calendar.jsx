import { useState, useMemo } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { ModalOverlay } from '../ui/ModalOverlay'
import { InteractiveObject } from './InteractiveObject'

// April 2026: April 1 = Wednesday → Mon-based offset = 2
const DAYS   = Array.from({ length: 30 }, (_, i) => i + 1)
const OFFSET = 2

const SONG_QUOTES = [
  '"e sei acqua" — Venerus',
  '"finché non sei arrivata tu" — Emma',
  '"neo romeo, neo romeo" — Rusowsky',
  '"goofy, goofy, goofy" — Rusowsky',
  '"portami a ballare in primavera" — Faccianuvola',
]

function fmtDate(dateStr) {
  const [y, m, d] = dateStr.split('-')
  const months = ['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic']
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`
}

function makeCalendarTexture() {
  const W = 288, H = 352
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f5ede0'
  ctx.fillRect(0, 0, W, H)

  // Red header
  ctx.fillStyle = '#d94f3d'
  ctx.fillRect(0, 0, W, 68)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 20px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('APRILE 2026', W / 2, 34)

  // Day header row
  const days = ['L','M','M','G','V','S','D']
  const colW = W / 7
  ctx.fillStyle = '#8a7060'
  ctx.font = 'bold 15px system-ui, -apple-system, sans-serif'
  days.forEach((d, i) => {
    ctx.fillText(d, colW * i + colW / 2, 84)
  })

  // Day numbers
  for (let d = 1; d <= 30; d++) {
    const idx = d - 1 + OFFSET
    const col = idx % 7
    const row = Math.floor(idx / 7)
    const x = colW * col + colW / 2
    const y = 110 + row * 40

    if (d === 13) {
      ctx.fillStyle = '#d94f3d'
      ctx.beginPath()
      ctx.arc(x, y, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 15px system-ui, -apple-system, sans-serif'
    } else {
      ctx.fillStyle = '#3d2b1f'
      ctx.font = '14px system-ui, -apple-system, sans-serif'
    }
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(d, x, y)
  }

  // Footer
  ctx.fillStyle = '#d94f3d'
  ctx.font = 'italic 13px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('quel giorno lì', W / 2, H - 18)

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

export function Calendar({ position = [0, 0, 0] }) {
  const days            = useRoomStore(s => s.getDaysSinceApril13())
  const dSinceStart     = useRoomStore(s => s.getDaysSinceStart())
  const activeModal     = useRoomStore(s => s.activeModal)
  const closeModal      = useRoomStore(s => s.closeModal)
  const calendarEvents  = useRoomStore(s => s.calendarEvents)
  const addCalendarEvent    = useRoomStore(s => s.addCalendarEvent)
  const removeCalendarEvent = useRoomStore(s => s.removeCalendarEvent)

  const [newDate, setNewDate] = useState('')
  const [newText, setNewText] = useState('')

  const quote   = SONG_QUOTES[Math.abs(dSinceStart) % SONG_QUOTES.length]
  const texture = useMemo(() => makeCalendarTexture(), [])

  const handleAdd = () => {
    if (!newDate || !newText.trim()) return
    addCalendarEvent(newDate, newText.trim())
    setNewDate('')
    setNewText('')
  }

  return (
    <group position={position}>
      <InteractiveObject objectId="calendar" name="calendario" position={[0, 0, 0]}>
        {/* Frame */}
        <mesh castShadow>
          <boxGeometry args={[0.72, 0.88, 0.04]} />
          <meshStandardMaterial color="#f5ede0" roughness={0.9} />
        </mesh>
        {/* Calendar face — pure 3D, no HTML, no click blocking */}
        <mesh position={[0, 0, 0.021]}>
          <planeGeometry args={[0.72, 0.88]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </InteractiveObject>

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <ModalOverlay isOpen={activeModal === 'calendar'} onClose={closeModal}>
          <div style={{
            background: '#fff8f3',
            borderRadius: '22px',
            padding: '36px 36px 28px',
            width: '100%', maxWidth: '420px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.22)',
          }}>
            {/* Days counter */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🦔 + 🐞</div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: '80px', fontWeight: 700, color: '#d94f3d', lineHeight: 1, letterSpacing: '-2px' }}>
                {days}
              </div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: '26px', color: '#3d2b1f', marginTop: '4px' }}>
                giorni insieme
              </div>
              <div style={{ fontSize: '12px', color: '#a08060', marginTop: '4px', letterSpacing: '0.5px' }}>
                dal 13 aprile 2026
              </div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: '17px', fontStyle: 'italic', color: '#5c3d2e', borderTop: '1px solid #e8d5b0', marginTop: '20px', paddingTop: '16px', lineHeight: 1.7 }}>
                {quote}
              </div>
            </div>

            {/* Events section */}
            <div style={{ borderTop: '1px solid #e8d5b0', paddingTop: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#a08060', textTransform: 'uppercase', marginBottom: '14px' }}>
                I nostri giorni
              </div>

              {calendarEvents.length > 0 && (
                <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }} className="modal-scroll">
                  {calendarEvents.map(ev => (
                    <div key={ev.id} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      background: 'rgba(217,79,61,0.06)',
                      borderRadius: '10px', padding: '8px 12px',
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#a08060', marginBottom: '2px' }}>{fmtDate(ev.date)}</div>
                        <div style={{ fontFamily: 'Caveat, cursive', fontSize: '17px', color: '#3d2b1f', lineHeight: 1.3 }}>{ev.text}</div>
                      </div>
                      <button
                        onClick={() => removeCalendarEvent(ev.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c8a87a', fontSize: '14px', padding: '0', marginTop: '1px', opacity: 0.6, flexShrink: 0 }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="date"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  style={{
                    padding: '8px 12px', border: '1px solid #e8d5b0',
                    borderRadius: '10px', fontSize: '13px', color: '#3d2b1f',
                    background: '#fffaf6', outline: 'none', fontFamily: 'inherit',
                  }}
                />
                <input
                  type="text"
                  placeholder="cosa è successo..."
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
                  maxLength={60}
                  style={{
                    padding: '8px 12px', border: '1px solid #e8d5b0',
                    borderRadius: '10px', fontSize: '13px', color: '#3d2b1f',
                    background: '#fffaf6', outline: 'none', fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={handleAdd}
                  disabled={!newDate || !newText.trim()}
                  style={{
                    padding: '9px',
                    background: (!newDate || !newText.trim()) ? 'rgba(217,79,61,0.15)' : '#d94f3d',
                    border: 'none', borderRadius: '10px',
                    color: (!newDate || !newText.trim()) ? '#c8a87a' : '#fff',
                    fontSize: '13px', fontWeight: 600,
                    cursor: (!newDate || !newText.trim()) ? 'default' : 'pointer',
                    fontFamily: 'inherit', transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  aggiungi
                </button>
              </div>
            </div>
          </div>
        </ModalOverlay>
      </Html>
    </group>
  )
}
