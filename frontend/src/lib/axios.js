import axios from "axios";
const api=axios.create({
    //baseURL:'http://localhost:4000/books',
    baseURL: 'https://bookmedia-1.onrender.com/books',
})
export default api
