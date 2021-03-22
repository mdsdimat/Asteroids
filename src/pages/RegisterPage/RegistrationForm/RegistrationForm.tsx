import React from 'react';
import { useHistory } from 'react-router';
import { Form } from 'react-final-form';
import { useSnackbar } from 'notistack';

import { RegisterFormFields, SimpleObject } from '@types/types';

import { TextField } from 'mui-rff';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AuthApi from '../../../api/AuthApi';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegistrationForm: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = (values: RegisterFormFields) => {
    AuthApi.signUp(values)
      .then(() => {
        enqueueSnackbar('Пользователь успешно создан!', {
          variant: 'error',
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top',
          },
        });
        history.push('/');
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.reason, {
          variant: 'error',
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top',
          },
        });
      });
  };

  const validate = (values: RegisterFormFields) => {
    const errors: SimpleObject = {};
    if (!values.first_name) {
      errors.first_name = 'Заполните поле!';
    }
    if (!values.second_name) {
      errors.second_name = 'Заполните поле!';
    }
    if (!values.login) {
      errors.login = 'Заполните поле!';
    }
    if (!values.email) {
      errors.email = 'Заполните поле!';
    }
    if (!values.phone) {
      errors.phone = 'Заполните поле!';
    }
    if (!values.password) {
      errors.password = 'Заполните поле!';
    }
    if (!values.first_name) {
      errors.first_name = 'Заполните поле!';
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Имя"
            name="first_name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Фамилия"
            name="second_name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Логин"
            name="login"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            label="Почта"
            name="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Телефон"
            name="phone"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Пароль"
            name="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Зарегистрироваться
          </Button>

        </form>
      )}
    />
  );
};

export default RegistrationForm;
