import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import './Atendimento.css'
import logoCasaAzul from '../logo-casaAzul.png'

import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiUsers } from "react-icons/pi";
import { LiaUserSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoGitNetworkOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


const Atendimento = () =>{

const navigate = useNavigate();

//passando os dados da barbearia selecionada
const navigateToAddNewAtendimento = () => {
    navigate("/AddNewAtendimento");
};
const navigateToPaciente = () => {
    navigate("/Paciente");
};

const navigateToColaboradores = () => {
    navigate("/Colaboradores");
};
const navigateToRelatorios = () => {
    navigate("/Relatorios");
};
const [atendimentos, setAtendimentos] = useState([]);


//===== Section Finalizar atendimento =====
const [messageCloseService, setMessageCloseService] = useState('');
const [hiddenBtn, setHiddenBtn] = useState(false);

const hiddenBtnCloseService = () =>{
    setHiddenBtn(true);
}

const showBtnCloseService = () =>{
    setHiddenBtn(false);
}

const finalizarAtendimento = (atendimento_id) => {  
        axios.post(`https://api-casa-azul.up.railway.app/api/closeService/${atendimento_id}`)
        .then(res => {
            if(res.data.Success === "Success"){
                setMessageCloseService('Atendimento encerrado com sucesso.')
                if(atendimentos.length === 1){
                    navigate("/Atendimento");
                }
                setHiddenBtn(false);
                setTimeout(() => {
                    setMessageCloseService(null);
                }, 2000);
            }
        }).catch(err => {
            console.log('erro:', err)
            setMessageCloseService('Erro ao encerrado atendimento. Tente novamente mais tarde')
                setTimeout(() => {
                    setMessageCloseService(null);
                }, 2000);
               
        })
}
//====== Get atendimentos =====
const getAllAtendimento = () =>{
    axios.get('https://api-casa-azul.up.railway.app/api/atendimentos/')
    .then(res =>{
        if(res.data.Success === "Success"){
            setAtendimentos(res.data.resu);
        }
    }).catch(err => console.log("Erro ao buscar atendimentos.", err))
}
useEffect(() =>{
    getAllAtendimento()
}, [hiddenBtn, messageCloseService])
//===============================================
// Function to expanded div Colaborador
const [expandedAtendimento, setExpandedAtendimento] = useState([]);

//Function to expanded booking cards
const toggleItem = (itemId) => {
    if (expandedAtendimento.includes(itemId)) {
      setExpandedAtendimento(expandedAtendimento.filter(id => id !== itemId));
    } else {
      setExpandedAtendimento([...expandedAtendimento, itemId]);
    }
  };
console.log(atendimentos)
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
                <Link className="selected">
                    <IoGitNetworkOutline className='icon__menu'/> Atendimento
                </Link>
                <div onClick={() => navigateToColaboradores()}>
                    <Link className='name__menu' >
                        <PiUsers className='icon__menu'/> Colaboradores
                    </Link>
                </div>
                
                <div onClick={() => navigateToPaciente()}>
                    <Link className='name__menu'>
                        <LiaUserSolid className='icon__menu'/> Pacientes
                    </Link>
                </div>
                
                <div onClick={() => navigateToRelatorios()}>
                    <Link className="name__menu">
                        <HiOutlineDocumentReport className='icon__menu'/> Relatórios
                    </Link>
                </div>
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
                        Atendimentos
                    </div>
                    <button className='add__paciente' onClick={navigateToAddNewAtendimento}>
                        Criar atendimento
                    </button>
                </div>
                {messageCloseService === "Atendimento encerrado com sucesso." ? (
                            <div className="message__success">
                                <FaRegCheckCircle className="icon__message" />{messageCloseService}
                            </div>
                        ):(
                            <div className={`hidden__box__atendimento ${messageCloseService ? 'message__erro' : ''}`}>
                                <MdOutlineErrorOutline  className="icon__message"/>{messageCloseService}
                            </div>
                            
                        )}
                <div className="container__tittle__table__atendimento">
                   <p className='atendimento__inner'>Paciente</p>
                   <p className='atendimento__inner'>Atendimento</p>
                   <p className='atendimento__inner'>Colaborador</p>
                   <p className='atendimento__inner'>Data de criação</p>
                   <p className='atendimento__inner'>Status</p>
                </div>
                
                {atendimentos.map((item) =>(
                    <div key={item.service_id} className={`conatiner__atendimento ${expandedAtendimento.includes(item.service_id) ? 'expand__container__atendimento':''}`}>
                        <div className='atendimento__box'>
                            <p className='atendimento__inner'>{item.paciente_name}</p>
                            <p className='atendimento__inner'>{item.service_name}</p>
                            <p className='atendimento__inner'>{item.profissional_name}</p>
                            <p className='atendimento__inner'>{item.date_service}</p>
                            <p className='atendimento__inner'>{item.status}</p>
                            <p className='icon__arrow__menu' onClick={() => toggleItem(item.service_id)} >
                                <IoIosArrowDown className={`icon__arrow__menu ${expandedAtendimento.includes(item.service_id) ? 'icon__arrow__menu__rotated':''}`}/>
                            </p>
                        </div>
                        <div className={`hidden__box__atendimento ${expandedAtendimento.includes(item.service_id) ? 'box__btn__Encerrar':''}`}>
                            <button className={`add__paciente ${hiddenBtn === true ? 'hiddenBtn':''}`} onClick={hiddenBtnCloseService}>
                                Encerrar
                            </button>
                            <button className={`Btn__cancelar ${hiddenBtn === false ? 'hiddenBtn':''}`} onClick={showBtnCloseService}>
                                Cancelar
                            </button>
                            <button className={`Btn__confirmar ${hiddenBtn === false ? 'hiddenBtn':''}`} onClick={() => finalizarAtendimento(item.service_id)}>
                                Confirmar
                            </button>
                        </div>
                            
                    </div>
                ))}
                
            </div>
        </div>
        
        
    )
};
export default Atendimento;
