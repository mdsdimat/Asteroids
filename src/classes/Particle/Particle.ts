import {
  Coord, Vector, renderState, IParticleProps,
} from '@types/game';

export default class Particle {
  public position: Coord;

  private velocity: Vector;

  public radius: number;

  private lifeSpan: number;

  private readonly inertia: number;

  private delete: boolean;

  constructor(args: IParticleProps) {
    this.position = args.position;
    this.velocity = args.velocity;
    this.radius = args.size;
    this.lifeSpan = args.lifeSpan;
    this.inertia = 0.98;
    this.delete = false;
  }

  isDelete(): boolean {
    return this.delete;
  }

  destroy(): void {
    this.delete = true;
  }

  render(state: renderState): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;

    this.radius -= 0.1;
    if (this.radius < 0.1) {
      this.radius = 0.1;
    }
    if (this.lifeSpan-- < 0) {
      this.destroy();
    }

    const { context } = state;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.fillStyle = '#ffffff';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -this.radius);
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}
