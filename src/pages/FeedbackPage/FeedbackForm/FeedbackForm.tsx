import React, { useEffect, useState } from 'react';

import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { FeedbackFields } from '@types/types';
import FeedbackApi from '../../../api/FeedbackApi';

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

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let webForm;

  const onSubmit = (values: FeedbackFields) => {
    const r = FeedbackApi.sendMessage(values);

    r.then((data) => {
      if (data.ok) {
        webForm.reset();
        enqueueSnackbar('Сообщение отправлено', {
          variant: 'success',
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top',
          },
        });
      }
    });
  };

  const validate = (values: FeedbackFields) => {
    const errors: FeedbackFields = {};

    if (!values.message) {
      errors.message = 'Заполните поле!';
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, form }) => {
        webForm = form;

        return (
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
              fullWidth
              label="Введите текст сообщения"
              name="message"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Отправить
            </Button>
          </form>
        );
      }}
    />
  );
};

export default ProfileForm;
