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

// Simple seedable PRNG for reproducible node positions
function seedRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

// ============================================================
// 0: BUTTERFLY — Parametric curve, tightly filled
// ============================================================
export function getButterflyPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    // Simple polar butterfly: r = e^sin(t) - 2cos(4t)
    // This gives a clean 4-wing shape
    const r = (Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t)) * 0.35;
    const fill = 0.6 + Math.random() * 0.4; // mostly near boundary
    const x = Math.sin(t) * r * fill * scale;
    const y = Math.cos(t) * r * fill * scale;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.04 * scale;
  }
  return positions;
}

// ============================================================
// 1: ROUTE — Point A → Point B with dense endpoints
// ============================================================
export function getRoutePositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.18) {
      // Dense sphere at Point A
      const pt = randomSpherePoint(0.4 * scale);
      positions[i * 3] = pt.x - 2.5 * scale;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.36) {
      // Dense sphere at Point B
      const pt = randomSpherePoint(0.4 * scale);
      positions[i * 3] = pt.x + 2.5 * scale;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else {
      // Route line
      const t = Math.random();
      const x = -2.5 * scale + t * 5.0 * scale;
      const y = Math.sin(t * Math.PI * 2) * scale * 0.6;
      const z = Math.cos(t * Math.PI) * scale * 0.2;
      const noise = (Math.random() - 0.5) * 0.06 * scale;
      positions[i * 3] = x + noise;
      positions[i * 3 + 1] = y + noise;
      positions[i * 3 + 2] = z + noise;
    }
  }
  return positions;
}

// ============================================================
// 2: BOWL — Lower hemisphere shell + food contents + utensils
// ============================================================
export function getBowlPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.55) {
      // Bowl shell (lower hemisphere, tight surface)
      const shell = radius + (Math.random() - 0.5) * 0.04 * radius;
      let pt;
      do { pt = randomSpherePoint(shell); } while (pt.y > 0.05 * radius);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.85) {
      // Contents (fill the top opening densely)
      const angle = Math.random() * Math.PI * 2;
      const ir = Math.sqrt(Math.random()) * radius * 0.8;
      positions[i * 3] = Math.cos(angle) * ir;
      positions[i * 3 + 1] = (Math.random()) * 0.15 * radius;
      positions[i * 3 + 2] = Math.sin(angle) * ir;
    } else if (r < 0.92) {
      // Fork (vertical line offset right)
      const t = Math.random();
      positions[i * 3] = radius * 1.2 + (Math.random() - 0.5) * 0.03 * radius;
      positions[i * 3 + 1] = -radius * 0.4 + t * radius * 1.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.03 * radius;
    } else {
      // Spoon (small oval offset left)
      const angle = Math.random() * Math.PI * 2;
      const sr = Math.random() * 0.18 * radius;
      positions[i * 3] = -radius * 1.2 + Math.cos(angle) * sr;
      positions[i * 3 + 1] = radius * 0.3 + Math.sin(angle) * sr * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.03 * radius;
    }
  }
  return positions;
}

// ============================================================
// 3: BOOK — Open book V-shape + knowledge particles
// ============================================================
export function getBookPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.45) {
      // Left page
      const x = Math.random() * 2.2;
      const z = (Math.random() - 0.5) * 3;
      const y = -Math.exp(-x * 2) * 0.4 + Math.sin(x * 1.5) * 0.25;
      positions[i * 3] = -x;
      positions[i * 3 + 1] = y - Math.random() * 0.08;
      positions[i * 3 + 2] = z;
    } else if (r < 0.9) {
      // Right page
      const x = Math.random() * 2.2;
      const z = (Math.random() - 0.5) * 3;
      const y = -Math.exp(-x * 2) * 0.4 + Math.sin(x * 1.5) * 0.25;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y - Math.random() * 0.08;
      positions[i * 3 + 2] = z;
    } else {
      // Knowledge particles rising from pages
      const x = (Math.random() - 0.5) * 1.5;
      const y = 0.4 + Math.random() * 2.5;
      const z = (Math.random() - 0.5) * 1.5;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
  }
  return positions;
}

