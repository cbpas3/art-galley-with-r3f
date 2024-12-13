import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Preload } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

function App() {
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    // Give time for physics to initialize
    const timeout = setTimeout(() => {
      setSceneReady(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [20, 20, 20], near: 0.1, fov: 45 }} // Changed position and increased FOV
        style={{
          touchAction: "none",
        }}
      >
        <Suspense fallback={null}>
          <Preload all />
          <color attach="background" args={["#ececec"]} />
          {sceneReady && <Experience />}
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
