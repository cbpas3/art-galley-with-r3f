// Paintings.jsx
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { paintingData } from "./paintingData";
import { Suspense, useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
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
          <strong>Year:</strong> {info.year}
        </p>
        <p style={{ margin: "4px 0", fontSize: "30px" }}>{info.description}</p>
      </div>
    </Html>
  );
};

const Painting = ({
  data,
  setTitle,
  setDate,
  setDescription,
  highlightedPainting,
  setHighlightedPainting,
  paintingsVisited,
  setPaintingsVisited,
}) => {
  const specialPainting = {
    imgSrc: `memories/16.jpg`,

    info: {
      title: `Proposal`,
      description: `You're my soulmate. Will you marry me?`,
      year: `Dec 16 2024`,
    },
  };
  const meshRef = useRef();
  const { camera } = useThree();
  const [texture, setTexture] = useState(useLoader(TextureLoader, data.imgSrc));
  const specialTexture = useLoader(TextureLoader, "memories/16.jpg");

  useEffect(() => {
    if (paintingsVisited.length === paintingData.length) {
      if (data.info.title === "?") {
        setTexture(specialTexture);
      }
    }
  }, [paintingsVisited]);

  useFrame(() => {
    if (!meshRef.current) return;
    const distance = camera.position.distanceTo(meshRef.current.position);

    if (distance < 1) {
      setHighlightedPainting(data.info.title);
      if (
        data.info.title === "?" &&
        paintingsVisited.length === paintingData.length
      ) {
        setTitle(specialPainting.info.title);
        setDate(specialPainting.info.year);
        setDescription(specialPainting.info.description);
      } else {
        setTitle(data.info.title);
        setDate(data.info.year);
        setDescription(data.info.description);
      }

      setPaintingsVisited((prev) => {
        if (!prev.includes(data.info.title)) {
          return [...prev, data.info.title];
        }
        return prev;
      });
    } else {
      if (highlightedPainting === data.info.title) {
        setHighlightedPainting(null);
        setTitle("");
        setDate("");
        setDescription("");
      }
    }
  });

  return (
    <group
      ref={meshRef}
      position={[data.position.x, data.position.y, data.position.z]}
      userData={{ isPainting: true, paintingData: data }}
    >
      <mesh rotation={[0, data.rotationY, 0]}>
        <planeGeometry args={[data.width, data.height]} />
        <meshStandardMaterial
          map={texture}
          emissive="#404040"
          emissiveIntensity={0.2}
          roughness={0.5}
          metalness={0}
        />
      </mesh>
    </group>
  );
};

const Paintings = ({ setTitle, setDate, setDescription }) => {
  const [highlightedPainting, setHighlightedPainting] = useState(null);
  const [paintingsVisited, setPaintingsVisited] = useState([]);

  return (
    <Suspense fallback={null}>
      {paintingData.map((painting, index) => (
        <Painting
          key={index}
          data={painting}
          setTitle={setTitle}
          setDate={setDate}
          setDescription={setDescription}
          highlightedPainting={highlightedPainting}
          setHighlightedPainting={setHighlightedPainting}
          paintingsVisited={paintingsVisited}
          setPaintingsVisited={setPaintingsVisited}
        />
      ))}
    </Suspense>
  );
};

export default Paintings;
