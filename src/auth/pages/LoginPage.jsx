import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';


const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}


export const LoginPage = () => {

    const  { startLogin, startRegister, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm( loginFormFields);
    const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange: onRegisterInputChange} = useForm( registerFormFields);

    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({email:loginEmail, password:loginPassword})
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        if(registerPassword !== registerPassword2){
            Swal.fire('Error en el registro', 'Contraseñas no son iguales', 'error')
        }
        startRegister({name: registerName, email: registerEmail, password: registerPassword})
    }

    useEffect(() => {
        
        if (errorMessage !== undefined && errorMessage.length > 0 && Array.isArray(errorMessage)) {
            const errorMessages = errorMessage.map((error) => error);
            const combinedMessage = errorMessages.join('<br>'); // Unir mensajes con un salto de línea
    
            Swal.fire('Error en la autenticacion', combinedMessage, 'error');
        }

    }, [errorMessage])
    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}