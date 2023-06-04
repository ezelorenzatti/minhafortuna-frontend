import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const fetchPostData = async (path, data) => {
    try {
        const token = localStorage.getItem('@minha-carteira:token');
        const response = await axios.post(`${API_URL}${path}`, data, {
            headers: {
                Authorization: token
            }
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.error;
    }
};

export const fetchGetData = async (path) => {
    try {
        const token = localStorage.getItem('@minha-carteira:token');
        const response = await axios.get(`${API_URL}${path}`, {
            headers: {
                Authorization: token
            }
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const fetchDeleteData = async (path) => {
    try {
        const token = localStorage.getItem('@minha-carteira:token');
        const response = await axios.delete(`${API_URL}${path}`, {
            headers: {
                Authorization: token
            }
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.error;
    }
}