import { useState } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import './Relatorios.css'
import logoCasaAzul from '../logo-casaAzul.png'

import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiUsers } from "react-icons/pi";
import { LiaUserSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { IoGitNetworkOutline } from "react-icons/io5";



const Relatorios = () =>{

const navigate = useNavigate();


const navigateToAtendimento = (atendimento) => {
    navigate("/Atendimento", {state: {atendimento}});
};
const navigateToColaboradores = (colaboradores) => {
    navigate("/Colaboradores", {state: {colaboradores}});
};
const navigateToPaciente = (paciente) => {
    navigate("/Paciente", {state: {paciente}});
};
const [SearchPaciente, setSearchSearchPaciente] = useState('');
const [pacientes, setPacientes] = useState([]);
const [messagePacientes, setMessagePacientes] = useState('');


const getAllPacientes = () =>{
    axios.get(`http://localhost:8000/api/get-pacientes/${SearchPaciente}`)
    .then(res =>{
        if(res.data.Success === "Success"){
            setMessagePacientes('')
            setPacientes(res.data.resul);
        }else{
            setPacientes([])
            setMessagePacientes("Nenhum paciente encontrado.")
        }
    }).catch(err => console.log("Erro ao buscar colaboradores.", err))
}
console.log(SearchPaciente)
console.log(pacientes)

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
                <div onClick={() => navigateToAtendimento("atendimento")}>
                    <Link className='name__menu' >
                        <IoGitNetworkOutline className='icon__menu'/> Atendimento
                    </Link>
                </div>
                <div onClick={() => navigateToColaboradores("colaboradores")}>
                    <Link className='name__menu'>
                        <PiUsers className='icon__menu'/> Colaboradores
                    </Link>
                </div>
                <div onClick={() => navigateToPaciente("paciente")}>
                    <Link className="name__menu">
                        <LiaUserSolid className='icon__menu'/> Pacientes
                    </Link>
                </div>
                
                <Link className="name__menu selected">
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
                        Relatórios
                    </div>
                    <button className='add__paciente' >
                        Gerar relatórios
                    </button>
                </div>
            <div className="section__inputs__search">
                
                <div className="container__tittle_and_input">
                   <p className='tittle__table__inner'>Nome do paciente</p>
                   <input type="text" className='input__inner' placeholder='Buscar paciente' onChange={(e) => {setSearchSearchPaciente(e.target.value)}}/>
                   {SearchPaciente &&(
                        <button className="Btn_buscar" onClick={getAllPacientes}>Buscar</button>
                    )}
                </div>
                <div className="container__tittle_and_input">
                    <p className='tittle__table__inner'>Tipo do atendimento</p>
                   <input type="text" className='input__inner' placeholder='Buscar tipo de atendimento'/>
                </div>
                <div className="container__tittle_and_input">
                    <p className='tittle__table__inner'>Data inicial</p>
                   <input type="date" className='input__inner'/>
                </div>
                <div className="container__tittle_and_input">
                    <p className='tittle__table__inner'>Data final</p>
                   <input type="date" className='input__inner'/>
                </div>

            </div>
            </div>
        </div>
        
        
    )
};
export default Relatorios;