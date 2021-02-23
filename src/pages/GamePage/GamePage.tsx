// Core
import React from 'react';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import NoSsr from '@material-ui/core/NoSsr';

import Game from '../../components/Game';

// Helpers
import useAuth from '../../hooks/useAuth';
import authSelector from '../../store/selectors/auth';

const GamePage: React.FC = () => {
  const [authUser] = useAuth();

  const selector = useSelector(authSelector);

  React.useEffect(() => {
    authUser();
  }, [selector]);

  return (
    <>
      <Helmet>
        <title>Asteroids</title>
      </Helmet>
      <NoSsr><Game /></NoSsr>
    </>
  );
};

// Exports
export default GamePage;
