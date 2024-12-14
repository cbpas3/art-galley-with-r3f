import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useRef, useState, Suspense } from "react";
import { CharacterController } from "./CharacterController";
import Paintings from "./Paintings";
import Walls from "./Walls";

export const Experience = () => {
  const shadowCameraRef = useRef();
  const [nearPainting, setNearPainting] = useState(null);

  const handlePaintingProximity = (paintingId) => {
    setNearPainting(paintingId);
  };

  return (
    <>
      <Environment preset="sunset" intensity={1.5} />

      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.5} />

      {/* Center ceiling light */}
      <pointLight
        position={[0, 3, 0]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        distance={10}
      />

      {/* Optional: Add a visible light bulb mesh */}
      <mesh position={[0, 3 - 0.1, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Directional light for additional shadows */}
      <directionalLight
        intensity={0.5}
        castShadow
        position={[-10, 10, 10]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>

      <Physics>
        <Suspense fallback={null}>
          <Walls />
        </Suspense>
        <Suspense fallback={null}>
          <Paintings nearPainting={nearPainting} />
        </Suspense>
        <Suspense fallback={null}>
          <CharacterController onNearPainting={handlePaintingProximity} />
        </Suspense>
      </Physics>
    </>
  );
};
