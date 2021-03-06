import React from 'react';

import ForumTopicForm from './ForumTopicForm';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const data = [
  {
    id: 1,
    title: 'Тема заголовок 1',
    description: 'Описание первой темы',
  },
  {
    id: 2,
    title: 'Тема заголовок 2',
    description: 'Описание второй темы',
  },
  {
    id: 3,
    title: 'Тема заголовок 3',
    description: 'Описание третей темы',
  },
  {
    id: 4,
    title: 'Тема заголовок 4',
    description: 'Описание четвёртой темы',
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

const ForumList: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="md">
        <Typography component="h1" variant="h5">
          Форум
        </Typography>
        <List className={classes.root}>
          {
            data.map((item) => (
              <ListItem alignItems="flex-start" key={item.id}>
                <ListItemText
                  primary={(
                    <>
                      <Link href={`/forum-page/${item.id}`} variant="body2">
                        {item.title}
                      </Link>
                    </>
                  )}
                  secondary={item.description}
                />
              </ListItem>
            ))
          }
        </List>
      </Container>
      <Container component="main" maxWidth="xs">
        <ForumTopicForm />
      </Container>
    </>
  );
};

export default ForumList;
