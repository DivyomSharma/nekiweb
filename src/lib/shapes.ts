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
// 1: APPLE PHONE — Phone shape with NEKI app (N logo inside)
// ============================================================
export function getPhonePositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const w = 1.2 * scale;
  const h = 2.5 * scale;
  const cr = 0.25 * scale; // corner radius

  const getBorderPoint = (bw: number, bh: number, bcr: number) => {
    let bx = 0, by = 0;
    if (Math.random() < bw / (bw + bh)) {
      bx = (Math.random() - 0.5) * bw;
      by = (Math.random() > 0.5 ? 1 : -1) * bh / 2;
    } else {
      bx = (Math.random() > 0.5 ? 1 : -1) * bw / 2;
      by = (Math.random() - 0.5) * bh;
    }
    const iw = bw - 2 * bcr;
    const ih = bh - 2 * bcr;
    const dx = Math.abs(bx) - iw / 2;
    const dy = Math.abs(by) - ih / 2;
    if (dx > 0 && dy > 0) {
      const dist = Math.sqrt(dx * dx + dy * dy);
      bx = Math.sign(bx) * (iw / 2 + (dx / dist) * bcr);
      by = Math.sign(by) * (ih / 2 + (dy / dist) * bcr);
    }
    return { x: bx, y: by };
  };

  for (let i = 0; i < count; i++) {
    const r = Math.random();
    let x = 0, y = 0, z = 0;

    if (r < 0.25) {
      // Outer Phone Body
      const pt = getBorderPoint(w, h, cr);
      x = pt.x + (Math.random() - 0.5) * 0.02 * scale;
      y = pt.y + (Math.random() - 0.5) * 0.02 * scale;
    } else if (r < 0.45) {
      // Screen Border
      const pt = getBorderPoint(w * 0.9, h * 0.95, cr * 0.8);
      x = pt.x + (Math.random() - 0.5) * 0.02 * scale;
      y = pt.y + (Math.random() - 0.5) * 0.02 * scale;
    } else if (r < 0.5) {
      // Dynamic Island (notch)
      x = (Math.random() - 0.5) * w * 0.35;
      y = h * 0.42 + (Math.random() - 0.5) * 0.04 * scale;
    } else if (r < 0.53) {
      // Home Indicator Line
      x = (Math.random() - 0.5) * w * 0.4;
      y = -h * 0.44 + (Math.random() - 0.5) * 0.01 * scale;
    } else if (r < 0.75) {
      // NEKI App Logo 'N' in the center
      const nScale = 0.45 * scale;
      const stroke = Math.random();
      const t = Math.random();
      const thickness = 0.12 * nScale;

      if (stroke < 0.3) {
        x = -0.6 * nScale + (Math.random() - 0.5) * thickness;
        y = (-0.8 + t * 1.6) * nScale;
      } else if (stroke < 0.6) {
        x = 0.6 * nScale + (Math.random() - 0.5) * thickness;
        y = (-0.8 + t * 1.6) * nScale;
      } else {
        x = -0.6 * nScale + t * 1.2 * nScale + (Math.random() - 0.5) * thickness;
        y = 0.8 * nScale - t * 1.6 * nScale + (Math.random() - 0.5) * thickness;
      }
      x += (Math.random() - 0.5) * 0.01 * scale;
      y += (Math.random() - 0.5) * 0.01 * scale;
    } else {
      // Screen Fill (sparse ambient apps/content)
      x = (Math.random() - 0.5) * w * 0.85;
      y = (Math.random() - 0.5) * h * 0.9;
    }

    // Slightly curved screen/phone surface
    z = (Math.cos(x * 1.5 / scale) + Math.cos(y * 1.5 / scale)) * 0.02 * scale;
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.01 * scale;
  }
  return positions;
}

