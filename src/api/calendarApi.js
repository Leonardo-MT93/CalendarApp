import axios from "axios";
import { getEnvVariables } from "../helper";

const { VITE_API_URL } = getEnvVariables()

    const calendarApi = axios.create({
        baseURL: VITE_API_URL
    });

    //cONFIGURAR INTERCEPTORES

    calendarApi.interceptors.request.use(config => {

        //Modifico mis headers
        
        config.headers = {
            ...config.headers,
            'x-token': localStorage.getItem('token')
        }

        return config;
    })
    export default calendarApi;
