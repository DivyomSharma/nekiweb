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

export function getSpherePositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // 80% on surface, 20% in core for volume feel
    const r = Math.random() > 0.2 ? radius : radius * Math.cbrt(Math.random());
    const pt = randomSpherePoint(r);
    positions[i * 3] = pt.x;
    positions[i * 3 + 1] = pt.y;
    positions[i * 3 + 2] = pt.z;
  }
  return positions;
}

export function getChaosPositions(count: number, spread: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  return positions;
}

export function getBoxPositions(count: number, width: number, height: number, depth: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Distribute on surfaces for clearer shape
    const face = Math.floor(Math.random() * 6);
    let x, y, z;
    if (face === 0) { x = width/2; y = (Math.random()-0.5)*height; z = (Math.random()-0.5)*depth; }
    else if (face === 1) { x = -width/2; y = (Math.random()-0.5)*height; z = (Math.random()-0.5)*depth; }
    else if (face === 2) { y = height/2; x = (Math.random()-0.5)*width; z = (Math.random()-0.5)*depth; }
    else if (face === 3) { y = -height/2; x = (Math.random()-0.5)*width; z = (Math.random()-0.5)*depth; }
    else if (face === 4) { z = depth/2; x = (Math.random()-0.5)*width; y = (Math.random()-0.5)*height; }
    else { z = -depth/2; x = (Math.random()-0.5)*width; y = (Math.random()-0.5)*height; }
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

export function getBookPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const isLeftPage = Math.random() > 0.5;
    const x = Math.random() * 2; // Width from spine
    const z = (Math.random() - 0.5) * 3; // Height of book
    
    // Spine at x=0. Wavy pages.
    const y = -Math.exp(-x * 2) * 0.5 + Math.sin(x * 1.5) * 0.3;
    
    // Multiple pages (thickness)
    const thickness = Math.random() * 0.2;
    
    if (isLeftPage) {
      positions[i * 3] = -x;
      positions[i * 3 + 1] = y - thickness;
      positions[i * 3 + 2] = z;
    } else {
      positions[i * 3] = x;
      positions[i * 3 + 1] = y - thickness;
      positions[i * 3 + 2] = z;
    }
  }
  return positions;
}

export function getCrossPositions(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const thickness = size * 0.3;
  for (let i = 0; i < count; i++) {
    const isVertical = Math.random() > 0.5;
    if (isVertical) {
      // Surface of vertical bar
      positions[i * 3] = (Math.random() - 0.5) * thickness;
      positions[i * 3 + 1] = (Math.random() - 0.5) * size;
      positions[i * 3 + 2] = (Math.random() > 0.5 ? 1 : -1) * thickness / 2; // front/back faces
    } else {
      // Surface of horizontal bar
      positions[i * 3] = (Math.random() - 0.5) * size;
      positions[i * 3 + 1] = (Math.random() - 0.5) * thickness;
      positions[i * 3 + 2] = (Math.random() > 0.5 ? 1 : -1) * thickness / 2; // front/back faces
    }
  }
  return positions;
}

export function getHumanPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const part = Math.random();
    if (part < 0.15) {
      // Head (Sphere)
      const pt = randomSpherePoint(0.3 * scale);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y + 1.3 * scale;
      positions[i * 3 + 2] = pt.z;
    } else if (part < 0.3) {
      // Shoulders (Ellipsoid)
      const pt = randomSpherePoint(1);
      positions[i * 3] = pt.x * 0.7 * scale;
      positions[i * 3 + 1] = pt.y * 0.2 * scale + 0.9 * scale;
      positions[i * 3 + 2] = pt.z * 0.2 * scale;
    } else if (part < 0.6) {
      // Torso (Tapered cylinder approximated on surface)
      const height = (Math.random() - 0.5); // -0.5 to 0.5
      const angle = Math.random() * Math.PI * 2;
      const width = (0.6 + height * 0.2) * scale; // Taper down
      positions[i * 3] = Math.cos(angle) * width;
      positions[i * 3 + 1] = height * 1.5 * scale + 0.1 * scale;
      positions[i * 3 + 2] = Math.sin(angle) * 0.2 * scale;
    } else {
      // Legs
      const isLeft = Math.random() > 0.5;
      const height = Math.random(); // 0 to 1
      const angle = Math.random() * Math.PI * 2;
      const legRadius = 0.15 * scale;
      positions[i * 3] = (isLeft ? -0.25 : 0.25) * scale + Math.cos(angle) * legRadius;
      positions[i * 3 + 1] = -height * 1.5 * scale - 0.6 * scale;
      positions[i * 3 + 2] = Math.sin(angle) * legRadius;
    }
  }
  return positions;
}

