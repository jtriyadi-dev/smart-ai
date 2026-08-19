const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create a valid PNG file purely in Node without external dependencies
function createPNG(width, height, r, g, b, a = 255) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw uncompressed bitmap data (filter byte 0 + RGBA per pixel per row)
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // No filter

    // Draw futuristic gradient & AI cube pattern
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const dx = x - width / 2;
      const dy = y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = width / 2;

      // Dark background gradient
      let pr = Math.round(7 + (15 - 7) * (y / height));
      let pg = Math.round(9 + (23 - 9) * (y / height));
      let pb = Math.round(14 + (43 - 14) * (y / height));
      let pa = 255;

      // Center glowing cyan/emerald circle & hexagon
      if (dist < maxDist * 0.7 && dist > maxDist * 0.65) {
        pr = 56; pg = 189; pb = 248; // Cyan ring
      } else if (dist < maxDist * 0.5 && dist > maxDist * 0.45) {
        pr = 16; pg = 185; pb = 129; // Emerald inner ring
      } else if (dist < maxDist * 0.25) {
        pr = 56; pg = 189; pb = 248; // Center glowing core
      } else if (Math.abs(dx) < width * 0.02 || Math.abs(dy) < height * 0.02) {
        if (dist < maxDist * 0.65) {
          pr = 56; pg = 189; pb = 248; // Cross grid lines
        }
      }

      rawData[pixelOffset] = pr;
      rawData[pixelOffset + 1] = pg;
      rawData[pixelOffset + 2] = pb;
      rawData[pixelOffset + 3] = pa;
    }
  }

  // Deflate IDAT chunk
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Helper to construct PNG chunk with CRC32
function makeChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);

  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);

  return Buffer.concat([length, body, crc]);
}

// Standard CRC32 table & calculation
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

// Ensure public/icons directory
const outDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Generate Icons
fs.writeFileSync(path.join(outDir, 'icon-192.png'), createPNG(192, 192));
fs.writeFileSync(path.join(outDir, 'icon-512.png'), createPNG(512, 512));
fs.writeFileSync(path.join(outDir, 'icon-maskable-192.png'), createPNG(192, 192));
fs.writeFileSync(path.join(outDir, 'icon-maskable-512.png'), createPNG(512, 512));
fs.writeFileSync(path.join(outDir, 'favicon.png'), createPNG(64, 64));
fs.writeFileSync(path.join(outDir, 'screenshot-desktop.png'), createPNG(1280, 720));
fs.writeFileSync(path.join(outDir, 'screenshot-mobile.png'), createPNG(750, 1334));

console.log('PWA PNG Icons and Screenshots generated successfully in public/icons/');
