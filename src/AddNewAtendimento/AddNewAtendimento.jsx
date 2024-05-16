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
                            <input type="text" className='input__inner' placeholder="Buscar colaborador"/>
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