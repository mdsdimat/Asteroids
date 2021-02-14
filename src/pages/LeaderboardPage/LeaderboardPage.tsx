// Core
import React from 'react';
import { useHistory } from 'react-router';

//import { Col, Row } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
//import { openNotificationWithIcon } from '@helpers/NotificationHelper';
import { gotLeaderboard } from '../../store/actionCreators/leaderboard';
import LeaderboardTable from './Table/LeaderboardTable';
import leaderboardSelector from '../../store/selectors/leaderboard';

export interface ILeadBoardRequestData {
  ratingFieldName: string,
  cursor: number,
  limit: number,
}

export const leaderboardRequestData: ILeadBoardRequestData = {
  ratingFieldName: 'points',
  cursor: 0,
  limit: 10,
};

const LeaderboardPage: React.FC = () => <>LeaderboardPage</>

/*const LeaderboardPage: React.FC = () => {
  const history = useHistory();

  const selector = useSelector(leaderboardSelector);

  if (selector.error) {
    if (selector.errorData.response?.status === 401) {
      history.push('/login');
    } else {
      openNotificationWithIcon('error', 'Ошибка', 'Что-то пошло не так');
    }
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(gotLeaderboard(leaderboardRequestData));
  }, []);

  return (
    <Row>
      <Col span={12} offset={6}>
        <LeaderboardTable data={selector.data} />
      </Col>
    </Row>
  );
};*/

// Exports
export default LeaderboardPage;
