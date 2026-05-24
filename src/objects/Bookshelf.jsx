import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { ModalOverlay } from '../ui/ModalOverlay'
import { GLOW_TEX } from '../utils/glowTexture'

const SHELF_COLOR = '#7a5c3e'
const SHELF_DARK  = '#5c3d28'
const BACK_COLOR  = '#6b5030'

const TOP_BOOKS = [
  [0.07, 0.38, 0.18, '#8b7355'],
  [0.06, 0.44, 0.18, '#c4956a'],
  [0.08, 0.50, 0.18, '#5c7a8b'],
  [0.07, 0.35, 0.18, '#8b5555'],
  [0.09, 0.46, 0.18, '#7a8b5c'],
]
const BOT_BOOKS = [
  [0.10, 0.30, 0.18, '#a08060'],
  [0.07, 0.38, 0.18, '#7a5c8b'],
  [0.08, 0.32, 0.18, '#5c7a5c'],
  [0.06, 0.42, 0.18, '#8b7a5c'],
]

function BookRow({ books, yBase, timoIdx }) {
  let xCursor = -0.20
  return (
    <>
      {books.map(([w, h, d, color], i) => {
        const cx = xCursor + w / 2
        xCursor += w + 0.01
        const isTimo = timoIdx !== undefined && i === timoIdx
        return (
          <group key={i} position={[cx, yBase + h / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[w, h, d]} />
              <meshStandardMaterial color={color} roughness={0.85} />
            </mesh>
            {isTimo && (
              <Html transform position={[w / 2 + 0.002, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={0.006}>
                <div style={{
                  width: '1px',
                  writingMode: 'vertical-lr',
                  transform: 'rotate(180deg)',
                  fontFamily: 'Figtree, system-ui, sans-serif',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  color: '#f5ede0',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  T I M O
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </>
  )
}

export function Bookshelf({ position = [0, 0, 0] }) {
  const W = 0.62
  const D = 0.22
  const H = 1.20
  const T = 0.04

  const openModal   = useRoomStore(s => s.openModal)
  const activeModal = useRoomStore(s => s.activeModal)
  const closeModal  = useRoomStore(s => s.closeModal)
  const [hovered, setHovered] = useState(false)
  const hoveredRef  = useRef(false)
  const glowRef     = useRef()
  const tRef        = useRef(0)

  useFrame((_, delta) => {
    tRef.current += delta
    if (glowRef.current) {
      const base  = hoveredRef.current ? 0.65 : 0.35
      const pulse = Math.sin(tRef.current * 1.6) * 0.12
      glowRef.current.material.opacity = Math.max(0, Math.min(1, base + pulse))
    }
  })

  return (
    <group position={position}>
      <group
        onPointerEnter={() => { hoveredRef.current = true;  setHovered(true);  document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { hoveredRef.current = false; setHovered(false); document.body.style.cursor = 'default' }}
        onClick={(e) => { e.stopPropagation(); openModal('bookshelf') }}
      >
        {/* Back panel */}
        <mesh position={[0, H / 2, -D / 2 + 0.01]} castShadow>
          <boxGeometry args={[W, H, 0.03]} />
          <meshStandardMaterial color={BACK_COLOR} roughness={0.9} />
        </mesh>

        {/* Left side */}
        <mesh position={[-W / 2, H / 2, 0]} castShadow>
          <boxGeometry args={[T, H, D]} />
          <meshStandardMaterial color={SHELF_DARK} roughness={0.9} />
        </mesh>

        {/* Right side */}
        <mesh position={[W / 2, H / 2, 0]} castShadow>
          <boxGeometry args={[T, H, D]} />
          <meshStandardMaterial color={SHELF_DARK} roughness={0.9} />
        </mesh>

        {/* Bottom shelf */}
        <mesh position={[0, T / 2, 0]}>
          <boxGeometry args={[W - T * 2, T, D]} />
          <meshStandardMaterial color={SHELF_COLOR} roughness={0.85} />
        </mesh>

        {/* Mid shelf */}
        <mesh position={[0, H * 0.50, 0]}>
          <boxGeometry args={[W - T * 2, T, D]} />
          <meshStandardMaterial color={SHELF_COLOR} roughness={0.85} />
        </mesh>

        {/* Top shelf */}
        <mesh position={[0, H - T / 2, 0]}>
          <boxGeometry args={[W - T * 2, T, D]} />
          <meshStandardMaterial color={SHELF_COLOR} roughness={0.85} />
        </mesh>

        <BookRow books={TOP_BOOKS} yBase={H * 0.50 + T} timoIdx={2} />
        <BookRow books={BOT_BOOKS} yBase={T} />

        <sprite ref={glowRef} position={[0, H / 2, 0]} scale={[1.6, 1.6, 1]}>
          <spriteMaterial map={GLOW_TEX} transparent depthWrite={false} depthTest={false} />
        </sprite>

        {hovered && (
          <Html position={[0, H + 0.18, 0]} center zIndexRange={[1, 1]}>
            <div style={{
              background: 'rgba(22,13,6,0.88)',
              color: 'rgba(245,237,224,0.92)',
              fontFamily: 'Caveat, cursive',
              fontSize: '15px',
              letterSpacing: '0.5px',
              padding: '5px 14px',
              borderRadius: '20px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              border: '1px solid rgba(196,48,110,0.35)',
              boxShadow: '0 3px 14px rgba(0,0,0,0.25)',
              userSelect: 'none',
            }}>
              scaffale
            </div>
          </Html>
        )}
      </group>

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <ModalOverlay isOpen={activeModal === 'bookshelf'} onClose={closeModal} dark>
          <div style={{
            width: '100%', maxWidth: '320px',
            background: 'rgba(20,12,5,0.92)',
            border: '1px solid rgba(139,99,71,0.28)',
            borderRadius: '20px',
            padding: '40px 32px 32px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '36px', marginBottom: '20px' }}>📚</div>
            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '24px',
              lineHeight: 1.9,
              color: '#f5e8e4',
              whiteSpace: 'pre-wrap',
            }}>
              {`I tuoi mondi, tutti qui.\n\nI libri che hai amato.\nI posti in cui sei stata,\nprima ancora di arrivarci.`}
            </div>
          </div>
        </ModalOverlay>
      </Html>
    </group>
  )
}
