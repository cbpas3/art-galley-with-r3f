// Paintings.jsx
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { paintingData } from "./paintingData";
import { Suspense, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const PaintingOverlay = ({ info, position }) => {
  if (!info) return null;

  return (
    <Html
      position={position}
      center
      style={{
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "15px",
        borderRadius: "8px",
        width: "300px",
        pointerEvents: "none",
        userSelect: "none",
      }}
      distanceFactor={0.5}
    >
      <div className="painting-info">
        <h3 style={{ margin: "0 0 8px 0", fontSize: "50px" }}>{info.title}</h3>
        <p style={{ margin: "4px 0", fontSize: "30px" }}>
          <strong>Artist:</strong> {info.artist}
        </p>
        <p style={{ margin: "4px 0", fontSize: "30px" }}>
          <strong>Year:</strong> {info.year}
        </p>
        <p style={{ margin: "4px 0", fontSize: "30px" }}>{info.description}</p>
      </div>
    </Html>
  );
};

const Painting = ({ data }) => {
  const texture = useLoader(TextureLoader, data.imgSrc);
  const meshRef = useRef();
  const { camera } = useThree();
  const [showInfo, setShowInfo] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    const distance = camera.position.distanceTo(meshRef.current.position);

    if (distance < 2) {
      // Increased detection distance for testing
      if (!showInfo) {
        console.log("Player near painting:", data.info.title); // Debug log
        setShowInfo(true);
      }
    } else if (showInfo) {
      console.log("Player left painting area:", data.info.title); // Debug log
      setShowInfo(false);
    }
  });

  const position = [
    data.position.x,
    data.position.y + data.height / 2 + 0.5, // Position overlay above painting
    data.position.z,
  ];

  return (
    <mesh
      ref={meshRef}
      position={[data.position.x, data.position.y, data.position.z]}
      rotation={[0, data.rotationY, 0]}
    >
      <planeGeometry args={[data.width, data.height]} />
      <meshStandardMaterial
        map={texture}
        emissive="#404040"
        emissiveIntensity={0.2}
        roughness={0.5}
        metalness={0}
      />
      {showInfo && (
        <PaintingOverlay
          info={data.info}
          position={[-0.5, 0, 0]} // Local position relative to the mesh
        />
      )}
    </mesh>
  );
};

const Paintings = () => {
  return (
    <Suspense fallback={null}>
      {paintingData.map((painting, index) => (
        <Painting key={index} data={painting} />
      ))}
    </Suspense>
  );
};

export default Paintings;
