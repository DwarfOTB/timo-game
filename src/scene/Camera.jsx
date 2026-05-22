import { useRef, useEffect } from 'react'
import { OrthographicCamera } from '@react-three/drei'

export function Camera() {
  const camRef = useRef()

  useEffect(() => {
    if (camRef.current) {
      camRef.current.lookAt(0, 1.5, 0)
      camRef.current.updateProjectionMatrix()
    }
  }, [])

  return (
    <OrthographicCamera
      ref={camRef}
      makeDefault
      position={[10, 10, 10]}
      zoom={60}
      near={0.1}
      far={100}
    />
  )
}
