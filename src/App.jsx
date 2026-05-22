import { Canvas } from '@react-three/fiber'
import { Camera }       from './scene/Camera'
import { Lighting }     from './scene/Lighting'
import { Room }         from './scene/Room'
import { Hedgehog }     from './objects/Hedgehog'
import { Ladybug }      from './objects/Ladybug'
import { Plant }        from './objects/Plant'
import { Calendar }     from './objects/Calendar'
import { PhotoWall }    from './objects/PhotoWall'
import { RecordPlayer } from './objects/RecordPlayer'
import { Notebook }     from './objects/Notebook'
import { TimoJar }      from './objects/TimoJar'
import { Bookshelf }    from './objects/Bookshelf'

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

        {/* Left wall: photo collage */}
        <PhotoWall />

        {/* Back-right wall */}
        <Calendar position={[1.6, 2.6, -3.92]} />

        {/* Back-left corner: plant */}
        <Plant position={[-2.8, 0.0, -2.2]} />

        {/* Left wall cluster: bookshelf + jar on top */}
        <Bookshelf  position={[-3.3, 0.0, -1.6]} />
        <TimoJar    position={[-3.1, 1.22, -1.6]} />

        {/* Center-left: record player on its own table */}
        <RecordPlayer position={[-1.2, 0.0, 1.4]} />

        {/* Right side desk area: figures + notebook */}
        <Hedgehog position={[1.8, 0.55, 0.6]} />
        <Ladybug  position={[1.8, 0.52, 0.0]} />
        <Notebook position={[0.8, 0.55, 1.8]} />
      </Canvas>
    </div>
  )
}
