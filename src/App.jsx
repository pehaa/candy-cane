import * as THREE from "three"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { EffectComposer, DepthOfField } from "@react-three/postprocessing"
import Overlay from "./Overlay"
import Snow from "./Snow"
import Gingerman from "./Gingerman"
import Candy from "./Candy"

const App = ({
  count = 50,
  depth = 50,
  easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 4)),
}) => {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: depth + 15 }}>
          <color attach="background" args={["tomato"]} />
          <ambientLight intensity={0.2} />
          <spotLight
            position={[-10, 10, 10]}
            penumbra={2.5}
            intensity={2}
            color="orange"
          />

          <Environment preset="sunset" />
          {Array.from({ length: count }, (_, index) => {
            return index % 10 < 9 ? (
              <Candy
                key={index}
                index={index}
                z={0.5 * Math.round(easing(index / count) * depth)}
                speed={4}
              />
            ) : (
              <Gingerman
                key={index}
                index={index}
                z={0.5 * Math.round(easing(index / count) * depth)}
                speed={12}
              />
            )
          })}
          <Candy index={0} z={3.5} speed={4} />
          <Snow />
          <EffectComposer multisampling={0}>
            <DepthOfField
              target={[0, 0, 40]}
              focalLength={2.1}
              bokehScale={32}
              height={500}
            />
          </EffectComposer>
        </Canvas>
        <div className="fade" />
      </Suspense>
      <Overlay />
    </>
  )
}

export default App