// ============================================================
// 4: CROSS — Bold medical cross, tight fill
// ============================================================
export function getCrossPositions(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const thickness = size * 0.3;
  for (let i = 0; i < count; i++) {
    const isVertical = Math.random() > 0.5;
    if (isVertical) {
      positions[i * 3] = (Math.random() - 0.5) * thickness;
      positions[i * 3 + 1] = (Math.random() - 0.5) * size;
      positions[i * 3 + 2] = (Math.random() - 0.5) * thickness * 0.2;
    } else {
      positions[i * 3] = (Math.random() - 0.5) * size;
      positions[i * 3 + 1] = (Math.random() - 0.5) * thickness;
      positions[i * 3 + 2] = (Math.random() - 0.5) * thickness * 0.2;
    }
  }
  return positions;
}

// ============================================================
// 5: HEART — Cardioid parametric, dense fill
// ============================================================
export function getHeartPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const r = Math.sqrt(Math.random());
    const finalScale = scale * 0.1 * r;
    positions[i * 3] = x * finalScale + (Math.random() - 0.5) * 0.06 * scale;
    positions[i * 3 + 1] = y * finalScale + (Math.random() - 0.5) * 0.06 * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3 * scale;
  }
  return positions;
}

// ============================================================
// 6: COGWHEEL — Ring with teeth + inner hub, tightly packed
// ============================================================
export function getGearPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const numTeeth = 10;
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.2) {
      // Inner hub (dense disc)
      const angle = Math.random() * Math.PI * 2;
      const hubR = Math.sqrt(Math.random()) * radius * 0.35;
      positions[i * 3] = Math.cos(angle) * hubR;
      positions[i * 3 + 1] = Math.sin(angle) * hubR;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    } else {
      // Ring with teeth
      const angle = Math.random() * Math.PI * 2;
      const toothPhase = (angle % (Math.PI * 2 / numTeeth)) / (Math.PI * 2 / numTeeth);
      let outerR = radius * 0.85 + Math.random() * radius * 0.15;
      if (toothPhase > 0.2 && toothPhase < 0.8) {
        outerR = radius * 1.25 + Math.random() * radius * 0.1; // Tooth
      }
      positions[i * 3] = Math.cos(angle) * outerR;
      positions[i * 3 + 1] = Math.sin(angle) * outerR;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
    }
  }
  return positions;
}

// ============================================================
// 7: TWO NODES — Two dense spheres connected by one line
// ============================================================
export function getConnectionPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.35) {
      // Node 1 (left)
      const pt = randomSpherePoint(0.55 * scale);
      positions[i * 3] = pt.x - 2.0 * scale;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.70) {
      // Node 2 (right)
      const pt = randomSpherePoint(0.55 * scale);
      positions[i * 3] = pt.x + 2.0 * scale;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else {
      // Connecting line (thin)
      const t = Math.random();
      const x = -2.0 * scale + t * 4.0 * scale;
      const taper = 0.04;
      positions[i * 3] = x + (Math.random() - 0.5) * taper * scale;
      positions[i * 3 + 1] = (Math.random() - 0.5) * taper * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * taper * scale;
    }
  }
  return positions;
}

// ============================================================
// 8: NETWORK — Living network graph with 25 clusters
// ============================================================
export function getNetworkPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const nodes: { x: number; y: number; z: number }[] = [];
  const rng = seedRandom(42);
  for (let j = 0; j < 25; j++) {
    nodes.push({
      x: (rng() - 0.5) * 6 * scale,
      y: (rng() - 0.5) * 5 * scale,
      z: (rng() - 0.5) * 2 * scale
    });
  }
  for (let i = 0; i < count; i++) {
    const isLine = Math.random() > 0.4;
    if (isLine) {
      const n1 = nodes[Math.floor(Math.random() * nodes.length)];
      const n2 = nodes[Math.floor(Math.random() * nodes.length)];
      const t = Math.random();
      positions[i * 3] = n1.x + (n2.x - n1.x) * t;
      positions[i * 3 + 1] = n1.y + (n2.y - n1.y) * t;
      positions[i * 3 + 2] = n1.z + (n2.z - n1.z) * t;
    } else {
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      const pt = randomSpherePoint(Math.random() * 0.35 * scale);
      positions[i * 3] = n.x + pt.x;
      positions[i * 3 + 1] = n.y + pt.y;
      positions[i * 3 + 2] = n.z + pt.z;
    }
  }
  return positions;
}

