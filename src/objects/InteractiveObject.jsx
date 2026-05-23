import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useRoomStore } from '../store/useRoomStore'

export function InteractiveObject({ children, objectId, position = [0, 0, 0], name }) {
  const [hovered, setHovered] = useState(false)
  const openModal = useRoomStore(s => s.openModal)
  const groupRef  = useRef()
  const tRef      = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    tRef.current += delta
    const floatOffset = Math.sin(tRef.current * 0.9) * 0.02
    const targetY = hovered ? position[1] + 0.12 : position[1] + floatOffset
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.06
    )
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

      {!hovered && (
        <Html position={[0, 0.88, 0]} center zIndexRange={[2, 1]} style={{ pointerEvents: 'none' }}>
          <div className="click-hint" style={{
            pointerEvents: 'none', userSelect: 'none',
            color: 'rgba(196,48,110,0.8)',
            fontSize: '13px',
            textShadow: '0 0 8px rgba(196,48,110,0.6)',
          }}>✦</div>
        </Html>
      )}

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
