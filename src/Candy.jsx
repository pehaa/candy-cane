import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

const Candy = ({ z, index, speed }) => {
  const ref = useRef(null)
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
  const { nodes, materials } = useGLTF("/candycane.glb")
  console.log(nodes, materials)
  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 2),
    x: THREE.MathUtils.randFloatSpread(1),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    if (dt < 0.1)
      ref.current.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y -= dt * speed),
        -z
      )
    // Rotate the object around
    ref.current.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 100 + state.clock.elapsedTime / 6) * Math.PI,
      (data.rZ += dt / data.spin)
    )
    // If they're too far up, set them back to the bottom
    if (data.y < -height * (index === 0 ? 4 : 1))
      data.y = height * (index === 0 ? 4 : 1)
  })
  return (
    <group ref={ref} dispose={null}>
      <mesh
        geometry={nodes["Circle001"].geometry}
        material={materials["white"]}
      />
       <mesh
        geometry={nodes["Circle001_1"].geometry}
        material={materials["red"]}
      />
    </group>
  )
}

export default Candy
