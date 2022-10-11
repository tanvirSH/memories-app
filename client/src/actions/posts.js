import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from "../api";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    const actions =  { type: FETCH_POST, payload:  data };

    console.log(data);
    dispatch(actions);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    const actions =  { type: FETCH_ALL, payload: { data, currentPage, numberOfPages } };

    console.log(data);
    dispatch(actions);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.getPostBySearch(searchQuery);
    const actions = { type: FETCH_BY_SEARCH, payload: data };
    console.log(data);
    dispatch(actions);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(newPost);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
    
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (newLike) => async (dispatch) => {
  try {
    const { data } = await api.likePost(newLike);
    dispatch({ type: LIKE, payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
};
