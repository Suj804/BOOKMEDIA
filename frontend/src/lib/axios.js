import axios from "axios";
const api=axios.create({
    //baseURL:'http://localhost:4000/books',
    baseURL: 'https://bookmedia-ioi2.onrender.com',
})
export default api
