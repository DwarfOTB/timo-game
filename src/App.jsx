import { Canvas } from '@react-three/fiber'
import { Camera }   from './scene/Camera'
import { Lighting } from './scene/Lighting'
import { Room }     from './scene/Room'
import { Hedgehog } from './objects/Hedgehog'
import { Ladybug }  from './objects/Ladybug'
import { Plant }    from './objects/Plant'
import { Calendar } from './objects/Calendar'

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

        {/* Figures on a "desk" ledge, right side of room */}
        <Hedgehog position={[ 1.2, 0.55, 0.6]} />
        <Ladybug  position={[ 1.2, 0.52, 0.0]} />

        {/* Plant in back-left corner */}
        <Plant    position={[-2.8, 0.0, -2.2]} />

        {/* Calendar on back-right wall */}
        <Calendar position={[ 1.6, 2.6, -3.92]} />
      </Canvas>
    </div>
  )
}
