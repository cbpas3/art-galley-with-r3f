import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { useRef } from "react";
import { CharacterController } from "./CharacterController";
import Paintings from "./Paintings";
import Walls from "./Walls";
import { Canvas } from "@react-three/fiber";

const maps = {
  castle_on_hills: {
    scale: 3,
    position: [-6, -7, 0],
  },
  animal_crossing_map: {
    scale: 20,
    position: [-15, -1, 10],
  },
  city_scene_tokyo: {
    scale: 0.72,
    position: [0, -1, -3.5],
  },
  de_dust_2_with_real_light: {
    scale: 0.3,
    position: [-5, -3, 13],
  },
  medieval_fantasy_book: {
    scale: 0.4,
    position: [-4, 0, -6],
  },
};

export const Experience = () => {
  const shadowCameraRef = useRef();

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
        distance={10} // Light falloff distance
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
        <Walls />
        <Paintings />
        <CharacterController />
      </Physics>
    </>
  );
};
