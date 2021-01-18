import { useSelector } from 'react-redux';
import authSelector from '../store/selectors/auth';

export default function IsAuth(): boolean {
  const selector = useSelector(authSelector);

  return selector.isUserInfo;
}
