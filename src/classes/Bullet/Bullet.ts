import { Coord } from '../../types/game';
import { randomNumBetween, rotatePoint } from '../../helpers/GameHelper';

/* type Coord = {
  x: number
  y: number
}

type params = {
  rotation: number,
  position: Coord
} */

export default class Bullet {
  private position: Coord;

  private velocity: { x: number; y: number };

  private args: any;

  private rotation: number;

  private radius: number;

  private delete: boolean;

  private readonly create: any;

  constructor(args: any) {
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

  destroy(): void {
    this.delete = true;
  }

  render(state: any) {
    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Delete if it goes out of bounds
    if (this.position.x < 0
      || this.position.y < 0
      || this.position.x > state.screen.width
      || this.position.y > state.screen.height) {
      this.destroy();
    }

    // Draw
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
