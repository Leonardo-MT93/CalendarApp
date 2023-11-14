import { useDispatch, useSelector } from "react-redux"


export const useAuthStore = () => {

    const {} = useSelector( state => state.auth);
    const dispatch = useDispatch()

    return {
        // Propiedades

        // Metodos
    }
}