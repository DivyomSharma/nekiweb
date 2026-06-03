"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { 
  PARTICLE_COUNT, 
  getSpherePositions, 
  getChaosPositions, 
  getBoxPositions, 
  getBookPositions, 
  getCrossPositions, 
  getHumanPositions,
  getIndiaMapPositions,
  getNekiLogoPositions
} from "@/lib/shapes";

function AmbientBackground({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const bgPositions = useMemo(() => getChaosPositions(3000, 40), []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const p = progressRef.current;
    
    // Slow rotation
    pointsRef.current.rotation.y += 0.05 * delta;
    pointsRef.current.rotation.x += 0.02 * delta;

    // Change background colors based on scene vibe
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (p < 0.1) mat.color.lerp(new THREE.Color("#222222"), 0.05); // Fog
    else if (p < 0.2) mat.color.lerp(new THREE.Color("#4ADE80"), 0.05); // Food green
    else if (p < 0.3) mat.color.lerp(new THREE.Color("#60A5FA"), 0.05); // Clothes blue
    else if (p < 0.4) mat.color.lerp(new THREE.Color("#FCD34D"), 0.05); // Books yellow
    else if (p < 0.5) mat.color.lerp(new THREE.Color("#F87171"), 0.05); // Med red
    else mat.color.lerp(new THREE.Color("#FFC247"), 0.05); // Neki orange/yellow for rest

    // Adjust opacity
    if (p < 0.05 || p > 0.95) mat.opacity = 0; // Hide at start/end
    else mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.3, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={3000} 
          args={[bgPositions, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#222222"
        transparent 
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function ParticleMorpher({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Generate all target shapes once
  const shapes = useMemo(() => {
    return {
      orb: getSpherePositions(PARTICLE_COUNT, 1.5),
      chaos: getChaosPositions(PARTICLE_COUNT, 8),
      food: getBoxPositions(PARTICLE_COUNT, 2, 2, 2),
      clothes: getBoxPositions(PARTICLE_COUNT, 3, 0.5, 2),
      book: getBookPositions(PARTICLE_COUNT),
      cross: getCrossPositions(PARTICLE_COUNT, 2.5),
      human: getHumanPositions(PARTICLE_COUNT, 1.5),
      india: getIndiaMapPositions(PARTICLE_COUNT, 4),
      logo: getNekiLogoPositions(PARTICLE_COUNT, 3)
    };
  }, []);

  // Current working positions array
  const currentPositions = useMemo(() => new Float32Array(shapes.orb), [shapes]);

  useFrame((state, delta) => {
    if (!geometryRef.current || !pointsRef.current || !materialRef.current) return;

    const p = progressRef.current; // 0 to 1 across 17 pages (each page is ~0.0588)
    let targetShape = shapes.orb;
    let targetColor = new THREE.Color("#FFC247");
    let targetSize = 0.05;
    let rotationSpeed = 0.2;

    // Define the timeline of transformations
    if (p < 0.05) {
      targetShape = shapes.orb;
      targetColor.set("#FFC247"); // Warm saffron
    } else if (p < 0.11) {
      targetShape = shapes.chaos;
      targetColor.set("#444444"); // Fog / uncertainty
      targetSize = 0.02;
    } else if (p < 0.17) {
      targetShape = shapes.food;
      targetColor.set("#4ADE80"); // Green for food
    } else if (p < 0.23) {
      targetShape = shapes.clothes;
      targetColor.set("#60A5FA"); // Blue for clothes
    } else if (p < 0.29) {
      targetShape = shapes.book;
      targetColor.set("#FCD34D"); // Yellow for books
    } else if (p < 0.35) {
      targetShape = shapes.cross;
      targetColor.set("#F87171"); // Red for medicine
    } else if (p < 0.41) {
      targetShape = shapes.human;
      targetColor.set("#FF9800"); // Orange for volunteers
    } else if (p < 0.47) {
      targetShape = shapes.chaos; // Skills (burst)
      targetColor.set("#A78BFA"); // Purple
    } else if (p < 0.58) {
      targetShape = shapes.orb; // Communities & Neki Network (Giant Orb)
      targetColor.set("#FF7A00"); // Intense orange
      pointsRef.current.scale.setScalar(1.5);
    } else if (p < 0.82) {
      // Missions, Tracking, Trust, Proof
      targetShape = shapes.food; // Abstract box representing package
      targetColor.set("#FFC247");
      pointsRef.current.scale.setScalar(0.5);
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    } else if (p < 0.88) {
      targetShape = shapes.chaos; // Multiplier explosion
      targetColor.set("#FFC247");
    } else if (p < 0.94) {
      targetShape = shapes.india; // Live Impact
      targetColor.set("#FFC247");
      pointsRef.current.scale.setScalar(1.5);
      rotationSpeed = 0;
    } else {
      targetShape = shapes.logo; // Final Logo
      targetColor.set("#FF7A00");
      pointsRef.current.scale.setScalar(1);
      rotationSpeed = 0.5;
    }

    // Reset scales/positions if not explicitly set
    if (p < 0.47 || (p >= 0.88 && p < 0.94)) {
      pointsRef.current.scale.setScalar(1);
      pointsRef.current.position.y = 0;
    }
    if (p < 0.82 && p >= 0.58) {
      // Package follows a path (simulated by X movement based on scroll)
      const subP = (p - 0.58) / (0.82 - 0.58);
      pointsRef.current.position.x = (subP - 0.5) * 10;
    } else {
      pointsRef.current.position.x = 0;
    }

    // Interpolate positions (The Morph)
    const positions = geometryRef.current.attributes.position.array as Float32Array;
    const lerpFactor = 5 * delta; // Speed of transformation
    
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      positions[i] += (targetShape[i] - positions[i]) * lerpFactor;
      
      // Add slight organic breathing
      if (p < 0.05 || p > 0.94) { // Orb or Logo breathing
        positions[i] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002;
      }
    }
    
    geometryRef.current.attributes.position.needsUpdate = true;

    // Interpolate Color & Size
    materialRef.current.color.lerp(targetColor, 5 * delta);
    materialRef.current.size = THREE.MathUtils.lerp(materialRef.current.size, targetSize, 5 * delta);

    // Global rotation
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
          size={0.05} 
          color="#FFC247"
          transparent 
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
