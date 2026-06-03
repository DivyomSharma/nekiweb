export const PARTICLE_COUNT = 8000;

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

export function getNekiLogoPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const part = Math.random();
    if (part < 0.33) {
      positions[i * 3] = -0.5 * scale + (Math.random() - 0.5) * 0.15 * scale;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05 * scale;
    } else if (part < 0.66) {
      positions[i * 3] = 0.5 * scale + (Math.random() - 0.5) * 0.15 * scale;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05 * scale;
    } else {
      const t = (Math.random() - 0.5); 
      positions[i * 3] = t * scale + (Math.random() - 0.5) * 0.15 * scale; 
      positions[i * 3 + 1] = -t * 1.5 * scale + (Math.random() - 0.5) * 0.15 * scale; 
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05 * scale;
    }
  }
  return positions;
}
