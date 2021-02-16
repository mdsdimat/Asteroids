// Core
import React from 'react';
import { useHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import AuthApi from '../../../api/AuthApi';

import {
  TextField,
} from 'mui-rff';
import {

  Button,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = values => {
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

  const validate = values => {
    const errors = {};
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
    if (!values.password) {
      errors.password = 'Заполните поле!';
    }

    return errors;
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

}

/*
(
  <>
    <Form.Item
      label="Имя"
      name="first_name"
      rules={[{ required: true, message: 'Заполните поле!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Фамилия"
      name="second_name"
      rules={[{ required: true, message: 'Заполните поле!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Логин"
      name="login"
      rules={[{ required: true, message: 'Заполните поле!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Почта"
      name="email"
      rules={[{ required: true, type: 'email', message: 'Неверный email' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Телефон"
      name="phone"
      rules={[{ required: true, message: 'Заполните поле!' }]}
    >
      <Input maxLength={9} addonBefore={PrefixSelector} />
    </Form.Item>

    <Form.Item
      label="Пароль"
      name="password"
      rules={[{ required: true, message: 'Введите пароль!' }]}
    >
      <Input.Password />
    </Form.Item>
  </>
*/


// Exports
export default RegistrationForm;
