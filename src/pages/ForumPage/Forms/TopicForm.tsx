// Core
import React from 'react';

import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { Button, makeStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';

// Api
import ForumApi from '../../../api/ForumApi';

// Types
import { TopicAddFields } from '../../../types/types';
import { FormApi } from "final-form";

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

interface TopicFormProps {
  refresh: () => void;
}

const TopicForm: React.FC<TopicFormProps> = ({ refresh }) => {
  const classes = useStyles();

  const $form = React.useRef<FormApi | null>(null)

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (values: TopicAddFields) => {
    ForumApi.addTopic(values)
      .then((data) => {
      if (data && $form.current) {
        $form.current.reset();
        refresh();
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
        $form.current = form;

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

export default TopicForm;
