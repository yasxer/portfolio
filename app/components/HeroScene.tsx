"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ────────────────────────────────────────────
   GEOMETRIC ROBOT — Warm Mistral Palette
   A sharp, low-poly companion
   ──────────────────────────────────────────── */

function Robot() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Follow cursor (gentle)
    const mx = state.pointer.x;
    const my = state.pointer.y;
    const targetRotY = mx * 0.4;
    const targetRotX = -my * 0.3;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;

    // Subtle floating
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  // Mistral Colors
  const mistralOrange = "#fa520f";
  const sunAmber = "#ffa110";
  const darkSurface = "#1f1f1f";

  return (
    <group ref={groupRef}>
      {/* HEAD — sharp icosahedron */}
      <mesh position={[0, 0.8, 0]}>
        <icosahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color={darkSurface}
          metalness={0.5}
          roughness={0.2}
          emissive={darkSurface}
        />
      </mesh>

      {/* HEAD edge glow */}
      <mesh position={[0, 0.8, 0]}>
        <icosahedronGeometry args={[0.66, 0]} />
        <meshBasicMaterial color={mistralOrange} wireframe transparent opacity={0.6} />
      </mesh>

      {/* VISOR / Eyes — glowing white bounding box */}
      <mesh position={[0, 0.85, 0.55]}>
        <boxGeometry args={[0.6, 0.12, 0.12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* Left eye dot (Orange) */}
      <mesh position={[-0.15, 0.85, 0.62]}>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshStandardMaterial
          color={mistralOrange}
          emissive={mistralOrange}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Right eye dot (Amber) */}
      <mesh position={[0.15, 0.85, 0.62]}>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshStandardMaterial
          color={sunAmber}
          emissive={sunAmber}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* BODY — sharp octahedron */}
      <mesh position={[0, -0.15, 0]}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={sunAmber}
          metalness={0.3}
          roughness={0.8}
          emissive={sunAmber}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* BODY wireframe */}
      <mesh position={[0, -0.15, 0]}>
        <octahedronGeometry args={[0.56, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.8} />
      </mesh>

      {/* CORE — glowing block inside body */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color={mistralOrange}
          emissive={mistralOrange}
          emissiveIntensity={1}
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* LEFT ARM — floating block */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-0.9, 0.2, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.2, 0.4, 0.2]} />
          <meshStandardMaterial
            color={darkSurface}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[-0.9, 0.2, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.22, 0.42, 0.22]} />
          <meshBasicMaterial color={mistralOrange} wireframe transparent opacity={0.4} />
        </mesh>
      </Float>

      {/* RIGHT ARM — floating block */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0.9, 0.2, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.2, 0.4, 0.2]} />
          <meshStandardMaterial
            color={sunAmber}
            metalness={0.5}
            roughness={0.1}
            emissive={sunAmber}
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

    </group>
  );
}

/* ────────────────────────────────────────────
   STATIC PARTICLES (No spheres, small blocks)
   ──────────────────────────────────────────── */
function OrbitParticles() {
  const ref = useRef<THREE.InstancedMesh>(null);
  
  const count = 40;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      
      for (let i = 0; i < count; i++) {
        const time = state.clock.elapsedTime + i;
        const angle = (i / count) * Math.PI * 2;
        const radius = 2 + Math.sin(time * 0.5) * 0.5;
        const y = Math.cos(time * 0.2) + (i % 2 === 0 ? 1 : -1);
        
        dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        dummy.rotation.set(time * 0.2, time * 0.3, 0);
        dummy.updateMatrix();
        ref.current.setMatrixAt(i, dummy.matrix);
      }
      ref.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial color="#ffa110" transparent opacity={0.5} />
    </instancedMesh>
  );
}

const MistralBlockGradient = () => {
  return (
    <group position={[0, -2, -2]}>
       <mesh position={[-1, 0, 0]}>
         <boxGeometry args={[0.4, 0.4, 0.4]} />
         <meshBasicMaterial color="#ffd900" />
       </mesh>
       <mesh position={[-0.5, 0, 0]}>
         <boxGeometry args={[0.4, 0.4, 0.4]} />
         <meshBasicMaterial color="#ffe295" />
       </mesh>
       <mesh position={[0, 0, 0]}>
         <boxGeometry args={[0.4, 0.4, 0.4]} />
         <meshBasicMaterial color="#ffa110" />
       </mesh>
       <mesh position={[0.5, 0, 0]}>
         <boxGeometry args={[0.4, 0.4, 0.4]} />
         <meshBasicMaterial color="#ff8105" />
       </mesh>
       <mesh position={[1, 0, 0]}>
         <boxGeometry args={[0.4, 0.4, 0.4]} />
         <meshBasicMaterial color="#fb6424" />
       </mesh>
       <mesh position={[1.5, 0, 0]}>
         <boxGeometry args={[0.4, 0.4, 0.4]} />
         <meshBasicMaterial color="#fa520f" />
       </mesh>
    </group>
  );
}

/* ────────────────────────────────────────────
   MAIN SCENE
   ──────────────────────────────────────────── */
export default function HeroScene() {
  return (
    <Canvas
      className="three-canvas"
      camera={{ position: [0, 0.5, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#fffaeb" />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#fa520f" />
      
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Robot />
      </Float>

      <OrbitParticles />
      <Float speed={1} rotationIntensity={0.2}>
         <MistralBlockGradient />
      </Float>
    </Canvas>
  );
}
