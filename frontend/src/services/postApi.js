import axios from 'axios';

const URL = "http://localhost:8000";

export const getAllPosts = async (search) => {
    try {
        return await axios.get(`${URL}/posts` + search);
    } catch (error) {
        console.log("Error while connecting to getAllPosts Api ", error);
    }
}

export const uploadFile = async (data) => {
    try {
        return await axios.post(`${URL}/file/upload`, data);
    } catch (error) {
        console.log('Error while connecting to uploadPost Api', error);
    }
}

export const writePost = async (post) => {
    try {
        return await axios.post(`${URL}/write`, post);
    } catch (error) {
        console.log(`Error while connecting to writePost API`, error);
    }
}

export const getPostDetails = async (id) => {
    try {
        console.log(id);
        return await axios.get(`${URL}/post/` + id);
    } catch (error) {
        console.log(`Error while connecting to getPostDetails Api `, error);
    }
}

export const deletePost = async (id, data) => {
    try {
        return await axios.delete(`${URL}/details/` + id, data);
    } catch (error) {
        console.log(`Error while connecting to deletePost Api `, error);
    }
}

export const updatePost = async (id, data) => {
    try {
        return await axios.put(`${URL}/update/` + id, data);
    } catch (error) {
        console.log(`Error while connecting to updatePost Api`, error);
    }
}