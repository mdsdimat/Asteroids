interface IParticleProps {
  position: {x: number, y: number},
  velocity: {x: number, y: number},
  size: any,
  lifeSpan: any
}

export default class Particle {
  private position: {x: number, y: number};
  private velocity: {x: number, y: number};
  private radius: any;
  private lifeSpan: any;
  private readonly inertia: number;
  private delete: boolean;
  constructor(args: IParticleProps) {
    this.position = args.position
    this.velocity = args.velocity
    this.radius = args.size;
    this.lifeSpan = args.lifeSpan;
    this.inertia = 0.98;
    this.delete = false;
  }

  destroy(){
    this.delete = true;
  }

  render(state: any){
    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;

    // Shrink
    this.radius -= 0.1;
    if(this.radius < 0.1) {
      this.radius = 0.1;
    }
    if(this.lifeSpan-- < 0){
      this.destroy()
    }

    // Draw
    const context = state.context;
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
