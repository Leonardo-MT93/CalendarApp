import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

//version alternativa sin utilizar thunks para peticiones asincronas 

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth);
    const dispatch = useDispatch()
    const startLogin = async({ email, password}) => {
        dispatch( onChecking())
        try {
            const {data} = await calendarApi.post('/auth', {email,password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin( { name: data.name, uid: data.uid}));
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const startRegister = async({ name,email, password}) => {
        dispatch( onChecking())
        try {
            const {data} = await calendarApi.post('/auth/new', {name,email,password});

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin( { name: data.name, uid: data.uid}));
        } catch (error) {
            const errorObject = error.response.data?.errors       
            //*** SE ESCAPA EL ERROR DE USUARIO YA EXISTENTE YA QUE NO SE ENCUENTRA EN EL ERROR DE LAS RUTAS DE NUESTRO BACKEND */     
            // Obtén todos los distintos valores de la propiedad 'msg'
            const uniqueMsgValues = Object.values(errorObject).map(item => item.msg);
            dispatch( onLogout(uniqueMsgValues || ''))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout('Token expirado'));

        try {
            
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin( { name: data.name, uid: data.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar())
        dispatch(onLogout());
    }

    return {
        // Propiedades
        errorMessage,
        status,
        user,
        // Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}