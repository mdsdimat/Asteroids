import React from 'react';
import { Form } from 'react-final-form';
import { List, ListItem, ListItemText, Typography, Container, Button, makeStyles } from '@material-ui/core'
import { TextField } from 'mui-rff';
import ForumApi from "../../api/ForumApi";
import {Topic} from "../../types/types";

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

  const [data, setData] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    ForumApi.getTopics().then(setData);
  }, [])

  const renderData = () => data.map((message): JSX.Element => (
    <ListItem alignItems="flex-start" key={message.id}>
      <ListItemText
        primary={message.description}
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
