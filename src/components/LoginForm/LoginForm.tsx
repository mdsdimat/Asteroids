// Core
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Checkboxes,
  Radios,
  Select,
  DatePicker,
  TimePicker,
} from 'mui-rff';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getOAuthUrl } from '@helpers/ApiHelpers';
import { openNotificationWithIcon } from '@helpers/NotificationHelper';
import AuthApi from '../../api/AuthApi';

import { SignUser } from '../../types/types';

import { login } from '../../store/actionCreators/auth';
import useAuth from '../../hooks/useAuth';
import authSelector from '../../store/selectors/auth';
import { useSnackbar } from 'notistack';

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


type StuffBody = {
  [key: string]: string;
};

const LoginForm = (): JSX.Element => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [authUser] = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const selector = useSelector(authSelector);

  useEffect(() => {
    authUser();
  }, [selector]);

  const onSubmit = values => {
    dispatch(login(values));
  };

  const validate = values => {
    const errors: StuffBody = {};
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
      render={({ handleSubmit, form, submitting, pristine, values }) => (
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

// Exports
export default LoginForm;
