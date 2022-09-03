import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import memories from './images/memories.jpg';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import useStyle from './styles';

const App = () => {
  const [currentId, setCurrentId ] = useState(null);
  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch])
  
  return (
    <Container maxwidth='lg'>
        <AppBar position='static' color='inherit' className={classes.appBar}>
            <Typography variant='h2' align='center'>Memories</Typography>
            <img src={memories} alt='memories' height='60' className={classes.image} />
        </AppBar>
        <Grow in>
            <Container>
                <Grid container className={classes.mainContainer} spacing={3} justifyContent='space-between' alignItems='stretch'>
                  <Grid item xs={12} sm={7}>
                      <Posts  setCurrentId={setCurrentId} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <Form currentId={currentId} setCurrentId={setCurrentId} />
                  </Grid>
                </Grid>
            </Container>
        </Grow>
    </Container>
  )
}

export default App;