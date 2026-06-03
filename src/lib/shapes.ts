export const PARTICLE_COUNT = 15000;

// Helper to get random point on sphere surface
function randomSpherePoint(radius: number) {
  const u = Math.random();
  const v = Math.random();
  const theta = u * 2.0 * Math.PI;
  const phi = Math.acos(2.0 * v - 1.0);
  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.sin(phi) * Math.sin(theta),
    z: radius * Math.cos(phi)
  };
}

// ============================================================
// SECTION 0: HERO — BUTTERFLY
// Parametric butterfly curve filled with dots
// ============================================================
export function getButterflyPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5);
    const inner = Math.sqrt(Math.random());
    const x = Math.sin(t) * r * inner * scale * 0.5;
    const y = Math.cos(t) * r * inner * scale * 0.5;
    positions[i * 3] = x + (Math.random() - 0.5) * 0.08 * scale;
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.08 * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15 * scale;
  }
  return positions;
}

// ============================================================
// SECTION 1: TRUST PROBLEM — ROUTE (Point A → Point B)
// A beautiful glowing sine-wave route with dense endpoints
// ============================================================
export function getRoutePositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.15) {
      // Dense sphere at Point A
      const pt = randomSpherePoint(0.35 * scale);
      positions[i * 3] = pt.x - 2.5 * scale;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.30) {
      // Dense sphere at Point B
      const pt = randomSpherePoint(0.35 * scale);
      positions[i * 3] = pt.x + 2.5 * scale;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else {
      // Route line between A and B
      const t = Math.random();
      const x = -2.5 * scale + t * 5.0 * scale;
      const y = Math.sin(t * Math.PI * 2) * scale * 0.6;
      const z = Math.cos(t * Math.PI) * scale * 0.3;
      const noise = (Math.random() - 0.5) * 0.12 * scale;
      positions[i * 3] = x + noise;
      positions[i * 3 + 1] = y + noise;
      positions[i * 3 + 2] = z + noise;
    }
  }
  return positions;
}

// ============================================================
// SECTION 2: FOOD — BOWL
// Lower hemisphere with contents (rice grains) inside + floating utensils
// ============================================================
export function getBowlPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.6) {
      // Bowl shell (lower hemisphere surface)
      const shell = radius + (Math.random() - 0.5) * 0.08 * radius;
      let pt;
      do { pt = randomSpherePoint(shell); } while (pt.y > 0.1 * radius);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.85) {
      // Contents inside bowl (fills the top opening)
      const angle = Math.random() * Math.PI * 2;
      const ir = Math.sqrt(Math.random()) * radius * 0.85;
      positions[i * 3] = Math.cos(angle) * ir;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2 * radius + 0.1 * radius;
      positions[i * 3 + 2] = Math.sin(angle) * ir;
    } else if (r < 0.92) {
      // Floating fork (vertical line + prongs)
      const t = Math.random();
      positions[i * 3] = radius * 1.3 + (Math.random() - 0.5) * 0.05 * radius;
      positions[i * 3 + 1] = -radius * 0.5 + t * radius * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15 * radius;
    } else {
      // Floating spoon (small oval)
      const angle = Math.random() * Math.PI * 2;
      const sr = Math.random() * 0.2 * radius;
      positions[i * 3] = -radius * 1.3 + Math.cos(angle) * sr;
      positions[i * 3 + 1] = radius * 0.3 + Math.sin(angle) * sr * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05 * radius;
    }
  }
  return positions;
}

// ============================================================
// SECTION 3: EDUCATION — BOOK
// Open book with two page planes and a spine, particles emerging
// ============================================================
export function getBookPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.45) {
      // Left page
      const x = Math.random() * 2;
      const z = (Math.random() - 0.5) * 3;
      const y = -Math.exp(-x * 2) * 0.5 + Math.sin(x * 1.5) * 0.3;
      const thickness = Math.random() * 0.15;
      positions[i * 3] = -x;
      positions[i * 3 + 1] = y - thickness;
      positions[i * 3 + 2] = z;
    } else if (r < 0.9) {
      // Right page
      const x = Math.random() * 2;
      const z = (Math.random() - 0.5) * 3;
      const y = -Math.exp(-x * 2) * 0.5 + Math.sin(x * 1.5) * 0.3;
      const thickness = Math.random() * 0.15;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y - thickness;
      positions[i * 3 + 2] = z;
    } else {
      // Tiny glowing particles emerging upward from pages (knowledge spreading)
      const x = (Math.random() - 0.5) * 2;
      const y = 0.5 + Math.random() * 2.0;
      const z = (Math.random() - 0.5) * 2;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
  }
  return positions;
}

