import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

const GLASS_COLOR  = '#b8d4e0'
const LID_COLOR    = '#8a6a50'
const PARTICLE_CNT = 28

export function TimoJar({ position = [0, 0, 0] }) {
  const particlesRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_CNT * 3)
    for (let i = 0; i < PARTICLE_CNT; i++) {
      const r     = 0.12 * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.random() * Math.PI
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.6 + 0.18
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (particlesRef.current) particlesRef.current.rotation.y = clock.getElapsedTime() * 0.4
  })

  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.16, 0.14, 0.42, 18]} />
        <meshStandardMaterial color={GLASS_COLOR} transparent opacity={0.45} roughness={0.05} metalness={0.1} emissive="#aaccff" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, 0.24, 0]} castShadow>
        <cylinderGeometry args={[0.175, 0.175, 0.07, 18]} />
        <meshStandardMaterial color={LID_COLOR} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.295, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.05, 10]} />
        <meshStandardMaterial color={LID_COLOR} roughness={0.85} />
      </mesh>
      <Html transform position={[0.162, 0.05, 0]} rotation={[0, Math.PI / 2, 0]} scale={0.007}>
        <div style={{
          width: '60px', textAlign: 'center',
          fontFamily: 'Caveat, cursive',
          fontSize: '20px',
          color: '#3d2b1f',
          background: 'rgba(253,248,242,0.92)',
          borderRadius: '4px',
          padding: '3px 6px',
          pointerEvents: 'none',
          letterSpacing: '3px',
        }}>
          timo
        </div>
      </Html>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={PARTICLE_CNT} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#f4c8d0" size={0.018} transparent opacity={0.75} sizeAttenuation />
      </points>
    </group>
  )
}
