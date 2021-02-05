import React from 'react';
import {useSelector} from "react-redux";
import authSelector from "../../store/selectors/auth";
import {IAddUserLeaderboard} from "../../types/types";
import LeaderboardApi from "../../api/LeaderboardApi";
import {openNotificationWithIcon} from "@helpers/NotificationHelper";

type GameOverProps = {
  score: number;
  handlerStart: () => void;
}

const GameOver: React.FC<GameOverProps> = (props: GameOverProps) => {
  const { score, handlerStart } = props;
  const selector = useSelector(authSelector);

  React.useEffect(() => {
    if (score !== 0 && selector.isAuth) {
      let today = new Date().toISOString().slice(0, 10)

      const data: IAddUserLeaderboard = {
        name: selector.userData.login,
        points: score,
        date: today
      }
      LeaderboardApi.addLeaderboard(data)
        .catch(() => {
          openNotificationWithIcon('error', 'Ошибка', 'Не удалось сохранить результат');
        });
    }
  }, []);

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
