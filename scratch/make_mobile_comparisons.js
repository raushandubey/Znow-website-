const sharp = require('sharp');
const fs = require('fs');

async function makeMobileSideBySides() {
  const figma = 'design_export/mobile_full.png'; // 420 x 6500
  const live = 'C:/Users/LENOVO/AppData/Local/Temp/chrome-devtools-mcp-KsSEE4/screenshot.png'; // 780 x 13542

  // Scale both to 400px width
  const fBuf = await sharp(figma).resize(400).toBuffer();
  const lBuf = await sharp(live).resize(400).toBuffer();
  
  const fMeta = await sharp(fBuf).metadata();
  const lMeta = await sharp(lBuf).metadata();
  console.log('Mobile Figma 400w height:', fMeta.height);
  console.log('Mobile Live 400w height:', lMeta.height);

  const maxH = Math.max(fMeta.height, lMeta.height);
  await sharp({
    create: {
      width: 840,
      height: maxH,
      channels: 4,
      background: { r: 30, g: 30, b: 30, alpha: 1 }
    }
  }).composite([
    { input: fBuf, left: 10, top: 0 },
    { input: lBuf, left: 430, top: 0 }
  ]).toFile('scratch/mobile_side_by_side_overview.png');
  console.log('Created scratch/mobile_side_by_side_overview.png');
}

makeMobileSideBySides().catch(console.error);
