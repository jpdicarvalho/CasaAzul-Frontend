import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './AddNewAtendimento.css'
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";


const AddNewAtendimento = () =>{
const navigate = useNavigate();

const navigateToAtendimento = () => {
    navigate("/Atendimento");
};

//====== Section new Service =====
const [newService, setNewService] = useState('');
const [messageNewService, setMessageNewService] = useState('');


const createNewService = () =>{
    axios.post(`http://localhost:8000/api/addNewService/${newService}`)
    .then(res => {
        if(res.data.Success === "Success"){
            setMessageNewService('Novo tipo de atendimento cadastrado.')
            setTimeout(() => {
                getAllServices()
                setMessageNewService(null);
              }, 2000);
        }
    }).catch(err => console.log('erro ao cadastrar atendimento', err))
}

//====== Get All services ======
const [newDateService, setNewDateService] = useState('');
const [services, setServices] = useState([]);
const [serviceId, setServiceId] = useState('');
const [arrayService, setArrayService] = useState([]);
const [messageService, setMessageService] = useState('');

const getAllServices = () =>{
    axios.get('http://localhost:8000/api/get-services/')
    .then(res =>{
        if(res.data.Success === "Success"){
            setServices(res.data.resu);
        }else{
            setMessageService("Nenhum serviço encontrado.")
        }
    }).catch(err => console.log("Erro ao buscar serviço.", err))
}
useEffect(() =>{
    getAllServices()
}, [messageService, newDateService, newService])

const toggleItemService = (itemId) => {
    setServiceId(itemId);
    if (arrayService.includes(itemId)) {
        setArrayService([]); // Remove o itemId do array, deixando o array vazio
        setServiceId('');

    } else {
        setArrayService([itemId]); // Adiciona apenas o itemId ao array
    }
};

//====== Section paciente =====
const [SearchPaciente, setSearchPaciente] = useState('');
const [pacientes, setPacientes] = useState([]);
const [pacienteId, setPacienteId] = useState('');
const [arrayPacientes, setArrayPacientes] = useState([]);
const [messagePaciente, setMessagePaciente] = useState('');


const getAllPaciente = () =>{
    axios.get(`http://localhost:8000/api/get-paciente/${SearchPaciente}`)
    .then(res =>{
        if(res.data.Success === "Success"){
            setMessagePaciente('')
            setPacientes(res.data.resul);
        }else{
            setPacientes([])
            setMessagePaciente("Nenhum paciente encontrado.")
        }
    }).catch(err => console.log("Erro ao buscar pacientes.", err))
}

const toggleItemPaciente = (itemId) => {
    setPacienteId(itemId);
    if (arrayPacientes.includes(itemId)) {
        setArrayPacientes([]); // Remove o itemId do array, deixando o array vazio
        setPacienteId('');

    } else {
        setArrayPacientes([itemId]); // Adiciona apenas o itemId ao array
    }
};

//====== Section colaborador =====
const [SearchColaborador, setSearchColaborador] = useState('');
const [colaboradores, setColaboradores] = useState([]);
const [arrayColaborador, setArrayColaborador] = useState([]);
const [colaboradoreId, setColaboradoreId] = useState('');
const [messageColaborador, setMessageColaborador] = useState('');

const getAllColaboradores = () =>{
    axios.get(`http://localhost:8000/api/get-colaboradores/${SearchColaborador}`)
    .then(res =>{
        if(res.data.Success === "Success"){
            setMessageColaborador('')
            setColaboradores(res.data.resul);
        }else{
            setColaboradores([])
            setMessageColaborador("Nenhum colaborador encontrado.")
        }
    }).catch(err => console.log("Erro ao buscar colaboradores.", err))
}

const toggleItemColaborador = (itemId) => {
    setColaboradoreId(itemId);
    if (arrayColaborador.includes(itemId)) {
        setArrayColaborador([]); // Remove o itemId do array, deixando o array vazio
        setColaboradoreId('');
    } else {
        setArrayColaborador([itemId]); // Adiciona apenas o itemId ao array
    }
};

//===== Section create a new atendimento =====
const [messageNewAtendimento, setMessageNewAtendimento] = useState('');

const isInputsValied = newDateService && serviceId && colaboradoreId && pacienteId;

const creatNewAtendimento = () =>{
    if(isInputsValied){
        const valuesNewAtendimento = {
            newDateService,
            serviceId,
            colaboradoreId,
            pacienteId
        }
        axios.post('http://localhost:8000/api/addNewAtendimento/', valuesNewAtendimento)
        .then(res => {
            if(res.data.Success === "Success"){
                setMessageNewAtendimento('Novo atendimento cadastrado.')
                setTimeout(() => {
                    setMessageNewAtendimento(null);
                    navigate("/Atendimento");
                }, 2000);
            }
        }).catch(err => console.log('erro ao cadastrar atendimento', err))
    }else{
        setMessageNewAtendimento('Preencha todos os campos.')
    }
}
  return(
        <div className="container__form">
            <div className='main__form'>
                <IoCaretBackCircleOutline className="icon__back" onClick={() => navigateToAtendimento()}/>

                <div className="tittle__form">
                    Criar Atendimento
                </div>
                <div className="subtittle__form">
                    Preencha as informações necessárias para criar um novo atendimento
                </div>
                {messageNewService === "Novo tipo de atendimento cadastrado." ? (
                        <div className="message__success">
                            <FaRegCheckCircle className="icon__message"/>{messageNewService}
                        </div>
                    ):(
                        <div className={` ${messageNewService ? 'message__erro' : ''}`}>
                            <MdOutlineErrorOutline  className="icon__message"/>{messageNewService}
                        </div>
                                
                    )}
                <div className="container__inputs">
                    <div className="container__one">
                        <div className="Input__box">
                            <label style={{fontSize: '18px'}}>Data do atendimento</label>
                            <input type="date" className='input__inner'onChange={(e) => {setNewDateService(e.target.value)}}/>
                        </div>

                        <label style={{fontSize: '18px', marginLeft: '10px'}}>Tipos de Atendimentos</label>
                        <div className="container__search__colaborador "style={{marginLeft: '10px'}}>
                            <input type="text" className='input__inner search' placeholder="Novo tipo de atendimento" onChange={(e) => {setNewService(e.target.value)}}/>
                            {newService &&(
                                <button className="Btn_buscar" onClick={createNewService}>Cadastrar</button>
                            )}
                            
                        </div>
                        {messageService === 'Nenhum serviço encontrado.' ?(
                                    <div className='message_colaborador'>{messageService}</div>
                                ):null}

                        <div className="container__nameServices">
                            {services.map((item) => (
                                <div key={item.id} className={`name__service ${arrayService.includes(item.id) ? 'service__selected':''}`} onClick={() => toggleItemService(item.id)}>
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                    <div className="container__two">
                    <div className="Input__box">
                            <label style={{fontSize: '18px'}}>Responsável pelo atendimento</label>
                            <div className="container__search__colaborador">
                                <input type="text" className='input__inner search' placeholder="Buscar colaborador..." onChange={(e) => {setSearchColaborador(e.target.value)}}/>
                                {SearchColaborador &&(
                                    <button className="Btn_buscar" onClick={getAllColaboradores}>Buscar</button>
                                )}
                            </div>
                            

                            <div className="conatiner__colaboradores">
                                {messageColaborador === 'Nenhum colaborador encontrado.' ?(
                                    <div className='message_colaborador'>{messageColaborador}</div>
                                ):null}

                                {colaboradores.map((item) =>(
                                    <div key={item.id} className={`box_colaborador ${arrayColaborador.includes(item.id) ? 'colaborador__selected':''}`} onClick={() => toggleItemColaborador(item.id)}>
                                        <div className="colaborador__box"   >
                                            <p className='pacient__inner'>{item.name}</p>
                                            <p className='pacient__inner'>{item.profession}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="Input__box">
                            <label style={{fontSize: '18px'}}>Paciente a ser atendimento</label>
                            <div className="container__search__colaborador">
                                <input type="text" className='input__inner search' placeholder="Buscar paciente..." onChange={(e) => {setSearchPaciente(e.target.value)}}/>
                                {SearchPaciente &&(
                                        <button className="Btn_buscar" onClick={getAllPaciente}>Buscar</button>
                                )}
                            </div>
                            <div className="conatiner__colaboradores">
                                {messagePaciente === 'Nenhum paciente encontrado.' ?(
                                    <div className='message_colaborador'>{messagePaciente}</div>
                                ):null}

                                {pacientes.map((item) =>(
                                    <div key={item.id} className={`box_colaborador ${arrayPacientes.includes(item.id) ? 'colaborador__selected':''}`} onClick={() => toggleItemPaciente(item.id)}>
                                        <div className="colaborador__box">
                                            <p className='pacient__inner'>{item.name}</p>
                                            <p className='pacient__inner'>{item.date_birth}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                        {messageNewAtendimento === "Novo atendimento cadastrado." ? (
                            <div className="message__success">
                                <FaRegCheckCircle className="icon__message"/>{messageNewAtendimento}
                            </div>
                        ):(
                            <div className={` ${messageNewAtendimento ? 'message__erro' : ''}`}>
                                <MdOutlineErrorOutline  className="icon__message"/>{messageNewAtendimento}
                            </div>
                            
                        )}
                        <button className={`Btn_cadastrar ${isInputsValied ? 'Skilled__button':''}`} onClick={creatNewAtendimento}>
                            Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default AddNewAtendimento;