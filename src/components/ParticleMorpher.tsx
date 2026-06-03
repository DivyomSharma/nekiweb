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
    if (p < 0.1) mat.color.lerp(new THREE.Color("#CCCCCC"), 0.05);
    else if (p < 0.2) mat.color.lerp(new THREE.Color("#3F5A4A"), 0.05); // Moss
    else if (p < 0.3) mat.color.lerp(new THREE.Color("#D4AF6A"), 0.05);
    else if (p < 0.4) mat.color.lerp(new THREE.Color("#D4AF6A"), 0.05); // Gold
    else if (p < 0.5) mat.color.lerp(new THREE.Color("#8B5CF6"), 0.05);
    else mat.color.lerp(new THREE.Color("#D4AF6A"), 0.05);

    if (p < 0.03 || p > 0.97) mat.opacity = 0;
    else mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.1, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={3000} args={[bgPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#D4AF6A" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

export function ParticleMorpher({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

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
    if (!meshRef.current || !materialRef.current) return;

    const p = progressRef.current;
    let targetShape = shapes.orb;
    let targetColor = new THREE.Color("#D4AF6A"); // Champagne Gold
    let targetSize = 0.03;
    let rotationSpeed = 0.2;

    // Timeline: 16 sections, ~0.066 per section interval
    if (p < 0.033) {
      targetShape = shapes.orb;
    } else if (p < 0.10) {
      targetShape = shapes.chaos;
      targetColor.set("#888888"); 
      targetSize = 0.015;
    } else if (p < 0.166) {
      targetShape = shapes.bowl;
      targetColor.set("#3F5A4A"); // Moss Green
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
      meshRef.current.scale.setScalar(1.5); // Bigger network
    } else if (p < 0.633) {
      targetShape = shapes.box;
      meshRef.current.scale.setScalar(0.5);
    } else if (p < 0.70) {
      targetShape = shapes.pin;
      meshRef.current.scale.setScalar(1);
    } else if (p < 0.766) {
      targetShape = shapes.box;
      meshRef.current.scale.setScalar(0.5);
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    } else if (p < 0.833) {
      targetShape = shapes.camera;
      meshRef.current.scale.setScalar(1);
    } else if (p < 0.90) {
      targetShape = shapes.chaos; // Multiplier
      targetColor.set("#D4AF6A");
    } else if (p < 0.966) {
      targetShape = shapes.india;
      meshRef.current.scale.setScalar(1.5);
      rotationSpeed = 0;
    } else {
      targetShape = shapes.logo;
      meshRef.current.scale.setScalar(1);
      rotationSpeed = 0.5;
    }

    // Reset scales/positions if not explicitly set
    if (p < 0.5 || p === 0.633 || p === 0.70 || p === 0.833 || p === 0.90 || p >= 0.966) {
      if (p !== 0.566 && p !== 0.966) {
        meshRef.current.scale.setScalar(1);
      }
      meshRef.current.position.y = 0;
    }
    
    // Package path tracking effect
    if (p >= 0.70 && p < 0.766) {
      const subP = (p - 0.70) / (0.766 - 0.70);
      meshRef.current.position.x = (subP - 0.5) * 10;
    } else {
      meshRef.current.position.x = 0;
    }

    const lerpFactor = 5 * delta;
    
    // Update instances
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      currentPositions[i*3] += (targetShape[i*3] - currentPositions[i*3]) * lerpFactor;
      currentPositions[i*3+1] += (targetShape[i*3+1] - currentPositions[i*3+1]) * lerpFactor;
      currentPositions[i*3+2] += (targetShape[i*3+2] - currentPositions[i*3+2]) * lerpFactor;
      
      if (p < 0.05 || p > 0.966) { 
        currentPositions[i*3] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002;
      }

      dummy.position.set(currentPositions[i*3], currentPositions[i*3+1], currentPositions[i*3+2]);
      
      const currentScale = dummy.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetSize, lerpFactor);
      dummy.scale.setScalar(newScale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    materialRef.current.color.lerp(targetColor, 5 * delta);
    meshRef.current.rotation.y += rotationSpeed * delta;
  });

  return (
    <>
      <AmbientBackground progressRef={progressRef} />
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhysicalMaterial 
          ref={materialRef}
          color="#D4AF6A"
          metalness={0.8}
          roughness={0.2}
          transmission={0.9}
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </instancedMesh>
    </>
  );
}
