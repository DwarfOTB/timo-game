export function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#e8d5b0" roughness={0.9} />
      </mesh>

      {/* Back-left wall */}
      <mesh position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#f5ede0" roughness={0.95} />
      </mesh>

      {/* Back-right wall */}
      <mesh position={[0, 2.5, -4]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#ede5d8" roughness={0.95} />
      </mesh>
    </group>
  )
}
