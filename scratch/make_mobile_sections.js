const sharp = require('sharp');
const fs = require('fs');

async function makeMobileSections() {
  const figma = 'design_export/mobile_full.png'; // 420 x 6500
  const live = 'C:/Users/LENOVO/AppData/Local/Temp/chrome-devtools-mcp-KsSEE4/screenshot.png'; // 780 x 13542

  // 6 mobile sections:
  // 1: Hero & Cafe
  // 2: Doorstep Delivery
  // 3: Daily Coffee
  // 4: Superbeans
  // 5: Polaroids
  // 6: Download CTA & Footer
  
  const sections = [
    { name: 'm1_hero_cafe', fTop: 0, fH: 1400, lTop: 0, lH: 2600 },
    { name: 'm2_delivery', fTop: 1400, fH: 900, lTop: 2600, lH: 1800 },
    { name: 'm3_daily_coffee', fTop: 2300, fH: 1000, lTop: 4400, lH: 2000 },
    { name: 'm4_superbeans', fTop: 3300, fH: 1000, lTop: 6400, lH: 2000 },
    { name: 'm5_polaroids', fTop: 4300, fH: 1400, lTop: 8400, lH: 3000 },
    { name: 'm6_download_footer', fTop: 5700, fH: 800, lTop: 11400, lH: 2142 }
  ];

  for (const s of sections) {
    const fBuf = await sharp(figma).extract({ left: 0, top: s.fTop, width: 420, height: s.fH }).resize(360).toBuffer();
    const lBuf = await sharp(live).extract({ left: 0, top: s.lTop, width: 780, height: s.lH }).resize(360).toBuffer();

    const fMeta = await sharp(fBuf).metadata();
    const lMeta = await sharp(lBuf).metadata();
    const maxH = Math.max(fMeta.height, lMeta.height);

    await sharp({
      create: {
        width: 760,
        height: maxH + 40,
        channels: 4,
        background: { r: 240, g: 240, b: 240, alpha: 1 }
      }
    }).composite([
      { input: fBuf, left: 10, top: 20 },
      { input: lBuf, left: 390, top: 20 }
    ]).toFile(`scratch/compare_${s.name}.png`);

    console.log(`Saved scratch/compare_${s.name}.png`);
  }
}

makeMobileSections().catch(console.error);
