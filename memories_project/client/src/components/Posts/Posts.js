import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';

import useStyles from './styles.js';

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.postsReducer.posts);

  //console.log(posts);

  return (
    <>
      {!posts?.length ? (
        <div>
          <div>
            <CircularProgress size={80} color='secondary' />
          </div>
        </div>
      ) : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems='stretch'
          spacing={3}
        >
          {posts?.map((post) => (
            <Grid item key={post._id} xs={12} sm={6}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
