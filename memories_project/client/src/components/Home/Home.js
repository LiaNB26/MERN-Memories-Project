import React, { useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../redux/actions/postActions.js';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './homeStyles.js';

const Home = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;