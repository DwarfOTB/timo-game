import { Canvas } from '@react-three/fiber'
import { Camera } from './scene/Camera'
import { Lighting } from './scene/Lighting'
import { Room } from './scene/Room'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        shadows
        style={{ background: '#f9f3ea' }}
      >
        <Camera />
        <Lighting />
        <Room />
      </Canvas>
    </div>
  )
}
