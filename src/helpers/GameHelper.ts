import { Coord } from '../types/game';

export function rotatePoint(p: Coord, center: Coord, angle: number): Coord {
  return {
    x: ((p.x - center.x) * Math.cos(angle) - (p.y - center.y) * Math.sin(angle)) + center.x,
    y: ((p.x - center.x) * Math.sin(angle) + (p.y - center.y) * Math.cos(angle)) + center.y,
  };
}

export function randomNumBetween(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}

export function asteroidVertices(count: number, rad: number): Coord[] {
  const p: Coord[] = [];

  for (let i = 0; i < count; i++) {
    p[i] = {
      x: (
        -Math.sin((360 / count) * i * (Math.PI / 180))
        + Math.round(Math.random() * 2 - 1) * (Math.random() / 3)
      ) * rad,
      y: (
        -Math.cos((360 / count) * i * (Math.PI / 180))
        + Math.round(Math.random() * 2 - 1) * (Math.random() / 3)
      ) * rad,
    };
  }
  return p;
}

export function throttle(func: () => void, ms: number): () => void {
  let isThrottled = false;
  let savedArgs: [] | null;
  let savedThis: Function | null;

  function wrapper(this: Function, ...args: []): void {
    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    func.apply(this, args);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs && savedThis) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

export function maxGameHeight(): number {
  return document.fullscreenElement ? window.innerHeight : window.innerHeight - 150;
}

export function soundWithInterrupt (audio: HTMLAudioElement): void {
  audio.currentTime = 0;
  audio.play();
}
