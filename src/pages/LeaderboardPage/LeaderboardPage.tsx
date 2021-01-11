// Core
import React from 'react';
import { useHistory } from 'react-router';

// Types
import { AxiosError } from 'axios';

import { Col, Row } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { openNotificationWithIcon } from '@helpers/NotificationHelper';
import { gotLeaderboard } from '../../store/actionCreators/leaderboard';
import LeaderboardTable, { ColumnType } from './Table/LeaderboardTable';

export interface ILeadBoardRequestData {
  ratingFieldName: string,
  cursor: number,
  limit: number,
}

interface RootState {
  leaderboardReducer: {
    data: ColumnType[],
    error: boolean,
    errorData: AxiosError
  }
}

export const leaderboardRequestData: ILeadBoardRequestData = {
  ratingFieldName: 'points',
  cursor: 0,
  limit: 10,
};

const LeaderboardPage: React.FC = () => {
  const history = useHistory();

  const leaderboardSelector = useSelector((state: RootState) => state);

  if (leaderboardSelector.leaderboardReducer.error) {
    if (leaderboardSelector.leaderboardReducer.errorData.response?.status === 401) {
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
        <LeaderboardTable data={leaderboardSelector.leaderboardReducer.data} />
      </Col>
    </Row>
  );
};

// Exports
export default LeaderboardPage;
