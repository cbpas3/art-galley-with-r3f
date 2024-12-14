import {
  Environment as EnvironmentMap,
  OrthographicCamera,
  OrbitControls,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useRef, useState, Suspense, useEffect } from "react";
import { CharacterController } from "./CharacterController";
import Paintings from "./Paintings";
import { Environment } from "./Environment";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

function Scene({ onEnvironmentLoaded }) {
  const { camera } = useThree();

  useEffect(() => {
    if (camera) {
      camera.position.set(0, 2, 5);
      const target = new THREE.Vector3(0, 0, 0);
      camera.lookAt(target);
    }
  }, [camera]);

  return (
    <Physics>
      <Environment />
      <CharacterController />
      <Paintings />
    </Physics>
  );
}

export function Experience() {
  const shadowCameraRef = useRef();
  const [environmentLoaded, setEnvironmentLoaded] = useState(false);
  const [nearPainting, setNearPainting] = useState(null);

  const handlePaintingProximity = (paintingId) => {
    setNearPainting(paintingId);
  };

  return (
    <>
      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={20}
      />

      <EnvironmentMap preset="sunset" intensity={1.5} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight
        position={[0, 3, 0]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        distance={10}
      />

      {/* Light bulb mesh */}
      <mesh position={[0, 3 - 0.1, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Directional light */}
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

      <Suspense fallback={null}>
        <Scene onEnvironmentLoaded={() => setEnvironmentLoaded(true)} />
      </Suspense>
    </>
  );
}
