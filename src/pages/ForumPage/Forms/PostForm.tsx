// Core
import React from 'react';

import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { Button, makeStyles } from '@material-ui/core';

// Types
import {TopicAddFields, TopicPostAddFields} from '../../../types/types';
import { FormApi } from "final-form";

interface PostFormProps {
  onSubmit: (post: TopicPostAddFields, form: FormApi) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const $form = React.useRef<FormApi | null>(null)

  const submit = React.useCallback((values: TopicPostAddFields) => {
    onSubmit(values, $form.current!)
  }, [])

  const validate = (values: TopicPostAddFields) => {
    const errors: TopicPostAddFields = {};

    if (!values.message) {
      errors.message = 'Заполните поле!';
    }

    return errors;
  };

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      render={({handleSubmit, form}) => {
        $form.current = form;

        return (
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              multiline
              margin="normal"
              required
              fullWidth
              label="Название темы"
              name="message"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Отправить сообщение
            </Button>
          </form>
        )
      }}
    />
  )
};

export default PostForm;
