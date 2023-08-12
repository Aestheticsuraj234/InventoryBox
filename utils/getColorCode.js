const getColorCode = (colorName) => {
    const getHashCode = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    };
  
    const hash = getHashCode(colorName);
    const hue = ((hash & 0x00ffffff) % 360) / 360;
    const saturation = 0.5; // You can adjust the saturation and lightness values as needed
    const lightness = 0.5;
    
    // Convert HSL to RGB
    const h = hue;
    const s = saturation;
    const l = lightness;
  
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // Achromatic color (gray)
    } else {
      const hueToRGB = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRGB(p, q, h + 1 / 3);
      g = hueToRGB(p, q, h);
      b = hueToRGB(p, q, h - 1 / 3);
    }
  
    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
  
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  
  export default getColorCode;
  