// ============================================================
// 9: MISSION ECOSYSTEM — Central sphere + orbit rings + orbiters
// ============================================================
export function getMissionEcoPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const orbitRadii = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5];
  const orbitAngles = [0, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4];

  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.25) {
      // Central sphere (dense)
      const pt = randomSpherePoint(Math.cbrt(Math.random()) * 0.6 * scale);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.5) {
      // Orbit rings
      const orbitIdx = Math.floor(Math.random() * 7);
      const angle = Math.random() * Math.PI * 2;
      const orbitR = orbitRadii[orbitIdx] * scale * 0.5;
      positions[i * 3] = Math.cos(angle) * orbitR;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.02 * scale;
      positions[i * 3 + 2] = Math.sin(angle) * orbitR;
    } else {
      // Orbiting objects (small dense clusters)
      const orbitIdx = Math.floor(Math.random() * 7);
      const orbitR = orbitRadii[orbitIdx] * scale * 0.5;
      const baseAngle = orbitAngles[orbitIdx];
      const pt = randomSpherePoint(0.18 * scale);
      positions[i * 3] = Math.cos(baseAngle) * orbitR + pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = Math.sin(baseAngle) * orbitR + pt.z;
    }
  }
  return positions;
}

// ============================================================
// 10: TRACKING — Path with status nodes + floating box
// ============================================================
export function getTrackingPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const nodePos = [
    { x: -2.5, y: 0 },
    { x: -0.8, y: 0.6 },
    { x: 0.8, y: -0.3 },
    { x: 2.5, y: 0.3 }
  ];

  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.35) {
      // Status nodes (dense spheres)
      const node = nodePos[Math.floor(Math.random() * nodePos.length)];
      const pt = randomSpherePoint(0.3 * scale);
      positions[i * 3] = node.x * scale + pt.x;
      positions[i * 3 + 1] = node.y * scale + pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.65) {
      // Connecting paths
      const segIdx = Math.floor(Math.random() * (nodePos.length - 1));
      const t = Math.random();
      const n1 = nodePos[segIdx];
      const n2 = nodePos[segIdx + 1];
      const x = n1.x + (n2.x - n1.x) * t;
      const y = n1.y + (n2.y - n1.y) * t + Math.sin(t * Math.PI) * 0.25;
      positions[i * 3] = x * scale + (Math.random() - 0.5) * 0.04 * scale;
      positions[i * 3 + 1] = y * scale + (Math.random() - 0.5) * 0.04 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.04 * scale;
    } else {
      // Floating box (package) near middle-top
      const hw = 0.35 * scale;
      const edge = Math.floor(Math.random() * 12);
      const t = Math.random();
      let px = 0, py = 0, pz = 0;
      if (edge < 4) { px = (edge % 2 === 0 ? hw : -hw); py = (edge < 2 ? hw : -hw); pz = (t * 2 - 1) * hw; }
      else if (edge < 8) { px = (edge % 2 === 0 ? hw : -hw); py = (t * 2 - 1) * hw; pz = (edge < 6 ? hw : -hw); }
      else { px = (t * 2 - 1) * hw; py = (edge % 2 === 0 ? hw : -hw); pz = (edge < 10 ? hw : -hw); }
      positions[i * 3] = px;
      positions[i * 3 + 1] = py + 1.0 * scale;
      positions[i * 3 + 2] = pz;
    }
  }
  return positions;
}

// ============================================================
// 11: SHIELD — Shield shape with checkmark
// ============================================================
export function getShieldPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Simple shield: flat top, straight sides tapering to a point at bottom
    // Generate random y from -1 to 0.6
    const ny = -1 + Math.random() * 1.6; // -1 to 0.6
    // Width narrows linearly from top to bottom
    let maxW: number;
    if (ny > 0) {
      maxW = 1.0; // flat top
    } else {
      maxW = 1.0 + ny; // tapers: at ny=-1 width=0, at ny=0 width=1
    }
    maxW = Math.max(maxW, 0);

    const r = Math.random();
    let x: number, y: number;
    if (r < 0.35) {
      // Boundary outline
      const side = Math.random() > 0.5 ? 1 : -1;
      x = side * maxW * scale;
      y = ny * scale;
    } else {
      // Fill interior
      x = (Math.random() - 0.5) * 2 * maxW * scale;
      y = ny * scale;
    }

    positions[i * 3] = x + (Math.random() - 0.5) * 0.02 * scale;
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.02 * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1 * scale;
  }
  return positions;
}

