import axios from 'axios';

//const url = 'https://memorie-tanvir-proj.herokuapp.com/posts';

const APIBase = axios.create({ baseURL: 'http://localhost:5000'});

APIBase.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPots = () => APIBase.get('/posts');

export const createPost = async (newPost) => {
    return await APIBase.post('/posts', newPost);
}

export const updatePost = async (id, updatedPost) => {
    return await APIBase.patch(`/posts/${id}`, updatedPost);
}

export const deletePost = async (id) => {
    return await APIBase.delete(`/posts/${id}`);
}

export const likePost = async (id) => {
    return await APIBase.patch(`/posts/${id}/likePost`);
}

export const signIn = async (formData) => {
    return await APIBase.post('user/signin', formData);
}

export const signUp = async (formData) => {
    return await APIBase.post('user/signup', formData);
}