// Core
import React from 'react';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useDispatch, useSelector } from 'react-redux';
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

const LeaderboardPage: React.FC = () => {
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const selector = useSelector(leaderboardSelector);

  if (selector.error) {
    if (selector.errorData.response?.status === 401) {
      history.push('/login');
    } else {
      enqueueSnackbar('Что-то пошло не так', {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    }
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(gotLeaderboard(leaderboardRequestData));
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5">
        Доска почёта
      </Typography>
      <LeaderboardTable data={selector.data} />
    </Container>
  );
};

// Exports
export default LeaderboardPage;
