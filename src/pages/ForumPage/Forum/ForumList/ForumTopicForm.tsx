// Core
import React, { useEffect, useState } from 'react';

import { Form } from 'react-final-form';
import {
  TextField,
} from 'mui-rff';
import {
  Button,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { useSnackbar } from 'notistack';

// Api
import ForumApi from '../../../../api/ForumApi';

import {FeedbackFields, TopicAddFields} from '../../../../types/types';

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

const ForumTopicForm: React.FC = () => {
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let webForm: any;

  const onSubmit = (values: TopicAddFields) => {
    const r = ForumApi.addTopic(values);

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

  const validate = (values: TopicAddFields) => {
    const errors: TopicAddFields = {};

    if (!values.name) {
      errors.name = 'Заполните поле!';
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
              rows={4}
              required
              fullWidth
              label="Название темы"
              name="name"
            />
            <TextField
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              fullWidth
              label="Описание темы"
              name="description"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Добавить тему
            </Button>
          </form>
        );
      }}
    />
  );
};

export default ForumTopicForm;
