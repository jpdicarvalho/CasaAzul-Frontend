import { useNavigate } from "react-router-dom"
import './AddNewColaborador.css'
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";


import { useState, useEffect } from "react";
import axios from "axios";


const AddNewColaborador = () =>{
const navigate = useNavigate();

const navigateToColaboradores = (colaboradores) => {
    navigate("/Colaboradores", {state: {colaboradores}});
};

const [newName, setNewName] = useState(null);
const [newProfession, setNewProfession] = useState('');
const [newDateCreation, setNewDateCreation] = useState('');
const [isWorking, setIsworking] = useState('');
const [newObservation, setNewObservation] = useState('');
const [message, setMessage] = useState('');

const date = new Date()
const currentDate = new Date(date);
const token = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}-${currentDate.getHours()}:${currentDate.getMinutes()}`;

const objectColaborador =[
    newName,
    newProfession,
    newDateCreation,
    isWorking,
    newObservation
]

function validationForm (objectColaborador) {
    for(let i=0; i < objectColaborador.length; i++){
        if(!objectColaborador[i]){
            return false
        }
    }
}
const isValidated = validationForm(objectColaborador)

const createNewColaborador = () =>{
    if(isValidated != false){
        axios.post('http://localhost:8000/api/AddNewColaborador/', objectColaborador)
        .then(res => {
            if(res.data.Success === "Success"){
                setMessage("Colaborador cadastrado com sucesso!")
                setTimeout(() => {
                    setMessage(null);
                  }, 2000);
            }
        }).catch(err => console.log(err))
    }else{
        setMessage("É necessário preencher todos os campos.")
        setTimeout(() => {
            setMessage(null);
          }, 2000);
    }
    
}
console.log(objectColaborador)

    return(
        <div className="container__form">
            <div className='main__form'>
                <IoCaretBackCircleOutline className="icon__back" onClick={() => navigateToColaboradores("colaboradores")}/>

                <div className="tittle__form">
                    Adicionar Colaborador
                </div>
                <div className="subtittle__form">
                    Preencha as informações necessárias para cadastrar um colaborador
                </div>
                <div className="container__inputs">
                    <div className="container__one">
                        <div className="Input__box">
                            <label htmlFor="">Nome</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewName(e.target.value)}}/>
                        </div>
                       
                        <div className="Input__box">
                            <label htmlFor="">Profissão</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewProfession(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Data de inscrição</label>
                            <input type="date" className='input__inner'onChange={(e) => {setNewDateCreation(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Está atendendo? </label>
                            <label className="input__ckeckBox">
                                <input 
                                    type="checkbox"  
                                    className='input__inner'
                                    checked={isWorking === 'Sim'}
                                    onChange={(e) => {setIsworking('Sim')}} // Define o estado como true se marcado, false se não marcado
                                />
                                Sim
                            </label>

                            <label className="input__ckeckBox">
                                <input 
                                    type="checkbox"  
                                    className='input__inner'
                                    checked={isWorking === 'Não'}
                                    onChange={(e) => {setIsworking('Não')}} // Define o estado como false se marcado, true se não marcado
                                />
                                Não
                            </label>
                        </div>
                    </div>
                    <div className="container__two">
                        <div className="Input__box">
                            <label htmlFor="">Observações</label>
                            <textarea type="text" className='input__textarea' onChange={(e) => {setNewObservation(e.target.value)}}/>
                        </div>
                        
                        <button className={`Btn_cadastrar ${isValidated != false ? 'Skilled__button' : ''}`} onClick={createNewColaborador}>
                            Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default AddNewColaborador;