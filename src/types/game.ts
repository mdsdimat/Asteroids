import {
  Asteroid, Ship, Bullet, Particle
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

export type objectTypes = Ship | Bullet | Asteroid | Particle
