const { Jimp, JimpMime } = require('jimp');
const potrace = require('potrace');
const fs = require('fs');

const INPUT = 'C:/Users/mherr/OneDrive/Pictures/Screenshots/Screenshot 2026-03-18 184224.png';
const OUT_DIR = 'C:/Users/mherr/OneDrive/Documents/Proyectos/olanchonet-landing/public/images';

async function extractMask(image, colorTest) {
  const width = image.width;
  const height = image.height;
  const mask = new Jimp({ width, height, color: 0xffffffff }); // white background

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = image.bitmap.data[idx];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      const a = image.bitmap.data[idx + 3];
      if (a > 128 && colorTest(r, g, b)) {
        mask.setPixelColor(0x000000ff, x, y); // black = trace this
      }
    }
  }

  return mask;
}

function traceMask(mask) {
  return new Promise((resolve, reject) => {
    mask.getBuffer('image/png').then(buf => {
      potrace.trace(buf, {
        threshold: 128,
        optTolerance: 0.3,
        turdSize: 5,
      }, (err, svg) => {
        if (err) return reject(err);
        // Extract viewBox and path d
        const vbMatch = svg.match(/viewBox="([^"]+)"/);
        const pathMatch = svg.match(/d="([^"]+)"/);
        resolve({
          viewBox: vbMatch ? vbMatch[1] : null,
          path: pathMatch ? pathMatch[1] : null,
        });
      });
    });
  });
}

// Color filters — tuned for OlanchoNet brand colors
const isGreen = (r, g, b) => g > 130 && g > r * 1.4 && g > b * 1.3;
const isBlue  = (r, g, b) => b > 120 && b > r * 1.5 && b > g * 1.2;

async function main() {
  console.log('Loading image...');
  const image = await Jimp.read(INPUT);

  const { width, height } = image;
  console.log(`Image size: ${width}x${height}`);

  console.log('Extracting green mask...');
  const greenMask = await extractMask(image, isGreen);
  await greenMask.write('green-mask.png');

  console.log('Extracting blue mask...');
  const blueMask = await extractMask(image, isBlue);
  await blueMask.write('blue-mask.png');

  console.log('Tracing green...');
  const green = await traceMask(greenMask);
  console.log('ViewBox:', green.viewBox);
  console.log('Green path (first 100):', green.path?.substring(0, 100));

  console.log('Tracing blue...');
  const blue = await traceMask(blueMask);
  console.log('Blue path (first 100):', blue.path?.substring(0, 100));

  if (!green.path || !blue.path) {
    console.error('Failed to extract one or both paths');
    return;
  }

  const vb = green.viewBox; // both use same image dimensions

  // icon-color.svg
  const iconColor = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="OlanchoNet icon">
  <path fill="#4EB648" d="${green.path}"/>
  <path fill="#0076BB" d="${blue.path}"/>
</svg>`;

  // icon-white.svg
  const iconWhite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="OlanchoNet icon">
  <path fill="#ffffff" d="${green.path}"/>
  <path fill="#ffffff" d="${blue.path}"/>
</svg>`;

  fs.writeFileSync(`${OUT_DIR}/icon-color.svg`, iconColor);
  fs.writeFileSync(`${OUT_DIR}/icon-white.svg`, iconWhite);
  console.log('Saved icon-color.svg and icon-white.svg');

  // For full logo variants, compute offset to place text to the right
  const [,, vbW, vbH] = vb.split(' ').map(Number);
  const textX = vbW + 40;
  const textY1 = vbH * 0.52;
  const textY2 = vbH * 0.68;
  const fontSize1 = vbH * 0.22;
  const fontSize2 = vbH * 0.13;
  const logoW = vbW + vbW * 1.1;

  const logoColor = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${logoW} ${vbH}" role="img" aria-label="OlanchoNet logo">
  <path fill="#4EB648" d="${green.path}"/>
  <path fill="#0076BB" d="${blue.path}"/>
  <text x="${textX}" y="${textY1}" font-family="'Avenir Next','Avenir','Plus Jakarta Sans',Arial,sans-serif" font-size="${fontSize1}" font-weight="800" fill="#2d2d2d">OLANCHO</text>
  <text x="${textX + fontSize2 * 0.1}" y="${textY2}" font-family="'Avenir Next','Avenir','Plus Jakarta Sans',Arial,sans-serif" font-size="${fontSize2}" font-weight="300" letter-spacing="${fontSize2 * 0.2}" fill="#888888">NETWORKS</text>
</svg>`;

  const logoWhite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${logoW} ${vbH}" role="img" aria-label="OlanchoNet logo">
  <path fill="#ffffff" d="${green.path}"/>
  <path fill="#ffffff" d="${blue.path}"/>
  <text x="${textX}" y="${textY1}" font-family="'Avenir Next','Avenir','Plus Jakarta Sans',Arial,sans-serif" font-size="${fontSize1}" font-weight="800" fill="#ffffff">OLANCHO</text>
  <text x="${textX + fontSize2 * 0.1}" y="${textY2}" font-family="'Avenir Next','Avenir','Plus Jakarta Sans',Arial,sans-serif" font-size="${fontSize2}" font-weight="300" letter-spacing="${fontSize2 * 0.2}" fill="rgba(255,255,255,0.75)">NETWORKS</text>
</svg>`;

  fs.writeFileSync(`${OUT_DIR}/logo-color.svg`, logoColor);
  fs.writeFileSync(`${OUT_DIR}/logo-white.svg`, logoWhite);
  console.log('Saved logo-color.svg and logo-white.svg');
  console.log('Done!');
}

main().catch(console.error);
