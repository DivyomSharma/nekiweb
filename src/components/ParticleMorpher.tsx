"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  PARTICLE_COUNT,
  getHeroLogoPositions,
  getPhonePositions,
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
  "#D4AF6A", // 0  Hero Logo — Champagne Gold
  "#9CA3AF", // 1  Problem / Cash Note — Grey
  "#166534", // 2  Food / Bowl — Dark Green
  "#D4AF6A", // 3  Education / Book — Champagne Gold
  "#EF4444", // 4  Healthcare / Cross — Vibrant Red
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
// Per-section X offset: positive = right side, negative = left side
// Text LEFT  → shape RIGHT (+3.5)
// Text RIGHT → shape LEFT  (-3.5)
// Text CENTER → shape CENTER (0)
// ============================================================
const SECTION_X_OFFSET = [
   3.5,  // 0  Hero: text left → shape right
   3.5,  // 1  Problem: text left → shape right
  -3.5,  // 2  Food: text right → shape left
   3.5,  // 3  Book: text left → shape right
  -3.5,  // 4  Medical: text right → shape left
   3.5,  // 5  Time: text left → shape right
  -3.5,  // 6  Skills: text right → shape left
   3.5,  // 7  Connection: text left → shape right
  -3.5,  // 8  Network: text right → shape left
   0.0,  // 9  Mission: text center → shape center (behind cards)
   3.5,  // 10 Tracking: text left → shape right
  -3.5,  // 11 Trust: text right → shape left
   3.5,  // 12 Proof: text left → shape right
  -3.5,  // 13 Multiplier: text right → shape left
   0.0,  // 14 India: text center → shape center
   0.0,  // 15 Final: text center → shape center
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

    if (p < 0.03) mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, 0.05);
    else mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.08, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={3000} args={[bgPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
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
// PARTICLE MORPHER — 3D Metallic Instanced Mesh
// ============================================================
export function ParticleMorpher({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Pre-compute procedural shapes
  const shapes = useMemo(() => {
    return [
      getHeroLogoPositions(PARTICLE_COUNT, 2.0),      // 0  Hero Logo (procedural, larger scale)
      getPhonePositions(PARTICLE_COUNT, 1.2),         // 1  Phone
      getBowlPositions(PARTICLE_COUNT, 1.2),          // 2  Bowl
      getBookPositions(PARTICLE_COUNT),               // 3  Book
      getCrossPositions(PARTICLE_COUNT, 2.0),         // 4  Cross
      getHeartPositions(PARTICLE_COUNT, 1.5),         // 5  Heart
      getGearPositions(PARTICLE_COUNT, 1.2),          // 6  Cogwheel
      getConnectionPositions(PARTICLE_COUNT, 0.8),    // 7  Two Nodes
      getNetworkPositions(PARTICLE_COUNT, 0.6),       // 8  Network
      getMissionEcoPositions(PARTICLE_COUNT, 1.0),    // 9  Mission Eco
      getTrackingPositions(PARTICLE_COUNT, 0.7),      // 10 Tracking
      getShieldPositions(PARTICLE_COUNT, 1.2),        // 11 Shield
      getCameraFramePositions(PARTICLE_COUNT, 1.2),   // 12 Camera
      getMultiplierPositions(PARTICLE_COUNT, 0.6),    // 13 Multiplier
      getIndiaNetworkPositions(PARTICLE_COUNT, 1.8),  // 14 India Network
      getHeroLogoPositions(PARTICLE_COUNT, 2.0),      // 15 Final Logo
    ];
  }, []);

  const currentPositions = useMemo(() => new Float32Array(shapes[0]), [shapes]);
  const targetColor = useMemo(() => new THREE.Color(SECTION_COLORS[0]), []);
  const currentColor = useMemo(() => new THREE.Color(SECTION_COLORS[0]), []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const p = progressRef.current;
    const lerpFactor = 2.5 * delta;

    // Current section (0 to 15)
    const sectionIndex = Math.min(Math.floor(p * 16), 15);
    const targetShape = shapes[sectionIndex];

    // Hide particles completely in Section 9 for the clean DOM Mission Ecosystem
    const baseScale = isMobile ? 0.5 : 1;
    const targetScale = sectionIndex === 9 ? 0.001 : baseScale;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), lerpFactor * 2.0);

    // Set target color
    targetColor.set(SECTION_COLORS[sectionIndex]);
    currentColor.lerp(targetColor, lerpFactor);
    (meshRef.current.material as THREE.MeshPhysicalMaterial).color.copy(currentColor);

    // --- POSITION: push to the opposite side of text ---
    // On mobile, center the shapes or give them a much smaller offset so they don't overflow
    const targetX = isMobile ? SECTION_X_OFFSET[sectionIndex] * 0.3 : SECTION_X_OFFSET[sectionIndex];
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x, targetX, lerpFactor
    );

    // --- GENTLE FLOATING ---
    // On mobile, push it up slightly so it doesn't sit exactly behind the dense text
    const baseOffsetY = isMobile ? 1.0 : 0;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      baseOffsetY + Math.sin(state.clock.elapsedTime * 0.8) * 0.12,
      lerpFactor * 2.0
    );

    // --- SLOW ROTATION ---
    meshRef.current.rotation.y += 0.12 * delta;

    // --- MORPH POSITIONS (InstancedMesh) ---
    const matrixArray = meshRef.current.instanceMatrix.array as Float32Array;
    
    // We update the translation part of each 4x4 matrix
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      currentPositions[i * 3]     = THREE.MathUtils.lerp(currentPositions[i * 3],     targetShape[i * 3],     lerpFactor);
      currentPositions[i * 3 + 1] = THREE.MathUtils.lerp(currentPositions[i * 3 + 1], targetShape[i * 3 + 1], lerpFactor);
      currentPositions[i * 3 + 2] = THREE.MathUtils.lerp(currentPositions[i * 3 + 2], targetShape[i * 3 + 2], lerpFactor);
      
      // index inside 4x4 matrix: 12 is x, 13 is y, 14 is z
      matrixArray[i * 16 + 12] = currentPositions[i * 3];
      matrixArray[i * 16 + 13] = currentPositions[i * 3 + 1];
      matrixArray[i * 16 + 14] = currentPositions[i * 3 + 2];
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Initialize identity matrices
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <>
      <AmbientBackground progressRef={progressRef} />
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshPhysicalMaterial 
          color="#D4AF6A" 
          metalness={0.1} 
          roughness={0.15} 
          transmission={0.9} 
          ior={1.5}
          thickness={0.5}
          transparent={true}
          opacity={1}
          envMapIntensity={1.5}
        />
      </instancedMesh>
    </>
  );
}
