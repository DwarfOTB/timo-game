import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

const BODY_COLOR   = '#8b6347'
const SPINE_COLOR  = '#5a3d28'
const FACE_COLOR   = '#c49a6c'
const DARK         = '#2a1a0e'

// Spine positions/rotations hand-placed on upper-back hemisphere
const SPINES = [
  { pos: [0,  0.26,  -0.05], rot: [0.3,  0,  0]    },
  { pos: [0.12,  0.22, -0.02], rot: [0.4,  0.3, 0]  },
  { pos: [-0.12, 0.22, -0.02], rot: [0.4, -0.3, 0]  },
  { pos: [0.18,  0.15,  0.05], rot: [0.6,  0.5, 0]  },
  { pos: [-0.18, 0.15,  0.05], rot: [0.6, -0.5, 0]  },
  { pos: [0.08,  0.20, -0.14], rot: [0.1,  0.2, 0]  },
  { pos: [-0.08, 0.20, -0.14], rot: [0.1, -0.2, 0]  },
  { pos: [0,     0.22, -0.18], rot: [0,    0,   0]   },
]

export function Hedgehog({ position = [0, 0, 0] }) {
  const groupRef  = useRef()
  const [hovered, setHovered] = useState(false)
  const [showText, setShowText] = useState(false)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.position.y = position[1] + Math.sin(t * Math.PI) * 0.06
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
      {/* Body */}
      <mesh scale={[1, 0.82, 0.88]} castShadow>
        <sphereGeometry args={[0.28, 20, 16]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.9} />
      </mesh>

      {/* Face (forward-pointing snout) */}
      <mesh position={[0, 0.02, 0.22]} scale={[0.7, 0.65, 0.8]} castShadow>
        <sphereGeometry args={[0.16, 16, 12]} />
        <meshStandardMaterial color={FACE_COLOR} roughness={0.85} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 0.04, 0.36]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={DARK} roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.09, 0.10, 0.30]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={DARK} roughness={0.8} />
      </mesh>
      <mesh position={[-0.09, 0.10, 0.30]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={DARK} roughness={0.8} />
      </mesh>

      {/* Spines */}
      {SPINES.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot} castShadow>
          <coneGeometry args={[0.025, 0.22, 5]} />
          <meshStandardMaterial color={SPINE_COLOR} roughness={0.85} />
        </mesh>
      ))}

      {/* Hover emissive glow overlay */}
      {hovered && (
        <mesh scale={[1.06, 0.88, 0.94]}>
          <sphereGeometry args={[0.28, 16, 12]} />
          <meshStandardMaterial color="#d4a07a" transparent opacity={0.25} emissive="#d4a07a" emissiveIntensity={0.4} />
        </mesh>
      )}

      {/* Floating text on click */}
      {showText && (
        <Html position={[0, 0.75, 0]} center>
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
            Fabiuz ti guarda da lontano 🦔
          </div>
        </Html>
      )}
    </group>
  )
}
