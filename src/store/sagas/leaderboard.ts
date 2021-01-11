import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { requestLeaderboard, requestLeaderboardError, requestLeaderboardSuccess } from '../actionCreators/leaderboard';
import { GOT_LEADERBOARD } from '../actions/leaderboard';
import LeaderboardApi from '../../api/LeaderboardApi';
import { ColumnType, IRequestData } from '../../pages/LeaderboardPage/Table/LeaderboardTable';

interface ILeadBoardSaga {
  type: string,
  leaderboardRequestData: IRequestData
}

export default function* watchGotLeaderboard(): SagaIterator {
  yield takeEvery(GOT_LEADERBOARD, gotLeaderboardAsync);
}

function* gotLeaderboardAsync(sagaData: ILeadBoardSaga) {
  try {
    yield put(requestLeaderboard());
    const data = yield call(() => LeaderboardApi.getAllLeaderboard(sagaData.leaderboardRequestData)
      .then(
        (response) => response.map((data, index): ColumnType => ({ key: index, ...data.data })),
      ));
    yield put(requestLeaderboardSuccess(data));
  } catch (error) {
    yield put(requestLeaderboardError(error));
  }
}
