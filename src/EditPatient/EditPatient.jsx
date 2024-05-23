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

const isValidatedInputsPatient = newName|| newDateBirth|| newDateCreation;
const isValidatedInputsAddress = newCEP|| newStreet|| newNumber|| newBairro || newCity;

//Function to update patient
const updatePatient = () =>{
    if(isValidatedInputsPatient){
        const objectUpdatePatient ={
            newName,
            newDateBirth,
            newDateCreation,
            pacienteId: paciente.id,
        }
        axios.post('https://api-casa-azul.up.railway.app/api/updatePatient/', objectUpdatePatient)
        .then(res => {
            if(res.data.Success === "Success"){
                setMessage("Alteração salva com sucesso!")
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
                setMessage("Alteração salva com sucesso!")
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

//Function to update laudo and cid
const updateLaudoANDcid = () =>{
    
    if(newCID){
        axios.post(`https://api-casa-azul.up.railway.app/api/updateLaudoANDcid/${paciente.id}/${newCID}`, newCID)
        .then(res => {
            if(res.data.Success === "Success"){
                setMessage("Alteração salva com sucesso!")
                setTimeout(() => {
                    setMessage(null);
                    navigate("/Paciente");
                  }, 2000);
            }
        }).catch(err => console.log(err))
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
                {message === "Alteração salva com sucesso!" ? (
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
                            <input type="text" className='input__inner' onChange={(e) => {setNewName(e.target.value)}} placeholder={paciente.name}/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Data de nascimento</label>
                            <input type="date" className='input__inner' onChange={(e) => {setNewDateBirth(e.target.value)}} />
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Data de inscrição</label>
                            <input type="date" className='input__inner'onChange={(e) => {setNewDateCreation(e.target.value)}}/>
                        </div>
                        {isValidatedInputsPatient &&(
                            <button className="salve__btn" onClick={updatePatient}>
                                Salvar
                            </button>
                        )}
                         <div>
                            <div className="Input__box">
                                <label htmlFor="">CID</label>
                                <label style={{color: '#939090'}}>Para remover o dado anterior, digite "Não informado".</label>
                                <input type="text" className='input__inner' onChange={(e) => {setNewCID(e.target.value)}} placeholder={paciente.code_cid}/>
                            </div>
                            
                        </div>
                        {newCID &&(
                            <button className="salve__btn" onClick={updateLaudoANDcid}>
                                Salvar
                            </button>
                        )}
                            
                    </div>
                    <div className="container__formAddress">
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
                        {isValidatedInputsAddress &&(
                            <button className="salve__btn" onClick={updateAddress}>
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
