import { Jimp } from 'jimp';

async function run() {
  try {
    const image = await Jimp.read('public/clickit_app_logo.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    // Simple rounded corner logic (radius ~22% of width for squircle look)
    const radius = Math.floor(width * 0.22);
    
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let isOutside = false;
        
        // Top Left
        if (x < radius && y < radius) {
          const dx = x - radius;
          const dy = y - radius;
          if (dx * dx + dy * dy > radius * radius) isOutside = true;
        }
        // Top Right
        else if (x > width - radius && y < radius) {
          const dx = x - (width - radius);
          const dy = y - radius;
          if (dx * dx + dy * dy > radius * radius) isOutside = true;
        }
        // Bottom Left
        else if (x < radius && y > height - radius) {
          const dx = x - radius;
          const dy = y - (height - radius);
          if (dx * dx + dy * dy > radius * radius) isOutside = true;
        }
        // Bottom Right
        else if (x > width - radius && y > height - radius) {
          const dx = x - (width - radius);
          const dy = y - (height - radius);
          if (dx * dx + dy * dy > radius * radius) isOutside = true;
        }
        
        if (isOutside) {
          image.setPixelColor(0x00000000, x, y); // transparent
        }
      }
    }
    
    await image.write('public/clickit_app_logo_rounded.png');
    console.log("Successfully rounded new icon!");
  } catch (e) {
    console.error(e);
  }
}
run();
