import React from 'react';
import { Form } from 'react-final-form';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import {
  TextField,
} from 'mui-rff';

import {
  Button,
} from '@material-ui/core';

const data = [
  {
    id: 1,
    text: 'Сообщение пользателя холивар холивар холивар.',
  },
  {
    id: 2,
    text: 'Сообщение пользателя холивар холивар холивар.',
  },
  {
    id: 3,
    text: 'Сообщение пользателя холивар холивар холивар.',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const ForumPage: React.FC = () => {
  const classes = useStyles();

  const renderData = () => data.map((message): JSX.Element => (
    <ListItem alignItems="flex-start" key={message.id}>
      <ListItemText
        primary={message.text}
      />
    </ListItem>
  ));

  const onSubmit = () => {

  };

  const validate = () => {
    const errors = {};

    return errors;
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5">
        Страница темы
      </Typography>
      <List className={classes.root}>
        {renderData()}
      </List>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({
          handleSubmit, form,
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              multiline
              margin="normal"
              required
              fullWidth
              label="Сообщение"
              name="message"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Отправить
            </Button>
          </form>
        )}
      />
    </Container>
  );
};

export default ForumPage;
