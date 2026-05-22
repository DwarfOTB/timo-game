import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRoomStore } from '../store/useRoomStore'

export function InteractiveObject({ children, objectId, position = [0, 0, 0] }) {
  const [hovered, setHovered] = useState(false)
  const openModal = useRoomStore(s => s.openModal)
  const groupRef  = useRef()

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      hovered ? position[1] + 0.12 : position[1],
      0.08
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
    </group>
  )
}
