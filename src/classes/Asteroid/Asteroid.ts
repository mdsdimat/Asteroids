import { randomNumBetween, rotatePoint, asteroidVertices } from '../../helpers/GameHelper';
import Particle from '../Particle/Particle';
import { Coord, Vector } from '../../types/game';

export default class Asteroid {
  private position: Coord;

  private velocity: Vector;

  private args: any;

  private rotation: number;

  private radius: number;

  private delete: boolean;

  private score: number;

  private rotationSpeed: number;

  private readonly create: any;

  private addScore: (score: number) => void;

  private vertices: Coord[];

  constructor(args: any) {
    const posDelta = rotatePoint(
      { x: 0, y: -20 },
      { x: 0, y: 0 },
      (args.rotation * Math.PI) / 180,
    );

    this.radius = args.size;

    this.velocity = {
      x: randomNumBetween(-3, 3),
      y: randomNumBetween(-3, 3),
    };

    this.position = args.position;

    this.rotation = 0;
    this.rotationSpeed = randomNumBetween(-1, 1);

    this.score = (80 / this.radius) * 5;
    this.vertices = asteroidVertices(8, args.size);

    this.addScore = args.addScore;

    this.create = args.create;

    this.delete = false;
  }

  destroy(): void {
    this.delete = true;

    this.addScore(this.score);

    // Explode
    for (let i = 0; i < this.radius; i++) {
      const particle = new Particle({
        lifeSpan: randomNumBetween(60, 100),
        size: randomNumBetween(1, 3),
        position: {
          x: this.position.x + randomNumBetween(-this.radius / 4, this.radius / 4),
          y: this.position.y + randomNumBetween(-this.radius / 4, this.radius / 4),
        },
        velocity: {
          x: randomNumBetween(-1.5, 1.5),
          y: randomNumBetween(-1.5, 1.5),
        },
      });
      this.create(particle, 'particles');
    }

    // Break into smaller asteroids
    if (this.radius > 10) {
      for (let i = 0; i < 2; i++) {
        const asteroid = new Asteroid({

          size: this.radius / 2,
          position: {
            x: randomNumBetween(-10, 20) + this.position.x,
            y: randomNumBetween(-10, 20) + this.position.y,
          },
          create: this.create.bind(this),
          addScore: this.addScore.bind(this)
        });
        this.create(asteroid, 'asteroids');
      }
    }
  }

  render(state: any): void {
    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Rotation
    this.rotation += this.rotationSpeed;
    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }

    // Screen edges
    if (this.position.x > state.screen.width + this.radius) this.position.x = -this.radius;
    else if (this.position.x < -this.radius) this.position.x = state.screen.width + this.radius;
    if (this.position.y > state.screen.height + this.radius) this.position.y = -this.radius;
    else if (this.position.y < -this.radius) this.position.y = state.screen.height + this.radius;

    // Draw
    const { context } = state;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * (Math.PI / 180));
    context.strokeStyle = '#FFF';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -this.radius);
    for (let i = 1; i < this.vertices.length; i++) {
      context.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    context.closePath();
    context.stroke();
    context.restore();
  }
}
