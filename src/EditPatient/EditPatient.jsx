import { useNavigate, useLocation } from "react-router-dom"
import './EditPatient.css'
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";


import { useState, useEffect } from "react";
import axios from "axios";


const EditPatient = () =>{
const navigate = useNavigate();
const location = useLocation();

const { pacientes } = location.state;
const paciente = pacientes;

const navigateToPaciente = () => {
    navigate("/Paciente");
};

console.log(paciente)
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


const isValidatedInputsPatient = newName|| newDateBirth|| newDateCreation|| hasLaudo;
const isValidatedInputsAddress = newCEP|| newStreet|| newNumber|| newBairro || newCity;

//Function to update patient
const updatePatient = () =>{
    if(isValidatedInputsPatient){
        const objectUpdatePatient ={
            newName,
            newDateBirth,
            newDateCreation,
            hasLaudo,
            pacienteId: paciente.id,
        }
        axios.post('https://api-casa-azul.up.railway.app/api/updatePatient/', objectUpdatePatient)
        .then(res => {
            if(res.data.Success === "Success"){
                setMessage("Paciente atualizado com sucesso!")
                setTimeout(() => {
                    setMessage(null);
                    navigate("/Paciente");
                  }, 2000);
            }
        }).catch(err => console.log(err))
    }else{
        setMessage("É necessário ao menos um campos.")
        setTimeout(() => {
            setMessage(null);
          }, 2000);
    }
    
}

//Function to update address
const updateAddress = () =>{
    if(isValidatedInputsAddress){
        const objectUpdateAddress ={
            newCEP,
            newStreet,
            newNumber,
            newBairro,
            newCity,
            addressId: paciente.address_id,
        }
        axios.post('https://api-casa-azul.up.railway.app/api/updateAddress/', objectUpdateAddress)
        .then(res => {
            if(res.data.Success === "Success"){
                setMessage("Paciente atualizado com sucesso!")
                setTimeout(() => {
                    setMessage(null);
                    navigate("/Paciente");
                  }, 2000);
            }
        }).catch(err => console.log(err))
    }else{
        setMessage("É necessário ao menos um campos.")
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
                    Editar Paciente
                </div>
                <div className="subtittle__form">
                    Edite as informações necessárias do paciente
                </div>
                <div className="container__inputs">
                    <div className="container__one">
                        <div className="Input__box">
                            <label htmlFor="">Nome</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewName(e.target.value)}} placeholder={paciente.name}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Data de nascimento</label>
                            <input type="date" className='input__inner' onChange={(e) => {setNewDateBirth(e.target.value)}} />
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">CEP</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewCEP(e.target.value)}} placeholder={paciente.CEP}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Rua</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewStreet(e.target.value)}} placeholder={paciente.street}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Bairro</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewBairro(e.target.value)}} placeholder={paciente.neighborhood}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Número da casa</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewNumber(e.target.value)}} placeholder={paciente.number}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Cidade</label>
                            <input type="text" className='input__inner' onChange={(e) => {setNewCity(e.target.value)}} placeholder={paciente.city}/>
                        </div>
                    </div>
                    <div className="container__two">
                        <div className="Input__box">
                            <label htmlFor="">Data de inscrição</label>
                            <input type="date" className='input__inner'onChange={(e) => {setNewDateCreation(e.target.value)}}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Possuí Laudo? </label>
                            <label className="input__ckeckBox">
                                <input 
                                    type="checkbox"  
                                    className='input__inner'
                                    value={paciente.laudo ? paciente.laudo:''}
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
                                <input type="text" className='input__inner' onChange={(e) => {setNewCID(e.target.value)}} placeholder={paciente.code_cid}/>
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
                        {isValidatedInputsPatient &&(
                            <button className={`Btn_cadastrar ${isValidatedInputsPatient ? 'Skilled__button' : ''}`} onClick={updatePatient}>
                                Salvar
                            </button>
                        )}
                        {isValidatedInputsAddress &&(
                            <button className={`Btn_cadastrar ${isValidatedInputsAddress ? 'Skilled__button' : ''}`} onClick={updateAddress}>
                                Salvar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default EditPatient;
