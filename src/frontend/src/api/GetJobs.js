import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export const getJobsData = async (filter, options={}, pageNum=0) => {
    const response = await api.get(`/app/jobs?pageNum=${pageNum}&filter=${filter}`,
        options);
    return response.data;
}