export function getIndiaMapPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x, y;
    while (true) {
      x = (Math.random() - 0.5) * 2;
      y = (Math.random() - 0.5) * 2;
      // More accurate India outline approximation
      if (y > 0.4 && Math.abs(x) < (1 - y) * 0.6) break; // Kashmir
      if (y > 0 && y <= 0.4 && Math.abs(x) < 0.6) break; // North/Central
      if (y <= 0 && Math.abs(x) < (1 + y * 1.2) * 0.6) break; // South Peninsular
      if (x > 0.4 && y > 0 && y < 0.5 && x < 0.9 - y*0.5) break; // North East
      if (x < -0.4 && y > -0.2 && y < 0.4 && x > -0.7) break; // Gujarat/West
    }
    positions[i * 3] = x * scale;
    positions[i * 3 + 1] = y * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1 * scale;
  }
  return positions;
}

export function getBowlPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random() > 0.8 ? radius * 0.9 : radius;
    let pt;
    while (true) {
      pt = randomSpherePoint(r);
      if (pt.y < 0) break;
    }
    positions[i * 3] = pt.x;
    positions[i * 3 + 1] = pt.y;
    positions[i * 3 + 2] = pt.z;
  }
  return positions;
}

export function getHeartPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    // Heart parametric equations
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    
    // Fill the inside randomly by scaling the boundary vector
    const r = Math.random(); // 0 to 1
    const insideScale = Math.sqrt(r); // Square root for uniform area distribution
    
    // Scale down the standard equation which outputs values around -16 to 16
    const finalScale = scale * 0.1 * insideScale;
    
    positions[i*3] = x * finalScale + (Math.random() - 0.5) * 0.2 * scale;
    positions[i*3+1] = y * finalScale + (Math.random() - 0.5) * 0.2 * scale;
    positions[i*3+2] = (Math.random() - 0.5) * 0.5 * scale; // Add some depth
  }
  return positions;
}

export function getGearPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const isTooth = Math.random() > 0.6;
    const angle = Math.random() * Math.PI * 2;
    let r = radius + (Math.random() - 0.5) * 0.4;
    if (isTooth) {
      const teethAngle = (angle % (Math.PI / 4)) / (Math.PI / 4);
      if (teethAngle > 0.3 && teethAngle < 0.7) {
        r += 0.5;
      }
    }
    positions[i*3] = Math.cos(angle) * r;
    positions[i*3+1] = Math.sin(angle) * r;
    positions[i*3+2] = (Math.random() - 0.5) * 0.5;
  }
  return positions;
}

export function getConnectionPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    if (r < 0.25) {
      // Node 1 (bottom left)
      positions[i*3] = -1.0 * scale + (Math.random() - 0.5) * 0.5 * scale;
      positions[i*3+1] = -0.5 * scale + (Math.random() - 0.5) * 0.5 * scale;
      positions[i*3+2] = (Math.random() - 0.5) * 0.5 * scale;
    } else if (r < 0.50) {
      // Node 2 (top right)
      positions[i*3] = 1.0 * scale + (Math.random() - 0.5) * 0.5 * scale;
      positions[i*3+1] = 0.5 * scale + (Math.random() - 0.5) * 0.5 * scale;
      positions[i*3+2] = (Math.random() - 0.5) * 0.5 * scale;
    } else {
      // Single thick connecting line between them
      const t = Math.random();
      const x = -1.0 * scale + t * 2.0 * scale;
      const y = -0.5 * scale + t * 1.0 * scale;
      
      const taper = Math.pow(Math.abs(t - 0.5) * 2, 2) * 0.15 + 0.05;
      
      positions[i*3] = x + (Math.random() - 0.5) * taper * scale;
      positions[i*3+1] = y + (Math.random() - 0.5) * taper * scale;
      positions[i*3+2] = (Math.random() - 0.5) * taper * scale;
    }
  }
  return positions;
}

