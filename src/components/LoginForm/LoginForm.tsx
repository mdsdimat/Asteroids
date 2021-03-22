import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from 'mui-rff';
import { Link, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getOAuthUrl } from '@helpers/ApiHelpers';

import { useSnackbar } from 'notistack';

import AuthApi from '../../api/AuthApi';

import { login } from '../../store/actionCreators/auth';
import useAuth from '../../hooks/useAuth';
import authSelector from '../../store/selectors/auth';

import { LoginFormFields, SimpleObject } from '@types/types';

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


const LoginForm = (): JSX.Element => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [authUser] = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const selector = useSelector(authSelector);

  useEffect(() => {
    authUser();
  }, [selector]);

  const onSubmit = (values: LoginFormFields) => {
    dispatch(login(values));
  };

  const validate = (values: LoginFormFields) => {
    const errors: SimpleObject = {};
    if (!values.login) {
      errors.login = 'Заполните поле!';
    }
    if (!values.password) {
      errors.password = 'Заполните поле!';
    }

    return errors;
  };

  const oAuth = () => {
    AuthApi.getServiceId()
      .then((res) => {
        window.location.assign(getOAuthUrl(res.service_id));
      })
      .catch(() => {
        enqueueSnackbar('Действие временно недоступно', {
          variant: 'error',
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top',
          },
        });
      });
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
            label="Логин"
            name="login"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={oAuth}
            className={classes.submit}
          >
            Войти через Яндекс
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/register" variant="body2">
                Нет аккаунта?
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default LoginForm;
