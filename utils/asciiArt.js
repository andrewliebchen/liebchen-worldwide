const ASCII_CHARS = ' .,:;i1tfLCG08@'.split('');

const getPixelIntensity = (r, g, b) => {
  return 0.299 * r + 0.587 * g + 0.114 * b;
};

export const imageToAscii = async (imageUrl, width = 100) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate height to maintain aspect ratio
      const ratio = img.height / img.width;
      const height = Math.floor(width * ratio * 0.5); // Multiply by 0.5 to account for terminal character height
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and get image data
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      let ascii = '';
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const idx = (i * width + j) * 4;
          const intensity = getPixelIntensity(
            pixels[idx],
            pixels[idx + 1],
            pixels[idx + 2]
          );
          
          // Map intensity to ASCII character
          const charIdx = Math.floor(intensity / 255 * (ASCII_CHARS.length - 1));
          ascii += ASCII_CHARS[charIdx];
        }
        ascii += '\n';
      }
      
      resolve(ascii);
    };
    
    img.onerror = reject;
    img.src = imageUrl;
  });
}; 