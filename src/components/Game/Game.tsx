import React, { useState, useEffect, useRef } from 'react';

import './game.less';

import {
  Asteroid, Ship,
} from '../../classes';

import { randomNumBetween } from '../../helpers/GameHelper';

import { timeFormat } from '../../helpers/TimeHelper';
import { objectsMap } from '../../types/game';

function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const intervalRef = useRef(0);

  function clearIntervalRef() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  }

  function start() {
    if (intervalRef.current === 0) {
      setIsRunning(true);
      intervalRef.current = window.setInterval(() => setSeconds((s) => (s + 1)), 1000);
    }
  }

  function pause() {
    setIsRunning(false);
    clearIntervalRef();
  }

  function reset() {
    clearIntervalRef();
    setSeconds(0);
  }

  useEffect(() => {
    start();
    return clearIntervalRef;
  }, []);

  return {
    str: timeFormat(seconds), start, pause, reset, isRunning,
  };
}

type GameTotalProps = {
  score: number;
}

type GameOverProps = {
  score: number;
}

const GameTotal : React.FC<GameTotalProps> = (props) => {
  const { score } = props;
  const {
    str,
  } = useTimer();

  return (
    <>
      <div className="score-right__timer">{str}</div>
      <div className="score-right__score">{score.toString().padStart(8, '0')}</div>
    </>
  );
};

const GameOver: React.FC<GameOverProps> = (props) => {
  const { score } = props;
  return (
    <>
      <div className="game__message">
        <h1 className="game__message--title">GAME OVER</h1>
        <h2 className="game__message--text">Поздравляем! Ваш счет</h2>
        <div className="game__message--score">{score}</div>
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
  const [isGameOver] = useState(true);

  let isPause = false;

  const scoreRef = useRef(0);

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

  let asteroidsCount = 2;
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

    if (event.key === KEY.ESCAPE || event.key === KEY.ENTER) {
      pause();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    handleKeys(event, false);
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context !== undefined && context !== null) {
      setContext(context);
      start();

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
  }, [context]);// надо сюда функции добавить. Они не меняются?

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
        onDie: gameOver,
        addScore,
      });
      createObject(asteroid, 'asteroids');
    }
  };

  const start = () => {
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

  const pause = (): void => {
    isPause = !isPause;

    if (!isPause) {
      requestAnimationFrame(() => {
        update();
      });
    }
  };

  const gameOver = () => {
    inGame = false;
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

  return (
    <div className="game">
      {isPause ? <GamePause /> : '' }
      {isGameOver ? <GameOver score={score} /> : ''}
      <div className="score-right">
        <GameTotal score={score} />
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
