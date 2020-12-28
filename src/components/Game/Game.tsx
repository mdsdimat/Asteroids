import React from 'react';

import './game.less';

const GameTotal = (): JSX.Element => {
  return (
    <>
    <div className="score-right__timer">00:12</div>
    <div className="score-right__score">00001024</div>
    <div className="score-right__lifes">AAAA</div>
    </>
  );
};

const Game = (): JSX.Element => {

  return (
    
      <div className="game">
        <div className="game__overlay">
          <div className="game__message">
            <h1 className="game__message--title" >GAME OVER</h1>
            <h2 className="game__message--text">Поздравляем! Ваш счет</h2>
            <div className="game__message--score">1024</div>
            Для продолжения нажмите ENTER
          </div>

          <div className="score-right">
            <GameTotal />
          </div>
        </div>
        <canvas className="game__canvas" />
      </div>
    
  );
};

export default Game;