// ============================================================
// SECTION 4: HEALTHCARE — CROSS
// Large bold medical cross
// ============================================================
export function getCrossPositions(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const thickness = size * 0.35;
  for (let i = 0; i < count; i++) {
    const isVertical = Math.random() > 0.5;
    if (isVertical) {
      positions[i * 3] = (Math.random() - 0.5) * thickness;
      positions[i * 3 + 1] = (Math.random() - 0.5) * size;
      positions[i * 3 + 2] = (Math.random() - 0.5) * thickness * 0.3;
    } else {
      positions[i * 3] = (Math.random() - 0.5) * size;
      positions[i * 3 + 1] = (Math.random() - 0.5) * thickness;
      positions[i * 3 + 2] = (Math.random() - 0.5) * thickness * 0.3;
    }
  }
  return positions;
}

// ============================================================
// SECTION 5: TIME & PRESENCE — HEART
// 3D heart parametric equation
// ============================================================
export function getHeartPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const r = Math.sqrt(Math.random());
    const finalScale = scale * 0.1 * r;
    positions[i * 3] = x * finalScale + (Math.random() - 0.5) * 0.15 * scale;
    positions[i * 3 + 1] = y * finalScale + (Math.random() - 0.5) * 0.15 * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5 * scale;
  }
  return positions;
}

// ============================================================
// SECTION 6: SKILLS — COGWHEEL
// Torus with teeth protruding at intervals
// ============================================================
export function getGearPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const numTeeth = 10;
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.3) {
      // Inner hub
      const pt = randomSpherePoint(radius * 0.3);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z * 0.3;
    } else {
      // Outer ring with teeth
      const angle = Math.random() * Math.PI * 2;
      const toothAngle = (angle % (Math.PI * 2 / numTeeth)) / (Math.PI * 2 / numTeeth);
      let outerR = radius;
      if (toothAngle > 0.25 && toothAngle < 0.75) {
        outerR = radius * 1.35; // Tooth extends outward
      }
      const radialNoise = (Math.random() - 0.5) * 0.15 * radius;
      const finalR = outerR + radialNoise;
      positions[i * 3] = Math.cos(angle) * finalR;
      positions[i * 3 + 1] = Math.sin(angle) * finalR;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
  }
  return positions;
}

// ============================================================
// SECTION 7: CONNECTION — TWO NODES
// Two dense spheres connected by one elegant line
// ============================================================
export function getConnectionPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.3) {
      // Node 1 (left)
      const pt = randomSpherePoint(0.5 * scale);
      positions[i * 3] = pt.x - 2.0 * scale;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.6) {
      // Node 2 (right)
      const pt = randomSpherePoint(0.5 * scale);
      positions[i * 3] = pt.x + 2.0 * scale;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else {
      // Connecting line
      const t = Math.random();
      const x = -2.0 * scale + t * 4.0 * scale;
      const taper = Math.pow(Math.abs(t - 0.5) * 2, 2) * 0.12 + 0.03;
      positions[i * 3] = x + (Math.random() - 0.5) * taper * scale;
      positions[i * 3 + 1] = (Math.random() - 0.5) * taper * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * taper * scale;
    }
  }
  return positions;
}

