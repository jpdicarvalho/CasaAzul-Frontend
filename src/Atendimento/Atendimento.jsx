import { useState } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import './Atendimento.css'
import logoCasaAzul from './logo-casaAzul.png'

import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiUsers } from "react-icons/pi";
import { LiaUserSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { IoGitNetworkOutline } from "react-icons/io5";



const Atendimento = () =>{

const navigate = useNavigate();
const location = useLocation();

const { atendimento } = location.state;

//passando os dados da barbearia selecionada
const navigateToAddNewPatient = () => {
    navigate("/AddNewPatient");
};
const navigateToPaciente = (paciente) => {
    navigate("/Paciente", {state: {paciente}});
};
console.log(atendimento)


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
                <Link className={`name__menu ${atendimento ? 'selected':''}`}>
                    <IoGitNetworkOutline className='icon__menu'/> Atendimento
                </Link>
                <Link className='name__menu'>
                    <PiUsers className='icon__menu'/> Colaboradores
                </Link>
                <div onClick={() => navigateToPaciente("paciente")}>
                    <Link className='name__menu'>
                        <LiaUserSolid className='icon__menu'/> Pacientes
                    </Link>
                </div>
                
                <Link className="name__menu">
                    <HiOutlineDocumentReport className='icon__menu'/> Relatórios
                </Link>
                <Link className='name__menu'>
                    <CiSettings className='icon__menu'/> Configuraçõe
                </Link>
            </div>
            <div className="container__logout">
                <p style={{marginRight: '20px'}}>Sair</p><IoIosLogOut />
            </div>
                
            </div>
            <div className="section__information">
                <div className="container__search">
                    <input type="search" className='inputSearch' placeholder='Pesquisar'/>
                </div>
                <div className="container__addPaciente">
                    <div className="tittle__information">
                        Atendimentos
                    </div>
                    <button className='add__paciente' onClick={navigateToAddNewPatient}>
                        Criar atendimento
                    </button>
                </div>
                <div className="container__tittle__table">
                    <p>Nome</p>
                    <p>Data de nascimento</p>
                    <p>Endereço</p>
                    <p>Data de inscrição</p>
                    <p>Laudo</p>
                    <p>CID</p>
                </div>
            </div>
        </div>
        
        
    )
};
export default Atendimento;