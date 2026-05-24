export function Room() {
  return (
    <group>

      {/* ── FLOOR ─────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#e8d5b0" roughness={0.9} />
      </mesh>

      {/* Main rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0.06]} position={[0.4, 0.002, 0.5]} receiveShadow>
        <planeGeometry args={[3.4, 2.5]} />
        <meshStandardMaterial color="#b55c38" roughness={0.99} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0.06]} position={[0.4, 0.003, 0.5]}>
        <planeGeometry args={[2.85, 2.05]} />
        <meshStandardMaterial color="#9e4e2e" roughness={0.99} />
      </mesh>

      {/* Couch-area rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0.002, -2.55]}>
        <planeGeometry args={[2.8, 1.5]} />
        <meshStandardMaterial color="#c47880" roughness={0.99} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0.003, -2.55]}>
        <planeGeometry args={[2.3, 1.1]} />
        <meshStandardMaterial color="#b06870" roughness={0.99} />
      </mesh>

      {/* ── WALLS ─────────────────────────────────────── */}
      <mesh position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#f5ede0" roughness={0.95} />
      </mesh>
      <mesh position={[0, 2.5, -4]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#ede5d8" roughness={0.95} />
      </mesh>

      {/* Baseboards */}
      <mesh position={[-3.98, 0.09, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[8, 0.18, 0.04]} />
        <meshStandardMaterial color="#d6c6a8" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.09, -3.98]}>
        <boxGeometry args={[8, 0.18, 0.04]} />
        <meshStandardMaterial color="#ccc0aa" roughness={0.9} />
      </mesh>

      {/* ── WINDOW (back wall, left of center) ─────────── */}
      {/* Outer frame */}
      <mesh position={[-1.8, 2.35, -3.96]} castShadow>
        <boxGeometry args={[1.32, 1.74, 0.10]} />
        <meshStandardMaterial color="#d8c8b0" roughness={0.85} />
      </mesh>
      {/* Glass pane */}
      <mesh position={[-1.8, 2.35, -3.91]}>
        <planeGeometry args={[1.10, 1.52]} />
        <meshStandardMaterial color="#b8d2e6" transparent opacity={0.40} roughness={0.04} metalness={0.06} />
      </mesh>
      {/* Cross bars */}
      <mesh position={[-1.8, 2.35, -3.906]}>
        <boxGeometry args={[1.10, 0.048, 0.024]} />
        <meshStandardMaterial color="#d8c8b0" roughness={0.85} />
      </mesh>
      <mesh position={[-1.8, 2.35, -3.906]}>
        <boxGeometry args={[0.048, 1.52, 0.024]} />
        <meshStandardMaterial color="#d8c8b0" roughness={0.85} />
      </mesh>
      {/* Window sill */}
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
      {/* Sill small candle */}
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
      {/* Warm sunlight through window */}
      <pointLight position={[-1.8, 2.2, -2.8]} intensity={1.0} color="#ffe4a8" distance={6} decay={2} />

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
      {/* Left bracket */}
      <mesh position={[0.96, 1.56, -3.89]}>
        <boxGeometry args={[0.042, 0.15, 0.24]} />
        <meshStandardMaterial color="#5c3d28" roughness={0.9} />
      </mesh>
      {/* Right bracket */}
      <mesh position={[2.28, 1.56, -3.89]}>
        <boxGeometry args={[0.042, 0.15, 0.24]} />
        <meshStandardMaterial color="#5c3d28" roughness={0.9} />
      </mesh>
      {/* Shelf board */}
      <mesh position={[1.60, 1.64, -3.88]} castShadow>
        <boxGeometry args={[1.48, 0.046, 0.26]} />
        <meshStandardMaterial color="#7a5c3e" roughness={0.80} />
      </mesh>
      {/* Mini pot */}
      <mesh position={[1.04, 1.72, -3.82]}>
        <cylinderGeometry args={[0.055, 0.044, 0.108, 10]} />
        <meshStandardMaterial color="#c4306e" roughness={0.85} />
      </mesh>
      <mesh position={[1.04, 1.79, -3.82]}>
        <sphereGeometry args={[0.068, 8, 6]} />
        <meshStandardMaterial color="#6b9442" roughness={0.7} />
      </mesh>
      {/* Fuchsia book */}
      <mesh position={[1.50, 1.70, -3.82]} rotation={[0, 0.12, 0]}>
        <boxGeometry args={[0.065, 0.152, 0.112]} />
        <meshStandardMaterial color="#c4306e" roughness={0.85} />
      </mesh>
      {/* Pink book leaning */}
      <mesh position={[1.64, 1.70, -3.82]} rotation={[0, -0.08, 0]}>
        <boxGeometry args={[0.057, 0.124, 0.102]} />
        <meshStandardMaterial color="#e8a0b0" roughness={0.85} />
      </mesh>
      {/* Candle */}
      <mesh position={[2.05, 1.69, -3.82]}>
        <cylinderGeometry args={[0.033, 0.033, 0.102, 10]} />
        <meshStandardMaterial color="#f4d4c8" roughness={0.8} />
      </mesh>
      <mesh position={[2.05, 1.75, -3.82]}>
        <cylinderGeometry args={[0.003, 0.003, 0.056, 5]} />
        <meshStandardMaterial color="#8b6347" roughness={0.8} />
      </mesh>

      {/* ── WALL ART (far left of back wall) ─────── */}
      {/* Frame */}
      <mesh position={[-3.1, 2.55, -3.95]} castShadow>
        <boxGeometry args={[0.92, 0.74, 0.048]} />
        <meshStandardMaterial color="#8b6347" roughness={0.84} />
      </mesh>
      {/* Canvas */}
      <mesh position={[-3.1, 2.55, -3.927]}>
        <planeGeometry args={[0.80, 0.62]} />
        <meshStandardMaterial color="#f9f3ea" roughness={0.9} />
      </mesh>
      {/* Abstract shapes — fuchsia + pink palette */}
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
      <mesh position={[-3.08, 2.52, -3.919]}>
        <planeGeometry args={[0.08, 0.08]} />
        <meshStandardMaterial color="#e8a0b4" roughness={0.9} />
      </mesh>

      {/* ── COUCH (against back wall) ────────────────── */}
      {/* Seat */}
      <mesh position={[0.15, 0.40, -3.34]} castShadow receiveShadow>
        <boxGeometry args={[2.55, 0.50, 0.84]} />
        <meshStandardMaterial color="#c4786e" roughness={0.96} />
      </mesh>
      {/* Back cushion */}
      <mesh position={[0.15, 0.92, -3.70]} castShadow>
        <boxGeometry args={[2.55, 0.70, 0.34]} />
        <meshStandardMaterial color="#b86860" roughness={0.96} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-1.02, 0.58, -3.48]} castShadow>
        <boxGeometry args={[0.26, 0.82, 0.92]} />
        <meshStandardMaterial color="#a85858" roughness={0.92} />
      </mesh>
      {/* Right arm */}
      <mesh position={[1.42, 0.58, -3.48]} castShadow>
        <boxGeometry args={[0.26, 0.82, 0.92]} />
        <meshStandardMaterial color="#a85858" roughness={0.92} />
      </mesh>
      {/* Legs */}
      {[[-0.90, -2.98], [1.20, -2.98], [-0.90, -3.84], [1.20, -3.84]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.042, z]}>
          <cylinderGeometry args={[0.042, 0.042, 0.084, 8]} />
          <meshStandardMaterial color="#5c3d28" roughness={0.9} />
        </mesh>
      ))}
      {/* Throw pillows */}
      <mesh position={[-0.58, 0.82, -3.30]} rotation={[0.14, 0.14, 0.20]} castShadow>
        <boxGeometry args={[0.36, 0.30, 0.17]} />
        <meshStandardMaterial color="#f0a8c4" roughness={0.96} />
      </mesh>
      <mesh position={[0.82, 0.84, -3.32]} rotation={[-0.10, -0.14, -0.14]} castShadow>
        <boxGeometry args={[0.34, 0.28, 0.16]} />
        <meshStandardMaterial color="#c4306e" roughness={0.96} />
      </mesh>
      <mesh position={[0.16, 0.82, -3.28]} rotation={[0.06, 0.06, 0.08]} castShadow>
        <boxGeometry args={[0.30, 0.26, 0.14]} />
        <meshStandardMaterial color="#f4d0c8" roughness={0.96} />
      </mesh>

      {/* ── SIDE TABLE next to couch ──────────────── */}
      <mesh position={[1.96, 0.39, -3.06]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.052, 16]} />
        <meshStandardMaterial color="#8a6848" roughness={0.70} />
      </mesh>
      <mesh position={[1.96, 0.20, -3.06]}>
        <cylinderGeometry args={[0.038, 0.038, 0.34, 8]} />
        <meshStandardMaterial color="#6b5030" roughness={0.88} />
      </mesh>
      {/* Mug */}
      <mesh position={[1.96, 0.446, -3.06]}>
        <cylinderGeometry args={[0.053, 0.043, 0.094, 10]} />
        <meshStandardMaterial color="#f5ede0" roughness={0.8} />
      </mesh>
      <mesh position={[1.96, 0.500, -3.06]}>
        <cylinderGeometry args={[0.047, 0.047, 0.018, 10]} />
        <meshStandardMaterial color="#c4786e" roughness={0.8} />
      </mesh>

      {/* ── FLOOR LAMP ────────────────────────────── */}
      {/* Base */}
      <mesh position={[3.05, 0.062, -0.85]}>
        <cylinderGeometry args={[0.135, 0.135, 0.124, 12]} />
        <meshStandardMaterial color="#8b6347" roughness={0.52} metalness={0.28} />
      </mesh>
      {/* Pole */}
      <mesh position={[3.05, 1.08, -0.85]}>
        <cylinderGeometry args={[0.026, 0.026, 1.92, 8]} />
        <meshStandardMaterial color="#a07850" roughness={0.52} metalness={0.28} />
      </mesh>
      {/* Shade */}
      <mesh position={[3.05, 2.12, -0.85]}>
        <coneGeometry args={[0.32, 0.46, 16, 1, true]} />
        <meshStandardMaterial color="#f4d4c8" roughness={0.92} side={2} />
      </mesh>
      {/* Lamp top disk */}
      <mesh position={[3.05, 2.08, -0.85]}>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 8]} />
        <meshStandardMaterial color="#a07850" roughness={0.52} metalness={0.28} />
      </mesh>
      {/* Warm point light */}
      <pointLight position={[3.05, 1.92, -0.85]} intensity={1.5} color="#ffcc88" distance={5} decay={2} />

      {/* ── SMALL BEDSIDE-STYLE TABLE on left side ── */}
      <mesh position={[-0.85, 0.28, -3.42]} castShadow>
        <boxGeometry args={[0.52, 0.06, 0.40]} />
        <meshStandardMaterial color="#8a6848" roughness={0.75} />
      </mesh>
      <mesh position={[-0.85, 0.14, -3.42]}>
        <boxGeometry args={[0.48, 0.28, 0.36]} />
        <meshStandardMaterial color="#7a5c3e" roughness={0.85} />
      </mesh>
      {/* Book stack on table */}
      <mesh position={[-0.85, 0.33, -3.36]}>
        <boxGeometry args={[0.24, 0.04, 0.16]} />
        <meshStandardMaterial color="#e8a0b0" roughness={0.85} />
      </mesh>
      <mesh position={[-0.85, 0.37, -3.36]} rotation={[0, 0.08, 0]}>
        <boxGeometry args={[0.22, 0.04, 0.15]} />
        <meshStandardMaterial color="#c4306e" roughness={0.85} />
      </mesh>
      {/* Small lamp on table */}
      <mesh position={[-1.0, 0.34, -3.50]}>
        <cylinderGeometry args={[0.04, 0.035, 0.064, 8]} />
        <meshStandardMaterial color="#c8b090" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[-1.0, 0.39, -3.50]}>
        <cylinderGeometry args={[0.016, 0.016, 0.10, 6]} />
        <meshStandardMaterial color="#b09070" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[-1.0, 0.46, -3.50]}>
        <coneGeometry args={[0.09, 0.11, 10, 1, true]} />
        <meshStandardMaterial color="#f4d0c8" roughness={0.9} side={2} />
      </mesh>
      <pointLight position={[-1.0, 0.44, -3.50]} intensity={0.5} color="#ffcc88" distance={2} decay={2} />

      {/* ── BASEBOARD LEFT WALL accent strip ────── */}
      <mesh position={[-3.98, 0.22, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[8, 0.04, 0.02]} />
        <meshStandardMaterial color="#e8c4cc" roughness={0.9} />
      </mesh>

    </group>
  )
}
