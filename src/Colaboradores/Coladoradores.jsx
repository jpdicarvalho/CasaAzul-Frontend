import { useState, useEffect } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import './Colaboradores.css'
import logoCasaAzul from '../logo-casaAzul.png'

import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiUsers } from "react-icons/pi";
import { LiaUserSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { IoGitNetworkOutline } from "react-icons/io5";

import axios from 'axios';



const Colaboradores = () =>{

const navigate = useNavigate();

//passando os dados da barbearia selecionada
const navigateToAddNewPatient = () => {
    navigate("/AddNewColaborador");
};

const navigateToAtendimento = () => {
    navigate("/Atendimento");
};
const navigateToPaciente = () => {
    navigate("/Paciente");
};
const navigateToRelatorios = () => {
    navigate("/Relatorios");
};
const [colaboradores, setColaboradores] = useState([]);

const getAllColaboradores = () =>{
    axios.get('http://localhost:8000/api/colaboradores/')
    .then(res =>{
        if(res.data.Success === "Success"){
            setColaboradores(res.data.resul);
        }
    }).catch(err => console.log("Erro ao buscar colaboradores.", err))
}
useEffect(() =>{
    getAllColaboradores()
}, [])
console.log(colaboradores)

    return(
        <div className="main">
            <div className="menu__lateral">
            <div className="logo">
                CASA AZUL
            </div>
            <div className="container__img__logo">
                <div className="container__image__logo">
                    <img src={logoCasaAzul} alt="logo da casa azul" className='img'/>
                </div>
                <div className="name__user">
                    João Pedro
                </div>
                <div className="name__type__user">
                    Adimistrador
                </div>
            </div>
            <div className="container__menus">
                <div onClick={() => navigateToAtendimento()}>
                    <Link className='name__menu' >
                        <IoGitNetworkOutline className='icon__menu'/> Atendimento
                    </Link>
                </div>
                <div>
                    <Link className="selected">
                        <PiUsers className='icon__menu'/> Colaboradores
                    </Link>
                </div>
                <div onClick={() => navigateToPaciente()}>
                    <Link className='name__menu'>
                        <LiaUserSolid className='icon__menu'/> Pacientes
                    </Link>
                </div>
                
                <div onClick={() => navigateToRelatorios()}>
                    <Link className="name__menu">
                        <HiOutlineDocumentReport className='icon__menu'/> Relatórios
                    </Link>
                </div>
                <Link className='name__menu'>
                    <CiSettings className='icon__menu'/> Configuraçõe
                </Link>
            </div>
            <div className="container__logout">
                <p style={{marginRight: '20px'}}>Sair</p><IoIosLogOut />
            </div>
                
            </div>
            <div className="section__information">
                
                <div className="container__addPaciente">
                    <div className="tittle__information">
                        Colaboradores
                    </div>
                    <button className='add__paciente' onClick={navigateToAddNewPatient}>
                        Adicionar Colaboradores
                    </button>
                </div>
                <div className="container__tittle__table">
                    <p>Nome</p>
                    <p>Data de nascimento</p>
                    <p>Endereço</p>
                    <p>Data de inscrição</p>

                </div>
            </div>
        </div>
        
        
    )
};
export default Colaboradores;