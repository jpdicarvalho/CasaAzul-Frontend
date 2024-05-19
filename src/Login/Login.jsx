import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Login.css';
import logoCasaAzul from '../logo-casaAzul.png'  // Ajuste o caminho conforme necessário

const Login = () => {
    const navigate = useNavigate();

    const [userName, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [messageLogin, setMessageLogin] = useState ('');


    const login = () =>{
        if(userName && password){
            axios.get(`http://localhost:8000/api/login/${userName}/${password}`)
            .then(res =>{
                if(res.data.Success === "Success"){
                    navigate("/Atendimento");
                }
            }).catch(err => console.log("Erro ao realizar login", err))
        }else{
            setMessageLogin('Preencha todos os campos.')
        }
    }

    return (
        <div className="body__login">
            <div className="login-container">
                <div className="login-card">
                    <div className="logo__login">
                        <img src={logoCasaAzul} alt="Casa Azul Logo" />
                    </div>
                    <h2 className='tittle__login'>LOGIN</h2>
                    <form>
                        <div className="input-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" className="input__login" id="email" name="email" placeholder='usuário' onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Senha</label>
                            <input type="password" className="input__login" id="password" name="password" placeholder='senha' onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className='btn__login'>ENTRAR</button>
                    </form>
                
                </div>
            </div>
        </div>
    );
};

export default Login;
