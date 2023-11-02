import React from 'react'
import { OrbitControls } from '@react-three/drei'
import UnicornModel from './UnicornModel'

export default function UnicornExperience() {
  return (
    <>
      <ambientLight />
      <directionalLight
        position={[5, 1, 2]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <UnicornModel />
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, 10, 10]}
        recieveShadow
      >
        <planeBufferGeometry
          args={[10, 10, 1, 1]}
        />
        <shaderMaterial
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  )
}
