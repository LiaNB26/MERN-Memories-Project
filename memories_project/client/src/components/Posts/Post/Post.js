import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentPost,
  deletePost,
  likePost,
} from '../../../redux/actions/postActions.js';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import useStyles from './styles.js';
import noImage from '../../../images/no-image.jpg';

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const [currentPost, setCurrentPost] = useState(
  //   useSelector((state) => state.postsReducer.currentPost) || post
  // );

  const handleSetCurrentId = () => {
    //setCurrentPost(post);
    dispatch(setCurrentPost(post));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile !== '' ? post.selectedFile : noImage}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size='small'
          onClick={() => handleSetCurrentId()}
        >
          <MoreHorizIcon fontSize='medium' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary' component='h2'>
          {post?.tags?.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        variant='h5'
        //color='textSecondary'
        gutterBottom
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAltIcon fontSize='small' />
          Like &nbsp; {post.likeCount}
        </Button>
        <Button
          size='small'
          color='secondary'
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;

// Photo by <a href="https://unsplash.com/@dariuszsankowski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dariusz Sankowski</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
