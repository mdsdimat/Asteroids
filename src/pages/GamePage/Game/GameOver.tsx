import React from 'react';

type GameOverProps = {
  score: number;
  handlerStart: () => void;
}

const GameOver: React.FC<GameOverProps> = (props: GameOverProps) => {
  const { score, handlerStart } = props;

  return (
    <>
      <div className="game__message">
        <h1 className="game__message--title">GAME OVER</h1>
        <h2 className="game__message--text">Поздравляем! Ваш счет</h2>
        <div className="game__message--score">{score}</div>
        <button className="game__message--start" type="button" onClick={handlerStart}>Начать все с начала</button>
      </div>
    </>
  );
};

export default GameOver;
