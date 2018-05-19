import axios from 'axios';

function getPhotos(dateString) {
    return axios.get(`/api/wikipedia?date=${dateString}`);
}

const API = {
    getPhotos
};

export default API;
