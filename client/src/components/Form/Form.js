import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyle from "./styles";
import { createPost, updatePost} from "../../actions/posts";
import { useLocation } from 'react-router-dom';

const Form = ({ currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyle();
  const dispatch = useDispatch();
  const location = useLocation();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(post) setPostData(post);    
  }, [post, dispatch]);
  

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = ({ base64 }) => {
    setPostData({ ...postData, selectedFile: base64 });
  };

  const clear = (e) => {
    setCurrentId(null);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    }else{
      dispatch(createPost({...postData, name: user?.result?.name}));
    }
    clear();
  };
if(! user?.result?.name){
  return (
    <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please signin to create your own memories and like other's memories.
        </Typography>
    </Paper>
  )
}

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handlesubmit}
      >
        <Typography variant="h6">{ currentId ? 'Updating ' : 'Creating '} a memory</Typography>
        <TextField
          variant="outlined"
          fullWidth
          name="title"
          label="title"
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          fullWidth
          name="message"
          label="message"
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          fullWidth
          name="tags"
          label="tags"
          value={postData.tags}
          onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={handleChangeFile} /> 
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          type="submit"
          size="large"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