// ============================================================
// SECTION 8: NETWORK — LIVING NETWORK GRAPH
// 50+ node clusters connected by lines, organic not geometric
// ============================================================
export function getNetworkPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  // Generate stable node positions
  const nodes: { x: number; y: number; z: number }[] = [];
  const rng = seedRandom(42);
  for (let j = 0; j < 25; j++) {
    nodes.push({
      x: (rng() - 0.5) * 6 * scale,
      y: (rng() - 0.5) * 6 * scale,
      z: (rng() - 0.5) * 3 * scale
    });
  }
  for (let i = 0; i < count; i++) {
    const isLine = Math.random() > 0.35;
    if (isLine) {
      const n1 = nodes[Math.floor(Math.random() * nodes.length)];
      const n2 = nodes[Math.floor(Math.random() * nodes.length)];
      const t = Math.random();
      positions[i * 3] = n1.x + (n2.x - n1.x) * t;
      positions[i * 3 + 1] = n1.y + (n2.y - n1.y) * t;
      positions[i * 3 + 2] = n1.z + (n2.z - n1.z) * t;
    } else {
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      const pt = randomSpherePoint(Math.random() * 0.4 * scale);
      positions[i * 3] = n.x + pt.x;
      positions[i * 3 + 1] = n.y + pt.y;
      positions[i * 3 + 2] = n.z + pt.z;
    }
  }
  return positions;
}

// ============================================================
// SECTION 9: MISSION CREATION — ECOSYSTEM
// Central sphere with orbiting smaller objects (solar system)
// ============================================================
export function getMissionEcoPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const orbitCount = 7;
  const orbitRadii = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5];
  const orbitAngles = [0, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4]; // Starting angles

  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.25) {
      // Central sphere
      const pt = randomSpherePoint(0.6 * scale);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.5) {
      // Orbit rings (thin tori)
      const orbitIdx = Math.floor(Math.random() * orbitCount);
      const angle = Math.random() * Math.PI * 2;
      const orbitR = orbitRadii[orbitIdx] * scale * 0.5;
      positions[i * 3] = Math.cos(angle) * orbitR;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.05 * scale;
      positions[i * 3 + 2] = Math.sin(angle) * orbitR;
    } else {
      // Orbiting objects (small dense clusters at specific orbit positions)
      const orbitIdx = Math.floor(Math.random() * orbitCount);
      const orbitR = orbitRadii[orbitIdx] * scale * 0.5;
      const baseAngle = orbitAngles[orbitIdx];
      const pt = randomSpherePoint(0.2 * scale);
      positions[i * 3] = Math.cos(baseAngle) * orbitR + pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = Math.sin(baseAngle) * orbitR + pt.z;
    }
  }
  return positions;
}

// ============================================================
// SECTION 10: TRACKING — 3D PATH WITH MOVING PACKAGE
// Path with status nodes that light up
// ============================================================
export function getTrackingPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const nodePositions = [
    { x: -2.5, y: 0 },
    { x: -0.8, y: 0.5 },
    { x: 0.8, y: -0.3 },
    { x: 2.5, y: 0.2 }
  ];

  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.3) {
      // Status nodes (dense spheres at each point)
      const node = nodePositions[Math.floor(Math.random() * nodePositions.length)];
      const pt = randomSpherePoint(0.3 * scale);
      positions[i * 3] = node.x * scale + pt.x;
      positions[i * 3 + 1] = node.y * scale + pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.6) {
      // Connecting path between nodes
      const segIdx = Math.floor(Math.random() * (nodePositions.length - 1));
      const t = Math.random();
      const n1 = nodePositions[segIdx];
      const n2 = nodePositions[segIdx + 1];
      const x = n1.x + (n2.x - n1.x) * t;
      const y = n1.y + (n2.y - n1.y) * t + Math.sin(t * Math.PI) * 0.3;
      positions[i * 3] = x * scale + (Math.random() - 0.5) * 0.08 * scale;
      positions[i * 3 + 1] = y * scale + (Math.random() - 0.5) * 0.08 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.08 * scale;
    } else {
      // Moving package (small box outline near midpoint)
      const bx = (Math.random() - 0.5) * 0.6 * scale;
      const by = (Math.random() - 0.5) * 0.6 * scale;
      const bz = (Math.random() - 0.5) * 0.6 * scale;
      // Box edges
      const edge = Math.floor(Math.random() * 12);
      const t = Math.random();
      const hw = 0.3 * scale;
      let px = 0, py = 0, pz = 0;
      if (edge < 4) { px = (edge % 2 === 0 ? hw : -hw); py = (edge < 2 ? hw : -hw); pz = (t * 2 - 1) * hw; }
      else if (edge < 8) { px = (edge % 2 === 0 ? hw : -hw); py = (t * 2 - 1) * hw; pz = (edge < 6 ? hw : -hw); }
      else { px = (t * 2 - 1) * hw; py = (edge % 2 === 0 ? hw : -hw); pz = (edge < 10 ? hw : -hw); }
      positions[i * 3] = px + 0.0 * scale;
      positions[i * 3 + 1] = py + 0.8 * scale;
      positions[i * 3 + 2] = pz;
    }
  }
  return positions;
}

