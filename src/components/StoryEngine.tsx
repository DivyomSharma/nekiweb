"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { 
  ButterflyMesh, 
  RouteMesh, 
  BowlMesh, 
  BookMesh, 
  CrossMesh, 
  HeartMesh, 
  CogwheelMesh, 
  TwoNodesMesh, 
  NetworkMesh, 
  MissionEcoMesh, 
  TrackingMesh, 
  ShieldMesh, 
  CameraMesh, 
  MultiplierMesh, 
  IndiaNetworkMesh, 
  NekiLogoMesh 
} from "./StoryMeshes";
import { PARTICLE_COUNT, getChaosPositions } from "@/lib/shapes";

function ParticleExplosion({ active }: { active: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const targetScale = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    targetScale.current = THREE.MathUtils.lerp(
      targetScale.current,
      active ? 1 : 0,
      2 * delta
    );
    pointsRef.current.scale.setScalar(targetScale.current);
    pointsRef.current.rotation.y += 0.5 * delta;
    
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = targetScale.current;
  });

  const positions = React.useMemo(() => getChaosPositions(PARTICLE_COUNT, 20), []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.01} 
        color="#D4AF6A" 
        transparent 
        opacity={0} 
        depthWrite={false} 
        blending={THREE.NormalBlending} 
      />
    </points>
  );
}

export function StoryEngine({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  // Mesh refs for individual scaling
  const meshRefs = [
    useRef<THREE.Group>(null), // 0: Butterfly
    useRef<THREE.Group>(null), // 1: Route
    useRef<THREE.Group>(null), // 2: Bowl
    useRef<THREE.Group>(null), // 3: Book
    useRef<THREE.Group>(null), // 4: Cross
    useRef<THREE.Group>(null), // 5: Heart
    useRef<THREE.Group>(null), // 6: Cogwheel
    useRef<THREE.Group>(null), // 7: TwoNodes
    useRef<THREE.Group>(null), // 8: Network
    useRef<THREE.Group>(null), // 9: MissionEco
    useRef<THREE.Group>(null), // 10: Tracking
    useRef<THREE.Group>(null), // 11: Shield
    useRef<THREE.Group>(null), // 12: Camera
    useRef<THREE.Group>(null), // 13: Multiplier
    useRef<THREE.Group>(null), // 14: IndiaNetwork
    useRef<THREE.Group>(null), // 15: Logo
  ];

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const p = progressRef.current;
    
    // Smooth cinematic easing
    const lerpFactor = 3 * delta;
    
    // Calculate current section (0 to 15)
    // p goes from 0 to 1.
    const maxSection = 15;
    const currentSection = Math.min(Math.floor(p * 16), maxSection);

    // Hero split screen logic
    if (p < 0.05) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 3.5, lerpFactor);
    } else {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, lerpFactor);
    }

    // Subtle global rotation and floating
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;

    // Scale active mesh to 1, others to 0
    meshRefs.forEach((ref, index) => {
      if (!ref.current) return;
      const targetScale = (index === currentSection) ? 1 : 0;
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, lerpFactor));
      
      // Add slight rotation to active meshes
      if (index === currentSection) {
        ref.current.rotation.y += 0.1 * delta;
      }
    });
  });

  return (
    <>
      <group ref={groupRef}>
        <group ref={meshRefs[0]}><ButterflyMesh progress={0} /></group>
        <group ref={meshRefs[1]}><RouteMesh /></group>
        <group ref={meshRefs[2]}><BowlMesh /></group>
        <group ref={meshRefs[3]}><BookMesh /></group>
        <group ref={meshRefs[4]}><CrossMesh /></group>
        <group ref={meshRefs[5]}><HeartMesh /></group>
        <group ref={meshRefs[6]}><CogwheelMesh /></group>
        <group ref={meshRefs[7]}><TwoNodesMesh /></group>
        <group ref={meshRefs[8]}><NetworkMesh /></group>
        <group ref={meshRefs[9]}><MissionEcoMesh /></group>
        <group ref={meshRefs[10]}><TrackingMesh /></group>
        <group ref={meshRefs[11]}><ShieldMesh /></group>
        <group ref={meshRefs[12]}><CameraMesh /></group>
        <group ref={meshRefs[13]}><MultiplierMesh /></group>
        <group ref={meshRefs[14]}><IndiaNetworkMesh /></group>
        <group ref={meshRefs[15]}><NekiLogoMesh /></group>
      </group>
      <ParticleExplosion active={progressRef.current > 0.93} />
    </>
  );
}
