"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { 
  PARTICLE_COUNT, 
  getSpherePositions, 
  getChaosPositions, 
  getBoxPositions, 
  getBookPositions,
  getCrossPositions,
  getIndiaMapPositions,
  getNekiLogoPositions,
  getBowlPositions,
  getHandPositions,
  getGearPositions,
  getNetworkPositions,
  getPinPositions,
  getCameraFramePositions
} from "@/lib/shapes";

function AmbientBackground({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const bgPositions = useMemo(() => getChaosPositions(3000, 40), []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const p = progressRef.current;
    
    pointsRef.current.rotation.y += 0.05 * delta;
    pointsRef.current.rotation.x += 0.02 * delta;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (p < 0.1) mat.color.lerp(new THREE.Color("#444444"), 0.05);
    else if (p < 0.2) mat.color.lerp(new THREE.Color("#4ADE80"), 0.05); // Moss
    else if (p < 0.3) mat.color.lerp(new THREE.Color("#D4AF6A"), 0.05);
    else if (p < 0.4) mat.color.lerp(new THREE.Color("#D4AF6A"), 0.05); // Gold
    else if (p < 0.5) mat.color.lerp(new THREE.Color("#A78BFA"), 0.05);
    else mat.color.lerp(new THREE.Color("#D4AF6A"), 0.05);

    if (p < 0.03 || p > 0.97) mat.opacity = 0;
    else mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.15, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={3000} args={[bgPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02} 
        color="#D4AF6A" 
        transparent 
        opacity={0} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleMorpher({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const shapes = useMemo(() => {
    return {
      orb: getSpherePositions(PARTICLE_COUNT, 1.5),
      chaos: getChaosPositions(PARTICLE_COUNT, 8),
      box: getBoxPositions(PARTICLE_COUNT, 2, 2, 2),
      book: getBookPositions(PARTICLE_COUNT),
      cross: getCrossPositions(PARTICLE_COUNT, 2.5),
      india: getIndiaMapPositions(PARTICLE_COUNT, 4),
      logo: getNekiLogoPositions(PARTICLE_COUNT, 3),
      bowl: getBowlPositions(PARTICLE_COUNT, 2),
      hand: getHandPositions(PARTICLE_COUNT, 2),
      gear: getGearPositions(PARTICLE_COUNT, 2),
      network: getNetworkPositions(PARTICLE_COUNT, 1.5),
      pin: getPinPositions(PARTICLE_COUNT, 1.5),
      camera: getCameraFramePositions(PARTICLE_COUNT, 2.5)
    };
  }, []);

  const currentPositions = useMemo(() => new Float32Array(shapes.orb), [shapes]);

  useFrame((state, delta) => {
    if (!geometryRef.current || !pointsRef.current || !materialRef.current) return;

    const p = progressRef.current;
    let targetShape = shapes.orb;
    let targetColor = new THREE.Color("#D4AF6A"); // Champagne Gold
    let targetSize = 0.015; // Small and classy
    let rotationSpeed = 0.2;

    if (p < 0.033) {
      targetShape = shapes.orb;
    } else if (p < 0.10) {
      targetShape = shapes.chaos;
      targetColor.set("#555555"); 
      targetSize = 0.01;
    } else if (p < 0.166) {
      targetShape = shapes.bowl;
      targetColor.set("#4ADE80"); // Bright Moss
    } else if (p < 0.233) {
      targetShape = shapes.book;
      targetColor.set("#D4AF6A"); 
    } else if (p < 0.30) {
      targetShape = shapes.cross;
      targetColor.set("#F87171"); // Red
    } else if (p < 0.366) {
      targetShape = shapes.hand;
      targetColor.set("#60A5FA"); // Blue
    } else if (p < 0.433) {
      targetShape = shapes.gear;
      targetColor.set("#A78BFA"); // Purple
    } else if (p < 0.50) {
      targetShape = shapes.network;
      targetColor.set("#D4AF6A");
    } else if (p < 0.566) {
      targetShape = shapes.network;
      pointsRef.current.scale.setScalar(1.5); // Bigger network
    } else if (p < 0.633) {
      targetShape = shapes.box;
      pointsRef.current.scale.setScalar(0.5);
    } else if (p < 0.70) {
      targetShape = shapes.pin;
      pointsRef.current.scale.setScalar(1);
    } else if (p < 0.766) {
      targetShape = shapes.box;
      pointsRef.current.scale.setScalar(0.5);
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    } else if (p < 0.833) {
      targetShape = shapes.camera;
      pointsRef.current.scale.setScalar(1);
    } else if (p < 0.90) {
      targetShape = shapes.chaos; // Multiplier
      targetColor.set("#D4AF6A");
    } else if (p < 0.966) {
      targetShape = shapes.india;
      pointsRef.current.scale.setScalar(1.5);
      rotationSpeed = 0;
    } else {
      targetShape = shapes.logo;
      pointsRef.current.scale.setScalar(1);
      rotationSpeed = 0.5;
    }

    if (p < 0.5 || p === 0.633 || p === 0.70 || p === 0.833 || p === 0.90 || p >= 0.966) {
      if (p !== 0.566 && p !== 0.966) {
        pointsRef.current.scale.setScalar(1);
      }
      pointsRef.current.position.y = 0;
    }
    
    if (p >= 0.70 && p < 0.766) {
      const subP = (p - 0.70) / (0.766 - 0.70);
      pointsRef.current.position.x = (subP - 0.5) * 10;
    } else {
      pointsRef.current.position.x = 0;
    }

    // Cinematic easing (slow, elegant morph)
    const lerpFactor = 2 * delta; 
    
    const positions = geometryRef.current.attributes.position.array as Float32Array;
    
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      positions[i] += (targetShape[i] - positions[i]) * lerpFactor;
      
      if (p < 0.05 || p > 0.966) { 
        positions[i] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002;
      }
    }
    
    geometryRef.current.attributes.position.needsUpdate = true;
    
    materialRef.current.color.lerp(targetColor, 5 * delta);
    materialRef.current.size = THREE.MathUtils.lerp(materialRef.current.size, targetSize, 2 * delta);
    pointsRef.current.rotation.y += rotationSpeed * delta;
  });

  return (
    <>
      <AmbientBackground progressRef={progressRef} />
      <points ref={pointsRef}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute 
            attach="attributes-position" 
            count={PARTICLE_COUNT} 
            args={[currentPositions, 3]} 
          />
        </bufferGeometry>
        <pointsMaterial 
          ref={materialRef}
          size={0.015} 
          color="#D4AF6A"
          transparent 
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
