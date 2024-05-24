import { useNavigate, useLocation } from "react-router-dom"
import './EditColaborador.css'
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";


import { useState, useEffect } from "react";
import axios from "axios";


const EditColaborador = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    
    const { colaborador } = location.state;

    const navigateToColaboradores = () => {
        navigate("/Colaboradores" );
    };

const [newName, setNewName] = useState(null);
const [newProfession, setNewProfession] = useState('');
const [newCPF, setNewCPF] = useState('');
const [newDateCreation, setNewDateCreation] = useState('');
const [isWorking, setIsworking] = useState('');
const [newObservation, setNewObservation] = useState('');
const [message, setMessage] = useState('');

const isValidated = newName || newProfession || newCPF || newDateCreation || isWorking || newObservation;

const updateColaborador = () =>{
    if(isValidated){

        const objectColaborador ={
            newName,
            newProfession,
            newCPF,
            newDateCreation,
            isWorking,
            newObservation,
            colaboradorId: colaborador.id
        }

        axios.put('https://api-casa-azul.up.railway.app/api/updateColaborador/', objectColaborador)
        .then(res => {
            if(res.data.Success === "Success"){
                setMessage("Alteração realizada com sucesso!")
                setTimeout(() => {
                    setMessage(null);
                    navigate("/Colaboradores" );
                  }, 2000);
            }
        }).catch(err => console.log(err))
    }else{
        setMessage("É necessário preencher ao menos um campo.")
        setTimeout(() => {
            setMessage(null);
          }, 2000);
    }
    
}
console.log(colaborador)
    return(
        <div className="container__form">
            <div className='main__form'>
                <IoCaretBackCircleOutline className="icon__back" onClick={() => navigateToColaboradores()}/>

                <div className="tittle__form">
                    Editar Colaborador
                </div>
                {message === "Alteração realizada com sucesso!" ? (
                            <div className="message__success">
                                <FaRegCheckCircle className="icon__message"/>{message}
                            </div>
                        ):(
                            <div className={` ${message ? 'message__erro' : ''}`}>
                                <MdOutlineErrorOutline  className="icon__message"/>{message}
                            </div>
                            
                        )}
                <div className="container__inputs">
                    <div className="container__one">
                        <div className="Input__box">
                            <label htmlFor="">Nome</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewName(e.target.value)}} placeholder={colaborador.name}/>
                        </div>
                       
                        <div className="Input__box">
                            <label htmlFor="">Profissão</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewProfession(e.target.value)}} placeholder={colaborador.profession}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">CPF</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewCPF(e.target.value)}} placeholder={colaborador.CPF}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Data de inscrição</label>
                            <input type="date" className='input__inner'onChange={(e) => {setNewDateCreation(e.target.value)}} value={newDateCreation ? newDateCreation:colaborador.creation_date}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Está atendendo? </label>
                                <input 
                                    type="text"  
                                    className='input__inner'
                                    onChange={(e) => {setIsworking(e.target.value)}}
                                    placeholder={colaborador.situation}
                                />
                        </div>
                    </div>
                    <div className="container__two">
                        <div className="Input__box">
                            <label htmlFor="">Observações</label>
                            <textarea type="text" className='input__textarea' onChange={(e) => {setNewObservation(e.target.value)}} placeholder={colaborador.observation}/>
                        </div>

                        <button className={`Btn_cadastrar ${isValidated != false ? 'Skilled__button' : ''}`} onClick={updateColaborador}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default EditColaborador;
