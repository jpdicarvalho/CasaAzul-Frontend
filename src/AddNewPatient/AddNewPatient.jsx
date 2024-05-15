import { useNavigate } from "react-router-dom"
import './AddNewPatient.css'
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";


const AddNewPatient = () =>{
const navigate = useNavigate();

const navigateToPaciente = (paciente) => {
    navigate("/Paciente", {state: {paciente}});
};

const [newName, setNewName] = useState(null);
const [newDateBirth, setNewDateBirth] = useState('');
const [newCEP, setNewCEP] = useState('');
const [newStreet, setNewStreet] = useState('');
const [newNumber, setNewNumber] = useState('');
const [newBairro, setNewBairro] = useState('');
const [newCity, setNewCity] = useState('');
const [newDateCreation, setNewDateCreation] = useState('');
const [newLaudo, setNewLaudo] = useState('');
const [newCID, setNewCID] = useState('');

const objectPatient =[
    newName,
    newDateBirth,
    newCEP,
    newStreet,
    newNumber,
    newBairro,
    newCity,
    newDateCreation,
    newLaudo,
    newCID
]

function validationForm (objectPatient) {
    for(let i=0; i < objectPatient.length; i++){
        if(!objectPatient[i]){
            return false
        }
    }
}
const isValidated = validationForm(objectPatient)

const createNewPatient = () =>{
    if(isValidated != false){
        console.log("deu certo");
    }
    
}
    return(
        <div className="container__form">
            <div className='main__form'>
                <IoCaretBackCircleOutline className="icon__back" onClick={() => navigateToPaciente("paciente")}/>

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
                            <input type="date" className='input__inner'onChange={(e) => {setNewDateCreation(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Laudo</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewLaudo(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">CID</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewCID(e.target.value)}}/>
                        </div>
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