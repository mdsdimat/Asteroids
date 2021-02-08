import {
  Asteroid, Ship, Bullet, Particle,
} from '../classes';

export type Coord = {
  x: number
  y: number
}

export type Vector = {
  x: number
  y: number
}

export type objectsMap = {
  ships: Ship[]
  bullets: Bullet[]
  asteroids: Asteroid[]
  particles: Particle[]
}

export type gameObjects = Ship | Bullet | Asteroid | Particle
export type objectGroups = 'ships' | 'bullets' | 'asteroids' | 'particles'

export type screenType = {
    width: number,
    height: number,
    ratio: number
}

export type keysType = {
  left: boolean,
  right: boolean,
  up: boolean,
  down: boolean,
  space: boolean,
}

export type renderState = {
  screen: screenType,
  context: CanvasRenderingContext2D,
  keys: keysType
}

export interface IParticleProps {
  position: {x: number, y: number},
  velocity: {x: number, y: number},
  size: number,
  lifeSpan: number
}

export interface IAsteroidProps {
  position: {x: number, y: number},
  size: number,
  // не понимаю почему eslint говорит что параметры не используются. Используются они
  addScore: (s: number) => void,
  create: (item: any, group: objectGroups) => void
  detonation: () => void
}

export interface IShipProps {
  position: {x: number, y: number},
  create: (item: any, group: objectGroups) => void
  onDie: () => void
}

export interface IBulletProps {
  position: {x: number, y: number},
  rotation: number
}

export interface IAudio {
  audioLaser: HTMLAudioElement | null,
  audioDetonation: HTMLAudioElement | null,
}
