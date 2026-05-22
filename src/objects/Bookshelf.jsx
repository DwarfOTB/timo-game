import { Html } from '@react-three/drei'

const SHELF_COLOR = '#7a5c3e'
const SHELF_DARK  = '#5c3d28'
const BACK_COLOR  = '#6b5030'

// Books: [width, height, depth, color]
const TOP_BOOKS = [
  [0.07, 0.38, 0.18, '#8b7355'],  // 0
  [0.06, 0.44, 0.18, '#c4956a'],  // 1
  [0.08, 0.50, 0.18, '#5c7a8b'],  // 2 — TIMO book (third from left, 0-indexed)
  [0.07, 0.35, 0.18, '#8b5555'],  // 3
  [0.09, 0.46, 0.18, '#7a8b5c'],  // 4
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
                  fontFamily: 'system-ui, sans-serif',
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
  const W = 0.62  // shelf width
  const D = 0.22  // shelf depth
  const H = 1.20  // total height
  const T = 0.04  // shelf thickness

  return (
    <group position={position}>
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

      {/* Books on top shelf — TIMO on index 2 */}
      <BookRow books={TOP_BOOKS} yBase={H * 0.50 + T} timoIdx={2} />

      {/* Books on bottom shelf */}
      <BookRow books={BOT_BOOKS} yBase={T} />
    </group>
  )
}
