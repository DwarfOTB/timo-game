import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { ModalOverlay } from '../ui/ModalOverlay'

const BODY_COLOR  = '#8b6347'
const SPINE_COLOR = '#5a3d28'
const FACE_COLOR  = '#c49a6c'
const DARK        = '#2a1a0e'

const SPINES = [
  { pos: [0,  0.26,  -0.05], rot: [0.3,  0,  0]   },
  { pos: [0.12,  0.22, -0.02], rot: [0.4,  0.3, 0] },
  { pos: [-0.12, 0.22, -0.02], rot: [0.4, -0.3, 0] },
  { pos: [0.18,  0.15,  0.05], rot: [0.6,  0.5, 0] },
  { pos: [-0.18, 0.15,  0.05], rot: [0.6, -0.5, 0] },
  { pos: [0.08,  0.20, -0.14], rot: [0.1,  0.2, 0] },
  { pos: [-0.08, 0.20, -0.14], rot: [0.1, -0.2, 0] },
  { pos: [0,     0.22, -0.18], rot: [0,    0,   0]  },
]

export function Hedgehog({ position = [0, 0, 0] }) {
  const groupRef  = useRef()
  const [hovered, setHovered] = useState(false)
  const activeModal = useRoomStore(s => s.activeModal)
  const openModal   = useRoomStore(s => s.openModal)
  const closeModal  = useRoomStore(s => s.closeModal)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.position.y = position[1] + Math.sin(t * Math.PI) * 0.06
  })

  return (
    <group>
      <group
        ref={groupRef}
        position={position}
        onPointerEnter={() => { setHovered(true);  document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
        onClick={(e) => { e.stopPropagation(); openModal('hedgehog') }}
      >
        <mesh scale={[1, 0.82, 0.88]} castShadow>
          <sphereGeometry args={[0.28, 20, 16]} />
          <meshStandardMaterial color={BODY_COLOR} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.02, 0.22]} scale={[0.7, 0.65, 0.8]} castShadow>
          <sphereGeometry args={[0.16, 16, 12]} />
          <meshStandardMaterial color={FACE_COLOR} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.04, 0.36]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={DARK} roughness={0.8} />
        </mesh>
        <mesh position={[0.09, 0.10, 0.30]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color={DARK} roughness={0.8} />
        </mesh>
        <mesh position={[-0.09, 0.10, 0.30]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color={DARK} roughness={0.8} />
        </mesh>
        {SPINES.map((s, i) => (
          <mesh key={i} position={s.pos} rotation={s.rot} castShadow>
            <coneGeometry args={[0.025, 0.22, 5]} />
            <meshStandardMaterial color={SPINE_COLOR} roughness={0.85} />
          </mesh>
        ))}
        {hovered && (
          <mesh scale={[1.06, 0.88, 0.94]}>
            <sphereGeometry args={[0.28, 16, 12]} />
            <meshStandardMaterial color="#d4a07a" transparent opacity={0.25} emissive="#d4a07a" emissiveIntensity={0.4} />
          </mesh>
        )}
      </group>

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <ModalOverlay isOpen={activeModal === 'hedgehog'} onClose={closeModal} dark>
          <div style={{
            width: '100%', maxWidth: '320px',
            background: 'rgba(20,11,5,0.92)',
            border: '1px solid rgba(139,99,71,0.25)',
            borderRadius: '20px',
            padding: '40px 32px 32px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🦔</div>
            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '26px',
              lineHeight: 1.9,
              color: '#f0e4d4',
              whiteSpace: 'pre-wrap',
            }}>
              {`Fabiuz ti guarda da lontano.\n\nSempre.\nAnche quando non lo sai.`}
            </div>
          </div>
        </ModalOverlay>
      </Html>
    </group>
  )
}
