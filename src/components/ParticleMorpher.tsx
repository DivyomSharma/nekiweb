"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  PARTICLE_COUNT,
  getButterflyPositions,
  getRoutePositions,
  getBowlPositions,
  getBookPositions,
  getCrossPositions,
  getHeartPositions,
  getGearPositions,
  getConnectionPositions,
  getNetworkPositions,
  getMissionEcoPositions,
  getTrackingPositions,
  getShieldPositions,
  getCameraFramePositions,
  getMultiplierPositions,
  getIndiaNetworkPositions,
  getNekiLogoPositions,
  getChaosPositions
} from "@/lib/shapes";

// ============================================================
// SECTION COLOR PALETTE (matches each section's theme)
// ============================================================
const SECTION_COLORS = [
  "#D4AF6A", // 0  Hero / Butterfly — Champagne Gold
  "#D4AF6A", // 1  Trust Problem / Route — Muted Gold
  "#C68B3E", // 2  Food / Bowl — Warm Amber
  "#D4AF6A", // 3  Education / Book — Champagne Gold
  "#3F5A4A", // 4  Healthcare / Cross — Green
  "#60A5FA", // 5  Time / Heart — Soft Blue
  "#9B7FDB", // 6  Skills / Cogwheel — Purple
  "#D4AF6A", // 7  Connection / Two Nodes — Gold
  "#D4AF6A", // 8  Network — Gold
  "#D4AF6A", // 9  Mission Eco — Gold
  "#D4AF6A", // 10 Tracking — Gold
  "#3F5A4A", // 11 Trust / Shield — Green
  "#D4AF6A", // 12 Proof / Camera — Gold
  "#D4AF6A", // 13 Multiplier — Gold
  "#D4AF6A", // 14 India Network — Gold
  "#D4AF6A", // 15 Logo — Gold
];

// ============================================================
// AMBIENT BACKGROUND — Sparse floating dust
// ============================================================
function AmbientBackground({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const bgPositions = useMemo(() => getChaosPositions(3000, 40), []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const p = progressRef.current;

    pointsRef.current.rotation.y += 0.05 * delta;
    pointsRef.current.rotation.x += 0.02 * delta;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    const sectionIndex = Math.min(Math.floor(p * 16), 15);
    mat.color.lerp(new THREE.Color(SECTION_COLORS[sectionIndex]), 0.03);

    if (p < 0.03 || p > 0.97) mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, 0.05);
    else mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.12, 0.05);
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

// ============================================================
// PARTICLE MORPHER — The main 3D storytelling engine
// ============================================================
export function ParticleMorpher({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Pre-compute all 16 target shapes
  const shapes = useMemo(() => {
    return [
      getButterflyPositions(PARTICLE_COUNT, 2.5),    // 0  Butterfly
      getRoutePositions(PARTICLE_COUNT, 1.2),         // 1  Route
      getBowlPositions(PARTICLE_COUNT, 2.0),          // 2  Bowl
      getBookPositions(PARTICLE_COUNT),               // 3  Book
      getCrossPositions(PARTICLE_COUNT, 3.5),         // 4  Cross
      getHeartPositions(PARTICLE_COUNT, 2.5),         // 5  Heart
      getGearPositions(PARTICLE_COUNT, 2.0),          // 6  Cogwheel
      getConnectionPositions(PARTICLE_COUNT, 1.2),    // 7  Two Nodes
      getNetworkPositions(PARTICLE_COUNT, 1.0),       // 8  Network
      getMissionEcoPositions(PARTICLE_COUNT, 2.0),    // 9  Mission Eco
      getTrackingPositions(PARTICLE_COUNT, 1.2),      // 10 Tracking
      getShieldPositions(PARTICLE_COUNT, 2.0),        // 11 Shield
      getCameraFramePositions(PARTICLE_COUNT, 2.0),   // 12 Camera
      getMultiplierPositions(PARTICLE_COUNT, 1.0),    // 13 Multiplier
      getIndiaNetworkPositions(PARTICLE_COUNT, 3.0),  // 14 India Network
      getNekiLogoPositions(PARTICLE_COUNT, 3.0),      // 15 Logo
    ];
  }, []);

  const currentPositions = useMemo(() => new Float32Array(shapes[0]), [shapes]);
  const targetColor = useMemo(() => new THREE.Color(SECTION_COLORS[0]), []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !geometryRef.current || !materialRef.current) return;

    const p = progressRef.current;
    const lerpFactor = 2.5 * delta; // Smooth cinematic easing

    // Calculate which section we're in (0 to 15)
    const sectionIndex = Math.min(Math.floor(p * 16), 15);
    const targetShape = shapes[sectionIndex];

    // Set target color for this section
    targetColor.set(SECTION_COLORS[sectionIndex]);

    // --- HERO SPLIT LAYOUT ---
    // In hero section (section 0), position the particle cloud on the right
    if (p < 0.04) {
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x, 3.5, lerpFactor
      );
    } else {
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x, 0, lerpFactor
      );
    }

    // --- GENTLE FLOATING ---
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;

    // --- SLOW ROTATION ---
    pointsRef.current.rotation.y += 0.15 * delta;

    // --- MORPH POSITIONS ---
    const positions = geometryRef.current.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      currentPositions[i] = THREE.MathUtils.lerp(currentPositions[i], targetShape[i], lerpFactor);
      positions[i] = currentPositions[i];
    }
    geometryRef.current.attributes.position.needsUpdate = true;

    // --- COLOR MORPH ---
    materialRef.current.color.lerp(targetColor, lerpFactor);

    // --- SIZE PULSE for specific sections ---
    let targetSize = 0.015;
    if (sectionIndex === 8 || sectionIndex === 14) targetSize = 0.02; // Network & India: slightly larger dots
    if (sectionIndex === 15) targetSize = 0.018; // Logo: medium
    materialRef.current.size = THREE.MathUtils.lerp(materialRef.current.size, targetSize, lerpFactor);
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
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </>
  );
}
