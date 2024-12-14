import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
export default function Walls() {
  const [
    colorTexture,
    displacementTexture,
    normalTexture,
    roughnessTexture,
    aoTexture,
  ] = useTexture([
    "/Bricks066_4K-JPG/Bricks066_4K-JPG_Color.jpg",
    "/Bricks066_4K-JPG/Bricks066_4K-JPG_Displacement.jpg",
    "/Bricks066_4K-JPG/Bricks066_4K-JPG_NormalGL.jpg",
    "/Bricks066_4K-JPG/Bricks066_4K-JPG_Roughness.jpg",
    "/Bricks066_4K-JPG/Bricks066_4K-JPG_AmbientOcclusion.jpg",
  ]);

  const [
    floor_colorTexture,
    floor_displacementTexture,
    floor_normalTexture,
    floor_roughnessTexture,
    floor_aoTexture,
  ] = useTexture([
    "/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_Color.jpg",
    "/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_Displacement.jpg",
    "/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_NormalGL.jpg",
    "/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_Roughness.jpg",
    "/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_AmbientOcclusion.jpg",
  ]);

  // Set up texture repeating
  const textures = [
    colorTexture,
    displacementTexture,
    normalTexture,
    roughnessTexture,
    aoTexture,
  ];
  textures.forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2); // Repeat brick texture
  });

  const floorTextures = [
    floor_colorTexture,
    floor_displacementTexture,
    floor_normalTexture,
    floor_roughnessTexture,
    floor_aoTexture,
  ];
  floorTextures.forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3); // Repeat floor texture
  });

  const wallMaterial = (
    <meshStandardMaterial
      map={colorTexture}
      displacementMap={displacementTexture}
      displacementScale={0.1}
      normalMap={normalTexture}
      roughnessMap={roughnessTexture}
      aoMap={aoTexture}
      aoMapIntensity={0.5} // Reduced AO intensity
      roughness={0.7} // Adjusted roughness
      metalness={0} // Reduced metalness
      side={THREE.DoubleSide}
    />
  );

  return (
    <group>
      {/* Floor */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <boxGeometry args={[10, 10, 1]} />
          <meshStandardMaterial
            map={floor_colorTexture}
            displacementMap={floor_displacementTexture}
            displacementScale={0.1}
            normalMap={floor_normalTexture}
            roughnessMap={floor_roughnessTexture}
            aoMap={floor_aoTexture}
            aoMapIntensity={0.5}
            roughness={0.7}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </RigidBody>

      {/* Walls - using the same material for all walls */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, -5]}>
          <boxGeometry args={[10, 6, 1]} />
          {wallMaterial}
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[10, 6, 1]} />
          {wallMaterial}
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[5, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[10, 6, 1]} />
          {wallMaterial}
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, 5]}>
          <boxGeometry args={[10, 6, 1]} />
          {wallMaterial}
        </mesh>
      </RigidBody>

      {/* Corner Pillars */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-5, 2, -5]}>
          <boxGeometry args={[1, 6, 1]} />
          {wallMaterial}
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[5, 2, -5]}>
          <boxGeometry args={[1, 6, 1]} />
          {wallMaterial}
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-5, 2, 5]}>
          <boxGeometry args={[1, 6, 1]} />
          {wallMaterial}
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[5, 2, 5]}>
          <boxGeometry args={[1, 6, 1]} />
          {wallMaterial}
        </mesh>
      </RigidBody>
    </group>
  );
}
