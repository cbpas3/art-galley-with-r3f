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

function Scene({ onEnvironmentLoaded, setTitle, setDate, setDescription }) {
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
      <Paintings
        setTitle={setTitle}
        setDate={setDate}
        setDescription={setDescription}
      />
    </Physics>
  );
}

export function Experience({ setTitle, setDate, setDescription }) {
  const shadowCameraRef = useRef();
  const [environmentLoaded, setEnvironmentLoaded] = useState(false);
  const [nearPainting, setNearPainting] = useState(null);

  const handlePaintingProximity = (paintingId) => {
    setNearPainting(paintingId);
  };

  return (
    <>
      <EnvironmentMap preset="warehouse" intensity={2} />
      <Suspense fallback={null}>
        <Scene
          onEnvironmentLoaded={() => setEnvironmentLoaded(true)}
          setTitle={setTitle}
          setDate={setDate}
          setDescription={setDescription}
        />
      </Suspense>
    </>
  );
}
