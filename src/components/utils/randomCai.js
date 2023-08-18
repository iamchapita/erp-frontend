export function generateRandomCAI() {
    const segments = [4, 6, 2, 4];
    let cai = '';
  
    for (const segmentLength of segments) {
      let segment = '';
      for (let i = 0; i < segmentLength; i++) {
        segment += Math.floor(Math.random() * 10);
      }
      cai += segment + '-';
    }
  
    // Eliminar el último guión adicional
    cai = cai.slice(0, -1);
  
    return cai;
  }