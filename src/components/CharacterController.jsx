import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Quaternion, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { Character } from "./Character";
import * as THREE from "three";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export const CharacterController = () => {
  const rb = useRef();
  const container = useRef();
  const character = useRef();
  const { rapier, world } = useRapier();

  const [animation, setAnimation] = useState("idle");
  const [physicsReady, setPhysicsReady] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);
  const touchSensitivity = 0.01;

  useEffect(() => {
    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      if (touchStartX !== null) {
        const touchDeltaX = e.touches[0].clientX - touchStartX;
        rotationTarget.current -= touchDeltaX * touchSensitivity;
        setTouchStartX(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartX(null);
    };

    const onMouseDown = () => {
      isClicking.current = true;
    };
    const onMouseUp = () => {
      isClicking.current = false;
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchend", onMouseUp);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, [touchStartX]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (rb.current) {
        rb.current.setTranslation({ x: 0, y: 0.5, z: 0 }, true);
        setPhysicsReady(true);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useFrame(({ camera, mouse }) => {
    if (!physicsReady || !rb.current || !character.current) return;

    const vel = rb.current.linvel();
    const movement = { x: 0, z: 0 };

    if (get().forward) movement.z = 1;
    if (get().backward) movement.z = -1;

    let speed = get().run ? 1.6 : 1;

    if (isClicking.current) {
      movement.z = mouse.y + 0.4;
      if (Math.abs(movement.z) > 0.5) {
        speed = 1.6;
      }
    }

    if (get().left) movement.x = 1;
    if (get().right) movement.x = -1;

    if (movement.x !== 0 || movement.z !== 0) {
      characterRotationTarget.current = Math.atan2(movement.x, movement.z);
      vel.x =
        Math.sin(rotationTarget.current + characterRotationTarget.current) *
        speed;
      vel.z =
        Math.cos(rotationTarget.current + characterRotationTarget.current) *
        speed;

      if (speed === 1.6) {
        setAnimation("run");
      } else {
        setAnimation("walk");
      }
    } else {
      setAnimation("idle");
    }

    character.current.rotation.y = lerpAngle(
      character.current.rotation.y,
      characterRotationTarget.current,
      0.1
    );

    rb.current.setLinvel(vel, true);

    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    const characterPosition = new Vector3();
    character.current.getWorldPosition(characterPosition);

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    const cameraDirection = cameraWorldPosition.current
      .clone()
      .sub(characterPosition)
      .normalize();

    const distanceToWall = 2;
    const desiredDistance = 3;
    const actualDistance = Math.min(
      desiredDistance,
      world.castRay(
        new rapier.Ray(characterPosition, cameraDirection),
        desiredDistance,
        true
      )?.toi || desiredDistance
    );

    const targetPosition = characterPosition
      .clone()
      .add(cameraDirection.multiplyScalar(actualDistance - distanceToWall));
    camera.position.lerp(targetPosition, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
      if (camera) {
        camera.lookAt(cameraLookAt.current);
      }
    }
  });

  return (
    <RigidBody
      colliders={false}
      lockRotations
      ref={rb}
      position={[0, 0.5, 0]}
      enabledRotations={[false, false, false]}
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={1.5} position-z={-2} />
        <group ref={character}>
          <Character scale={0.18} position-y={-0.15} animation={animation} />
        </group>
      </group>
      <CapsuleCollider args={[0.08, 0.15]} />
    </RigidBody>
  );
};
