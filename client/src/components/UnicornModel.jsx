import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const UnicornModel = (props) =>  {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./model/unicorn/scene.gltf')
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play()
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" scale={0.06} rotation={[-Math.PI / 2, 0, 0.8]} position={[-0.5, -3.3, 0.62]}>
          <group name="4d26d2dc9dca4c4e82d742c5255e81a0fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Null_1">
                  <group name="Character">
                    <group name="Advanced_Biped_rig">
                      <group name="Root_null">
                        <group name="Bind_null">
                          <group name="Object_9">
                            <primitive object={nodes._rootJoint} />
                            <group name="Object_117" />
                            <skinnedMesh castShadow name="Object_118" geometry={nodes.Object_118.geometry} material={materials['Scene_-_Root']} skeleton={nodes.Object_118.skeleton} />
                          </group>
                        </group>
                        <group name="Spine_null" position={[0, 41.53, -0.2]}>
                          <group name="Chest_algn" position={[-0.5, 44, 9.62]} rotation={[1.78, 0.02, -0.02]}>
                            <group name="Object_238">
                              <primitive object={nodes._rootJoint_1} />
                            </group>
                          </group>
                          <group name="IK_Spine_null" position={[0, 0.29, 0.2]}>
                            <group name="Object_121">
                              <group name="IK_Pelvis_algn" position={[-0.05, 22.57, 4.42]} rotation={[2.01, 0.02, -0.02]}>
                                <group name="Object_129">
                                  <primitive object={nodes._rootJoint_5} />
                                </group>
                              </group>
                              <primitive object={nodes._rootJoint_2} />
                            </group>
                          </group>
                          <group name="FK_Spine_null" position={[0, 0.29, 0.2]}>
                            <group name="Object_134">
                              <group name="FK_Pelvis_algn" position={[-0.05, 22.57, 4.42]} rotation={[2.01, 0.02, -0.02]}>
                                <group name="Object_142">
                                  <primitive object={nodes._rootJoint_6} />
                                </group>
                              </group>
                              <primitive object={nodes._rootJoint_3} />
                            </group>
                          </group>
                          <group name="Blend_Spine_null" position={[0, 0.29, 0.2]}>
                            <group name="Object_147">
                              <group name="Blend_Pelvis_algn" position={[-0.05, 22.57, 4.42]} rotation={[2.01, 0.02, -0.02]}>
                                <group name="Object_155">
                                  <primitive object={nodes._rootJoint_7} />
                                </group>
                              </group>
                              <primitive object={nodes._rootJoint_4} />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group name="Null">
                    <group name="Dragon" />
                  </group>
                  <group name="Cube" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

export default UnicornModel

useGLTF.preload('./model/unicorn/scene.gltf')