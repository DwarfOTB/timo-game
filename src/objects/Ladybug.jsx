import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

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
  const [showText, setShowText] = useState(false)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    // Gentle tilt (offset phase from hedgehog)
    groupRef.current.rotation.z = Math.sin(t * (Math.PI * 2 / 3) + 1.5) * 0.12
    groupRef.current.position.y = position[1] + Math.sin(t * (Math.PI * 2 / 3) + 0.8) * 0.04
  })

  const handleClick = (e) => {
    e.stopPropagation()
    setShowText(true)
  }

  useEffect(() => {
    if (!showText) return
    const id = setTimeout(() => setShowText(false), 3000)
    return () => clearTimeout(id)
  }, [showText])

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => { setHovered(true);  document.body.style.cursor = 'pointer' }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={handleClick}
    >
      {/* Body — hemisphere-ish (flattened sphere) */}
      <mesh scale={[1, 0.65, 1]} castShadow>
        <sphereGeometry args={[0.24, 20, 16]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.06, 0.22]} castShadow>
        <sphereGeometry args={[0.13, 16, 12]} />
        <meshStandardMaterial color={HEAD_COLOR} roughness={0.7} />
      </mesh>

      {/* Eyes — small white dots on head */}
      <mesh position={[0.06, 0.11, 0.30]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.06, 0.11, 0.30]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Wing dividing line */}
      <mesh position={[0, 0.16, 0]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.025, 0.04, 0.38]} />
        <meshStandardMaterial color={LINE_COLOR} roughness={0.7} />
      </mesh>

      {/* Spots */}
      {SPOTS.map((s, i) => (
        <mesh key={i} position={s.pos} scale={[1, 0.18, 1]}>
          <sphereGeometry args={[0.07, 10, 8]} />
          <meshStandardMaterial color={SPOT_COLOR} roughness={0.7} />
        </mesh>
      ))}

      {/* Hover glow */}
      {hovered && (
        <mesh scale={[1.08, 0.70, 1.08]}>
          <sphereGeometry args={[0.24, 16, 12]} />
          <meshStandardMaterial color="#f4826f" transparent opacity={0.28} emissive="#f4826f" emissiveIntensity={0.5} />
        </mesh>
      )}

      {/* Floating text */}
      {showText && (
        <Html position={[0, 0.65, 0]} center>
          <div style={{
            background: 'rgba(255,252,248,0.95)',
            border: '1px solid #e8d5b0',
            borderRadius: '12px',
            padding: '7px 13px',
            fontSize: '13px',
            color: '#3d2b1f',
            fontFamily: 'system-ui, sans-serif',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            pointerEvents: 'none',
          }}>
            Bebi è qui, nella stanza 🐞
          </div>
        </Html>
      )}
    </group>
  )
}
