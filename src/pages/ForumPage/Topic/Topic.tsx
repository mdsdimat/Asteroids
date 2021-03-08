import React from 'react';
import {Post as PostType} from "../../../types/types";
import ForumApi from "../../../api/ForumApi";
import {Button, ListItem, ListItemText} from "@material-ui/core";
import Post from '../Post';

interface TopicProps {
  id: number;
  name: string;
  description: string;
}

const Topic: React.FC<TopicProps> = ({ name, id, description }) => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [expanded, switchExpanded] = React.useReducer(expanded => !expanded, false);

  React.useEffect(() => {
    ForumApi.getPosts(id).then(setPosts)
  }, []);

  return (
    <ListItem>
      <ListItemText> {name} </ListItemText>

      {description}

      <div>
        { posts.slice(expanded? 0 : -3).map(post => <Post {...post}/>) }

        {posts.length> 3 &&
          <Button variant='text' onClick={switchExpanded}>
            { expanded? 'Меньше...' : 'Больше...' }
          </Button>
        }
      </div>
    </ListItem>
  )
};

export default Topic;
