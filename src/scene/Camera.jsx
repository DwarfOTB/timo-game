import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

export function Camera() {
  const camRef = useRef()
  const { size } = useThree()

  // Responsive zoom: scales with viewport, fits room on all screens
  // Desktop 1440×900 → ~60, iPhone 13 landscape 844×390 → ~35
  const zoom = Math.min(size.width / 27, size.height / 13)

  useEffect(() => {
    if (camRef.current) {
      camRef.current.lookAt(-0.3, 2.0, -0.8)
      camRef.current.updateProjectionMatrix()
    }
  }, [zoom])

  return (
    <OrthographicCamera
      ref={camRef}
      makeDefault
      position={[10, 10, 10]}
      zoom={zoom}
      near={0.1}
      far={100}
    />
  )
}
