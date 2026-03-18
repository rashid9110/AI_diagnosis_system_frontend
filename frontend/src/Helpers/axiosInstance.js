import axios from "axios";

const axiosInstance =axios.create();//create a new instanceof axios

axiosInstance.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;//set the base URL

axiosInstance.defaults.withCredentials=true;//Allow cookies to be sent with the request


export default axiosInstance;