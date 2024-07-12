import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dummyjson.com',
});

export const loginCall = (username: string, password: string) => {
    return api.post('/auth/login', { username, password });
};

export const fetchUserDetails = (token: string) => {
    return api.get('/auth/me', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const fetchUsers = () => {
    return api.get('/users');
};

export const fetchUserById = (id: number) => {
    return api.get(`/users/${id}`);
};

