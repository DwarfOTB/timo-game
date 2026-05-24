import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useRoomStore } from '../store/useRoomStore'
import { ModalOverlay } from '../ui/ModalOverlay'
import { InteractiveObject } from './InteractiveObject'

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
      <mesh position={[0, 0.37, 0]}>
        <cylinderGeometry args={[0.20, 0.18, 0.05, 12]} />
        <meshStandardMaterial color={POT_RIM} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.365, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.02, 12]} />
        <meshStandardMaterial color={SOIL_COLOR} roughness={1} />
      </mesh>
    </group>
  )
}

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

function SmallPlant() {
  return (
    <group position={[0, 0.39, 0]}>
      <mesh position={[0, 0.20, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.40, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[0.10, 0.16, 0]} rotation={[0, 0, 0.55]}>
        <cylinderGeometry args={[0.016, 0.016, 0.22, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[-0.10, 0.16, 0]} rotation={[0, 0, -0.55]}>
        <cylinderGeometry args={[0.016, 0.016, 0.22, 6]} />
        <meshStandardMaterial color={STEM_COLOR} roughness={0.8} />
      </mesh>
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
      <mesh position={[0, 0.66, 0]}>
        <sphereGeometry args={[0.07, 10, 8]} />
        <meshStandardMaterial color={BUD_COLOR} roughness={0.7} />
      </mesh>
    </group>
  )
}

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
      {[
        [0.20, 0.36, 0], [-0.20, 0.36, 0], [0.14, 0.50, 0.06],
        [-0.14, 0.50,-0.06], [0, 0.58, 0], [0.08, 0.65, 0], [-0.08, 0.65, 0],
      ].map((p, i) => (
        <mesh key={i} position={p} scale={[1, 0.36, 0.55]}>
          <sphereGeometry args={[0.11, 10, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? LEAF_COLOR : LEAF_DARK} roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[0, 0.74, 0]}>
        <sphereGeometry args={[0.09, 12, 10]} />
        <meshStandardMaterial color="#f5d060" roughness={0.6} />
      </mesh>
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

const STAGE_DATA = [
  {
    emoji: '🌱',
    text: 'Ha appena cominciato.\n\nCome noi.',
    next: 5,
  },
  {
    emoji: '🌿',
    text: 'Sta crescendo.\n\nPiano piano.',
    next: 15,
  },
  {
    emoji: '🌸',
    text: 'Un bocciolo.\n\nQuasi pronta.',
    next: 30,
  },
  {
    emoji: '🌺',
    text: 'In piena fioritura.\n\nCome tutto questo.',
    next: null,
  },
]

export function Plant({ position = [0, 0, 0] }) {
  const visitCount  = useRoomStore(s => s.visitCount)
  const activeModal = useRoomStore(s => s.activeModal)
  const closeModal  = useRoomStore(s => s.closeModal)
  const swayRef     = useRef()

  const stage     = visitCount >= 30 ? 3 : visitCount >= 15 ? 2 : visitCount >= 5 ? 1 : 0
  const stageInfo = STAGE_DATA[stage]
  const remaining = stageInfo.next ? stageInfo.next - visitCount : null

  useFrame(({ clock }) => {
    if (!swayRef.current) return
    const t = clock.getElapsedTime()
    swayRef.current.rotation.z = Math.sin(t * 0.7 + 0.4) * 0.04
    swayRef.current.rotation.x = Math.sin(t * 0.5 + 1.6) * 0.025
  })

  return (
    <group position={position}>
      <InteractiveObject objectId="plant" position={[0, 0, 0]} name="la nostra pianta" glowScale={0.85} float={false}>
        <Pot />
        <group ref={swayRef}>
          {stage === 0 && <Sprout />}
          {stage === 1 && <SmallPlant />}
          {stage === 2 && <MediumPlant />}
          {stage === 3 && <FullPlant />}
        </group>
      </InteractiveObject>

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <ModalOverlay isOpen={activeModal === 'plant'} onClose={closeModal} dark>
          <div style={{
            width: '100%', maxWidth: '300px',
            background: 'rgba(6,16,6,0.92)',
            border: '1px solid rgba(90,122,58,0.28)',
            borderRadius: '20px',
            padding: '40px 32px 32px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '38px', marginBottom: '20px' }}>{stageInfo.emoji}</div>
            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '24px',
              lineHeight: 1.9,
              color: '#e8f4e4',
              whiteSpace: 'pre-wrap',
              marginBottom: remaining ? '24px' : '0',
            }}>
              {stageInfo.text}
            </div>
            {remaining && (
              <div style={{
                fontFamily: 'Figtree, system-ui, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.8px',
                color: 'rgba(180,210,150,0.35)',
                borderTop: '1px solid rgba(90,122,58,0.15)',
                paddingTop: '16px',
              }}>
                ancora {remaining} visita{remaining !== 1 ? 'e' : ''} per vederla crescere
              </div>
            )}
          </div>
        </ModalOverlay>
      </Html>
    </group>
  )
}
