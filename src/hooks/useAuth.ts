import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUrlParam } from '@helpers/UrlHelper';
import { useSnackbar } from 'notistack';
import { getUser, yandexAuth } from '../store/actionCreators/auth';
import authSelector from '../store/selectors/auth';

export default function useAuth(): [() => void, Record<string, unknown>|unknown] {
  const history = useHistory();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const selector = useSelector(authSelector);
  const authUser = (): void => {
    const code = getUrlParam('code');
    if (!selector.isUserInfo && !selector.error && !selector.loading) {
      if (code && !selector.isAuth) {
        dispatch(yandexAuth(code));
      } else {
        dispatch(getUser());
      }
    }
    if (selector.isAuth && selector.isUserInfo) {
      enqueueSnackbar('Пользователь авторизован', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
      history.push('/');
    }
    if (selector.error) {
      setError(selector.errorData.response?.data);
      enqueueSnackbar(selector.errorData.response?.data.reason, {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
      history.push('/login');
    }
  };
  return [authUser, error];
}
