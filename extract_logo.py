import sys
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'pillow'])
    from PIL import Image
import random
import os

def main():
    img_path = 'public/logo.png'
    if not os.path.exists(img_path):
        print(f"Error: {img_path} not found.")
        sys.exit(1)
        
    img = Image.open(img_path).convert('RGBA')
    width, height = img.size
    
    bg_color = img.getpixel((0,0))
    
    pixels = []
    for y in range(height):
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            
            if a < 50:
                continue
                
            if bg_color[3] == 255:
                dist = sum(abs(img.getpixel((x,y))[i] - bg_color[i]) for i in range(3))
                if dist < 50:
                    continue
            
            pixels.append((x, y))
            
    if not pixels:
        print("No logo pixels found!")
        sys.exit(1)
        
    print(f"Found {len(pixels)} valid logo pixels.")
    
    target_count = 3000
    sampled = []
    
    for _ in range(target_count):
        px, py = random.choice(pixels)
        jx = px + random.uniform(-0.5, 0.5)
        jy = py + random.uniform(-0.5, 0.5)
        
        nx = (jx / width) * 2.0 - 1.0
        ny = -((jy / height) * 2.0 - 1.0)
        
        aspect = width / height
        if aspect > 1:
            ny /= aspect
        else:
            nx *= aspect
            
        # Add random Z depth to give it volume
        z = random.uniform(-0.05, 0.05)
            
        sampled.extend([nx, ny, z])
        
    with open('src/lib/logoData.ts', 'w') as f:
        f.write('// Auto-generated logo data from image\n')
        f.write('export const LOGO_POSITIONS = new Float32Array([\n')
        
        for i in range(0, len(sampled), 3):
            f.write(f'  {sampled[i]:.6f}, {sampled[i+1]:.6f}, {sampled[i+2]:.6f},\n')
            
        f.write(']);\n')
        
    print("Successfully wrote src/lib/logoData.ts")

if __name__ == '__main__':
    main()
