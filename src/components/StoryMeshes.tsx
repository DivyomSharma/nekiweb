"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Cylinder, Box, Tube, Line, RoundedBox, Plane, Torus, Extrude } from "@react-three/drei";

// --- PREMIUM MATERIALS ---
export const materials = {
  glassGold: new THREE.MeshPhysicalMaterial({
    color: "#D4AF6A",
    transmission: 0.9,
    opacity: 1,
    metalness: 0.1,
    roughness: 0.05,
    ior: 1.5,
    thickness: 0.5,
    specularIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  }),
  glassWhite: new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    transmission: 0.9,
    opacity: 1,
    metalness: 0.0,
    roughness: 0.1,
    ior: 1.5,
    thickness: 1.0,
    clearcoat: 1,
  }),
  glassBlue: new THREE.MeshPhysicalMaterial({
    color: "#60A5FA",
    transmission: 0.9,
    opacity: 1,
    metalness: 0.1,
    roughness: 0.1,
    ior: 1.5,
    thickness: 0.5,
    clearcoat: 1,
  }),
  metalGold: new THREE.MeshStandardMaterial({
    color: "#D4AF6A",
    metalness: 0.8,
    roughness: 0.2,
  }),
  metalDark: new THREE.MeshStandardMaterial({
    color: "#3F5A4A",
    metalness: 0.6,
    roughness: 0.3,
  }),
  glowGreen: new THREE.MeshBasicMaterial({
    color: "#4ADE80",
  })
};

// --- SHAPES ---

export function ButterflyMesh({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    const flap = Math.sin(t * 3) * 0.3;
    group.current.children[0].rotation.y = flap; // Left wing
    group.current.children[1].rotation.y = -flap; // Right wing
    group.current.position.y = Math.sin(t * 2) * 0.2;
  });

  return (
    <group ref={group}>
      <mesh position={[-0.5, 0, 0]} material={materials.glassGold}>
        <planeGeometry args={[1, 1.5, 16, 16]} />
      </mesh>
      <mesh position={[0.5, 0, 0]} material={materials.glassGold}>
        <planeGeometry args={[1, 1.5, 16, 16]} />
      </mesh>
      {/* Body */}
      <Cylinder args={[0.05, 0.05, 1.2]} rotation={[0, 0, 0]} material={materials.metalGold} />
    </group>
  );
}

export function RouteMesh() {
  const points = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const t = i / 49;
      return new THREE.Vector3(-2 + t * 4, Math.sin(t * Math.PI * 2) * 0.5, 0);
    });
  }, []);
  const curve = new THREE.CatmullRomCurve3(points);
  
  return (
    <group>
      <Tube args={[curve, 64, 0.05, 8, false]} material={materials.metalGold} />
      <Sphere args={[0.15]} position={[-2, 0, 0]} material={materials.glassGold} />
      <Sphere args={[0.15]} position={[2, 0, 0]} material={materials.glassGold} />
    </group>
  );
}

export function BowlMesh() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <group ref={group}>
      <mesh material={materials.metalGold}>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
      </mesh>
      {/* Contents */}
      <Sphere args={[0.95]} position={[0, 0.1, 0]} material={materials.metalDark} />
    </group>
  );
}

export function BookMesh() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.1;
      group.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
    }
  });
  return (
    <group ref={group}>
      {/* Spine */}
      <Box args={[0.2, 1.5, 2]} position={[0, -0.1, 0]} material={materials.metalGold} />
      {/* Left Page */}
      <Box args={[1.2, 0.1, 1.9]} position={[-0.7, 0, 0]} rotation={[0, 0, 0.1]} material={materials.glassWhite} />
      {/* Right Page */}
      <Box args={[1.2, 0.1, 1.9]} position={[0.7, 0, 0]} rotation={[0, 0, -0.1]} material={materials.glassWhite} />
    </group>
  );
}

export function CrossMesh() {
  return (
    <group>
      <RoundedBox args={[0.5, 2, 0.5]} radius={0.1} material={materials.glassWhite} />
      <RoundedBox args={[2, 0.5, 0.5]} radius={0.1} material={materials.glassWhite} />
      <Box args={[0.3, 0.3, 0.55]} material={materials.glowGreen} />
    </group>
  );
}