// ============================================================
// 12: CAMERA FRAME — Rectangle outline + lens + floating tiles
// ============================================================
export function getCameraFramePositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.45) {
      // Main frame outline (thick)
      const edge = Math.floor(Math.random() * 4);
      let x: number, y: number;
      if (edge === 0) { x = (Math.random() - 0.5) * 2; y = 1; }
      else if (edge === 1) { x = (Math.random() - 0.5) * 2; y = -1; }
      else if (edge === 2) { x = 1; y = (Math.random() - 0.5) * 2; }
      else { x = -1; y = (Math.random() - 0.5) * 2; }
      positions[i * 3] = x * scale + (Math.random() - 0.5) * 0.04 * scale;
      positions[i * 3 + 1] = y * scale + (Math.random() - 0.5) * 0.04 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.04 * scale;
    } else if (r < 0.7) {
      // Lens circle in center
      const angle = Math.random() * Math.PI * 2;
      const lr = (0.25 + Math.random() * 0.08) * scale;
      positions[i * 3] = Math.cos(angle) * lr;
      positions[i * 3 + 1] = Math.sin(angle) * lr;
      positions[i * 3 + 2] = 0.05 * scale;
    } else {
      // Floating image tiles orbiting
      const cardIdx = Math.floor(Math.random() * 4);
      const cardAngle = (cardIdx / 4) * Math.PI * 2 + Math.PI / 4;
      const cardDist = 1.8 * scale;
      const cx = Math.cos(cardAngle) * cardDist;
      const cy = Math.sin(cardAngle) * cardDist;
      positions[i * 3] = cx + (Math.random() - 0.5) * 0.45 * scale;
      positions[i * 3 + 1] = cy + (Math.random() - 0.5) * 0.3 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.03 * scale;
    }
  }
  return positions;
}

// ============================================================
// 13: MULTIPLIER — Central node exploding into 30 child nodes
// ============================================================
export function getMultiplierPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
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
    if (r < 0.18) {
      // Origin node (dense)
      const pt = randomSpherePoint(Math.cbrt(Math.random()) * 0.45 * scale);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else if (r < 0.45) {
      // Expansion lines
      const child = childNodes[Math.floor(Math.random() * childNodes.length)];
      const t = Math.random();
      positions[i * 3] = child.x * t + (Math.random() - 0.5) * 0.02 * scale;
      positions[i * 3 + 1] = child.y * t + (Math.random() - 0.5) * 0.02 * scale;
      positions[i * 3 + 2] = child.z * t + (Math.random() - 0.5) * 0.02 * scale;
    } else {
      // Child clusters
      const child = childNodes[Math.floor(Math.random() * childNodes.length)];
      const pt = randomSpherePoint(0.15 * scale);
      positions[i * 3] = child.x + pt.x;
      positions[i * 3 + 1] = child.y + pt.y;
      positions[i * 3 + 2] = child.z + pt.z;
    }
  }
  return positions;
}

// ============================================================
// 14: INDIA NETWORK — Points constrained to India bounding shape
// ============================================================
export function getIndiaNetworkPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    let tries = 0;
    do {
      x = (Math.random() - 0.5) * 2;
      y = (Math.random() - 0.5) * 2;
      tries++;
      if (tries > 50) break;
      if (y > 0.3 && Math.abs(x) < (1 - y * 0.5) * 0.8) break;
      if (y >= -0.2 && y <= 0.3 && Math.abs(x) < 0.7) break;
      if (y < -0.2 && Math.abs(x) < (1 + y) * 0.6) break;
    } while (true);
    positions[i * 3] = x * scale;
    positions[i * 3 + 1] = y * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05 * scale;
  }
  return positions;
}

// ============================================================
// 15: NEKI LOGO — Geometric N
// ============================================================
export function getNekiLogoPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const thickness = 0.12 * scale; // thick strokes for clear N
  for (let i = 0; i < count; i++) {
    const stroke = Math.random();
    const t = Math.random();
    let x = 0, y = 0;

    if (stroke < 0.3) {
      // Left vertical bar of N
      x = -0.6 * scale + (Math.random() - 0.5) * thickness;
      y = (-0.8 + t * 1.6) * scale;
    } else if (stroke < 0.6) {
      // Right vertical bar of N
      x = 0.6 * scale + (Math.random() - 0.5) * thickness;
      y = (-0.8 + t * 1.6) * scale;
    } else {
      // Diagonal connecting bar (top-left to bottom-right)
      x = -0.6 * scale + t * 1.2 * scale + (Math.random() - 0.5) * thickness;
      y = 0.8 * scale - t * 1.6 * scale + (Math.random() - 0.5) * thickness;
    }

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.03 * scale;
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
