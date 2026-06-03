"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { 
  PARTICLE_COUNT, 
  getOrbPositions,
  getNodePositions,
  getRoutePositions,
  getButterflyPositions,
  getNekiLogoPositions,
  getBoxPositions,
  getNetworkPositions,
  getPinPositions,
  getCameraFramePositions,
  getChaosPositions
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
    if (p < 0.1) mat.color.lerp(new THREE.Color("#E7C88A"), 0.05);
    else if (p < 0.2) mat.color.lerp(new THREE.Color("#3F5A4A"), 0.05); // Moss
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
        blending={THREE.NormalBlending}
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
      orb: getOrbPositions(PARTICLE_COUNT, 2.5),
      node: getNodePositions(PARTICLE_COUNT, 1.5),
      network: getNetworkPositions(PARTICLE_COUNT, 2.0),
      pin: getPinPositions(PARTICLE_COUNT, 1.5),
      route: getRoutePositions(PARTICLE_COUNT, 1.5),
      box: getBoxPositions(PARTICLE_COUNT, 2, 2, 2),
      camera: getCameraFramePositions(PARTICLE_COUNT, 2.5),
      chaos: getChaosPositions(PARTICLE_COUNT, 10),
      butterfly: getButterflyPositions(PARTICLE_COUNT, 2.5),
      logo: getNekiLogoPositions(PARTICLE_COUNT, 3),
    };
  }, []);

  const currentPositions = useMemo(() => new Float32Array(shapes.orb), [shapes.orb]);
  const targetColor = useMemo(() => new THREE.Color("#D4AF6A"), []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !geometryRef.current || !materialRef.current) return;

    const p = progressRef.current;
    let targetShape = shapes.orb;
    let rotationSpeed = 0.2;

    // Default base color (Charcoal/Gold for light theme)
    targetColor.set("#D4AF6A");

    // Sequence: Orb -> Node -> Network -> Pin -> Route -> Package -> Camera -> Chaos -> Butterfly -> Logo
    if (p < 0.10) {
      targetShape = shapes.orb; // Hero, Problem
    } else if (p < 0.20) {
      targetShape = shapes.node; // Food, Books
      targetColor.set("#3F5A4A"); // Moss green
    } else if (p < 0.35) {
      targetShape = shapes.route; // Medical, Time, Skills
      targetColor.set("#D4AF6A");
    } else if (p < 0.55) {
      targetShape = shapes.network; // Network effect, NEKI network
    } else if (p < 0.65) {
      targetShape = shapes.box; // Mission Creation
    } else if (p < 0.75) {
      targetShape = shapes.pin; // Tracking
      targetColor.set("#D4AF6A");
    } else if (p < 0.83) {
      targetShape = shapes.camera; // Proof of impact
    } else if (p < 0.90) {
      targetShape = shapes.chaos; // Multiplier
    } else if (p < 0.96) {
      targetShape = shapes.butterfly; // India / Millions move together
      targetColor.set("#D4AF6A");
    } else {
      targetShape = shapes.logo; // Final
    }

    // Hero Section Split Layout Positioning
    const lerpFactor = 2 * delta; // Slow, cinematic easing
    if (p < 0.05) {
      // Right side for hero split
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, 3.5, lerpFactor);
    } else {
      // Move to center
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, 0, lerpFactor);
    }

    // Gentle floating
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    pointsRef.current.rotation.y += rotationSpeed * delta;

    // Morph positions
    const positions = geometryRef.current.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      currentPositions[i] = THREE.MathUtils.lerp(currentPositions[i], targetShape[i], lerpFactor);
      positions[i] = currentPositions[i];
    }
    geometryRef.current.attributes.position.needsUpdate = true;

    // Color morphing
    materialRef.current.color.lerp(targetColor, lerpFactor);
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
          size={0.015} // Fine dust
          color="#D4AF6A"
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.NormalBlending} // Normal blending for light theme (Additive washes out on white)
        />
      </points>
    </>
  );
}
