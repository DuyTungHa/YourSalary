import axios from 'axios';

export default axios.create({
    baseURL: 'https://yoursalary.herokuapp.com/api/'
});