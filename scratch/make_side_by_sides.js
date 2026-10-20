const sharp = require('sharp');
const fs = require('fs');

async function makeSideBySides() {
  const figma = 'design_export/desktop_full.png'; // 1500 x 7945
  const live = 'C:/Users/LENOVO/.gemini/antigravity/brain/8e04740d-3ff4-4c45-80a7-951f68084639/.system_generated/steps/534/media_0.png'; // 1432 x 6011

  // Define section approximate ranges in Figma (1500x7945) and Live (1432x6011)
  // Let's create 8 sections:
  const sections = [
    { name: '1_hero', fTop: 0, fH: 1050, lTop: 0, lH: 800 },
    { name: '2_cafe', fTop: 1050, fH: 950, lTop: 800, lH: 700 },
    { name: '3_delivery', fTop: 2000, fH: 950, lTop: 1500, lH: 700 },
    { name: '4_subscription', fTop: 2950, fH: 1050, lTop: 2200, lH: 750 },
    { name: '5_superbeans', fTop: 4000, fH: 1050, lTop: 2950, lH: 750 },
    { name: '6_polaroids', fTop: 5050, fH: 1000, lTop: 3700, lH: 750 },
    { name: '7_download', fTop: 6050, fH: 1050, lTop: 4450, lH: 800 },
    { name: '8_footer', fTop: 7100, fH: 845, lTop: 5250, lH: 761 }
  ];

  for (const s of sections) {
    const fBuf = await sharp(figma).extract({ left: 0, top: s.fTop, width: 1500, height: s.fH }).resize(700).toBuffer();
    const lBuf = await sharp(live).extract({ left: 0, top: s.lTop, width: 1432, height: s.lH }).resize(700).toBuffer();
    
    const fMeta = await sharp(fBuf).metadata();
    const lMeta = await sharp(lBuf).metadata();
    const maxH = Math.max(fMeta.height, lMeta.height);

    await sharp({
      create: {
        width: 1440,
        height: maxH + 40,
        channels: 4,
        background: { r: 240, g: 240, b: 240, alpha: 1 }
      }
    }).composite([
      { input: fBuf, left: 10, top: 20 },
      { input: lBuf, left: 730, top: 20 }
    ]).toFile(`scratch/compare_${s.name}.png`);

    console.log(`Saved scratch/compare_${s.name}.png (Figma left, Live right)`);
  }
}

makeSideBySides().catch(console.error);
