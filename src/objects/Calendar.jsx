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

export function Calendar({ position = [0, 0, 0] }) {
  const days         = useRoomStore(s => s.getDaysSinceApril13())
  const dSinceStart  = useRoomStore(s => s.getDaysSinceStart())
  const activeModal  = useRoomStore(s => s.activeModal)
  const closeModal   = useRoomStore(s => s.closeModal)

  const quote = SONG_QUOTES[Math.abs(dSinceStart) % SONG_QUOTES.length]

  return (
    <group position={position}>
      <InteractiveObject objectId="calendar" name="calendario" position={[0, 0, 0]}>
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

        <Html transform position={[0, 0, 0.025]} style={{ width: '144px', pointerEvents: 'none' }}>
          <div style={{ width: '144px', fontFamily: 'system-ui', fontSize: '9px', color: '#3d2b1f', userSelect: 'none' }}>
            <div style={{ background: '#d94f3d', color: '#fff', textAlign: 'center', padding: '5px 0 4px', fontWeight: 700, fontSize: '10px', letterSpacing: '0.5px' }}>
              APRILE 2026
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', padding: '4px 4px 2px', background: '#f5ede0' }}>
              {['L','M','M','G','V','S','D'].map((d, i) => (
                <div key={i} style={{ textAlign: 'center', fontWeight: 700, color: '#8a7060', fontSize: '7px', paddingBottom: '2px' }}>{d}</div>
              ))}
              {Array.from({ length: OFFSET }).map((_, i) => <div key={'e' + i} />)}
              {DAYS.map(d => (
                <div key={d} style={{ textAlign: 'center', lineHeight: '14px', borderRadius: '50%', background: d === 13 ? '#d94f3d' : 'transparent', color: d === 13 ? '#fff' : '#3d2b1f', fontWeight: d === 13 ? 700 : 400 }}>
                  {d}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontSize: '8px', color: '#d94f3d', padding: '2px 0 3px', fontStyle: 'italic' }}>❤️ quel giorno lì</div>
          </div>
        </Html>
      </InteractiveObject>

      <Html fullscreen>
        <ModalOverlay isOpen={activeModal === 'calendar'} onClose={closeModal}>
          <div style={{
            background: '#fff8f3',
            borderRadius: '22px',
            padding: '44px 52px 36px',
            maxWidth: '340px', width: '88%',
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
