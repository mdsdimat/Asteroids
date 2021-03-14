import React from "react";
import {makeStyles} from "@material-ui/core/styles";

interface PostProps {
  message: string;
}

const useStyles = makeStyles(styles => ({

}))

const Post: React.FC<PostProps> = ({ message }) => {
  const classes = useStyles();

  return (
    <div> {message} </div>
  )
}

export default Post;
