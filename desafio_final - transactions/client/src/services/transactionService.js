import http from '../http-common';

const get = () => {
    return http.get('/');
};

const getPeriod = (period) => {
    return http.get(`/period=${period}`);
};

const insert = (data) => {
    return http.post('/inserir', data);
};

const modify = (id, data) => {
    return http.put(`/modificar/${id}`, data);
};

const deleteOne = (id) => {
    return http.delete(`/delete/${id}`);
};

export default { get, getPeriod, insert, modify, deleteOne }