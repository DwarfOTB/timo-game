import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useRoomStore } from '../store/useRoomStore'
import { GLOW_TEX } from '../utils/glowTexture'

export function InteractiveObject({ children, objectId, position = [0, 0, 0], name, glowScale = 0.7, float = true }) {
  const [hovered, setHovered] = useState(false)
  const openModal  = useRoomStore(s => s.openModal)
  const groupRef   = useRef()
  const glowRef    = useRef()
  const tRef       = useRef(0)
  const hoveredRef = useRef(false)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    tRef.current += delta
    const floatOffset = float ? Math.sin(tRef.current * 0.9) * 0.022 : 0
    const targetY = hoveredRef.current ? position[1] + 0.12 : position[1] + floatOffset
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.07
    )
    if (glowRef.current) {
      const base  = hoveredRef.current ? 0.72 : 0.40
      const pulse = Math.sin(tRef.current * 1.8) * 0.14
      glowRef.current.material.opacity = Math.max(0, Math.min(1, base + pulse))
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => { hoveredRef.current = true;  setHovered(true);  document.body.style.cursor = 'pointer' }}
      onPointerLeave={() => { hoveredRef.current = false; setHovered(false); document.body.style.cursor = 'default' }}
      onClick={(e) => { e.stopPropagation(); openModal(objectId) }}
    >
      {children}

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
