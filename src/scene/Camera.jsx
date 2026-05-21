import { OrthographicCamera } from '@react-three/drei'

export function Camera() {
  return (
    <OrthographicCamera
      makeDefault
      position={[10, 10, 10]}
      zoom={60}
      near={0.1}
      far={100}
    />
  )
}
