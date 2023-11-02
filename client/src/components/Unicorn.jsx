import { Canvas } from '@react-three/fiber'
import React from 'react'
import UnicornExperience from './UnicornExperience'

export default function Unicorn() {
  return (
    <Canvas
      camera={{position: [0, 1.5, 10.5], fov: 50}}
      shadows
    >
      <UnicornExperience />
    </Canvas>
  )
}
