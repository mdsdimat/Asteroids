import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import AuthApi from '../../api/AuthApi';
import { IYandexOAuth, SignUser, UserAsync } from '../../types/types';
import authActions from '../actions/auth';
import {
  getUserSuccess, requestAuth, requestAuthError, requestAuthSuccess, yandexAuthSuccess,
} from '../actionCreators/auth';

interface IAuthSaga {
  type: string,
  values: SignUser
}

export default function* watchLogin(): SagaIterator {
  yield takeEvery(authActions.login, loginAsync);
  yield takeEvery(authActions.getUser, getUserAsync);
  yield takeEvery(authActions.yandexAuth, yandexAuthAsync);
}

function* loginAsync(sagaData: IAuthSaga) {
  try {
    yield put(requestAuth());
    const data = yield call(() => AuthApi.signIn(sagaData.values)
      .then(
        () => true,
      ));
    yield put(requestAuthSuccess(data));
  } catch (error) {
    if (error.response.status === 400 && error.response.data.reason === 'user already in system') {
      yield put(requestAuthSuccess(true));
    } else {
      yield put(requestAuthError(error));
    }
  }
}

function* getUserAsync(sagaData: UserAsync) {
  try {
    yield put(requestAuth());
    const data = yield call(() => AuthApi.getUser(sagaData.cookies)
      .then(
        (data) => data,
      ));
    yield put(getUserSuccess(true, data));
  } catch (error) {
    if (error.response.status !== 401) {
      yield put(requestAuthError(error));
    }
  }
}

function* yandexAuthAsync(sagaData: IYandexOAuth) {
  try {
    yield put(requestAuth());
    const data = yield call(() => AuthApi.oAuth(sagaData.code)
      .then(
        () => true,
      ));
    yield put(yandexAuthSuccess(data));
  } catch (error) {
    yield put(requestAuthError(error));
  }
}
