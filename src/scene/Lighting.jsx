export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.40} color="#ffe8c8" />
      <directionalLight
        position={[8, 12, 4]}
        intensity={1.2}
        color="#ffe8c8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 6, -4]} intensity={0.3} color="#c8e0ff" />
    </>
  )
}
