"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Text } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  recommendation?: "creator" | "cyber" | null;
};

const FACE_LABELS = ["CREATOR", "CYBER", "FILMS", "LABS", "VISION", "DUALITY"];

function PrismMesh({ recommendation }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const draggingRef = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [, forceRender] = useState(0);

  const colors = useMemo(() => {
    if (recommendation === "creator") return { a: "#ffd166", b: "#ff8c42" };
    if (recommendation === "cyber") return { a: "#00ff88", b: "#00c8ff" };
    return { a: "#ffd166", b: "#00ff88" };
  }, [recommendation]);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (!draggingRef.current || !groupRef.current) return;

      const dx = event.clientX - last.current.x;
      const dy = event.clientY - last.current.y;

      groupRef.current.rotation.y += dx * 0.01;
      groupRef.current.rotation.x += dy * 0.01;

      last.current = { x: event.clientX, y: event.clientY };
    };

    const stopDrag = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      forceRender((v) => v + 1);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || draggingRef.current) return;

    groupRef.current.rotation.x += delta * 0.18;
    groupRef.current.rotation.y += delta * 0.42;
    groupRef.current.rotation.z += delta * 0.08;
  });

  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    draggingRef.current = true;
    last.current = { x: event.clientX, y: event.clientY };
    forceRender((v) => v + 1);
  };

  const isDragging = draggingRef.current;

  return (
    <Float speed={1.3} rotationIntensity={0.28} floatIntensity={0.42}>
      <group
        ref={groupRef}
        scale={isDragging ? 1.35 : 1}
        onPointerDown={handlePointerDown}
      >
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.46}
            roughness={0.06}
            metalness={0.18}
            transmission={0.72}
            thickness={1.25}
            ior={1.62}
            clearcoat={1}
            clearcoatRoughness={0.03}
            color="#dffcff"
            emissive={colors.a}
            emissiveIntensity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh scale={0.58}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={colors.b}
            emissive={colors.b}
            emissiveIntensity={2.4}
            transparent
            opacity={0.82}
            roughness={0.18}
            metalness={0.25}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.55, 0.01, 16, 120]} />
          <meshBasicMaterial color={colors.a} transparent opacity={0.45} />
        </mesh>

        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.7, 0.01, 16, 120]} />
          <meshBasicMaterial color={colors.b} transparent opacity={0.38} />
        </mesh>

        {isDragging &&
          FACE_LABELS.map((label, index) => {
            const positions: [number, number, number][] = [
              [0, 0, 1.04],
              [0, 0, -1.04],
              [-1.04, 0, 0],
              [1.04, 0, 0],
              [0, 1.04, 0],
              [0, -1.04, 0],
            ];

            const rotations: [number, number, number][] = [
              [0, 0, 0],
              [0, Math.PI, 0],
              [0, -Math.PI / 2, 0],
              [0, Math.PI / 2, 0],
              [-Math.PI / 2, 0, 0],
              [Math.PI / 2, 0, 0],
            ];

            return (
              <Text
                key={label}
                position={positions[index]}
                rotation={rotations[index]}
                fontSize={0.16}
                letterSpacing={0.08}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {label}
              </Text>
            );
          })}
      </group>
    </Float>
  );
}

export default function MemoryPrism({ recommendation }: Props) {
  return (
    <div className="memory-prism-three">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
        }}
      >
        <ambientLight intensity={0.32} />
        <pointLight position={[4, 5, 6]} intensity={3.2} color="#ffffff" />
        <pointLight position={[-4, -2, 4]} intensity={2.4} color="#00c8ff" />
        <pointLight
          position={[0, -4, 3]}
          intensity={1.8}
          color={recommendation === "creator" ? "#ffd166" : "#00ff88"}
        />
        <PrismMesh recommendation={recommendation} />
        <Environment preset="city" />
      </Canvas>

      <span className="inspect-hint">Hold and drag to inspect</span>
    </div>
  );
}
