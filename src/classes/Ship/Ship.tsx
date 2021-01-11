import { randomNumBetween, rotatePoint } from '../../helpers/GameHelper';
import { Coord, Vector, renderState, IShipProps, objectGroups } from '../../types/game';
import Particle from '../Particle/Particle';
import Bullet from '../Bullet/Bullet';

export default class Ship {
  public position: Coord;

  private velocity: Vector;

  private args?: IShipProps;

  private rotation: number;

  private readonly rotationSpeed: number;

  private readonly speed: number;

  private readonly inertia: number;

  public radius: number;

  private lastShot: number;

  private readonly create: (item: any, group: objectGroups) => void;

  private onDie: () => void;

  private delete: boolean;

  constructor(args: IShipProps) {
    this.args = args;
    this.position = args.position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.rotation = 0;
    this.rotationSpeed = 6;
    this.speed = 0.15;
    this.inertia = 0.99;
    this.radius = 20;
    this.lastShot = 0;
    this.create = args.create;
    this.onDie = args.onDie;
    this.delete = false;
  }

  rotate(dir: string): void {
    if (dir === 'LEFT') {
      this.rotation -= this.rotationSpeed;
    }
    if (dir === 'RIGHT') {
      this.rotation += this.rotationSpeed;
    }
  }

  isDelete(): boolean {
    return this.delete;
  }

  destroy(): void {
    this.delete = true;
    this.onDie();
  }

  accelerate = (): void => {
    this.velocity.x -= Math.sin(-this.rotation * (Math.PI / 180)) * this.speed;
    this.velocity.y -= Math.cos(-this.rotation * (Math.PI / 180)) * this.speed;

    const posDelta = rotatePoint(
      { x: 0, y: -10 },
      { x: 0, y: 0 },
      (this.rotation - 180) * (Math.PI / 180),
    );
    const particle = new Particle({
      lifeSpan: randomNumBetween(20, 40),
      size: randomNumBetween(1, 3),
      position: {
        x: this.position.x + posDelta.x + randomNumBetween(-2, 2),
        y: this.position.y + posDelta.y + randomNumBetween(-2, 2),
      },
      velocity: {
        x: posDelta.x / randomNumBetween(3, 5),
        y: posDelta.y / randomNumBetween(3, 5),
      },
    });
    this.create(particle, 'particles');
  }

  render(state: renderState): void {
    if (state.keys.up) {
      this.accelerate();
    }

    if (state.keys.left) {
      this.rotate('LEFT');
    }
    if (state.keys.right) {
      this.rotate('RIGHT');
    }

    if (state.keys.space) {
      if (this.lastShot === 0 || Date.now() - this.lastShot > 200) {
        const bullet = new Bullet({ position: this.position, rotation: this.rotation });

        this.velocity.x += Math.sin(-this.rotation * (Math.PI / 180)) * 0.1;
        this.velocity.y += Math.cos(-this.rotation * (Math.PI / 180)) * 0.1;

        this.create(bullet, 'bullets');

        this.lastShot = Date.now();
      }
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;

    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }

    if (this.position.x > state.screen.width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = state.screen.width;
    if (this.position.y > state.screen.height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = state.screen.height;

    const { context } = state;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * (Math.PI / 180));
    context.strokeStyle = '#ffffff';
    context.fillStyle = '#000000';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -15);
    context.lineTo(10, 10);
    context.lineTo(5, 7);
    context.lineTo(-5, 7);
    context.lineTo(-10, 10);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }
}
