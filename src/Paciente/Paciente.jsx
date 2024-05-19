import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import './Paciente.css'
import logoCasaAzul from '../logo-casaAzul.png'

import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiUsers } from "react-icons/pi";
import { LiaUserSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoGitNetworkOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import axios from 'axios';



const Paciente = () =>{

const navigate = useNavigate();

const [pacientes, setPacientes] = useState([]);

//passando os dados da barbearia selecionada
const navigateToAddNewPatient = () => {
    navigate("/AddNewPatient");
};

const navigateToAtendimento = () => {
    navigate("/Atendimento");
};
const navigateToColaboradores = () => {
    navigate("/Colaboradores");
};
const navigateToRelatorios = () => {
    navigate("/Relatorios");
};

const getAllPatients = () =>{
    axios.get('http://localhost:8000/api/patients/')
    .then(res =>{
        if(res.data.Success === "Success"){
            setPacientes(res.data.result);
        }
    }).catch(err => console.log("Erro ao buscar pacientes.", err))
}
useEffect(() =>{
    getAllPatients()
}, [])

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
                <div onClick={() => navigateToColaboradores()}>
                    <Link className='name__menu'>
                        <PiUsers className='icon__menu'/> Colaboradores
                    </Link>
                </div>
                
                <Link className="selected">
                    <LiaUserSolid className='icon__menu'/> Pacientes
                </Link>
                <div onClick={() => navigateToRelatorios()}>
                    <Link className="name__menu">
                        <HiOutlineDocumentReport className='icon__menu'/> Relatórios
                    </Link>
                </div>
                
                <Link className='name__menu'>
                    <CiSettings className='icon__menu'/> Configurações
                </Link>
            </div>
            <div className="container__logout">
                <p style={{marginRight: '20px'}}>Sair</p><IoIosLogOut />
            </div>
                
            </div>
            <div className="section__information">
                
                <div className="container__addPaciente">
                    <div className="tittle__information">
                        Pacientes
                    </div>
                    <button className='add__paciente' onClick={navigateToAddNewPatient}>
                        Adicionar paciente
                    </button>
                </div>
                <div className="container__tittle__table">
                   <p className='pacient__inner'>Nome</p>
                   <p className='pacient__inner'>Aniversário</p>
                   <p className='pacient__inner'>Inscrição</p>
                   <p className='pacient__inner'>Possuí laudo</p>
                   <p className='pacient__inner'>CID</p>

                </div>
                {pacientes.map((item) =>(
                    <div key={item.id} className='conatiner__paciente'>
                        <div className='pacient__box'>
                            <p className='pacient__inner'>{item.name}</p>
                            <p className='pacient__inner'>{item.date_birth}</p>
                            <p className='pacient__inner'>{item.registration_date}</p>
                            <p className='pacient__inner'>{item.laudo}</p>
                            <p className='pacient__inner'>{item.code_cid}</p>
                            <p className='icon__patient'>
                                <FaRegEdit />
                                <MdDeleteOutline />
                            </p>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        
    )
};
export default Paciente;