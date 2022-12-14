import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

//import useStyle from './styles';

const Home = () => {
  const [currentId, setCurrentId ] = useState(null);
  //const classes = useStyle();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch, location])

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;