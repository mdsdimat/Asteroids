import React, { useRef, useEffect, useState } from 'react';
import Ship from '../../classes/Ship/Ship';
import Bullet from '../../classes/Bullet/Bullet';
import Asteroid from '../../classes/Asteroid/Asteroid';
import Particle from '../../classes/Particle/Particle';
import { randomNumBetween } from '../../helpers/GameHelper';

const KEY = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  A: 'KeyA',
  D: 'KeyD',
  W: 'KeyW',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ENTER: 'Enter',
};

type objectsMap = {
  ships: any[]
  bullets: any[]
  asteroids: any[]
  particles: any[]
}

type objectTypes = Ship | Bullet | Asteroid | Particle

const Canvas = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState(canvasRef.current?.getContext('2d'));
  const [screen, setScreen] = useState({
    width: 1300,
    height: 600,
    ratio: window.devicePixelRatio || 1,
  });
  const [keys, setKeys] = useState({
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
  });

  let asteroidsCount = 2;
  let isPause = false;
  let inGame: boolean;

  const objects: objectsMap = {
    ships: [],
    bullets: [],
    asteroids: [],
    particles: [],
  };

  const handleKeys = (event: KeyboardEvent, value: boolean) => {
    const keysVal = keys;

    if (event.key === KEY.LEFT || event.key === KEY.A) keysVal.left = value;
    if (event.key === KEY.RIGHT || event.key === KEY.D) keysVal.right = value;
    if (event.key === KEY.UP || event.key === KEY.W) keysVal.up = value;
    if (event.key === KEY.SPACE) keysVal.space = value;
    setKeys(keysVal);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    handleKeys(event, true);

    if (event.key === KEY.ESCAPE) {
      pauseGame();
    }
    if (event.key === KEY.ENTER) {
      pauseGame();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    handleKeys(event, false);
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context !== undefined && context !== null) {
      setContext(context);
      startGame();

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      requestAnimationFrame(() => {
        update();
      });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    };
  }, [context]);// надо сюда функции добавить?

  const startGame = () => {
    inGame = true;
    const ship = new Ship({
      position: {
        x: screen.width / 2,
        y: screen.height / 2,
      },
      create: createObject,
    });
    createObject(ship, 'ships');
    generateAsteroids(asteroidsCount);
  };

  const gameOver = () => {
    inGame = false;
  };

  const pauseGame = (): void => {
    isPause = !isPause;

    if (!isPause) {
      requestAnimationFrame(() => {
        update();
      });
    }
  };

  const createObject = (item: any, group: 'ships' | 'bullets' | 'asteroids' | 'particles'): void => {
    objects[group].push(item);
  };

  const generateAsteroids = (count: number): void => {
    const ship = objects.ships[0];
    for (let i = 0; i < count; i++) {
      const asteroid = new Asteroid({
        size: 80,
        position: {
          x: randomNumBetween(0, screen.width),
          y: randomNumBetween(0, screen.height),
        },
        create: createObject,
        onDie: gameOver,
        // addScore: this.addScore.bind(this),
      });
      createObject(asteroid, 'asteroids');
    }
  };

  const checkCollisionsWith = (items1: any, items2: any) => {
    for (let i = 0; i < items1.length; i++) {
      for (let j = 0; j < items2.length; j++) {
        const item1 = items1[i];
        const item2 = items2[j];

        if (checkCollision(item1, item2)) {
          item1.destroy();
          item2.destroy();
        }
      }
    }
  };

  const checkCollision = (obj1: any, obj2: any) => {
    const vx = obj1.position.x - obj2.position.x;
    const vy = obj1.position.y - obj2.position.y;
    const length = Math.sqrt(vx * vx + vy * vy);
    if (length < obj1.radius + obj2.radius) {
      return true;
    }
    return false;
  };

  const update = () => {
    const contextVal = context;

    if (contextVal !== undefined && contextVal !== null) {
      contextVal.save();
      contextVal.scale(screen.ratio, screen.ratio);

      contextVal.fillStyle = '#000';
      contextVal.globalAlpha = 0.4;
      contextVal.fillRect(0, 0, screen.width, screen.height);
      contextVal.globalAlpha = 1;

      if (objects.asteroids.length === 0) {
        asteroidsCount++;

        generateAsteroids(asteroidsCount);
      }

      updateObjects(objects.ships, 'ships');
      updateObjects(objects.asteroids, 'asteroids');
      updateObjects(objects.bullets, 'bullets');
      updateObjects(objects.particles, 'particles');

      checkCollisionsWith(objects.bullets, objects.asteroids);
      checkCollisionsWith(objects.ships, objects.asteroids);

      contextVal.restore();
    }

    // Next frame
    requestAnimationFrame(() => {
      if (!isPause) {
        update();
      }
    });
  };

  const updateObjects = (items: any, group: 'ships' | 'bullets' | 'asteroids' | 'particles') => {
    let index = 0;
    for (const item of items) {
      if (item.delete) {
        objects[group].splice(index, 1);
      } else {
        items[index].render({ screen, context, keys });
      }
      index++;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      width={screen.width * screen.ratio}
      height={screen.height * screen.ratio}
    />
  );
};

export default Canvas;
