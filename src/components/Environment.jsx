// src/components/Environment.jsx
import { RigidBody } from "@react-three/rapier";
import Walls from "./Walls";

export function Environment() {
  return (
    <group>
      {/* Ground plane */}
      <RigidBody type="fixed" restitution={0.2} friction={1}>
        <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
      </RigidBody>

      <Walls />
    </group>
  );
}