// ============================================================
// SECTION 11: TRUST — SHIELD
// Shield / badge shape
// ============================================================
export function getShieldPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Shield outline: top is flat, sides curve inward, bottom comes to a point
    const t = Math.random() * Math.PI * 2;
    const r = Math.random();

    let x: number, y: number;

    if (r < 0.7) {
      // Shield boundary
      const angle = Math.random() * Math.PI * 2;
      // Parametric shield: top half is rounded rectangle, bottom is triangle
      if (angle < Math.PI) {
        // Top half (rounded rectangle)
        x = Math.cos(angle) * scale;
        y = Math.abs(Math.sin(angle)) * scale * 0.6 + scale * 0.2;
      } else {
        // Bottom half (converging to point)
        const bt = (angle - Math.PI) / Math.PI; // 0 to 1
        const side = bt < 0.5 ? -1 : 1;
        const progress = bt < 0.5 ? bt * 2 : (1 - bt) * 2;
        x = side * (1 - progress) * scale;
        y = -progress * scale;
      }
    } else {
      // Fill interior
      x = (Math.random() - 0.5) * 1.8 * scale;
      y = (Math.random() - 0.5) * 1.8 * scale;
      // Clip to shield shape
      const maxWidth = y > 0 ? scale : Math.max(0, scale * (1 - Math.abs(y) / scale));
      if (Math.abs(x) > maxWidth) x = Math.sign(x) * maxWidth * Math.random();
    }

    // Add checkmark in center
    if (Math.random() < 0.15) {
      const ct = Math.random();
      if (ct < 0.5) {
        x = -0.3 * scale + ct * 0.6 * scale;
        y = 0.1 * scale - ct * 0.4 * scale;
      } else {
        x = ct * 0.8 * scale;
        y = -0.1 * scale + (ct - 0.5) * 1.0 * scale;
      }
    }

    positions[i * 3] = x + (Math.random() - 0.5) * 0.08 * scale;
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.08 * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3 * scale;
  }
  return positions;
}

// ============================================================
// SECTION 12: PROOF OF IMPACT — CAMERA FRAME
// Rectangle frame with floating image cards orbiting
// ============================================================
export function getCameraFramePositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.5) {
      // Main frame outline
      const edge = Math.floor(Math.random() * 4);
      let x: number, y: number;
      if (edge === 0) { x = (Math.random() - 0.5) * 2; y = 1; }
      else if (edge === 1) { x = (Math.random() - 0.5) * 2; y = -1; }
      else if (edge === 2) { x = 1; y = (Math.random() - 0.5) * 2; }
      else { x = -1; y = (Math.random() - 0.5) * 2; }
      positions[i * 3] = x * scale + (Math.random() - 0.5) * 0.06 * scale;
      positions[i * 3 + 1] = y * scale + (Math.random() - 0.5) * 0.06 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.06 * scale;
    } else if (r < 0.75) {
      // Lens circle in center
      const angle = Math.random() * Math.PI * 2;
      const lr = (0.3 + Math.random() * 0.1) * scale;
      positions[i * 3] = Math.cos(angle) * lr;
      positions[i * 3 + 1] = Math.sin(angle) * lr;
      positions[i * 3 + 2] = 0.1 * scale;
    } else {
      // Floating image card tiles orbiting
      const cardIdx = Math.floor(Math.random() * 4);
      const cardAngle = (cardIdx / 4) * Math.PI * 2 + Math.PI / 4;
      const cardDist = 2.0 * scale;
      const cx = Math.cos(cardAngle) * cardDist;
      const cy = Math.sin(cardAngle) * cardDist;
      // Small rectangle
      positions[i * 3] = cx + (Math.random() - 0.5) * 0.5 * scale;
      positions[i * 3 + 1] = cy + (Math.random() - 0.5) * 0.35 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05 * scale;
    }
  }
  return positions;
}

