import axios from 'axios';

const APIBase = axios.create({ baseURL: 'http://localhost:5000'});

APIBase.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPost = (id) => APIBase.get(`/posts/${id}`);

export const fetchPosts = (page) => APIBase.get(`/posts?page=${page}`);

export const getPostBySearch = (searchQuery) => APIBase.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

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