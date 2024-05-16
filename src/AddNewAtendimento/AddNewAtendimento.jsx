import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './AddNewAtendimento.css'
import { IoCaretBackCircleOutline } from "react-icons/io5";


const AddNewAtendimento = () =>{
const navigate = useNavigate();

const navigateToAtendimento = (atendimento) => {
    navigate("/Atendimento", {state: {atendimento}});
};

const [SearchColaborador, setSearchColaborador] = useState('');
const [SearchPaciente, setSearchPaciente] = useState('');

const [colaboradores, setColaboradores] = useState([]);
const [arrayColaborador, setArrayColaborador] = useState([]);
const [colaboradoreId, setColaboradoreId] = useState('');

const getAllColaboradores = () =>{
    axios.get(`http://localhost:8000/api/get-colaboradores/${SearchColaborador}`)
    .then(res =>{
        if(res.data.Success === "Success"){
            setColaboradores(res.data.resul);
        }
    }).catch(err => console.log("Erro ao buscar colaboradores.", err))
}
const getAllPaciente = () =>{
    axios.get(`http://localhost:8000/api/get-paciente/${SearchPaciente}`)
    .then(res =>{
        if(res.data.Success === "Success"){
            setColaboradores(res.data.resul);
        }
    }).catch(err => console.log("Erro ao buscar colaboradores.", err))
}

const toggleItem = (itemId) => {
    setColaboradoreId(itemId);
    if (arrayColaborador.includes(itemId)) {
        setArrayColaborador([]); // Remove o itemId do array, deixando o array vazio
    } else {
        setArrayColaborador([itemId]); // Adiciona apenas o itemId ao array
    }
};

  return(
        <div className="container__form">
            <div className='main__form'>
                <IoCaretBackCircleOutline className="icon__back" onClick={() => navigateToAtendimento("atendimento")}/>

                <div className="tittle__form">
                    Criar Atendimento
                </div>
                <div className="subtittle__form">
                    Preencha as informações necessárias para criar um novo atendimento
                </div>
                <div className="container__inputs">
                    <div className="container__one">
                        <label style={{marginLeft: '10px', fontSize: '18px'}}>Tipos de Atendimentos</label>
                        <div className="Input__box ">
                            <label className="ckecked__section">
                                <input type="checkbox" className='input__inner'/>Psicológico/Psicoterapia
                            </label>
                            <label className="ckecked__section">
                                <input type="checkbox" className='input__inner'/>Triagem
                            </label>
                            <label className="ckecked__section">
                                <input type="checkbox" className='input__inner'/>Pedagógico
                            </label>
                        </div>
                        <div className="Input__box">
                            <label style={{fontSize: '18px'}}>Data do atendimento</label>
                            <input type="date" className='input__inner'/>
                        </div>
                        
                    </div>
                    <div className="container__two">
                    <div className="Input__box">
                            <label style={{fontSize: '18px'}}>Responsável pelo atendimento</label>
                            <div className="container__search__colaborador">
                                <input type="text" className='input__inner search' placeholder="Buscar..." onChange={(e) => {setSearchColaborador(e.target.value)}}/>
                                {SearchColaborador &&(
                                    <button className="Btn_buscar" onClick={getAllColaboradores}>Buscar</button>
                                )}
                            </div>
                            

                            <div className="conatiner__colaboradores">
                                {colaboradores.map((item) =>(
                                    <div key={item.id} className={`box_colaborador ${arrayColaborador.includes(item.id) ? 'colaborador__selected':''}`} onClick={() => toggleItem(item.id)}>
                                        <div className="pacient__box" style={{color: '#2d2d2fb1'}}>
                                            <p className='pacient__inner'>{item.name}</p>
                                            <p className='pacient__inner'>{item.profession}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="Input__box">
                            <label style={{fontSize: '18px'}}>Paciente a ser atendimento</label>
                            <input type="text" className='input__inner' placeholder="Buscar paciente"/>
                        </div>
                        <button className='Btn_cadastrar'>
                            Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default AddNewAtendimento;