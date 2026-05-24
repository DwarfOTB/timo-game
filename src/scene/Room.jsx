import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Vivid hex colors — set directly on material.emissive
const TV_CHANNELS = ['#c4306e', '#2244bb', '#cc7711', '#7722bb', '#1e8844', '#bb4422']

function TVScreen() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const ci = Math.floor(t / 4) % TV_CHANNELS.length
    const localT = t % 4
    // Brief bright flash on channel change (first 0.12s of each phase)
    const flash = localT < 0.12
    meshRef.current.material.emissive.set(TV_CHANNELS[ci])
    meshRef.current.material.emissiveIntensity = flash
      ? 1.6 + Math.sin(t * 120) * 0.3
      : 0.90 + Math.sin(t * 47.3) * 0.06 + Math.sin(t * 29.1) * 0.04
  })
  return (
    <mesh ref={meshRef} position={[0.5, 1.52, -3.836]}>
      <planeGeometry args={[1.48, 0.82]} />
      <meshStandardMaterial color="#040204" emissive="#c4306e" emissiveIntensity={0.90} roughness={0.02} metalness={0.5} />
    </mesh>
  )
}

export function Room() {
  return (
    <group>

      {/* ── FLOOR ─────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#c8a870" roughness={0.9} />
      </mesh>

      {/* Main rug — couch sits on this */}
      <mesh rotation={[-Math.PI / 2, 0, 0.06]} position={[0.3, 0.002, 0.6]} receiveShadow>
        <planeGeometry args={[3.8, 3.0]} />
        <meshStandardMaterial color="#b55c38" roughness={0.99} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0.06]} position={[0.3, 0.003, 0.6]}>
        <planeGeometry args={[3.2, 2.4]} />
        <meshStandardMaterial color="#9e4e2e" roughness={0.99} />
      </mesh>

      {/* ── WALLS ─────────────────────────────────────── */}
      <mesh position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#cdb888" roughness={0.95} />
      </mesh>
      <mesh position={[0, 2.5, -4]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#c4aa80" roughness={0.95} />
      </mesh>

      {/* Baseboards */}
      <mesh position={[-3.98, 0.09, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[8, 0.18, 0.04]} />
        <meshStandardMaterial color="#b8a070" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.09, -3.98]}>
        <boxGeometry args={[8, 0.18, 0.04]} />
        <meshStandardMaterial color="#b09060" roughness={0.9} />
      </mesh>
      {/* Fuchsia accent strip left wall */}
      <mesh position={[-3.98, 0.22, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[8, 0.04, 0.02]} />
        <meshStandardMaterial color="#e8c4cc" roughness={0.9} />
      </mesh>

      {/* ── WINDOW (back wall, left of center) ─────────── */}
      <mesh position={[-1.8, 2.35, -3.96]} castShadow>
        <boxGeometry args={[1.32, 1.74, 0.10]} />
        <meshStandardMaterial color="#d8c8b0" roughness={0.85} />
      </mesh>
      <mesh position={[-1.8, 2.35, -3.91]}>
        <planeGeometry args={[1.10, 1.52]} />
        <meshStandardMaterial color="#b8d2e6" transparent opacity={0.40} roughness={0.04} metalness={0.06} />
      </mesh>
      <mesh position={[-1.8, 2.35, -3.906]}>
        <boxGeometry args={[1.10, 0.048, 0.024]} />
        <meshStandardMaterial color="#d8c8b0" roughness={0.85} />
      </mesh>
      <mesh position={[-1.8, 2.35, -3.906]}>
        <boxGeometry args={[0.048, 1.52, 0.024]} />
        <meshStandardMaterial color="#d8c8b0" roughness={0.85} />
      </mesh>
      {/* Sill */}
      <mesh position={[-1.8, 1.52, -3.86]} castShadow>
        <boxGeometry args={[1.44, 0.072, 0.20]} />
        <meshStandardMaterial color="#c8b090" roughness={0.78} />
      </mesh>
      {/* Sill plant */}
      <mesh position={[-1.22, 1.60, -3.83]}>
        <cylinderGeometry args={[0.055, 0.044, 0.10, 10]} />
        <meshStandardMaterial color="#c4956a" roughness={0.9} />
      </mesh>
      <mesh position={[-1.22, 1.67, -3.83]}>
        <sphereGeometry args={[0.07, 8, 6]} />
        <meshStandardMaterial color="#5a7a3a" roughness={0.7} />
      </mesh>
      {/* Sill candle */}
      <mesh position={[-2.35, 1.60, -3.84]}>
        <cylinderGeometry args={[0.030, 0.030, 0.085, 10]} />
        <meshStandardMaterial color="#f4d0c8" roughness={0.8} />
      </mesh>
      <mesh position={[-2.35, 1.65, -3.84]}>
        <cylinderGeometry args={[0.003, 0.003, 0.05, 5]} />
        <meshStandardMaterial color="#8b6347" roughness={0.8} />
      </mesh>
      {/* Curtain rod */}
      <mesh position={[-1.8, 3.28, -3.91]}>
        <boxGeometry args={[1.92, 0.040, 0.040]} />
        <meshStandardMaterial color="#a07850" roughness={0.52} metalness={0.28} />
      </mesh>
      {/* Left curtain */}
      <mesh position={[-2.68, 2.60, -3.93]} castShadow>
        <boxGeometry args={[0.32, 2.10, 0.072]} />
        <meshStandardMaterial color="#f0c4cc" roughness={0.96} />
      </mesh>
      <mesh position={[-2.52, 2.60, -3.90]}>
        <boxGeometry args={[0.09, 2.10, 0.052]} />
        <meshStandardMaterial color="#e8b0b8" roughness={0.96} />
      </mesh>
      {/* Right curtain */}
      <mesh position={[-0.92, 2.60, -3.93]} castShadow>
        <boxGeometry args={[0.32, 2.10, 0.072]} />
        <meshStandardMaterial color="#f0c4cc" roughness={0.96} />
      </mesh>
      <mesh position={[-1.08, 2.60, -3.90]}>
        <boxGeometry args={[0.09, 2.10, 0.052]} />
        <meshStandardMaterial color="#e8b0b8" roughness={0.96} />
      </mesh>
      {/* Warm sunlight */}
      <pointLight position={[-1.8, 2.2, -2.8]} intensity={1.0} color="#ffe4a8" distance={6} decay={2} />

      {/* ── TV on back wall ──────────────────────────── */}
      {/* TV frame */}
      <mesh position={[0.5, 1.52, -3.88]} castShadow>
        <boxGeometry args={[1.62, 0.96, 0.09]} />
        <meshStandardMaterial color="#1e140e" roughness={0.45} metalness={0.1} />
      </mesh>
      {/* Screen — animated */}
      <TVScreen />
      {/* TV stand pole */}
      <mesh position={[0.5, 0.82, -3.87]}>
        <boxGeometry args={[0.18, 1.20, 0.09]} />
        <meshStandardMaterial color="#1e140e" roughness={0.45} />
      </mesh>
      {/* TV stand base */}
      <mesh position={[0.5, 0.065, -3.74]} castShadow>
        <boxGeometry args={[0.88, 0.13, 0.30]} />
        <meshStandardMaterial color="#1e140e" roughness={0.45} />
      </mesh>
      {/* Faint TV glow toward room */}
      <pointLight position={[0.5, 1.52, -3.2]} intensity={0.25} color="#f0d0e8" distance={4} decay={2} />

      {/* ── STRING LIGHTS along back wall top ───────── */}
      {Array.from({ length: 16 }, (_, i) => {
        const x    = -3.5 + i * 0.46
        const yOff = Math.sin(i * 1.4 + 0.5) * 0.09
        const y    = 4.08 + yOff
        return (
          <group key={i}>
            {i < 15 && (
              <mesh position={[x + 0.23, 4.14 + (yOff + Math.sin((i + 1) * 1.4 + 0.5) * 0.09) / 2 - 0.04, -3.88]}>
                <boxGeometry args={[0.46, 0.007, 0.007]} />
                <meshStandardMaterial color="#6b4c30" roughness={0.8} />
              </mesh>
            )}
            <mesh position={[x, y, -3.87]}>
              <sphereGeometry args={[0.026, 6, 6]} />
              <meshStandardMaterial
                color={i % 4 === 0 ? '#ffb8c8' : i % 4 === 1 ? '#ffe8a0' : i % 4 === 2 ? '#f8c8e8' : '#ffd4a0'}
                emissive={i % 4 === 0 ? '#ff4080' : i % 4 === 1 ? '#ffaa00' : i % 4 === 2 ? '#e040a0' : '#ff8800'}
                emissiveIntensity={1.4}
                roughness={0.2}
              />
            </mesh>
          </group>
        )
      })}

      {/* ── WALL SHELF below calendar ─────────────── */}
      <mesh position={[1.46, 1.56, -3.89]}>
        <boxGeometry args={[0.042, 0.15, 0.24]} />
        <meshStandardMaterial color="#5c3d28" roughness={0.9} />
      </mesh>
      <mesh position={[2.78, 1.56, -3.89]}>
        <boxGeometry args={[0.042, 0.15, 0.24]} />
        <meshStandardMaterial color="#5c3d28" roughness={0.9} />
      </mesh>
      <mesh position={[2.10, 1.64, -3.88]} castShadow>
        <boxGeometry args={[1.48, 0.046, 0.26]} />
        <meshStandardMaterial color="#7a5c3e" roughness={0.80} />
      </mesh>
      {/* Shelf items */}
      <mesh position={[1.54, 1.72, -3.82]}>
        <cylinderGeometry args={[0.055, 0.044, 0.108, 10]} />
        <meshStandardMaterial color="#c4306e" roughness={0.85} />
      </mesh>
      <mesh position={[1.54, 1.79, -3.82]}>
        <sphereGeometry args={[0.068, 8, 6]} />
        <meshStandardMaterial color="#6b9442" roughness={0.7} />
      </mesh>
      <mesh position={[2.00, 1.70, -3.82]} rotation={[0, 0.12, 0]}>
        <boxGeometry args={[0.065, 0.152, 0.112]} />
        <meshStandardMaterial color="#c4306e" roughness={0.85} />
      </mesh>
      <mesh position={[2.14, 1.70, -3.82]} rotation={[0, -0.08, 0]}>
        <boxGeometry args={[0.057, 0.124, 0.102]} />
        <meshStandardMaterial color="#e8a0b0" roughness={0.85} />
      </mesh>
      <mesh position={[2.55, 1.69, -3.82]}>
        <cylinderGeometry args={[0.033, 0.033, 0.102, 10]} />
        <meshStandardMaterial color="#f4d4c8" roughness={0.8} />
      </mesh>
      <mesh position={[2.55, 1.75, -3.82]}>
        <cylinderGeometry args={[0.003, 0.003, 0.056, 5]} />
        <meshStandardMaterial color="#8b6347" roughness={0.8} />
      </mesh>

      {/* ── WALL ART far left of back wall ───────── */}
      <mesh position={[-3.1, 2.55, -3.95]} castShadow>
        <boxGeometry args={[0.92, 0.74, 0.048]} />
        <meshStandardMaterial color="#8b6347" roughness={0.84} />
      </mesh>
      <mesh position={[-3.1, 2.55, -3.927]}>
        <planeGeometry args={[0.80, 0.62]} />
        <meshStandardMaterial color="#f9f3ea" roughness={0.9} />
      </mesh>
      <mesh position={[-3.1, 2.61, -3.923]}>
        <planeGeometry args={[0.34, 0.32]} />
        <meshStandardMaterial color="#c4306e" roughness={0.9} />
      </mesh>
      <mesh position={[-3.24, 2.46, -3.921]}>
        <planeGeometry args={[0.22, 0.20]} />
        <meshStandardMaterial color="#f0c4cc" roughness={0.9} />
      </mesh>
      <mesh position={[-2.97, 2.44, -3.921]}>
        <planeGeometry args={[0.18, 0.17]} />
        <meshStandardMaterial color="#f4d0c8" roughness={0.9} />
      </mesh>

      {/* ── COUCH center of room, facing TV ─────────── */}
      {/* Seat cushion — top at y=0.48 so hedgehog/ladybug sit just above */}
      <mesh position={[0.3, 0.24, 0.65]} castShadow receiveShadow>
        <boxGeometry args={[2.50, 0.48, 0.86]} />
        <meshStandardMaterial color="#c4786e" roughness={0.96} />
      </mesh>
      {/* Back cushion (high z = behind seat from camera) */}
      <mesh position={[0.3, 0.70, 1.06]} castShadow>
        <boxGeometry args={[2.50, 0.66, 0.30]} />
        <meshStandardMaterial color="#b86860" roughness={0.96} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.96, 0.46, 0.74]} castShadow>
        <boxGeometry args={[0.26, 0.72, 0.92]} />
        <meshStandardMaterial color="#a85858" roughness={0.92} />
      </mesh>
      {/* Right arm */}
      <mesh position={[1.56, 0.46, 0.74]} castShadow>
        <boxGeometry args={[0.26, 0.72, 0.92]} />
        <meshStandardMaterial color="#a85858" roughness={0.92} />
      </mesh>
      {/* Legs */}
      {[[-0.84, 0.24], [1.44, 0.24], [-0.84, 1.14], [1.44, 1.14]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.04, z]}>
          <cylinderGeometry args={[0.042, 0.042, 0.08, 8]} />
          <meshStandardMaterial color="#5c3d28" roughness={0.9} />
        </mesh>
      ))}
      {/* Side pillows (not where animals sit — pushed to corners) */}
      <mesh position={[-0.70, 0.62, 1.00]} rotation={[0.12, 0.10, 0.18]} castShadow>
        <boxGeometry args={[0.30, 0.26, 0.14]} />
        <meshStandardMaterial color="#f0a8c4" roughness={0.96} />
      </mesh>
      <mesh position={[1.22, 0.62, 0.98]} rotation={[-0.08, -0.12, -0.14]} castShadow>
        <boxGeometry args={[0.28, 0.24, 0.13]} />
        <meshStandardMaterial color="#c4306e" roughness={0.96} />
      </mesh>

      {/* ── SMALL TABLE for notebook (left of couch) ─ */}
      {/* Table top */}
      <mesh position={[-1.55, 0.50, 0.65]} castShadow>
        <boxGeometry args={[0.54, 0.05, 0.46]} />
        <meshStandardMaterial color="#8a6848" roughness={0.72} />
      </mesh>
      {/* Table legs */}
      {[[-1.32, 0.44], [-1.78, 0.44], [-1.32, 0.86], [-1.78, 0.86]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.25, z]}>
          <cylinderGeometry args={[0.030, 0.030, 0.50, 8]} />
          <meshStandardMaterial color="#6b5030" roughness={0.88} />
        </mesh>
      ))}

      {/* ── FLOOR LAMP ────────────────────────────── */}
      <mesh position={[3.05, 0.062, -0.85]}>
        <cylinderGeometry args={[0.135, 0.135, 0.124, 12]} />
        <meshStandardMaterial color="#8b6347" roughness={0.52} metalness={0.28} />
      </mesh>
      <mesh position={[3.05, 1.08, -0.85]}>
        <cylinderGeometry args={[0.026, 0.026, 1.92, 8]} />
        <meshStandardMaterial color="#a07850" roughness={0.52} metalness={0.28} />
      </mesh>
      <mesh position={[3.05, 2.12, -0.85]}>
        <coneGeometry args={[0.32, 0.46, 16, 1, true]} />
        <meshStandardMaterial color="#f4d4c8" roughness={0.92} side={2} />
      </mesh>
      <mesh position={[3.05, 2.08, -0.85]}>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 8]} />
        <meshStandardMaterial color="#a07850" roughness={0.52} metalness={0.28} />
      </mesh>
      <pointLight position={[3.05, 1.92, -0.85]} intensity={1.5} color="#ffcc88" distance={5} decay={2} />

    </group>
  )
}
