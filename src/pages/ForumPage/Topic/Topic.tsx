import React from 'react';
import {Post as PostType, TopicPostAddFields} from "../../../types/types";
import ForumApi from "../../../api/ForumApi";
import {Button, ListItem, ListItemText} from "@material-ui/core";
import Post from '../Post';
import {FormApi} from "final-form";
import axios from "axios";
import PostForm from "../Forms/PostForm";

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

  const addPost = React.useCallback((post: TopicPostAddFields, form: FormApi) => {
    ForumApi.addPost(id, post).then(() => {
      form.reset();
      setPosts(posts => [...posts, post as PostType]);
    })
  }, [id]);

  return (
    <ListItem>
      <ListItemText primary={name} secondary={description}> {name} </ListItemText>

      <div>
        { posts.slice(expanded? 0 : -3).map(post => <Post {...post}/>) }

        {posts.length> 3 &&
          <Button variant='text' onClick={switchExpanded}>
            { expanded? 'Меньше...' : 'Больше...' }
          </Button>
        }
      </div>
      <PostForm onSubmit={addPost} />
    </ListItem>
  )
};

export default Topic;
