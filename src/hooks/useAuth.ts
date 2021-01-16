import { useState } from 'react';
import { useHistory } from 'react-router';
import { openNotificationWithIcon } from '@helpers/NotificationHelper';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/actionCreators/auth';
import authSelector from '../store/selectors/auth';

export default function useAuth(): [() => void, Record<string, unknown>|unknown] {
  const history = useHistory();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const selector = useSelector(authSelector);
  const authUser = (): void => {
    if (!selector.isUserInfo && !selector.error && !selector.loading) {
      dispatch(getUser());
    }
    if (selector.isAuth && selector.isUserInfo) {
      openNotificationWithIcon('success', 'Пользователь авторизован', '');
      history.push('/');
    }
    if (selector.error) {
      setError(selector.errorData.response?.data);
      openNotificationWithIcon('error', 'Ошибка', selector.errorData.response?.data.reason);
      history.push('/login');
    }
  };
  return [authUser, error];
}
