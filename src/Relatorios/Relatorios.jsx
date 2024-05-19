import { useState, useEffect } from 'react';
import axios from 'axios';

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


const navigateToAtendimento = () => {
    navigate("/Atendimento");
};
const navigateToColaboradores = () => {
    navigate("/Colaboradores");
};
const navigateToPaciente = () => {
    navigate("/Paciente");
};

//===== Section get data paciente =====
const [SearchPaciente, setSearchSearchPaciente] = useState('');
const [pacientes, setPacientes] = useState([]);
const [namePaciente, setNamePaciente] = useState('');
const [pacienteId, setPacienteId] = useState('');
const [hiddenDivPaciente, setHiddenDivPaciente] = useState(false);
const [messagePacientes, setMessagePacientes] = useState('');

const getAllPacientes = () =>{
    axios.get(`http://localhost:8000/api/get-pacientes/${SearchPaciente}`)
    .then(res =>{
        if(res.data.Success === "Success"){
            setMessagePacientes('')
            setHiddenDivPaciente(false)
            setPacientes(res.data.resul);
        }else{
            setPacientes([])
            setMessagePacientes("Nenhum paciente encontrado.")
        }
    }).catch(err => console.log("Erro ao buscar colaboradores.", err))
}

const getDataPaciente = (paciente_id, name_paciente) =>{
    setPacienteId(paciente_id)
    setNamePaciente(name_paciente)
    setHiddenDivPaciente(true)
    setSearchSearchPaciente('')
}

//===== Section get type service =====
const [SearchTypeService, setSearchTypeService] = useState('');
const [services, setServices] = useState([]);
const [nameService, setNameService] = useState('');
const [serviceId, setServiceId] = useState('');
const [hiddenDivService, setHiddenDivService] = useState(false);

const getAllServices = () =>{
    axios.get('http://localhost:8000/api/get-services/')
    .then(res =>{
        if(res.data.Success === "Success"){
            setHiddenDivService(false)
            setServices(res.data.resu);
        }else{
            setMessageService("Nenhum serviço encontrado.")
        }
    }).catch(err => console.log("Erro ao buscar serviço.", err))
}

useEffect(() =>{
    getAllServices()
}, [SearchTypeService])

// Convertendo o valor do search para minúsculo
const searchLowerCase = SearchTypeService.toLowerCase();

// Buscando Barbearia pelo input Search
const serviceSearch = services.filter((service) =>
    service.name.toLowerCase().includes(searchLowerCase)
);

const getDataTypeService = (paciente_id, name_paciente) =>{
    setServiceId(paciente_id)
    setNameService(name_paciente)
    setHiddenDivService(true)
    setSearchTypeService('')
}

//===== genereta report =====
const [dateInitial, setDateInitial] = useState('');
const [dateFinal, setDateFinal] = useState('');
const [dataReport, setDataReport] = useState('');
const [MessageReport, setMessageReport] = useState('');

const generateReport = () =>{
    if(pacienteId && serviceId && dateInitial && dateFinal){
        const valuesToGenerateReport = {
            pacienteId,
            serviceId,
            dateInitial,
            dateFinal
        }
        axios.post('http://localhost:8000/api/generateReport/', valuesToGenerateReport)
        .then(res =>{
            if(res.data.Success === "Success"){
                setDataReport(res.data.result);
            }else{
                setMessageReport("Nenhum resultado encontrado.")
            }
        }).catch(err => console.log("Erro ao gerar relatório.", err))
    }
}
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
                   <input type="text" className='input__inner' value={SearchPaciente} placeholder={namePaciente ? namePaciente:'Buscar paciente'} onChange={(e) => {setSearchSearchPaciente(e.target.value)}}/>
                   {SearchPaciente &&(
                        <button className="Btn_buscar" onClick={getAllPacientes}>Buscar</button>
                    )}
                    {messagePacientes === 'Nenhum paciente encontrado.' ?(
                        <div className='message__search__paciente'>{messagePacientes}</div>
                    ):(
                        <div>
                        {pacientes.map((item) =>(
                            <div key={item.id} className={`Box__paciente__found ${hiddenDivPaciente ? 'hiddenBtn':''}`} onClick={() => getDataPaciente(item.id, item.name)}>
                                <p >{item.name}</p>
                            </div>
                        ))}
                        </div>
                        
                    )}
                </div>
                
                <div className="container__tittle_and_input">
                    <p className='tittle__table__inner'>Tipo do atendimento</p>
                   <input type="text" className='input__inner' value={SearchTypeService} placeholder={nameService ? nameService:'Buscar tipo de atendimento'} onChange={(e) => {setSearchTypeService(e.target.value)}}/>
                   {SearchTypeService &&(
                        serviceSearch.map((item) =>(
                            <div key={item.id} className={`Box__paciente__found ${hiddenDivService ? 'hiddenBtn':''}`} onClick={() => getDataTypeService(item.id, item.name)}>
                                <p >{item.name}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="container__tittle_and_input">
                    <p className='tittle__table__inner'>Data inicial</p>
                   <input type="date" className='input__inner' onChange={(e) =>{setDateInitial(e.target.value)}}/>
                </div>
                <div className="container__tittle_and_input">
                    <p className='tittle__table__inner'>Data final</p>
                   <input type="date" className='input__inner' onChange={(e) =>{setDateFinal(e.target.value)}}/>
                </div>

            </div>
            </div>
        </div>
        
        
    )
};
export default Relatorios;