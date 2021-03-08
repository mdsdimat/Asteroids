import React from 'react';
import { List, Typography, Container, makeStyles } from '@material-ui/core'
import ForumApi from "../../api/ForumApi";
import {Topic as TopicType} from "../../types/types";
import TopicForm from "./Forms/TopicForm";
import Topic from './Topic';

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

  const [topics, setTopics] = React.useState<TopicType[]>([]);
  const [tryes, refresh] = React.useReducer(c => c+1, 0)

  React.useEffect(() => {
    ForumApi.getTopics().then(setTopics);
  }, [tryes])

  return (
    <>
      <Container component="main" maxWidth="md">
        <Typography component="h1" variant="h5">
          Форум
        </Typography>
        <List className={classes.root}>
          {
            topics.map((topic) => (
              <Topic {...topic} />
            ))
          }
        </List>
      </Container>
      <Container component="main" maxWidth="xs">
        <TopicForm refresh={refresh} />
      </Container>
    </>
  );};

export default ForumPage;
