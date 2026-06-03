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
// 0: HERO LOGO — Custom Calligraphy (N + Butterfly Wings)
// ============================================================
export function getHeroLogoPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  
  // Helper for cubic bezier
  const getBezierPoint = (t: number, p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number) => {
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    const t2 = t * t;
    const t3 = t2 * t;
    return {
      x: mt3 * p0x + 3 * mt2 * t * p1x + 3 * mt * t2 * p2x + t3 * p3x,
      y: mt3 * p0y + 3 * mt2 * t * p1y + 3 * mt * t2 * p2y + t3 * p3y
    };
  };

  // Helper for bezier tangent (derivative) -> normalized perpendicular normal
  const getBezierTangent = (t: number, p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number) => {
    const mt = 1 - t;
    const dx = 3 * mt * mt * (p1x - p0x) + 6 * mt * t * (p2x - p1x) + 3 * t * t * (p3x - p2x);
    const dy = 3 * mt * mt * (p1y - p0y) + 6 * mt * t * (p2y - p1y) + 3 * t * t * (p3y - p2y);
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return { nx: 0, ny: 1 };
    return { nx: -dy / len, ny: dx / len };
  };

  const ribbons = [
    // Main Diagonal
    [0.2, -0.6,  0.0, -0.2,  -0.1, 0.1,  -0.25, 0.35,  0.02, 0.02, 0.15],
    // Right Arm Lower
    [0.2, -0.6,  0.4, -0.2,  0.6, 0.1,  0.8, 0.2,  0.02, 0.01, 0.04],
    // Right Arm Upper
    [-0.05, 0.0,  0.2, 0.05,  0.5, 0.1,  0.8, 0.2,  0.02, 0.01, 0.02],
    // Lower Left Wing Bottom
    [-0.1, -0.1,  -0.3, -0.3,  -0.5, -0.5,  -0.7, -0.6,  0.05, 0.01, 0.05],
    // Lower Left Wing Top
    [-0.7, -0.6,  -0.5, -0.3,  -0.3, -0.1,  -0.15, 0.05,  0.01, 0.02, 0.02],
    // Upper Left Wing Loop (Top)
    [-0.25, 0.35,  -0.4, 0.7,  -0.8, 0.7,  -0.8, 0.3,  0.03, 0.01, 0.02],
    // Upper Left Wing Loop (Bottom)
    [-0.8, 0.3,  -0.7, 0.0,  -0.4, 0.0,  -0.15, 0.1,  0.01, 0.02, 0.04],
    // Upper Vein 1
    [-0.2, 0.25,  -0.4, 0.4,  -0.6, 0.5,  -0.75, 0.5,  0.015, 0.005, 0.0],
    // Upper Vein 2
    [-0.15, 0.15,  -0.4, 0.2,  -0.6, 0.3,  -0.75, 0.35,  0.015, 0.005, 0.0]
  ];

  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, z = 0;
    const r = Math.random();

    if (r < 0.12) {
      // 12% Head (Solid Circle)
      const radius = 0.12 * Math.sqrt(Math.random());
      const angle = Math.random() * Math.PI * 2;
      x = 0.1 + Math.cos(angle) * radius;
      y = 0.35 + Math.sin(angle) * radius;
      z = (Math.random() - 0.5) * 0.1;
    } else {
      // 88% Ribbons
      const ribbonIdx = Math.floor(Math.random() * ribbons.length);
      const rib = ribbons[ribbonIdx];
      const t = Math.random();
      const pt = getBezierPoint(t, rib[0], rib[1], rib[2], rib[3], rib[4], rib[5], rib[6], rib[7]);
      const norm = getBezierTangent(t, rib[0], rib[1], rib[2], rib[3], rib[4], rib[5], rib[6], rib[7]);
      
      const wStart = rib[8];
      const wEnd = rib[9];
      const swell = rib[10];
      const width = wStart * (1 - t) + wEnd * t + Math.sin(t * Math.PI) * swell;
      
      const offset = (Math.random() - 0.5) * width;
      x = pt.x + norm.nx * offset;
      y = pt.y + norm.ny * offset;
      z = (Math.random() - 0.5) * 0.1; // flat 3D
    }

    const finalScale = scale * 1.6;
    positions[i * 3] = x * finalScale;
    positions[i * 3 + 1] = y * finalScale;
    positions[i * 3 + 2] = z * finalScale;
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
// 5: HEART — Solid 3D Taubin Heart (Completely Filled)
// ============================================================
export function getHeartPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, z = 0;
    
    // Rejection sampling using the 3D Taubin heart algebraic equation:
    // (x^2 + 2.25*z^2 + y^2 - 1)^3 - x^2*y^3 - 0.1125*z^2*y^3 <= 0
    while (true) {
      // Bounding box for the Taubin heart is roughly [-1.3, 1.3] in all axes
      const tx = (Math.random() - 0.5) * 2.8; 
      const ty = (Math.random() - 0.5) * 2.8; 
      const tz = (Math.random() - 0.5) * 2.8; 
      
      const x2 = tx * tx;
      const y2 = ty * ty;
      const z2 = tz * tz;
      const y3 = ty * y2; // ty^3
      
      const a = x2 + 2.25 * z2 + y2 - 1.0;
      const val = a * a * a - x2 * y3 - 0.1125 * z2 * y3;
      
      if (val <= 0) {
        // Density function: denser near the surface (where val is close to 0) 
        // to maintain a crisp, recognizable shape, while still filling the interior.
        const prob = (val > -0.2) ? 1.0 : 0.2; 
        
        if (Math.random() < prob) {
          x = tx; 
          y = ty; 
          z = tz;
          break;
        }
      }
    }

    // Scale up slightly to match the visual size of the previous heart
    const finalScale = scale * 1.3;
    
    // Shift slightly up to center visually
    positions[i * 3] = x * finalScale;
    positions[i * 3 + 1] = (y + 0.2) * finalScale;
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
  const W = 0.9 * scale;
  const topY = 0.6 * scale;
  
  const distToSeg = (px: number, py: number, ax: number, ay: number, bx: number, by: number) => {
    const l2 = (ax - bx) * (ax - bx) + (ay - by) * (ay - by);
    if (l2 === 0) return Math.sqrt((px - ax) * (px - ax) + (py - ay) * (py - ay));
    let t = ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.sqrt((px - (ax + t * (bx - ax))) ** 2 + (py - (ay + t * (by - ay))) ** 2);
  };

  for (let i = 0; i < count; i++) {
    const rType = Math.random();
    let x = 0, y = 0, z = 0;

    if (rType < 0.35) {
      // Border outline (Classic Heraldic Shield)
      const edge = Math.random();
      if (edge < 0.25) {
        // Top edge
        x = (Math.random() - 0.5) * 2 * W;
        y = topY;
      } else if (edge < 0.4) {
        // Left straight edge
        x = -W;
        y = Math.random() * topY;
      } else if (edge < 0.55) {
        // Right straight edge
        x = W;
        y = Math.random() * topY;
      } else {
        // Curved bottom edges (Quarter circles meeting at the bottom point)
        const tY = -Math.random() * scale; // 0 to -1*scale
        const normY = tY / scale;
        const curW = W * Math.sqrt(1 - normY * normY);
        x = (Math.random() > 0.5 ? 1 : -1) * curW;
        y = tY;
      }
      x += (Math.random() - 0.5) * 0.05 * scale;
      y += (Math.random() - 0.5) * 0.05 * scale;
      z += (Math.random() - 0.5) * 0.05 * scale;
    } else {
      // Fill interior
      while (true) {
        const testX = (Math.random() - 0.5) * 2 * W;
        const testY = -1.0 * scale + Math.random() * 1.6 * scale; // -1 to 0.6

        // Check if inside shield bounds
        let inside = false;
        if (testY >= 0) {
          if (Math.abs(testX) <= W) inside = true;
        } else {
          const normY = testY / scale;
          const curW = W * Math.sqrt(1 - normY * normY);
          if (Math.abs(testX) <= curW) inside = true;
        }

        if (inside) {
          // Create a negative space hole for the checkmark
          const ax = -0.3 * scale, ay = -0.05 * scale;
          const bx = -0.05 * scale, by = -0.3 * scale;
          const cx = 0.4 * scale, cy = 0.2 * scale;
          
          const d1 = distToSeg(testX, testY, ax, ay, bx, by);
          const d2 = distToSeg(testX, testY, bx, by, cx, cy);
          
          if (Math.min(d1, d2) < 0.15 * scale) {
            continue; // Reject particles in the checkmark path
          }
          
          x = testX;
          y = testY;
          break;
        }
      }
      z = (Math.random() - 0.5) * 0.2 * scale;
    }
    
    // Add dense, raised particles inside the negative space to form the solid checkmark
    if (Math.random() < 0.12) {
       const t = Math.random();
       if (Math.random() < 0.35) {
          // Left leg of checkmark
          const ax = -0.3 * scale, ay = -0.05 * scale;
          const bx = -0.05 * scale, by = -0.3 * scale;
          x = ax + t * (bx - ax);
          y = ay + t * (by - ay);
       } else {
          // Right leg of checkmark
          const bx = -0.05 * scale, by = -0.3 * scale;
          const cx = 0.4 * scale, cy = 0.2 * scale;
          x = bx + t * (cx - bx);
          y = by + t * (cy - by);
       }
       // Thicken the checkmark
       x += (Math.random() - 0.5) * 0.08 * scale;
       y += (Math.random() - 0.5) * 0.08 * scale;
       // Pop out in 3D
       z = 0.3 * scale + Math.random() * 0.1 * scale; 
    }

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
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
// 13: MULTIPLIER — Light Bulb (High Visibility Dense Dots)
// ============================================================
export function getMultiplierPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const rType = Math.random();
    let x = 0, y = 0, z = 0;

    if (rType < 0.45) {
      // 45% Bulb and Neck Shell (Glass)
      const part = Math.random();
      if (part < 0.8) {
        // Bulb sphere shell
        while (true) {
          const u = Math.random();
          const v = Math.random();
          const theta = u * 2.0 * Math.PI;
          const phi = Math.acos(2.0 * v - 1.0);
          const r = 0.8 * scale;
          const sx = r * Math.sin(phi) * Math.cos(theta);
          const sy = r * Math.cos(phi); // Y is up
          const sz = r * Math.sin(phi) * Math.sin(theta);
          
          if (sy > -0.5 * scale) {
            x = sx;
            y = sy + 0.4 * scale;
            z = sz;
            break;
          }
        }
      } else {
        // Neck tapering cylinder shell
        const t = Math.random(); // 0 to 1
        const ny = -0.1 * scale - t * 0.5 * scale; // from -0.1 to -0.6
        const rTop = 0.624 * scale;
        const rBot = 0.3 * scale;
        const radius = rTop * (1 - t) + rBot * t;
        const theta = Math.random() * Math.PI * 2;
        x = radius * Math.cos(theta);
        y = ny;
        z = radius * Math.sin(theta);
      }
      
      // Add a slight thickness/fuzz to the glass
      x += (Math.random() - 0.5) * 0.04 * scale;
      y += (Math.random() - 0.5) * 0.04 * scale;
      z += (Math.random() - 0.5) * 0.04 * scale;

    } else if (rType < 0.65) {
      // 20% Base (Metal part)
      const t = Math.random();
      const ny = -0.6 * scale - t * 0.3 * scale; // -0.6 to -0.9
      const radius = 0.3 * scale;
      const theta = Math.random() * Math.PI * 2;
      
      // Ridges: group some particles into horizontal bands
      let currentR = radius;
      if (Math.random() < 0.5) {
        // 50% of base particles form 3 thick ridges
        const ridge = Math.floor(Math.random() * 3);
        y = -0.65 * scale - ridge * 0.1 * scale + (Math.random() - 0.5) * 0.03 * scale;
        currentR = 0.33 * scale; // stick out slightly
      } else {
        y = ny;
      }
      x = currentR * Math.cos(theta);
      z = currentR * Math.sin(theta);

    } else if (rType < 0.70) {
      // 5% Base bottom tip (Hemisphere)
      while (true) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 0.15 * scale;
        const sx = r * Math.sin(phi) * Math.cos(theta);
        const sy = r * Math.cos(phi); // Y is up
        const sz = r * Math.sin(phi) * Math.sin(theta);
        
        if (sy <= 0) { // Bottom half only
          x = sx;
          y = -0.9 * scale + sy;
          z = sz;
          break;
        }
      }
    } else {
      // 30% Filament (Internal glowing parts)
      const part = Math.random();
      if (part < 0.2) {
        // Stem
        const t = Math.random();
        y = -0.6 * scale + t * 0.4 * scale;
        const radius = 0.05 * scale;
        const theta = Math.random() * Math.PI * 2;
        x = radius * Math.cos(theta);
        z = radius * Math.sin(theta);
      } else if (part < 0.4) {
        // Wires
        const t = Math.random();
        const side = Math.random() > 0.5 ? 1 : -1;
        const startX = side * 0.05 * scale;
        const startY = -0.2 * scale;
        const endX = side * 0.25 * scale;
        const endY = 0.3 * scale;
        x = startX + t * (endX - startX);
        y = startY + t * (endY - startY);
        z = (Math.random() - 0.5) * 0.02 * scale; // flat in Z
      } else {
        // Glowing W Coil
        const t = Math.random();
        if (t < 0.25) {
          const t2 = t / 0.25;
          x = -0.25 * scale + t2 * 0.125 * scale;
          y = 0.3 * scale + t2 * 0.2 * scale;
        } else if (t < 0.5) {
          const t2 = (t - 0.25) / 0.25;
          x = -0.125 * scale + t2 * 0.125 * scale;
          y = 0.5 * scale - t2 * 0.2 * scale;
        } else if (t < 0.75) {
          const t2 = (t - 0.5) / 0.25;
          x = 0 * scale + t2 * 0.125 * scale;
          y = 0.3 * scale + t2 * 0.2 * scale;
        } else {
          const t2 = (t - 0.75) / 0.25;
          x = 0.125 * scale + t2 * 0.125 * scale;
          y = 0.5 * scale - t2 * 0.2 * scale;
        }
        z = (Math.random() - 0.5) * 0.05 * scale; // mostly flat but thick
        
        // Make the glowing coil ultra thick and scattered so it "glows" densely
        x += (Math.random() - 0.5) * 0.08 * scale;
        y += (Math.random() - 0.5) * 0.08 * scale;
        z += (Math.random() - 0.5) * 0.08 * scale;
      }
    }

    // Shift whole shape up slightly to perfectly center it visually
    y += 0.2 * scale;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
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
