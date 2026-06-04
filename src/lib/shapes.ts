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

import { LOGO_POSITIONS } from './logoData';


// ============================================================
// 0: HERO LOGO — Exact Image Extraction
// ============================================================
export function getHeroLogoPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // If we request more particles than we baked (3000), loop over them
    const idx = i % 3000;
    
    // Scale by ~1.6 to match previous size
    positions[i * 3] = LOGO_POSITIONS[idx * 3] * scale * 1.6;
    positions[i * 3 + 1] = LOGO_POSITIONS[idx * 3 + 1] * scale * 1.6;
    positions[i * 3 + 2] = LOGO_POSITIONS[idx * 3 + 2] * scale * 1.6;
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
// 3: BOOK — Front-facing closed book with bookmark
// ============================================================
export function getBookPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  
  const primitives: any[] = [];
  
  const addLine = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    primitives.push({
      type: 'line',
      len: Math.sqrt(dx * dx + dy * dy),
      x1, y1, x2, y2,
      nx: -dy, ny: dx 
    });
  };
  
  const addArc = (cx: number, cy: number, r: number, a1: number, a2: number) => {
    let diff = Math.abs(a2 - a1);
    if (diff > Math.PI * 2) diff = Math.PI * 2;
    primitives.push({
      type: 'arc',
      len: r * diff,
      cx, cy, r, a1, a2
    });
  };

  // Outer Book Shape
  addLine(-0.4, 0.8, 0.6, 0.8);          // Top horizontal
  addLine(0.6, 0.8, 0.6, -0.8);          // Right vertical
  addLine(-0.6, 0.6, -0.6, -0.6);        // Left vertical
  addLine(-0.4, 0.8, -0.4, -0.4);        // Inner spine vertical
  addLine(-0.4, -0.4, 0.6, -0.4);        // Front cover bottom
  
  // Broken horizontal lines (obscured by bookmark)
  addLine(-0.4, -0.6, 0.0, -0.6);        // Middle horizontal left
  addLine(0.2, -0.6, 0.6, -0.6);         // Middle horizontal right
  addLine(-0.4, -0.8, 0.0, -0.8);        // Bottom horizontal left
  addLine(0.2, -0.8, 0.6, -0.8);         // Bottom horizontal right
  
  // Bookmark
  addLine(0.0, -0.4, 0.0, -1.1);
  addLine(0.2, -0.4, 0.2, -1.1);
  addLine(0.0, -1.1, 0.1, -0.9);
  addLine(0.2, -1.1, 0.1, -0.9);
  
  // Label (Inner Rectangle)
  addLine(-0.1, 0.1, 0.3, 0.1);
  addLine(-0.1, 0.4, 0.3, 0.4);
  addLine(-0.1, 0.1, -0.1, 0.4);
  addLine(0.3, 0.1, 0.3, 0.4);
  
  // Arcs
  addArc(-0.4, 0.6, 0.2, Math.PI / 2, Math.PI);      // Top-left outer
  addArc(-0.4, -0.6, 0.2, Math.PI, Math.PI * 1.5);   // Bottom-left outer
  addArc(-0.4, -0.4, 0.2, Math.PI, Math.PI * 1.5);   // Inner spine bottom

  let totalLen = 0;
  for (const p of primitives) {
    if (p.type === 'line') {
      const l = p.len;
      if (l > 0) {
        p.nx /= l;
        p.ny /= l;
      }
    }
    totalLen += p.len;
  }
  
  const thickness = 0.08; 
  
  for (let i = 0; i < count; i++) {
    let target = Math.random() * totalLen;
    let chosen = primitives[0];
    for (const p of primitives) {
      target -= p.len;
      if (target <= 0) {
        chosen = p;
        break;
      }
    }
    
    let x = 0, y = 0, z = 0;
    
    // Gaussian-like random for denser center and fuzzy edges
    const rnd = (Math.random() + Math.random() + Math.random() - 1.5) * 0.66;
    const offset = rnd * thickness;
    
    if (chosen.type === 'line') {
      const t = Math.random();
      const px = chosen.x1 + t * (chosen.x2 - chosen.x1);
      const py = chosen.y1 + t * (chosen.y2 - chosen.y1);
      x = px + chosen.nx * offset;
      y = py + chosen.ny * offset;
    } else {
      const t = Math.random();
      const angle = chosen.a1 + t * (chosen.a2 - chosen.a1);
      const rOffset = chosen.r + offset;
      x = chosen.cx + Math.cos(angle) * rOffset;
      y = chosen.cy + Math.sin(angle) * rOffset;
    }
    
    z = (Math.random() - 0.5) * 0.05; // mostly flat 3D
    
    const scale = 2.0;
    positions[i * 3] = x * scale;
    positions[i * 3 + 1] = (y + 0.15) * scale; // shifted slightly up to center visually
    positions[i * 3 + 2] = z * scale;
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
  
  const smSize = 1.8 * scale;
  const leftX = -2.0 * scale;
  const rightX = 2.0 * scale;
  
  // Hand positions for the connecting line
  const leftHandX = leftX + smSize * 0.5;
  const rightHandX = rightX - smSize * 0.5;
  const handY = smSize * 0.3;

  for (let i = 0; i < count; i++) {
    const r = Math.random();
    
    if (r < 0.40) {
      // Left Stickman
      const part = Math.random();
      let px = 0, py = 0, pz = (Math.random() - 0.5) * smSize * 0.1;

      if (part < 0.25) {
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.sqrt(Math.random()) * smSize * 0.25;
        px = Math.cos(angle) * rad;
        py = smSize * 0.7 + Math.sin(angle) * rad;
      } else if (part < 0.45) {
        py = smSize * 0.45 - Math.random() * (smSize * 0.75);
        px = (Math.random() - 0.5) * smSize * 0.05;
      } else if (part < 0.65) {
        const t = Math.random();
        if (Math.random() > 0.5) {
          px = t * smSize * 0.5; py = smSize * 0.3; // Reaching right
        } else {
          px = -t * smSize * 0.5; py = smSize * 0.3 + t * smSize * 0.3; // Waving left
        }
      } else {
        const t = Math.random();
        const side = Math.random() > 0.5 ? 1 : -1;
        px = side * t * smSize * 0.3;
        py = -smSize * 0.3 - t * smSize * 0.5;
      }

      positions[i * 3] = leftX + px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;
      
    } else if (r < 0.80) {
      // Right Stickman
      const part = Math.random();
      let px = 0, py = 0, pz = (Math.random() - 0.5) * smSize * 0.1;

      if (part < 0.25) {
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.sqrt(Math.random()) * smSize * 0.25;
        px = Math.cos(angle) * rad;
        py = smSize * 0.7 + Math.sin(angle) * rad;
      } else if (part < 0.45) {
        py = smSize * 0.45 - Math.random() * (smSize * 0.75);
        px = (Math.random() - 0.5) * smSize * 0.05;
      } else if (part < 0.65) {
        const t = Math.random();
        if (Math.random() > 0.5) {
          px = -t * smSize * 0.5; py = smSize * 0.3; // Reaching left
        } else {
          px = t * smSize * 0.5; py = smSize * 0.3 + t * smSize * 0.3; // Waving right
        }
      } else {
        const t = Math.random();
        const side = Math.random() > 0.5 ? 1 : -1;
        px = side * t * smSize * 0.3;
        py = -smSize * 0.3 - t * smSize * 0.5;
      }

      positions[i * 3] = rightX + px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

    } else {
      // Connecting line (holding hands)
      const t = Math.random();
      const x = leftHandX + t * (rightHandX - leftHandX);
      const dip = Math.sin(t * Math.PI) * 0.3 * scale; // curve downwards slightly like a slack rope
      const taper = 0.04;
      
      positions[i * 3] = x + (Math.random() - 0.5) * taper * scale;
      positions[i * 3 + 1] = handY - dip + (Math.random() - 0.5) * taper * scale;
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
  
  // Generate distinct ray directions
  const numRays = 16;
  const rays = [];
  for (let i=0; i<numRays; i++) {
     rays.push(randomSpherePoint(1.0));
  }
  
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    let x=0, y=0, z=0;
    
    if (r < 0.15) {
      // Core spark/droplet
      const pt = randomSpherePoint(Math.pow(Math.random(), 0.5) * 0.4 * scale);
      x = pt.x; y = pt.y; z = pt.z;
    } else if (r < 0.6) {
      // 3 Concentric rings (impact ripples)
      const ring = Math.floor(Math.random() * 3);
      const ringRadius = (1.5 + ring * 1.2) * scale;
      const angle = Math.random() * Math.PI * 2;
      const thickness = 0.08 * scale;
      
      x = Math.cos(angle) * ringRadius + (Math.random() - 0.5) * thickness;
      z = Math.sin(angle) * ringRadius + (Math.random() - 0.5) * thickness;
      y = (Math.random() - 0.5) * thickness * 0.5;
    } else {
      // Impact rays shooting outwards
      const ray = rays[Math.floor(Math.random() * numRays)];
      const dist = (0.2 + Math.random() * 3.8) * scale;
      const thickness = 0.06 * scale;
      x = ray.x * dist + (Math.random() - 0.5) * thickness;
      y = ray.y * dist + (Math.random() - 0.5) * thickness;
      z = ray.z * dist + (Math.random() - 0.5) * thickness;
    }
    
    // Tilt the entire shape so it's not a flat line when viewed head-on
    const tiltX = Math.PI / 3; // 60 degrees
    const tiltZ = Math.PI / 6; // 30 degrees
    
    // Rotate X
    let yRot = y * Math.cos(tiltX) - z * Math.sin(tiltX);
    let zRot = y * Math.sin(tiltX) + z * Math.cos(tiltX);
    
    // Rotate Z
    let xRot = x * Math.cos(tiltZ) - yRot * Math.sin(tiltZ);
    yRot = x * Math.sin(tiltZ) + yRot * Math.cos(tiltZ);

    positions[i * 3] = xRot;
    positions[i * 3 + 1] = yRot;
    positions[i * 3 + 2] = zRot;
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
  const smSize = 2.0 * scale; // single large stickman

  for (let i = 0; i < count; i++) {
    const part = Math.random();
    let px = 0, py = 0, pz = (Math.random() - 0.5) * smSize * 0.1;

    if (part < 0.25) {
      // Head (solid circle)
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * smSize * 0.25;
      px = Math.cos(angle) * r;
      py = smSize * 0.7 + Math.sin(angle) * r;
    } else if (part < 0.45) {
      // Torso (vertical line)
      py = smSize * 0.45 - Math.random() * (smSize * 0.75);
      px = (Math.random() - 0.5) * smSize * 0.05;
    } else if (part < 0.65) {
      // Arms (raised up)
      const t = Math.random();
      const side = Math.random() > 0.5 ? 1 : -1;
      px = side * t * smSize * 0.5;
      py = smSize * 0.3 + t * smSize * 0.3; // shoulder to hand
    } else {
      // Legs (walking stance)
      const t = Math.random();
      const side = Math.random() > 0.5 ? 1 : -1;
      px = side * t * smSize * 0.3;
      py = -smSize * 0.3 - t * smSize * 0.5; // waist to foot
    }

    positions[i * 3] = px;
    positions[i * 3 + 1] = py - 0.2 * scale; // Center it visually
    positions[i * 3 + 2] = pz;
  }
  return positions;
}

// ============================================================
// 14: INDIA NETWORK — Points constrained to India bounding shape
// ============================================================
export function getIndiaNetworkPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  
  // Create ~250 stickmen centers scattered across a large volume
  const numStickmen = 250;
  const stickmenCenters = [];
  for (let i = 0; i < numStickmen; i++) {
    stickmenCenters.push({
      cx: (Math.random() - 0.5) * scale * 14,
      cy: (Math.random() - 0.5) * scale * 8,
      cz: (Math.random() - 0.5) * scale * 4,
      size: scale * (0.15 + Math.random() * 0.2) // Tiny varying sizes
    });
  }

  for (let i = 0; i < count; i++) {
    // Pick a random stickman for this point
    const sm = stickmenCenters[Math.floor(Math.random() * numStickmen)];
    
    const part = Math.random();
    let px = 0, py = 0, pz = (Math.random() - 0.5) * sm.size * 0.1;

    if (part < 0.25) {
      // Head (solid circle)
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * sm.size * 0.25;
      px = Math.cos(angle) * r;
      py = sm.size * 0.7 + Math.sin(angle) * r;
    } else if (part < 0.45) {
      // Torso (vertical line)
      py = sm.size * 0.45 - Math.random() * (sm.size * 0.75);
      px = (Math.random() - 0.5) * sm.size * 0.05;
    } else if (part < 0.65) {
      // Arms (raised up)
      const t = Math.random();
      const side = Math.random() > 0.5 ? 1 : -1;
      px = side * t * sm.size * 0.5;
      py = sm.size * 0.3 + t * sm.size * 0.3; // shoulder to hand
    } else {
      // Legs (walking stance)
      const t = Math.random();
      const side = Math.random() > 0.5 ? 1 : -1;
      px = side * t * sm.size * 0.3;
      py = -sm.size * 0.3 - t * sm.size * 0.5; // waist to foot
    }

    positions[i * 3] = sm.cx + px;
    positions[i * 3 + 1] = sm.cy + py;
    positions[i * 3 + 2] = sm.cz + pz;
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

// ============================================================
// UTILITY: Extract Particle Positions from an Image (PNG/SVG)
// ============================================================
export async function getImagePositions(imageUrl: string, count: number, scale: number): Promise<Float32Array> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Use a reasonable resolution for scanning
      const size = 512;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D context not available"));
        return;
      }

      // Draw image scaled to fit canvas
      const aspect = img.width / img.height;
      let w = size;
      let h = size;
      if (aspect > 1) h = size / aspect;
      else w = size * aspect;
      
      const dx = (size - w) / 2;
      const dy = (size - h) / 2;
      ctx.drawImage(img, dx, dy, w, h);

      // Read pixels
      const imageData = ctx.getImageData(0, 0, size, size);
      const data = imageData.data;

      // Find all valid pixels (alpha > 50)
      const validPixels: {x: number, y: number}[] = [];
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const idx = (y * size + x) * 4;
          const r = data[idx];
          const g = data[idx+1];
          const b = data[idx+2];
          const a = data[idx+3];
          
          // Assuming a transparent or dark logo on transparent background
          // We check alpha primarily. If it's a solid image (white bg), we could check brightness instead.
          // Let's assume standard transparent PNG logo (alpha > 50).
          if (a > 50) {
            // Check if it's dark enough if we expect a black logo on transparent, 
            // but alpha is usually the safest bet for logos.
            validPixels.push({ x, y });
          }
        }
      }

      if (validPixels.length === 0) {
        console.warn("No visible pixels found in logo.png");
        resolve(new Float32Array(count * 3));
        return;
      }

      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        // Randomly pick a valid pixel
        const px = validPixels[Math.floor(Math.random() * validPixels.length)];
        
        // Add larger pixel-level sub-jitter to make it sparser and more organic
        const jx = px.x + (Math.random() - 0.5) * 4.0;
        const jy = px.y + (Math.random() - 0.5) * 4.0;

        // Map from [0, size] to standard coordinate space [-1, 1]
        // In Canvas, Y goes down, so we flip it
        const nx = (jx / size) * 2.0 - 1.0;
        const ny = -((jy / size) * 2.0 - 1.0);
        
        // Add more Z noise for 3D metallic volume (makes it sparser in 3D)
        const nz = (Math.random() - 0.5) * 0.4;

        positions[i * 3] = nx * scale * 1.5;
        positions[i * 3 + 1] = ny * scale * 1.5;
        positions[i * 3 + 2] = nz * scale * 1.5;
      }

      resolve(positions);
    };
    img.onerror = (err) => reject(err);
    img.src = imageUrl;
  });
}
