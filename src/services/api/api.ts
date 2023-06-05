import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const parseError = (error: any): any => {
    let message = "Ocorreu um erro ao contatar o servidor, tente novamente mais tarde!"
    if (error.response.data.error) {
        message = error.response.data.error;
    }
    return {message: message, status: error.response.status};
}

export const fetchPostData = async (path: string, data?: any) => {
    try {
        const token = sessionStorage.getItem('@minha-carteira:token');
        const response = await axios.post(`${API_URL}${path}`, data, {
            headers: {
                Authorization: token
            }
        });
        return response.data.data;
    } catch (error: any) {
        throw parseError(error);
    }
};

export const fetchGetData = async (path: string) => {
    try {
        const token = sessionStorage.getItem('@minha-carteira:token');
        const response = await axios.get(`${API_URL}${path}`, {
            headers: {
                Authorization: token
            }
        });
        return response.data.data;
    } catch (error) {
        throw parseError(error);
    }
}
