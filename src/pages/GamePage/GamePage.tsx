// Core
import React from 'react';
import { useSelector } from 'react-redux';

import Game from '../../components/Game';

// Helpers
import useAuth from '../../hooks/useAuth';
import authSelector from '../../store/selectors/auth';

const GamePage: React.FC = () => <>GamePage</>

/*const GamePage: React.FC = () => {
  const [authUser] = useAuth();

  const selector = useSelector(authSelector);

  React.useEffect(() => {
    authUser();
  }, [selector]);

  return (<Game />);
};*/

// Exports
export default GamePage;
