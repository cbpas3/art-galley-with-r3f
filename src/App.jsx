import { KeyboardControls, Loader, Html } from "@react-three/drei";
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

const LoadingScreen = () => {
  return (
    <Html center>
      <div style={{ color: "white", textAlign: "center" }}>
        <h2>Loading Experience...</h2>
      </div>
    </Html>
  );
};

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
        camera={{
          position: [20, 20, 20],
          near: 0.1,
          fov: 80, // Reduced FOV for better perspective
          far: 300, // Added far plane
        }}
        style={{
          touchAction: "none",
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Preload all />
          <color attach="background" args={["#ececec"]} />
          {sceneReady && <Experience />}
        </Suspense>
      </Canvas>
      <Loader />
    </KeyboardControls>
  );
}

export default App;
