import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { ModalOverlay } from '../ui/ModalOverlay'

const BODY_COLOR = '#d94f3d'
const HEAD_COLOR = '#1a1a1a'
const SPOT_COLOR = '#1a1a1a'
const LINE_COLOR = '#1a1a1a'

const SPOTS = [
  { pos: [0.11,  0.20,  0.05] },
  { pos: [-0.11, 0.20,  0.05] },
  { pos: [0,     0.20, -0.08] },
]

export function Ladybug({ position = [0, 0, 0] }) {
  const groupRef  = useRef()
  const [hovered, setHovered] = useState(false)
  const activeModal = useRoomStore(s => s.activeModal)
  const openModal   = useRoomStore(s => s.openModal)
  const closeModal  = useRoomStore(s => s.closeModal)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.z = Math.sin(t * (Math.PI * 2 / 3) + 1.5) * 0.12
    groupRef.current.position.y = position[1] + Math.sin(t * (Math.PI * 2 / 3) + 0.8) * 0.04
  })

  return (
    <group>
      <group
        ref={groupRef}
        position={position}
        onPointerEnter={() => { setHovered(true);  document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
        onClick={(e) => { e.stopPropagation(); openModal('ladybug') }}
      >
        <mesh scale={[1, 0.65, 1]} castShadow>
          <sphereGeometry args={[0.24, 20, 16]} />
          <meshStandardMaterial color={BODY_COLOR} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.06, 0.22]} castShadow>
          <sphereGeometry args={[0.13, 16, 12]} />
          <meshStandardMaterial color={HEAD_COLOR} roughness={0.7} />
        </mesh>
        <mesh position={[0.06, 0.11, 0.30]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.06, 0.11, 0.30]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.16, 0]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.025, 0.04, 0.38]} />
          <meshStandardMaterial color={LINE_COLOR} roughness={0.7} />
        </mesh>
        {SPOTS.map((s, i) => (
          <mesh key={i} position={s.pos} scale={[1, 0.18, 1]}>
            <sphereGeometry args={[0.07, 10, 8]} />
            <meshStandardMaterial color={SPOT_COLOR} roughness={0.7} />
          </mesh>
        ))}
        {hovered && (
          <mesh scale={[1.08, 0.70, 1.08]}>
            <sphereGeometry args={[0.24, 16, 12]} />
            <meshStandardMaterial color="#f4826f" transparent opacity={0.28} emissive="#f4826f" emissiveIntensity={0.5} />
          </mesh>
        )}
      </group>

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <ModalOverlay isOpen={activeModal === 'ladybug'} onClose={closeModal} dark>
          <div style={{
            width: '100%', maxWidth: '320px',
            background: 'rgba(20,5,5,0.92)',
            border: '1px solid rgba(217,79,61,0.22)',
            borderRadius: '20px',
            padding: '40px 32px 32px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🐞</div>
            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '26px',
              lineHeight: 1.9,
              color: '#f5e8e4',
              whiteSpace: 'pre-wrap',
            }}>
              {`Bebi è qui,\nnella stanza.\n\nCome sempre.`}
            </div>
          </div>
        </ModalOverlay>
      </Html>
    </group>
  )
}
