import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineErrorOutline } from "react-icons/md";

import axios from 'axios';

import './Login.css';
import logoCasaAzul from '../logo-casaAzul.png'  // Ajuste o caminho conforme necessário

const Login = () => {
    const navigate = useNavigate();

    const [userName, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [messageLogin, setMessageLogin] = useState ('');

    const isValidedInput = userName && password;

    const login = () =>{
        if(isValidedInput){
            axios.get(`https://api-casa-azul.up.railway.app/api/login/${userName}/${password}`)
            .then(res =>{
                if(res.data.Success === "Success"){
                    navigate("/Atendimento");
                }
            }).catch(err => console.log("Erro ao realizar login", err))
        }else{
            setMessageLogin('Preencha todos os campos.')
            setTimeout(() => {
                setMessageLogin(null);
              }, 2000);
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
                    {messageLogin === 'Preencha todos os campos.' &&(
                            <div className={` ${messageLogin ? 'message__erro' : ''}`}>
                                <MdOutlineErrorOutline  className="icon__message"/>{messageLogin}
                            </div>
                        )}
                    <form>
                        <div className="input-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="text" className="input__login" id="email" name="email" placeholder='usuário' onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Senha</label>
                            <input type="password" className="input__login" id="password" name="password" placeholder='senha' onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        
                    </form>
                    
                    <button type="submit" className={`btn__login ${isValidedInput ? 'full__btn__login':''}`} onClick={login}>ENTRAR</button>

                
                </div>
            </div>
        </div>
    );
};

export default Login;
