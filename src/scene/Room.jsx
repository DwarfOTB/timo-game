export function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#e8d5b0" roughness={0.9} />
      </mesh>

      {/* Rug — warm terracotta, center area */}
      <mesh rotation={[-Math.PI / 2, 0, 0.06]} position={[0.4, 0.002, 0.5]} receiveShadow>
        <planeGeometry args={[3.4, 2.5]} />
        <meshStandardMaterial color="#b55c38" roughness={0.99} />
      </mesh>
      {/* Rug inner border */}
      <mesh rotation={[-Math.PI / 2, 0, 0.06]} position={[0.4, 0.003, 0.5]}>
        <planeGeometry args={[2.85, 2.05]} />
        <meshStandardMaterial color="#9e4e2e" roughness={0.99} />
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

      {/* Baseboard — left wall */}
      <mesh position={[-3.98, 0.09, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[8, 0.18, 0.04]} />
        <meshStandardMaterial color="#d6c6a8" roughness={0.9} />
      </mesh>

      {/* Baseboard — back wall */}
      <mesh position={[0, 0.09, -3.98]}>
        <boxGeometry args={[8, 0.18, 0.04]} />
        <meshStandardMaterial color="#ccc0aa" roughness={0.9} />
      </mesh>
    </group>
  )
}