// ============================================================
// 2: BOWL — Lower hemisphere shell + food contents
// ============================================================
export function getBowlPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.65) {
      // Bowl shell (lower hemisphere, tight surface)
      const shell = radius + (Math.random() - 0.5) * 0.02 * radius;
      let pt;
      do { pt = randomSpherePoint(shell); } while (pt.y > 0.05 * radius);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    } else {
      // Contents (fill the top opening densely, looks like mounded food)
      const angle = Math.random() * Math.PI * 2;
      const ir = Math.sqrt(Math.random()) * radius * 0.95; // fills to the edge
      positions[i * 3] = Math.cos(angle) * ir;
      positions[i * 3 + 1] = 0.05 * radius + Math.random() * 0.12 * radius;
      positions[i * 3 + 2] = Math.sin(angle) * ir;
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
    const xBorder = 16 * Math.pow(Math.sin(t), 3);
    const yBorder = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    
    let x = 0, y = 0, z = 0;

    if (Math.random() < 0.4) {
      // Dense crisp border
      x = xBorder;
      y = yBorder;
      // Slight jitter for a thick line
      x += (Math.random() - 0.5) * 0.8;
      y += (Math.random() - 0.5) * 0.8;
      z = (Math.random() - 0.5) * 1.5;
    } else {
      // Fill: scale towards the visual center of the heart (0, -3) to ensure uniform filling
      const r = Math.sqrt(Math.random());
      x = xBorder * r;
      y = -3 + (yBorder - -3) * r;
      z = (Math.random() - 0.5) * 4.0; // give it some 3D volume
    }

    // Apply global scale (0.1 normalizes the parametric bounds)
    const finalScale = scale * 0.1;
    positions[i * 3] = x * finalScale;
    positions[i * 3 + 1] = y * finalScale;
    positions[i * 3 + 2] = z * finalScale;
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
// 10: TRACKING — Location Pin (Map Marker)
// ============================================================
export function getTrackingPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const R = 1.0 * scale;
  const L = 2.0 * scale;

  for (let i = 0; i < count; i++) {
    const rType = Math.random();
    let x = 0, y = 0, z = 0;

    if (rType < 0.45) {
      // Border and Hole
      const p = Math.random();
      if (p < 0.41) {
        // Top Arc
        const t = -Math.PI / 6 + Math.random() * (4 * Math.PI / 3);
        x = R * Math.cos(t);
        y = R * Math.sin(t);
      } else if (p < 0.58) {
        // Left line
        const t = Math.random();
        const startX = R * Math.cos(7 * Math.PI / 6);
        const startY = R * Math.sin(7 * Math.PI / 6);
        x = startX + t * (0 - startX);
        y = startY + t * (-L - startY);
      } else if (p < 0.75) {
        // Right line
        const t = Math.random();
        const startX = 0;
        const startY = -L;
        const endX = R * Math.cos(-Math.PI / 6);
        const endY = R * Math.sin(-Math.PI / 6);
        x = startX + t * (endX - startX);
        y = startY + t * (endY - startY);
      } else {
        // Inner hole
        const t = Math.random() * Math.PI * 2;
        x = 0.35 * R * Math.cos(t);
        y = 0.35 * R * Math.sin(t);
      }
      // Thick border
      x += (Math.random() - 0.5) * 0.08 * scale;
      y += (Math.random() - 0.5) * 0.08 * scale;
      z += (Math.random() - 0.5) * 0.08 * scale;
    } else {
      // Fill: rejection sampling for the pin body
      while (true) {
        const testX = (Math.random() - 0.5) * 2 * R;
        const testY = -L + Math.random() * (R + L);
        
        // Reject if inside inner hole
        if (testX * testX + testY * testY < (0.35 * R) * (0.35 * R)) {
          continue;
        }
        
        // Accept if inside top circle
        if (testX * testX + testY * testY <= R * R) {
          x = testX;
          y = testY;
          break;
        }
        
        // Accept if inside the bottom cone
        if (testY < -0.5 * R && testY >= -L) {
          const widthAtY = (testY + L) / Math.sqrt(3);
          if (Math.abs(testX) <= widthAtY) {
            x = testX;
            y = testY;
            break;
          }
        }
      }
      z = (Math.random() - 0.5) * 0.3 * scale; // some 3D thickness
    }

    // Center the pin vertically
    y += 0.5 * R;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
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
