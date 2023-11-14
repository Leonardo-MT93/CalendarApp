import axios from "axios";
import { getEnvVariables } from "../helper";

const { VITE_API_URL } = getEnvVariables()

    const calendarApi = axios.create({
        baseURL: VITE_API_URL
    });

    //cONFIGURAR INTERCEPTORES

    export default calendarApi;
