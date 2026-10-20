const sharp = require('sharp');
const fs = require('fs');

async function sliceSections() {
  const figma = 'design_export/desktop_full.png'; // 1500 x 7945
  const live = 'C:/Users/LENOVO/.gemini/antigravity/brain/8e04740d-3ff4-4c45-80a7-951f68084639/.system_generated/steps/534/media_0.png'; // 1432 x 6011

  // Let's create 8 detailed section comparisons
  // Let's determine the Y offsets in Figma (total 7945):
  // 1. Hero: 0 -> 1150
  // 2. Cloud cafe (honeycomb): 1150 -> 2050
  // 3. Delivery (scooter/door): 2050 -> 3000
  // 4. Daily coffee (timeline): 3000 -> 4050
  // 5. Superbeans: 4050 -> 5100
  // 6. Polaroids: 5100 -> 6150
  // 7. Download CTA: 6150 -> 7150
  // 8. Footer: 7150 -> 7945

  // Let's inspect the exact Y positions of section titles in Figma:
  const figmaMeta = await sharp(figma).metadata();
  console.log('Figma:', figmaMeta.width, 'x', figmaMeta.height);
  
  const liveMeta = await sharp(live).metadata();
  console.log('Live:', liveMeta.width, 'x', liveMeta.height);
}

sliceSections();
