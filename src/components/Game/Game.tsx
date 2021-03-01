import React, { useState, useEffect, useRef } from 'react';

import './game.less';

import {
  Asteroid, Ship,
} from '@classes';

import {
  randomNumBetween, throttle, maxGameHeight, soundWithInterrupt,
} from '@helpers/GameHelper';
import useTimer from '@helpers/Timer';
import {
  objectsMap, gameObjects, objectGroups, screenType, IAudio,
} from '@types/game';
import GameTotal from './GameTotal';
import GameOver from './GameOver';
import GamePause from './GamePause';

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
  F: ['f', 'а'],
};

const AUDIO_IDS = {
  LASER: 'audio_laser',
  DETONATION: 'audio_detonation',
};

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const [isPause, setIsPause] = useState(false);

  const audio: IAudio = {
    audioLaser: null,
    audioDetonation: null,
  };

  const stopGame = useRef(false);
  const endGame = useRef(false);

  const scoreRef = useRef(0);
  const animationId = useRef(0);

  const screen = useRef<screenType>({
    width: window.innerWidth,
    height: maxGameHeight(),
    ratio: window.devicePixelRatio || 1,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [keys, setKeys] = useState({
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
    f: false,
  });

  const timer = useTimer();

  let asteroidsCount = 2;

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

    if (event.key === KEY.ESCAPE || event.key === KEY.ENTER) {
      pause();
    }
    if (KEY.F.includes(event.key)) {
      toggleFullScreen();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    handleKeys(event, false);
  };

  const addScore = (s: number): void => {
    scoreRef.current += s;
    setScore(scoreRef.current);
  };

  const detonation = (): void => {
    if (audio.audioDetonation) {
      soundWithInterrupt(audio.audioDetonation);
    }
  };

  const generateAsteroids = (count: number): void => {
    for (let i = 0; i < count; i++) {
      const asteroid = new Asteroid({
        size: 80,
        position: {
          x: randomNumBetween(0, screen.current.width),
          y: randomNumBetween(0, screen.current.height),
        },
        create: createObject,
        addScore,
        detonation,
      });
      createObject(asteroid, 'asteroids');
    }
  };

  const restart = () => {
    cancelAnimationFrame(animationId.current);
    start();

    animationId.current = requestAnimationFrame(() => {
      update();
    });
  };

  const start = () => {
    setIsPause(false);
    setIsGameOver(false);
    stopGame.current = false;
    endGame.current = false;

    scoreRef.current = 0;
    setScore(scoreRef.current);

    timer.reset();
    timer.start();

    const ship = new Ship({
      position: {
        x: screen.current.width / 2,
        y: screen.current.height / 2,
      },
      create: createObject,
      onDie: gameOver,
      audio,
    });
    createObject(ship, 'ships');
    generateAsteroids(asteroidsCount);
  };

  const pause = (): void => {
    if (!endGame.current) {
      stopGame.current = !stopGame.current;
      setIsPause(stopGame.current);

      if (stopGame.current) {
        timer.pause();
      } else {
        timer.start();
      }
    }
  };

  const gameOver = () => {
    setIsGameOver(true);
    setIsPause(false);
    endGame.current = true;
    stopGame.current = false;
    timer.pause();
  };

  const update = () => {
    const context = canvasRef.current?.getContext('2d');

    if (!stopGame.current && context !== undefined && context !== null) {
      context.save();
      context.scale(screen.current.ratio, screen.current.ratio);

      context.fillStyle = '#000';
      context.globalAlpha = 0.4;
      context.fillRect(0, 0, screen.current.width, screen.current.height);
      context.globalAlpha = 1;

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

      context.restore();
    }

    animationId.current = requestAnimationFrame(() => {
      update();
    });
  };

  const updateObjects = (items: gameObjects[], group: objectGroups) => {
    let index = 0;
    const context = canvasRef.current?.getContext('2d');

    for (const item of items) {
      if (item.isDelete()) {
        objects[group].splice(index, 1);
      } else if (context) {
        const tmp = screen.current;
        items[index].render({ screen: tmp, context, keys });
      }
      index++;
    }
  };

  const createObject = (item: any, group: objectGroups): void => {
    objects[group].push(item);
  };

  const checkCollisionsWith = (items1: gameObjects[], items2: gameObjects[]) => {
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

  const checkCollision = (obj1: gameObjects, obj2: gameObjects) => {
    const vx = obj1.position.x - obj2.position.x;
    const vy = obj1.position.y - obj2.position.y;
    const length = Math.sqrt(vx * vx + vy * vy);
    if (length < obj1.radius + obj2.radius) {
      return true;
    }
    return false;
  };

  const resize = () => {
    screen.current = {
      width: window.innerWidth,
      height: maxGameHeight(),
      ratio: window.devicePixelRatio || 1,
    };
  };

  const toggleFullScreen = (): void => {
    const gameBlock = document.querySelector('.game');
    if (!document.fullscreenElement) {
      if (gameBlock) {
        gameBlock.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  };

  const resizeThrottle = throttle(resize, 1000);

  useEffect(() => {
    window.addEventListener('resize', resizeThrottle);
    audio.audioLaser = document.querySelector(`#${AUDIO_IDS.LASER}`);
    audio.audioDetonation = document.querySelector(`#${AUDIO_IDS.DETONATION}`);

    return () => window.removeEventListener('resize', resizeThrottle);
  });

  useEffect(() => {
    start();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    animationId.current = requestAnimationFrame(() => {
      update();
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      window.cancelAnimationFrame(animationId.current);
      animationId.current = 0;
    };
  }, []);

  return (
    <div className="game">
      {isPause && !isGameOver ? <GamePause /> : '' }
      {isGameOver ? <GameOver score={score} handlerStart={restart} /> : ''}
      <div className="score-right">
        <GameTotal score={score} seconds={timer.seconds} />
      </div>

      <audio id={AUDIO_IDS.LASER} src="/src/audio/laser.mp3" preload="auto" />
      <audio id={AUDIO_IDS.DETONATION} src="/src/audio/detonation.mp3" preload="auto" />
      <canvas
        ref={canvasRef}
        tabIndex={0}
        width={screen.current.width * screen.current.ratio}
        height={screen.current.height * screen.current.ratio}
      />

    </div>
  );
};
export default Game;
