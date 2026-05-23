import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useRoomStore } from '../store/useRoomStore'

function makeGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0,   'rgba(196,48,110,0.38)')
  g.addColorStop(0.45,'rgba(196,48,110,0.14)')
  g.addColorStop(1,   'rgba(196,48,110,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

// Module-level singleton — one texture shared across all instances
const GLOW_TEX = makeGlowTexture()

export function InteractiveObject({ children, objectId, position = [0, 0, 0], name, glowScale = 0.7 }) {
  const [hovered, setHovered] = useState(false)
  const openModal = useRoomStore(s => s.openModal)
  const groupRef  = useRef()
  const glowRef   = useRef()
  const tRef      = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    tRef.current += delta
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      hovered ? position[1] + 0.12 : position[1],
      0.08
    )
    if (glowRef.current) {
      const base  = hovered ? 0.72 : 0.4
      const pulse = Math.sin(tRef.current * 1.8) * 0.14
      glowRef.current.material.opacity = Math.max(0, Math.min(1, base + pulse))
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => { setHovered(true);  document.body.style.cursor = 'pointer' }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={(e) => { e.stopPropagation(); openModal(objectId) }}
    >
      {children}

      {/* Glow sprite — always faces camera, always visible, no DOM */}
      <sprite ref={glowRef} scale={[glowScale, glowScale, 1]}>
        <spriteMaterial map={GLOW_TEX} transparent depthWrite={false} />
      </sprite>

      {hovered && name && (
        <Html position={[0, 0.82, 0]} center zIndexRange={[1, 1]}>
          <div style={{
            background: 'rgba(22,13,6,0.88)',
            color: 'rgba(245,237,224,0.92)',
            fontFamily: 'Caveat, cursive',
            fontSize: '15px',
            letterSpacing: '0.5px',
            padding: '5px 14px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: '1px solid rgba(196,48,110,0.35)',
            boxShadow: '0 3px 14px rgba(0,0,0,0.25)',
            userSelect: 'none',
          }}>
            {name}
          </div>
        </Html>
      )}
    </group>
  )
}
