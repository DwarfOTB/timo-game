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
import { SecretDrawer } from './objects/SecretDrawer'
import { HUD }          from './ui/HUD'
import { FirstVisit }   from './ui/FirstVisit'
import { UnlockToast }  from './ui/UnlockToast'
import { EasterEgg }    from './ui/EasterEgg'
import { RotatePrompt } from './ui/RotatePrompt'
import { useVisitSystem } from './hooks/useVisitSystem'

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#1e1408']} />
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
      <RecordPlayer position={[2.20, 0.0, 0.65]} />

      {/* Right side desk area: figures + notebook */}
      <Hedgehog position={[0.55, 0.73, 0.44]} />
      <Ladybug  position={[-0.20, 0.66, 0.42]} />
      <Notebook position={[-1.55, 0.55, 0.65]} />

      {/* Secret drawer — visible only after 20 visits */}
      <SecretDrawer position={[2.8, 0.0, -2.0]} />
    </>
  )
}

export default function App() {
  useVisitSystem()

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', touchAction: 'none' }}>
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        shadows
        style={{ background: '#1e1408' }}
      >
        <SceneContent />
      </Canvas>

      <HUD />
      <FirstVisit />
      <UnlockToast />
      <EasterEgg />
      <RotatePrompt />
    </div>
  )
}
