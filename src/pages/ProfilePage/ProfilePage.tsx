import React from 'react';
import Helmet from 'react-helmet';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

import ProfileForm from './ProfileForm/ProfileForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ProfilePage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Профиль пользователя</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Профиль пользователя
          </Typography>

          <ProfileForm />
        </div>
      </Container>
    </>
  );
};

export default ProfilePage;
