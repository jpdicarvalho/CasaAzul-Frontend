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
    axios.get(`https://api-casa-azul.up.railway.app/api/get-pacientes/${SearchPaciente}`)
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
    axios.get('https://api-casa-azul.up.railway.app/api/get-services/')
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
//===== genereta report by patient =====
const generateReportByPatient = () =>{
    if(pacienteId){
        axios.get(`https://api-casa-azul.up.railway.app/api/generateReportByPatient/${pacienteId}`)
        .then(res =>{
            if(res.data.Success === "Success"){
                setDataReport(res.data.result);
            }else{
                setDataReport([])
                setMessageReport("Nenhum resultado encontrado.")
            }
        }).catch(err => console.log("Erro ao gerar relatório.", err))
    }
}
//===== genereta report by service =====
const generateReportByService = () =>{
    if(serviceId){
        axios.get(`https://api-casa-azul.up.railway.app/api/generateReportByService/${serviceId}`)
        .then(res =>{
            if(res.data.Success === "Success"){
                setDataReport(res.data.result);
            }else{
                setDataReport([])
                setMessageReport("Nenhum resultado encontrado.")
            }
        }).catch(err => console.log("Erro ao gerar relatório.", err))
    }
}
//===== genereta report by period =====
const generateReportByPeriod = () =>{
    if(dateInitial && dateFinal){
        axios.get(`https://api-casa-azul.up.railway.app/api/generateReportByPeriod/${dateInitial}/${dateFinal}`)
        .then(res =>{
            if(res.data.Success === "Success"){
                setDataReport(res.data.result);
            }else{
                setDataReport([])
                setMessageReport("Nenhum resultado encontrado.")
            }
        }).catch(err => console.log("Erro ao gerar relatório.", err))
    }
}
//===== genereta report with all values =====
const [dateInitial, setDateInitial] = useState('');
const [dateFinal, setDateFinal] = useState('');
const [dataReport, setDataReport] = useState([]);
const [MessageReport, setMessageReport] = useState('');

const isValuesInputs = pacienteId && serviceId && dateInitial && dateFinal;

const generateReportWithAllValues = () =>{
    if(isValuesInputs){
        
        axios.get(`https://api-casa-azul.up.railway.app/api/generateReport/${pacienteId}/${serviceId}/${dateInitial}/${dateFinal}`)
        .then(res =>{
            if(res.data.Success === "Success"){
                setDataReport(res.data.result);
            }else{
                setDataReport([])
                setMessageReport("Nenhum resultado encontrado.")
            }
        }).catch(err => console.log("Erro ao gerar relatório.", err))
    }else{
        setDataReport([])
        setMessageReport("Preencha todos os campos para gerar o relatório.")
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
                <div onClick={() => navigateToPaciente()}>
                    <Link className="name__menu">
                        <LiaUserSolid className='icon__menu'/> Pacientes
                    </Link>
                </div>
                
                <Link className="name__menu selected">
                    <HiOutlineDocumentReport className='icon__menu'/> Relatórios
                </Link>
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
                        Relatório
                    </div>
                    {dateInitial && dateFinal && pacienteId && !serviceId &&(
                        <button className="full__btn__report" onClick={generateReportByPatient}>
                            Gerar relatório
                        </button>
                    )}
                    {dateInitial && dateFinal && !pacienteId && serviceId &&(
                        <button className="full__btn__report" onClick={generateReportByService}>
                            Gerar relatório
                        </button>
                    )}
                    {dateInitial && dateFinal && !serviceId && !pacienteId &&(
                        <button className="full__btn__report" onClick={generateReportByPeriod}>
                            Gerar relatório
                        </button>
                    )}
                    {isValuesInputs &&(
                        <button className="full__btn__report" onClick={generateReportWithAllValues}>
                            Gerar relatório
                        </button>
                    )}
                    
                </div>
            <div className="section__inputs__search">
                
                <div className="container__tittle_and_input">
                   <p className='tittle__table__inner'>Nome do paciente</p>
                   <p className='tittle__table__inner' style={{fontSize: '12px'}}>Opicional</p>
                   <input type="text" className='input__inner' value={SearchPaciente} placeholder={namePaciente ? namePaciente:'Buscar...'} onChange={(e) => {setSearchSearchPaciente(e.target.value)}}/>
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
                    <p className='tittle__table__inner' style={{fontSize: '12px'}}>Opicional</p>
                   <input type="text" className='input__inner' value={SearchTypeService} placeholder={nameService ? nameService:'Buscar...'} onChange={(e) => {setSearchTypeService(e.target.value)}}/>
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
                    <p className='tittle__table__inner' style={{fontSize: '12px'}}>Obrigatório</p>
                   <input type="date" className='input__inner' onChange={(e) =>{setDateInitial(e.target.value)}}/>
                </div>
                <div className="container__tittle_and_input">
                    <p className='tittle__table__inner'>Data final</p>
                    <p className='tittle__table__inner' style={{fontSize: '12px'}}>Obrigatório</p>
                   <input type="date" className='input__inner' onChange={(e) =>{setDateFinal(e.target.value)}}/>
                </div>

            </div>
            <div className='container__qntReport'>
                    {dataReport.length > 0 &&(
                        <p>Resultados ({dataReport.length})</p>
                    )}
            </div>
            <div className="container__tittle__table">
                   <p className='pacient__inner'>Paciente</p>
                   <p className='pacient__inner'>Profissional</p>
                   <p className='pacient__inner' style={{width: 'auto', marginRight: '10px'}}>Tipo do atendimento</p>
                   <p className='pacient__inner'style={{width: 'auto'}}>Data do atendimento</p>
                </div>
                
            <div className="container__result__report">
                
                {dataReport.length > 0 ?(
                    dataReport.map((item) =>(
                        <div key={item.service_id} className='conatiner__paciente' >
                            <div className='pacient__box'>
                                <p className='pacient__inner'>{item.patient_name}</p>
                                <p className='pacient__inner'>{item.professional_name}</p>
                                <p className='pacient__inner'style={{marginRight: '20px'}}>{item.name_service}</p>
                                <p className='pacient__inner'>{item.data_servico}</p>
                            </div>
                        </div>
                    ))
                    ):(
                        <div className='message__report'>
                            {MessageReport === 'Nenhum resultado encontrado.' ?(
                                <div>
                                    {MessageReport}
                                </div>
                            ):(
                                <div>
                                    {MessageReport}
                                </div>
                            )}
                        </div>
                    )
                
                }
            </div>
            </div>
        </div>
        
        
    )
};
export default Relatorios;