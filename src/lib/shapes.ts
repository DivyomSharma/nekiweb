export const PARTICLE_COUNT = 15000;

export function getSpherePositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * radius; // Volume distribution
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
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
    positions[i * 3] = (Math.random() - 0.5) * width;
    positions[i * 3 + 1] = (Math.random() - 0.5) * height;
    positions[i * 3 + 2] = (Math.random() - 0.5) * depth;
  }
  return positions;
}

export function getBookPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const isLeftPage = Math.random() > 0.5;
    const x = Math.random() * 2; // Width of page
    const z = (Math.random() - 0.5) * 3; // Height of book
    
    // Slight curve to the page
    const y = Math.sin(x * 0.5) * 0.5;
    
    if (isLeftPage) {
      positions[i * 3] = -x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    } else {
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
  }
  return positions;
}

export function getCrossPositions(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const isVertical = Math.random() > 0.5;
    if (isVertical) {
      positions[i * 3] = (Math.random() - 0.5) * (size * 0.3);
      positions[i * 3 + 1] = (Math.random() - 0.5) * size;
      positions[i * 3 + 2] = (Math.random() - 0.5) * (size * 0.1);
    } else {
      positions[i * 3] = (Math.random() - 0.5) * size;
      positions[i * 3 + 1] = (Math.random() - 0.5) * (size * 0.3);
      positions[i * 3 + 2] = (Math.random() - 0.5) * (size * 0.1);
    }
  }
  return positions;
}

export function getHumanPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const part = Math.random();
    if (part < 0.15) {
      // Head
      const r = Math.cbrt(Math.random()) * 0.3 * scale;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 1.2 * scale;
      positions[i * 3 + 2] = r * Math.cos(phi);
    } else if (part < 0.6) {
      // Torso
      positions[i * 3] = (Math.random() - 0.5) * 0.6 * scale;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.0 * scale + 0.3 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3 * scale;
    } else {
      // Legs
      const isLeft = Math.random() > 0.5;
      positions[i * 3] = (isLeft ? -0.2 : 0.2) * scale + (Math.random() - 0.5) * 0.2 * scale;
      positions[i * 3 + 1] = (Math.random() - 1.0) * 0.8 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2 * scale;
    }
  }
  return positions;
}

// Rough approximation of India's map using a diamond/triangle composition
export function getIndiaMapPositions(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x, y;
    while (true) {
      // Generate within a bounding box
      x = (Math.random() - 0.5) * 2;
      y = (Math.random() - 0.5) * 2;
      
      // Top half triangle (North)
      if (y > 0 && Math.abs(x) < (1 - y) * 0.8) break;
      // Bottom half triangle (South)
      if (y <= 0 && Math.abs(x) < (1 + y)) break;
      // East extension
      if (x > 0.5 && y > 0 && y < 0.5 && x < 1) break;
      // West extension
      if (x < -0.5 && y > -0.2 && y < 0.5 && x > -0.8) break;
    }
    
    positions[i * 3] = x * scale;
    positions[i * 3 + 1] = y * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1 * scale;
  }
  return positions;
}

export function getNekiLogoPositions(count: number, scale: number): Float32Array {
  // A sleek 'N' made of 3 bars
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const part = Math.random();
    if (part < 0.33) {
      // Left vertical
      positions[i * 3] = -0.5 * scale + (Math.random() - 0.5) * 0.2 * scale;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1 * scale;
    } else if (part < 0.66) {
      // Right vertical
      positions[i * 3] = 0.5 * scale + (Math.random() - 0.5) * 0.2 * scale;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5 * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1 * scale;
    } else {
      // Diagonal
      const t = (Math.random() - 0.5); // -0.5 to 0.5
      positions[i * 3] = t * scale + (Math.random() - 0.5) * 0.2 * scale; // x moves from -0.5 to 0.5
      positions[i * 3 + 1] = -t * 1.5 * scale + (Math.random() - 0.5) * 0.2 * scale; // y moves from 0.75 to -0.75
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1 * scale;
    }
  }
  return positions;
}
