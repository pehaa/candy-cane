import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

function Gingerman({ z, index, speed }) {
  const ref = useRef(null)
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
  const { nodes, materials } = useGLTF("/ginger-v3-transformed.glb")
  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 2),
    x: THREE.MathUtils.randFloatSpread(1),
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
      0,
      Math.sin(index * 100 + state.clock.elapsedTime / 2) * 2 * Math.PI,
      0
    )
    // If they're too far up, set them back to the bottom
    if (data.y < -height * (index === 0 ? 4 : 1))
      data.y = height * (index === 0 ? 4 : 1)
  })

  return (
    <group ref={ref} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          scale={0.085}
          geometry={nodes.Gingerbread_man_0.geometry}
          material={materials.Gingerbreadman}
          emissive="orange"
        />
      </group>
    </group>
  )
}

export default Gingerman
