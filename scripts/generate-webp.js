const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

(async () => {
  const imagesDir = path.join(__dirname, '../src/images');
  const files = fs.readdirSync(imagesDir).filter(file => /\.(jpg|png)$/i.test(file));

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, `${path.parse(file).name}.webp`);
    
    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    console.log(`Converted ${file} to WebP`);
  }
})(); 