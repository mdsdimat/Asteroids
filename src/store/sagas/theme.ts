import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import ThemeApi from '../../api/ThemeApi';
import { ThemeType } from '../../types/types';
import themeActions from '../actions/theme';
import {
  requestThemeSuccess,
} from '../actionCreators/theme';

interface IThemeSaga {
  type: string,
  name: string,
}

export default function* watchTheme(): SagaIterator {
  yield takeEvery(themeActions.setTheme, setThemeStore);
  yield takeEvery(themeActions.getTheme, getTheme);
}

function* setThemeStore(sagaData: IThemeSaga) {
  const data = yield call(() => ThemeApi.setTheme(sagaData.name).then((data) => data));
  if (data.ok) {
    requestThemeSuccess(sagaData.name);
  }
}

function* getTheme() {
  const data = yield call(() => ThemeApi.getTheme().then((data) => data));

  yield put(requestThemeSuccess(data.name));
}
