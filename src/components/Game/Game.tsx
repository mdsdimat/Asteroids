import React, { useState, useEffect, useRef } from 'react';

import './game.less';

import {
  Asteroid, Ship,
} from '../../classes';

import { randomNumBetween } from '../../helpers/GameHelper';

import { timeFormat } from '../../helpers/TimeHelper';
import { objectsMap } from '../../types/game';

import useTimer from '../../helpers/Timer';

type GameTotalProps = {
  seconds: number;
  score: number;
}

type GameOverProps = {
  score: number;
  handlerStart: () => void;
}

const GameTotal : React.FC<GameTotalProps> = (props:GameTotalProps) => {
  const { score, seconds } = props;
  return (
    <>
      <div className="score-right__timer">{timeFormat(seconds)}</div>
      <div className="score-right__score">{score.toString().padStart(8, '0')}</div>
    </>
  );
};

const GameOver: React.FC<GameOverProps> = (props) => {
  const { score, handlerStart } = props;

  return (
    <>
      <div className="game__message">
        <h1 className="game__message--title">GAME OVER</h1>
        <h2 className="game__message--text">Поздравляем! Ваш счет</h2>
        <div className="game__message--score">{score}</div>
        <button className="game__message--start" onClick={handlerStart}>Начать все с начала</button>
      </div>
    </>
  );
};

const GamePause = (): JSX.Element => (
  <>
    <div className="game__message">
      <h1 className="game__message--title">Пауза</h1>
      <h2 className="game__message--text">Для продолжения нажмите ENTER</h2>
    </div>
  </>
);

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

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const [isPause, setIsPause] = useState(false);

  let stopGame = false;

  const scoreRef = useRef(0);
  const animationId = useRef(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState(canvasRef.current?.getContext('2d'));
  const [screen] = useState({
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
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    handleKeys(event, false);
  };

  const addScore = (s: number): void => {
    // не нашел простого способа запомнить счет
    scoreRef.current += s;
    setScore(scoreRef.current);
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
        addScore,
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
    console.log('start');

    setIsPause(false);
    setIsGameOver(false);
    stopGame = false;

    scoreRef.current = 0;
    setScore(scoreRef.current);

    timer.reset();
    timer.start();

    const ship = new Ship({
      position: {
        x: screen.width / 2,
        y: screen.height / 2,
      },
      create: createObject,
      onDie: gameOver,
    });
    createObject(ship, 'ships');
    generateAsteroids(asteroidsCount);
  };

  const pause = (): void => {
    stopGame = !stopGame;
    setIsPause(stopGame);

    console.log('Пауза', stopGame);

    if (stopGame) {
      timer.pause();
    } else {
      timer.start();
    }
  };

  const gameOver = () => {
    setIsGameOver(true);
    timer.pause();
  };

  const update = () => {
    const contextVal = context;

    // тут не тот isPause что нужен

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

    //console.log('pause=', isPause);

    // Next frame

    animationId.current = requestAnimationFrame(() => {
      update();
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

  const createObject = (item: any, group: 'ships' | 'bullets' | 'asteroids' | 'particles'): void => {
    objects[group].push(item);
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

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context !== undefined && context !== null) {
      setContext(context);
      start();

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      animationId.current = requestAnimationFrame(() => {
        update();
      });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    };
  }, [context]);// надо сюда функции добавить. Они не меняются?

  return (
    <div className="game">
      {isPause && !isGameOver ? <GamePause /> : '' }
      {isGameOver ? <GameOver score={score} handlerStart={restart} /> : ''}
      <div className="score-right">
        <GameTotal score={score} seconds={timer.seconds} />
      </div>

      <canvas
        ref={canvasRef}
        tabIndex={0}
        width={screen.width * screen.ratio}
        height={screen.height * screen.ratio}
      />

    </div>
  );
};
export default Game;
