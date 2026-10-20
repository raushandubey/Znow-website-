const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateComparisons() {
  const figmaPath = 'design_export/desktop_full.png';
  const livePath = 'C:/Users/LENOVO/.gemini/antigravity/brain/8e04740d-3ff4-4c45-80a7-951f68084639/.system_generated/steps/534/media_0.png';
  
  if (!fs.existsSync('scratch')) fs.mkdirSync('scratch');

  // Let's create 6 section crops from Figma Desktop (width: 1500, height: 7945)
  // And corresponding sections from Live Desktop (width: 1432, height: 6011)
  
  // Section 1: Hero + Skyline + Phone + Awning
  // Section 2: Cloud cafe network / Honeycomb
  // Section 3: Doorstep delivery (scooter + door + button)
  // Section 4: Daily coffee subscription (timeline + phone)
  // Section 5: Superbeans (loyalty diagram)
  // Section 6: What's brewing (polaroids)
  // Section 7: Download CTA (QR code card + buttons)
  // Section 8: Footer
  
  // Let's create an overview comparison: side-by-side full page scaled down
  const figmaSmall = await sharp(figmaPath).resize(600, 3178).toBuffer();
  const liveSmall = await sharp(livePath).resize(600, 3178).toBuffer();
  
  await sharp({
    create: {
      width: 1240,
      height: 3178,
      channels: 4,
      background: { r: 30, g: 30, b: 30, alpha: 1 }
    }
  }).composite([
    { input: figmaSmall, left: 10, top: 0 },
    { input: liveSmall, left: 630, top: 0 }
  ]).toFile('scratch/side_by_side_overview.png');
  
  console.log('Created scratch/side_by_side_overview.png');
}

generateComparisons().catch(console.error);
