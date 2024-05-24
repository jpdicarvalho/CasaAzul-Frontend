import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import './Colaboradores.css'
import logoCasaAzul from '../logo-casaAzul.png'

import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiUsers } from "react-icons/pi";
import { LiaUserSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoGitNetworkOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

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
    axios.get('https://api-casa-azul.up.railway.app/api/colaboradores/')
    .then(res =>{
        if(res.data.Success === "Success"){
            setColaboradores(res.data.resul);
        }
    }).catch(err => console.log("Erro ao buscar colaboradores.", err))
}
useEffect(() =>{
    getAllColaboradores()
}, [])
//========================================
const [expandedColaborador, setExpandedColaborador] = useState([]);
const [colaboradorId, setColaboradorId] = useState('');

//Function to expanded booking cards
const toggleItem = (itemId) => {
    setColaboradorId(itemId)
    if (expandedColaborador.includes(itemId)) {
      setExpandedColaborador(expandedColaborador.filter(id => id !== itemId));
    } else {
      setExpandedColaborador([...expandedColaborador, itemId]);
    }
  };
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
                
                    <Link className="selected">
                        <PiUsers className='icon__menu'/> Colaboradores
                    </Link>
                
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
                        Colaboradores
                    </div>
                    <button className='add__paciente' onClick={navigateToAddNewPatient}>
                        Adicionar Colaboradores
                    </button>
                </div>
                <div className="container__tittle__table">
                   <p className='pacient__inner'>Nome</p>
                   <p className='pacient__inner'>Profissão</p>
                   <p className='pacient__inner'>Inscrição</p>
                   <p className='pacient__inner'>Está atendendo?</p>
                </div>
                {colaboradores.map((item) =>(
                    <div key={item.id} className={`container__colaborador ${expandedColaborador.includes(item.id) ? 'expand__container__colaborador':''}`}>
                        <div className='pacient__box' >
                            <p className='pacient__inner'>{item.name}</p>
                            <p className='pacient__inner'>{item.profession}</p>
                            <p className='pacient__inner'>{item.creation_date}</p>
                            <p className='pacient__inner'>{item.situation}</p>
                            
                            <p className='icon__arrow__menu' onClick={() => toggleItem(item.id)} >
                                <IoIosArrowDown className={`icon__arrow__menu ${expandedColaborador.includes(item.id) ? 'icon__arrow__menu__rotated':''}`}/>
                            </p>
                        </div>
                        <div className={`hidden__box__observation ${expandedColaborador.includes(item.id) ? 'box__observation':''}`}>
                            <p className='tiitle__observation'>Observação</p>
                            <div>
                                <p className='observation__inner'>{item.observation}</p>
                            </div>
                        </div>
                        

                    </div>
                ))}
            </div>
        </div>
        
        
    )
};
export default Colaboradores;
