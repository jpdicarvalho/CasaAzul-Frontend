import { useNavigate } from "react-router-dom"
import './AddNewPatient.css'
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";


import { useState, useEffect } from "react";
import axios from "axios";


const AddNewPatient = () =>{
const navigate = useNavigate();

const navigateToPaciente = () => {
    navigate("/Paciente");
};

const [newName, setNewName] = useState(null);
const [newDateBirth, setNewDateBirth] = useState('');
const [newCEP, setNewCEP] = useState('');
const [newStreet, setNewStreet] = useState('');
const [newNumber, setNewNumber] = useState('');
const [newBairro, setNewBairro] = useState('');
const [newCity, setNewCity] = useState('');
const [newDateCreation, setNewDateCreation] = useState('');
const [hasLaudo, setHasLaudo] = useState('');
const [newCID, setNewCID] = useState('');
const [message, setMessage] = useState('');

const date = new Date()
const currentDate = new Date(date);
const token = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}-${currentDate.getHours()}:${currentDate.getMinutes()}`;

const valuesPatient =[
    newName,
    newDateBirth,
    newCEP,
    newStreet,
    newNumber,
    newBairro,
    newCity,
    newDateCreation,
    hasLaudo,
    newCID,
    token
]

function validationForm (valuesPatient) {
    for(let i=0; i < valuesPatient.length; i++){
        if(!valuesPatient[i]){
            return false
        }
    }
}
const isValidated = validationForm(valuesPatient)

const createNewPatient = () =>{
    if(isValidated != false){
        const objectPatient ={
            newName,
            newDateBirth,
            newCEP,
            newStreet,
            newNumber,
            newBairro,
            newCity,
            newDateCreation,
            hasLaudo,
            newCID,
            token
        }
        axios.post('https://api-casa-azul.up.railway.app/api/AddNewPatient/', objectPatient)
        .then(res => {
            if(res.data.Success === "Success"){
                setMessage("Paciente cadastrado com sucesso!")
                setTimeout(() => {
                    setMessage(null);
                    navigate("/Paciente");
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
    return(
        <div className="container__form">
            <div className='main__form'>
                <IoCaretBackCircleOutline className="icon__back" onClick={() => navigateToPaciente()}/>

                <div className="tittle__form">
                    Adicionar Paciente
                </div>
                <div className="subtittle__form">
                    Preencha as informações necessárias para cadastrar o paciente
                </div>
                <div className="container__inputs">
                    <div className="container__one">
                        <div className="Input__box">
                            <label htmlFor="">Nome</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewName(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Data de nascimento</label>
                            <input type="date" className='input__inner' onChange={(e) => {setNewDateBirth(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">CEP</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewCEP(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Rua</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewStreet(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Bairro</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewBairro(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Número da casa</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewNumber(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Cidade</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewCity(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="container__two">
                        <div className="Input__box">
                            <label htmlFor="">Data de inscrição</label>
                            <p className="subtittle__form">Obs: São será possível editar essa informação no futuro</p>
                            <input type="date" className='input__inner'onChange={(e) => {setNewDateCreation(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Possuí Laudo? </label>
                            <label className="input__ckeckBox">
                                <input 
                                    type="checkbox"  
                                    className='input__inner'
                                    checked={hasLaudo === 'Sim'}
                                    onChange={(e) => {setHasLaudo('Sim')}} // Define o estado como true se marcado, false se não marcado
                                />
                                Sim
                            </label>

                            <label className="input__ckeckBox">
                                <input 
                                    type="checkbox"  
                                    className='input__inner'
                                    checked={hasLaudo === 'Não'}
                                    onChange={(e) => {setHasLaudo('Não'), setNewCID('não')}} // Define o estado como false se marcado, true se não marcado
                                />
                                Não
                            </label>
                        </div>
                        {hasLaudo === 'Sim' &&(
                            <div className="Input__box">
                                <label htmlFor="">CID</label>
                                <input type="text" className='input__inner' onChange={(e) => {setNewCID(e.target.value)}}/>
                            </div>
                        )}
                        
                        {message === "Paciente cadastrado com sucesso!" ? (
                            <div className="message__success">
                                <FaRegCheckCircle className="icon__message"/>{message}
                            </div>
                        ):(
                            <div className={` ${message ? 'message__erro' : ''}`}>
                                <MdOutlineErrorOutline  className="icon__message"/>{message}
                            </div>
                            
                        )}
                        
                        <button className={`Btn_cadastrar ${isValidated != false ? 'Skilled__button' : ''}`} onClick={createNewPatient}>
                            Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default AddNewPatient;
