import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyle from "./styles";
import { createPost, updatePost} from "../../actions/posts";

const Form = ({ currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyle();
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  
  useEffect(() => {
    if(post) setPostData(post);    
  }, [post]);
  

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
    setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId, postData));
    }else{
      dispatch(createPost(postData));
    }
    clear();
  };

  return (
    <Paper className={classes.paper}>
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
          name="creator"
          label="creator"
          value={postData.creator}
          onChange={handleChange}
        />
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
