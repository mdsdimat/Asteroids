export function rotatePoint(p: any, center: any, angle: any) {
  return {
    x: ((p.x - center.x) * Math.cos(angle) - (p.y - center.y) * Math.sin(angle)) + center.x,
    y: ((p.x - center.x) * Math.sin(angle) + (p.y - center.y) * Math.cos(angle)) + center.y,
  };
}

export function randomNumBetween(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}
