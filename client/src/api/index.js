import axios from 'axios';

const url = 'https://memorie-tanvir-proj.herokuapp.com/posts';

export const fetchPots = () => axios.get(url);

export const createPost = async (newPost) => {
    return await axios.post(url, newPost);
}

export const updatePost = async (id, updatedPost) => {
    return await axios.patch(`${url}/${id}`, updatedPost);
}

export const deletePost = async (id) => {
    return await axios.delete(`${url}/${id}`);
}

export const likePost = async (id) => {
    return await axios.patch(`${url}/${id}/likePost`);
}