export function getNetworkPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const nodes: {x: number, y: number, z: number}[] = [];
  for(let j=0; j<15; j++) {
    nodes.push({
      x: (Math.random() - 0.5) * 5 * scale,
      y: (Math.random() - 0.5) * 5 * scale,
      z: (Math.random() - 0.5) * 2 * scale
    });
  }
  for (let i = 0; i < count; i++) {
    const isLine = Math.random() > 0.3;
    if (isLine) {
      const n1 = nodes[Math.floor(Math.random() * nodes.length)];
      const n2 = nodes[Math.floor(Math.random() * nodes.length)];
      const t = Math.random();
      positions[i*3] = n1.x + (n2.x - n1.x) * t;
      positions[i*3+1] = n1.y + (n2.y - n1.y) * t;
      positions[i*3+2] = n1.z + (n2.z - n1.z) * t;
    } else {
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      const pt = randomSpherePoint(Math.random() * 0.5 * scale);
      positions[i*3] = n.x + pt.x;
      positions[i*3+1] = n.y + pt.y;
      positions[i*3+2] = n.z + pt.z;
    }
  }
  return positions;
}

export function getPinPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const isSphere = Math.random() > 0.4;
    if (isSphere) {
      const pt = randomSpherePoint(Math.random() > 0.5 ? scale : scale*0.8);
      positions[i*3] = pt.x;
      positions[i*3+1] = pt.y + scale;
      positions[i*3+2] = pt.z;
    } else {
      const h = Math.random();
      const angle = Math.random() * Math.PI * 2;
      const r = h * scale;
      positions[i*3] = Math.cos(angle) * r;
      positions[i*3+1] = h * scale * 2 - scale;
      positions[i*3+2] = Math.sin(angle) * r;
    }
  }
  return positions;
}

export function getCameraFramePositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const edge = Math.floor(Math.random() * 4);
    let x, y;
    if (edge === 0) { x = (Math.random() - 0.5)*2; y = 1; }
    else if (edge === 1) { x = (Math.random() - 0.5)*2; y = -1; }
    else if (edge === 2) { x = 1; y = (Math.random() - 0.5)*2; }
    else { x = -1; y = (Math.random() - 0.5)*2; }
    
    x += (Math.random() - 0.5) * 0.1;
    y += (Math.random() - 0.5) * 0.1;

    positions[i*3] = x * scale;
    positions[i*3+1] = y * scale;
    positions[i*3+2] = (Math.random() - 0.5) * 0.1 * scale;
  }
  return positions;
}

export function getOrbPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * scale; 
    
    const clump = Math.sin(theta * 3) * Math.cos(phi * 3) * 0.2;
    const finalR = r + clump * scale;

    positions[i*3] = finalR * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = finalR * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = finalR * Math.cos(phi);
  }
  return positions;
}

export function getNodePositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    const radius = r * r * scale * 0.3; 
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = radius * Math.cos(phi);
  }
  return positions;
}

export function getRoutePositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random(); 
    const x = -2.0 * scale + t * 4.0 * scale;
    const y = Math.sin(t * Math.PI * 2) * scale * 0.5;
    const z = Math.cos(t * Math.PI) * scale * 0.5;
    
    const noise = (Math.random() - 0.5) * 0.2 * scale;
    
    positions[i*3] = x + noise;
    positions[i*3+1] = y + noise;
    positions[i*3+2] = z + noise;
  }
  return positions;
}

export function getButterflyPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    const e = Math.exp(Math.cos(t));
    const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4*t) - Math.pow(Math.sin(t/12), 5);
    
    const inner = Math.sqrt(Math.random());
    const x = Math.sin(t) * r * inner * scale * 0.4;
    const y = Math.cos(t) * r * inner * scale * 0.4;
    
    positions[i*3] = x + (Math.random() - 0.5) * 0.1 * scale;
    positions[i*3+1] = y + (Math.random() - 0.5) * 0.1 * scale;
    positions[i*3+2] = (Math.random() - 0.5) * 0.2 * scale;
  }
  return positions;
}

export function getNekiLogoPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const stroke = Math.random();
    const t = Math.random();
    const noise = 0.05 * scale;
    let x = 0, y = 0, z = (Math.random() - 0.5) * noise;
    
    if (stroke < 0.33) {
      x = -0.5 * scale + (Math.random() - 0.5) * noise;
      y = -0.5 * scale + t * 1.0 * scale;
      if (Math.random() < 0.2 && t < 0.2) {
        x += (Math.random() - 0.5) * noise * 3;
        y += (Math.random() - 0.5) * noise * 3;
        z += (Math.random() - 0.5) * noise * 3;
      }
    } else if (stroke < 0.66) {
      x = -0.5 * scale + t * 1.0 * scale;
      y = 0.5 * scale - t * 1.0 * scale;
    } else {
      x = 0.5 * scale + (Math.random() - 0.5) * noise;
      y = -0.5 * scale + t * 1.0 * scale;
    }
    
    positions[i*3] = x;
    positions[i*3+1] = y;
    positions[i*3+2] = z;
  }
  return positions;
}
