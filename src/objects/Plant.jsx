import { useRoomStore } from '../store/useRoomStore'

const POT_COLOR    = '#c4956a'
const POT_RIM      = '#a87a55'
const SOIL_COLOR   = '#5a3d28'
const STEM_COLOR   = '#5a7a3a'
const LEAF_COLOR   = '#6b9442'
const LEAF_DARK    = '#4e7230'
const BUD_COLOR    = '#e8a0b0'
const FLOWER_COLOR = '#d94f3d'
const PETAL_COLOR  = '#f47860'

function Pot() {
  return (
    <group>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.36, 12]} />
        <meshStandardMaterial color={POT_COLOR} roughness={0.9} />
      </mesh>
      {/* Rim */}
      <mesh position={[0, 0.37, 0]}>
        <cylinderGeometry args={[0.20, 0.18, 0.05, 12]} />
        <meshStandardMaterial color={POT_RIM} roughness={0.85} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.365, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.02, 12]} />
        <meshStandardMaterial color={SOIL_COLOR} roughness={1} />
      </mesh>
    </group>
  )
}

// Stage 1: tiny sprout (visits 1–4)
function Sprout() {
  return (
    <group position={[0, 0.39, 0]}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.24, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.22, 0]} rotation={[0, 0, 0.5]} scale={[1, 0.45, 0.5]}>
        <sphereGeometry args={[0.09, 10, 8]} />
        <meshStandardMaterial color={LEAF_COLOR} roughness={0.7} />
      </mesh>
      <mesh position={[-0.08, 0.22, 0]} rotation={[0, 0, -0.5]} scale={[1, 0.45, 0.5]}>
        <sphereGeometry args={[0.09, 10, 8]} />
        <meshStandardMaterial color={LEAF_COLOR} roughness={0.7} />
      </mesh>
    </group>
  )
}

// Stage 2: small plant (visits 5–14)
function SmallPlant() {
  return (
    <group position={[0, 0.39, 0]}>
      {/* Main stem */}
      <mesh position={[0, 0.20, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.40, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
      {/* Side stems */}
      <mesh position={[0.10, 0.16, 0]} rotation={[0, 0, 0.55]}>
        <cylinderGeometry args={[0.016, 0.016, 0.22, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[-0.10, 0.16, 0]} rotation={[0, 0, -0.55]}>
        <cylinderGeometry args={[0.016, 0.016, 0.22, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
      {/* Leaves */}
      {[
        { p: [ 0.14, 0.27, 0],  r: [0, 0,  0.6],  s: [1, 0.40, 0.6] },
        { p: [-0.14, 0.27, 0],  r: [0, 0, -0.6],  s: [1, 0.40, 0.6] },
        { p: [ 0.08, 0.38, 0.06], r: [0.2, 0, 0.3], s: [1, 0.38, 0.5] },
        { p: [-0.08, 0.38,-0.06], r: [0.2, 0,-0.3], s: [1, 0.38, 0.5] },
        { p: [ 0,    0.42, 0],  r: [0, 0, 0],     s: [0.8, 0.35, 0.5] },
      ].map((l, i) => (
        <mesh key={i} position={l.p} rotation={l.r} scale={l.s}>
          <sphereGeometry args={[0.11, 10, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? LEAF_COLOR : LEAF_DARK} roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

// Stage 3: medium with bud (visits 15–29)
function MediumPlant() {
  return (
    <group position={[0, 0.39, 0]}>
      <mesh position={[0, 0.30, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.60, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[0.12, 0.22, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.018, 0.018, 0.28, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[-0.12, 0.22, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.018, 0.018, 0.28, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
      {/* More leaves */}
      {[
        { p: [ 0.18, 0.33, 0],   s: [1.1, 0.38, 0.6] },
        { p: [-0.18, 0.33, 0],   s: [1.1, 0.38, 0.6] },
        { p: [ 0.10, 0.48, 0.06],s: [0.9, 0.35, 0.5] },
        { p: [-0.10, 0.48,-0.06],s: [0.9, 0.35, 0.5] },
        { p: [ 0,    0.55, 0],   s: [1.0, 0.35, 0.55] },
        { p: [ 0.08, 0.60, 0],   s: [0.8, 0.30, 0.45] },
      ].map((l, i) => (
        <mesh key={i} position={l.p} scale={l.s}>
          <sphereGeometry args={[0.11, 10, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? LEAF_COLOR : LEAF_DARK} roughness={0.7} />
        </mesh>
      ))}
      {/* Bud */}
      <mesh position={[0, 0.66, 0]}>
        <sphereGeometry args={[0.07, 10, 8]} />
        <meshStandardMaterial color={BUD_COLOR} roughness={0.7} />
      </mesh>
    </group>
  )
}

// Stage 4: full bloom (visits 30+)
function FullPlant() {
  return (
    <group position={[0, 0.39, 0]}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.026, 0.026, 0.70, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
      {[
        { p: [ 0.14, 0.25, 0], r: [0,0, 0.6] },
        { p: [-0.14, 0.25, 0], r: [0,0,-0.6] },
        { p: [ 0.10, 0.42, 0], r: [0,0, 0.4] },
        { p: [-0.10, 0.42, 0], r: [0,0,-0.4] },
      ].map((s, i) => (
        <mesh key={i} position={s.p} rotation={s.r}>
          <cylinderGeometry args={[0.017, 0.017, 0.25, 6]} />
          <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
        </mesh>
      ))}
      {/* Leaves */}
      {[
        [0.20, 0.36, 0], [-0.20, 0.36, 0], [0.14, 0.50, 0.06],
        [-0.14, 0.50,-0.06], [0, 0.58, 0], [0.08, 0.65, 0], [-0.08, 0.65, 0],
      ].map((p, i) => (
        <mesh key={i} position={p} scale={[1, 0.36, 0.55]}>
          <sphereGeometry args={[0.11, 10, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? LEAF_COLOR : LEAF_DARK} roughness={0.7} />
        </mesh>
      ))}
      {/* Flower center */}
      <mesh position={[0, 0.74, 0]}>
        <sphereGeometry args={[0.09, 12, 10]} />
        <meshStandardMaterial color="#f5d060" roughness={0.6} />
      </mesh>
      {/* Petals */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.16, 0.74, Math.sin(angle) * 0.16]}
            scale={[1, 0.3, 0.7]}
          >
            <sphereGeometry args={[0.10, 10, 8]} />
            <meshStandardMaterial color={PETAL_COLOR} roughness={0.7} />
          </mesh>
        )
      })}
    </group>
  )
}

export function Plant({ position = [0, 0, 0] }) {
  const visitCount = useRoomStore(s => s.visitCount)

  const stage = visitCount >= 30 ? 3
    : visitCount >= 15            ? 2
    : visitCount >= 5             ? 1
    : 0

  return (
    <group position={position}>
      <Pot />
      {stage === 0 && <Sprout />}
      {stage === 1 && <SmallPlant />}
      {stage === 2 && <MediumPlant />}
      {stage === 3 && <FullPlant />}
    </group>
  )
}
