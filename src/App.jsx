import { KeyboardControls, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

function App() {
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    // Lower quality on mobile
    if (isMobile) {
      setDpr(1);
    }
  }, []);

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        dpr={dpr}
        performance={{ min: 0.5 }}
        camera={{
          position: [0, 2, 5],
          fov: 75,
          near: 0.1,
          far: 100,
        }}
        style={{
          touchAction: "none",
        }}
        gl={{
          powerPreference: "high-performance",
          antialias: !isMobile, // Disable antialiasing on mobile
          alpha: false, // Disable alpha
        }}
      >
        <color attach="background" args={["#ececec"]} />
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Loader />
    </KeyboardControls>
  );
}

export default App;