export function HeartMesh() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.05;
      group.current.scale.setScalar(scale);
    }
  });

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 5, y + 5);
    shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
    return shape;
  }, []);

  return (
    <group ref={group} rotation={[Math.PI, 0, 0]} position={[0, 1.5, 0]} scale={0.08}>
      <Extrude args={[heartShape, { depth: 2, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.5, bevelThickness: 0.5 }]} material={materials.glassBlue} />
    </group>
  );
}

export function CogwheelMesh() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.z = clock.getElapsedTime() * 0.5;
  });
  return (
    <group ref={group}>
      <Torus args={[1, 0.3, 16, 32]} material={materials.metalGold} />
      {Array.from({ length: 8 }).map((_, i) => (
        <Box key={i} args={[0.4, 0.8, 0.4]} position={[Math.cos(i * Math.PI / 4) * 1.2, Math.sin(i * Math.PI / 4) * 1.2, 0]} rotation={[0, 0, i * Math.PI / 4]} material={materials.metalGold} />
      ))}
    </group>
  );
}

export function TwoNodesMesh() {
  return (
    <group>
      <Sphere args={[0.4]} position={[-1.5, 0, 0]} material={materials.glassGold} />
      <Sphere args={[0.4]} position={[1.5, 0, 0]} material={materials.glassGold} />
      <Cylinder args={[0.05, 0.05, 3]} rotation={[0, 0, Math.PI / 2]} material={materials.glassWhite} />
    </group>
  );
}

export function ShieldMesh() {
  return (
    <group>
      <Cylinder args={[1.2, 0, 2, 4]} rotation={[Math.PI / 4, 0, 0]} material={materials.glassGold} />
    </group>
  );
}

export function CameraMesh() {
  return (
    <group>
      <Box args={[3, 2, 0.1]} material={materials.glassWhite} />
      <Sphere args={[0.5]} position={[0, 0, 0.1]} material={materials.glassGold} />
    </group>
  );
}

export function NekiLogoMesh() {
  return (
    <group>
      {/* Abstract N made of glass cylinders */}
      <Cylinder args={[0.2, 0.2, 3]} position={[-1, 0, 0]} material={materials.glassGold} />
      <Cylinder args={[0.2, 0.2, 3.6]} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 6]} material={materials.glassGold} />
      <Cylinder args={[0.2, 0.2, 3]} position={[1, 0, 0]} material={materials.glassGold} />
    </group>
  );
}

export function NetworkMesh() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.1;
  });
  return (
    <group ref={group}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Sphere key={i} args={[0.2]} position={[(Math.random()-0.5)*4, (Math.random()-0.5)*4, (Math.random()-0.5)*4]} material={materials.glassGold} />
      ))}
    </group>
  );
}

export function MissionEcoMesh() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.z = clock.getElapsedTime() * 0.2;
  });
  return (
    <group ref={group}>
      <Sphere args={[1]} material={materials.glassGold} />
      <Box args={[0.4, 0.4, 0.4]} position={[2, 0, 0]} material={materials.glassWhite} />
      <Box args={[0.3, 0.3, 0.3]} position={[-2, 1, 0]} material={materials.glassBlue} />
      <Cylinder args={[0.2, 0.2, 0.5]} position={[0, -2, 0]} material={materials.metalDark} />
    </group>
  );
}

export function TrackingMesh() {
  return (
    <group>
      <Box args={[0.5, 0.5, 0.5]} position={[0, 0.5, 0]} material={materials.glassWhite} />
    </group>
  );
}

export function MultiplierMesh() {
  return (
    <group>
      <Sphere args={[0.5]} position={[-1, 0, 0]} material={materials.glassGold} />
      <Sphere args={[0.3]} position={[1, 1, 0]} material={materials.glassWhite} />
      <Sphere args={[0.3]} position={[1, 0, 0]} material={materials.glassWhite} />
      <Sphere args={[0.3]} position={[1, -1, 0]} material={materials.glassWhite} />
    </group>
  );
}

export function IndiaNetworkMesh() {
  return (
    <group>
      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere key={i} args={[0.1]} position={[(Math.random()-0.5)*6, (Math.random()-0.5)*6, 0]} material={materials.glassGold} />
      ))}
    </group>
  );
}
