import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import './Atendimento.css'
import logoCasaAzul from '../logo-casaAzul.png'

import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiUsers } from "react-icons/pi";
import { LiaUserSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoGitNetworkOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


const Atendimento = () =>{

const navigate = useNavigate();

//passando os dados da barbearia selecionada
const navigateToAddNewAtendimento = () => {
    navigate("/AddNewAtendimento");
};
const navigateToPaciente = () => {
    navigate("/Paciente");
};

const navigateToColaboradores = () => {
    navigate("/Colaboradores");
};
const navigateToRelatorios = () => {
    navigate("/Relatorios");
};

const [atendimentos, setAtendimentos] = useState([]);
const getAllAtendimento = () =>{
    axios.get('http://localhost:8000/api/atendimentos/')
    .then(res =>{
        if(res.data.Success === "Success"){
            setAtendimentos(res.data.resu);
        }
    }).catch(err => console.log("Erro ao buscar atendimentos.", err))
}
useEffect(() =>{
    getAllAtendimento()
}, [])
//===== Section Finalizar atendimento =====
const [teste, setteste] = useState([]);
const finalizarAtendimento = (atendimento_id) => {
console.log(atendimento_id)
    
}
console.log(atendimentos)

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
                <Link className="selected">
                    <IoGitNetworkOutline className='icon__menu'/> Atendimento
                </Link>
                <div onClick={() => navigateToColaboradores()}>
                    <Link className='name__menu' >
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
                        Atendimentos em aberto
                    </div>
                    <button className='add__paciente' onClick={navigateToAddNewAtendimento}>
                        Criar atendimento
                    </button>
                </div>
                <div className="container__tittle__table">
                   <p className='pacient__inner'>Paciente</p>
                   <p className='pacient__inner'>Atendimento</p>
                   <p className='pacient__inner'>Colaborador</p>
                   <p className='pacient__inner'>Data de criação</p>
                   <p className='pacient__inner'>Status</p>
                </div>
                {atendimentos.map((item) =>(
                    <div key={item.service_id} className='conatiner__paciente' >
                        <div className='pacient__box'>
                            <p className='pacient__inner'>{item.paciente_name}</p>
                            <p className='pacient__inner'>{item.service_name}</p>
                            <p className='pacient__inner'>{item.profissional_name}</p>
                            <p className='pacient__inner'>{item.date_service}</p>
                            <p className='pacient__inner'>{item.status}</p>
                            <p className='icon__patient'>
                            <button className='add__paciente' onClick={() => finalizarAtendimento(item.service_id)}>
                                Finalizar atendimento
                            </button>
                            </p>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        
    )
};
export default Atendimento;