// ============================================================
// SECTION 13: MULTIPLIER — 1 → 1000
// A single dense node that fans out into many smaller nodes
// ============================================================
export function getMultiplierPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  // Seed node positions for reproducibility
  const rng = seedRandom(99);
  const childNodes: { x: number; y: number; z: number }[] = [];
  for (let j = 0; j < 30; j++) {
    const angle = rng() * Math.PI * 2;
    const dist = 1.5 + rng() * 2.5;
    const elevation = (rng() - 0.5) * 2;
    childNodes.push({
      x: Math.cos(angle) * dist * scale,
      y: elevation * scale,
      z: Math.sin(angle) * dist * scale
    });
  }

  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.15) {
      // Origin node (dense)
      const pt = randomSpherePoint(0.4 * scale);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.5) {
      // Expansion lines from origin to children
      const child = childNodes[Math.floor(Math.random() * childNodes.length)];
      const t = Math.random();
      positions[i * 3] = child.x * t;
      positions[i * 3 + 1] = child.y * t;
      positions[i * 3 + 2] = child.z * t;
    } else {
      // Child node clusters
      const child = childNodes[Math.floor(Math.random() * childNodes.length)];
      const pt = randomSpherePoint(0.2 * scale);
      positions[i * 3] = child.x + pt.x;
      positions[i * 3 + 1] = child.y + pt.y;
      positions[i * 3 + 2] = child.z + pt.z;
    }
  }
  return positions;
}

// ============================================================
// SECTION 14: INDIA NETWORK
// Abstract map shape made of node clusters
// ============================================================
export function getIndiaNetworkPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    // Simplified India-shaped bounding region (diamond-ish with wider top)
    let tries = 0;
    do {
      x = (Math.random() - 0.5) * 2;
      y = (Math.random() - 0.5) * 2;
      tries++;
      if (tries > 50) break;
      // Top region (wider)
      if (y > 0.3 && Math.abs(x) < (1 - y * 0.5) * 0.8) break;
      // Middle region
      if (y >= -0.2 && y <= 0.3 && Math.abs(x) < 0.7) break;
      // South (tapers to point)
      if (y < -0.2 && Math.abs(x) < (1 + y) * 0.6) break;
    } while (true);

    positions[i * 3] = x * scale;
    positions[i * 3 + 1] = y * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1 * scale;
  }
  return positions;
}

// ============================================================
// SECTION 15: FINAL REVEAL — NEKI LOGO (Geometric N)
// ============================================================
export function getNekiLogoPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const stroke = Math.random();
    const t = Math.random();
    const noise = 0.05 * scale;
    let x = 0, y = 0, z = (Math.random() - 0.5) * noise;

    if (stroke < 0.33) {
      // Left vertical stroke
      x = -0.5 * scale + (Math.random() - 0.5) * noise;
      y = -0.5 * scale + t * 1.0 * scale;
      if (Math.random() < 0.15 && t < 0.15) {
        x += (Math.random() - 0.5) * noise * 2;
        y += (Math.random() - 0.5) * noise * 2;
        z += (Math.random() - 0.5) * noise * 2;
      }
    } else if (stroke < 0.66) {
      // Diagonal stroke
      x = -0.5 * scale + t * 1.0 * scale;
      y = 0.5 * scale - t * 1.0 * scale;
    } else {
      // Right vertical stroke
      x = 0.5 * scale + (Math.random() - 0.5) * noise;
      y = -0.5 * scale + t * 1.0 * scale;
    }

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

// ============================================================
// UTILITY: Chaos positions (ambient background)
// ============================================================
export function getChaosPositions(count: number, spread: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  return positions;
}

// ============================================================
// Simple seedable PRNG for reproducible node positions
// ============================================================
function seedRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}
