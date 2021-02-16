// Core
import React, { useEffect, useState } from 'react';

import { Form } from 'react-final-form';
import Box from '@material-ui/core/Box';
import {
  TextField,
} from 'mui-rff';
import {
  Link,
  Grid,
  Button,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

// Api
import AuthApi from '../../../api/AuthApi';
import UserApi from '../../../api/UserApi';

import { ProfileUser } from '../../../types/types';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: '100px',
    height: '100px',
    margin: '50px auto',
    backgroundColor: theme.palette.secondary.main,
  },
  avatarButton: {
    margin: 'auto',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  hidden: {
    display: 'none',
  },
}));

const ProfileForm: React.FC = () => {
  const classes = useStyles();

  const [fields, setFields] = useState({});
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    AuthApi.getUser().then((user) => {
      setAvatar(`https://ya-praktikum.tech${user.avatar}`);
      setFields(user);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const onAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    if (e.target.files) {
      UserApi.uploadAvatar(e.target.files[0]);
    }
  };

  const onSubmit = (values: ProfileUser) => {
    UserApi.editProfile(values);

    if (values.oldPassword && values.newPassword) {
      UserApi.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
    }
  };

  const validate = (values: ProfileUser) => {
    const errors: ProfileUser = {};
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
    if (!values.first_name) {
      errors.first_name = 'Заполните поле!';
    }
    if (values.newPassword && !values.oldPassword) {
      errors.oldPassword = 'Заполните поле!';
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={fields}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Avatar
            className={classes.avatar}
            alt="Аватарка"
            src={avatar}
          />
          <Box textAlign="center">
            <input
              accept="image/*"
              className={classes.hidden}
              id="avatar-input"
              type="file"
              name="avatar"
              onChange={onAvatarUpload}
            />
            <label
              htmlFor="avatar-input"
              className={classes.avatarButton}
            >
              <Button variant="contained" component="span">
                Загрузить аватар
              </Button>
            </label>
          </Box>

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Отображаемое имя"
            name="display_name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Имя"
            name="first_name"
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
            fullWidth
            type="password"
            label="Старый пароль"
            name="oldPassword"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            label="Новый пароль"
            name="newPassword"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Сохранить
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Играть
              </Link>
            </Grid>
          </Grid>

        </form>
      )}
    />
  );
};

export default ProfileForm;
