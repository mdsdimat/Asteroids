import {
  Coord, Vector, renderState, IBulletProps,
} from '../../types/game';
import { rotatePoint } from '../../helpers/GameHelper';

export default class Bullet {
  public position: Coord;

  private velocity: Vector;

  private args?: IBulletProps;

  private rotation: number;

  public radius: number;

  private delete: boolean;

  constructor(args: IBulletProps) {
    const posDelta = rotatePoint(
      { x: 0, y: -20 },
      { x: 0, y: 0 },
      (args.rotation * Math.PI) / 180,
    );

    this.position = {
      x: args.position.x + posDelta.x,
      y: args.position.y + posDelta.y,
    };

    this.rotation = args.rotation;

    this.velocity = {
      x: posDelta.x / 2,
      y: posDelta.y / 2,
    };

    this.radius = 3;

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

    if (this.position.x < 0
      || this.position.y < 0
      || this.position.x > state.screen.width
      || this.position.y > state.screen.height) {
      this.destroy();
    }

    const { context } = state;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate((this.rotation * Math.PI) / 180);
    context.fillStyle = '#FFF';
    context.beginPath();
    context.arc(0, 0, this.radius, 0, this.radius * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}
