import React from 'react';

import { timeFormat } from '@helpers/TimeHelper';

type GameTotalProps = {
  seconds: number;
  score: number;
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

export default GameTotal;
