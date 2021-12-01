import * as THREE from "three"
import { Suspense, useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, useGLTF } from "@react-three/drei"
import { EffectComposer, DepthOfField } from "@react-three/postprocessing"
import Overlay from "./Overlay"
import Snow from "./Snow"

function Gingerman({ z, index, speed }) {
  const ref = useRef(null)
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
  const { nodes, materials } = useGLTF("/ginger-v3-transformed.glb")
  const [data] = useState({
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(1),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
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
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          scale={0.1}
          geometry={nodes.Gingerbread_man_0.geometry}
          material={materials.Gingerbreadman}
          emissive="orange"
        />
      </group>
    </group>
  )
}

const Banana = ({ z, index, speed }) => {
  const ref = useRef(null)
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
  const { nodes, materials } = useGLTF("/candy-transformed.glb")
  const [data] = useState({
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(1),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
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
        geometry={nodes["Node-Mesh"].geometry}
        material={materials["lambert3SG.002"]}
        emissive="orange"
      />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials["lambert2SG.002"]}
      />
    </group>
  )
}

const App = ({
  count = 40,
  depth = 50,
  easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 4)),
  speed = 6,
}) => {
  return (
    <>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: depth + 15 }}>
        <color attach="background" args={["tomato"]} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          penumbra={2.5}
          intensity={1}
          color="orange"
        />
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          {Array.from({ length: count }, (_, index) => (
            <Banana
              key={index}
              index={index}
              z={0.5 * Math.round(easing(index / count) * depth)}
              speed={speed}
            />
          ))}
          <Banana index={0} z={0.5} speed={speed} />

          <Snow />

          <EffectComposer multisampling={0}>
            <DepthOfField
              target={[0, 0, 40]}
              focalLength={2.1}
              bokehScale={32}
              height={500}
            />
          </EffectComposer>
        </Suspense>
        {/* Array.from(arrayLike, (element, index) => { ... } ) 
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#using_arrow_functions_and_array.from
      */}
      </Canvas>
      <Overlay />
    </>
  )
}

export default App
