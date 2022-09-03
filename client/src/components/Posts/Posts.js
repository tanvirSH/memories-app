import React from "react";
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from "./Post/Post";
import useStyle from "./styles";

const Posts = ({ setCurrentId }) => {
  const classes = useStyle();
  const posts = useSelector((state) => state.posts);
  
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        { posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
