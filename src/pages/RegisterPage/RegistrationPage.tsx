import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import RegistrationForm from './RegistrationForm/RegistrationForm';

const RegistrationPage: React.FC = () => (
  <Container component="main" maxWidth="xs">
    <Typography component="h1" variant="h5">
      Регистрация
    </Typography>
    <RegistrationForm />
  </Container>
);

export default RegistrationPage;
