import React, {useRef, useEffect, useState} from 'react'
import Ship from "../../classes/Ship/Ship";

const KEY = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  A: "KeyA",
  D: "KeyD",
  W: "KeyW",
  SPACE: "Space"
};

const Canvas = () => {

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
  })

  const objects: { ships: any[] } = {
    ships: []
  }

  const handleKeys = (event: any, value: boolean) => {
    let keysVal = keys;
    if(event.code === KEY.LEFT   || event.code === KEY.A) keysVal.left  = value;
    if(event.code === KEY.RIGHT  || event.code === KEY.D) keysVal.right = value;
    if(event.code === KEY.UP     || event.code === KEY.W) keysVal.up    = value;
    if(event.code === KEY.SPACE) keysVal.space = true;
    setKeys(keysVal)
  }

  const handleKeyDown = (event: any) => {
    handleKeys(event, true)
  }

  const handleKeyUp = (event: any) => {
    handleKeys(event, false)
  }

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context !== undefined && context !== null) {
      setContext(context);
      startGame();

      requestAnimationFrame(() => {
        update()
      });
    }
  }, [context])

  const startGame = () => {
    let ship = new Ship({
      position: {
        x: screen.width / 2,
        y: screen.height / 2
      },
      create: createObject,
    });
    createObject(ship, 'ship');
  }

  const createObject = (item: Ship, group: any) => {
    objects.ships.push(item);
  }

  const update = () => {
    const contextVal = context;

    if (contextVal !== undefined && contextVal !== null) {
      contextVal.save();
      contextVal.scale(screen.ratio, screen.ratio);

      contextVal.fillStyle = '#000';
      contextVal.globalAlpha = 0.4;
      contextVal.fillRect(0, 0, screen.width, screen.height);
      contextVal.globalAlpha = 1;

      updateObjects(objects.ships, 'ship')

      contextVal.restore();
    }

    // Next frame
    requestAnimationFrame(() => {update()});
  }

  const updateObjects = (items: any, group: any) => {
    let index = 0;
    for (let item of items) {
      if (item.delete) {
        [group].splice(index, 1);
      } else {
        items[index].render({screen, context, keys});
      }
      index++;
    }
  }

  return <canvas
    ref={canvasRef}
    tabIndex={0}
    width={screen.width * screen.ratio}
    height={screen.height * screen.ratio}
    onKeyDown={handleKeyDown}
    onKeyUp={handleKeyUp}
  />
}

export default Canvas;