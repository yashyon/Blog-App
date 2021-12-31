import axios from 'axios';

const URL = "http://localhost:8000";

export const loginUser = async (user) => {
    try {
        return await axios.post(`${URL}/login`, user);
    } catch (error) {
        console.log("Error while connecting to Login User Api", error);
    }
}

export const registerUser = async (user) => {
    try {
        return await axios.post(`${URL}/register`, user);
    } catch (error) {
        console.log("Error while connecting to Register User Api", error);
    }
}

export const updateUser = async (user) => {
    try {
        return await axios.post(`${URL}/users/` + user.userId, user);
    } catch (error) {
        console.log("Error while connecting to Updating User Details", error);
    }
}