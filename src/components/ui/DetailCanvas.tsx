"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  PARTICLE_COUNT,
  getHeroLogoPositions,
  getPhonePositions,
  getBookPositions,
  getShieldPositions,
  getCameraFramePositions,
  getNetworkPositions,
  getTrackingPositions,
  getBowlPositions,
  getCrossPositions,
  getHeartPositions,
  getGearPositions,
} from "@/lib/shapes";

type ShapeName = "logo" | "phone" | "book" | "shield" | "camera" | "network" | "path" | "bowl" | "cross" | "heart" | "gear";

interface DetailCanvasProps {
  shapeName: ShapeName;
  color?: string;
}

const SHAPE_COLOR_MAP: Record<ShapeName, string> = {
  logo: "#D4AF6A",
  phone: "#9CA3AF",
  book: "#D4AF6A",
  shield: "#3F5A4A",
  camera: "#D4AF6A",
  network: "#D4AF6A",
  path: "#D4AF6A",
  bowl: "#10B981",
  cross: "#F87171",
  heart: "#60A5FA",
  gear: "#C084FC",
};

function SingleShapeMesh({ shapeName, color }: { shapeName: ShapeName; color: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const frameRef = useRef(0);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pre-calculate target shape coordinates
  const shapeData = useMemo(() => {
    switch (shapeName) {
      case "logo":
        return getHeroLogoPositions(PARTICLE_COUNT, 2.0);
      case "phone":
        return getPhonePositions(PARTICLE_COUNT, 1.2);
      case "book":
        return getBookPositions(PARTICLE_COUNT);
      case "shield":
        return getShieldPositions(PARTICLE_COUNT, 1.2);
      case "camera":
        return getCameraFramePositions(PARTICLE_COUNT, 1.2);
      case "network":
        return getNetworkPositions(PARTICLE_COUNT, 0.6);
      case "path":
        return getTrackingPositions(PARTICLE_COUNT, 0.7);
      case "bowl":
        return getBowlPositions(PARTICLE_COUNT, 1.2);
      case "cross":
        return getCrossPositions(PARTICLE_COUNT, 1.2);
      case "heart":
        return getHeartPositions(PARTICLE_COUNT, 1.2);
      case "gear":
        return getGearPositions(PARTICLE_COUNT, 1.2);
      default:
        return getHeroLogoPositions(PARTICLE_COUNT, 2.0);
    }
  }, [shapeName]);

  const targetColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    frameRef.current++;
    if (isMobile && frameRef.current % 2 !== 0) return;

    const lerpFactor = 2.5 * delta * (isMobile ? 2.0 : 1.0);

    // Gentler Y-floating
    const baseOffsetY = 0;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      baseOffsetY + Math.sin(state.clock.elapsedTime * 0.8) * 0.15,
      lerpFactor * 2.0
    );

    // Mouse interactive rotation (Max 5 degrees)
    const targetRotX = state.pointer.y * 0.087;
    const targetRotY = state.pointer.x * 0.087 + state.clock.elapsedTime * 0.04; // Gentle slow rotation

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetRotX, lerpFactor);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, lerpFactor);

    // Initialize/Update position colors
    const matrixArray = meshRef.current.instanceMatrix.array as Float32Array;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      dummy.position.set(
        shapeData[i * 3],
        shapeData[i * 3 + 1],
        shapeData[i * 3 + 2]
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, targetColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.015, 8, 8]} />
      {isMobile ? (
        <meshStandardMaterial 
          color="#FFFFFF" 
          metalness={0.2} 
          roughness={0.3} 
          transparent 
          opacity={0.15}
        />
      ) : (
        <meshPhysicalMaterial 
          color="#FFFFFF" 
          metalness={0.1} 
          roughness={0.15} 
          transmission={0.9} 
          ior={1.5}
          thickness={0.5}
          transparent
          opacity={1}
          envMapIntensity={1.5}
        />
      )}
    </instancedMesh>
  );
}

export function DetailCanvas({ shapeName, color }: DetailCanvasProps) {
  const selectedColor = color || SHAPE_COLOR_MAP[shapeName];
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileScreen(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobileScreen) return null;

  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#FAF9F7"]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <SingleShapeMesh shapeName={shapeName} color={selectedColor} />
      </Canvas>
    </div>
  );
}
