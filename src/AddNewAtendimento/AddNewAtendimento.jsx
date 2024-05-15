import { useNavigate } from "react-router-dom"
import './AddNewAtendimento.css'
import { IoCaretBackCircleOutline } from "react-icons/io5";


const AddNewAtendimento = () =>{
const navigate = useNavigate();

const navigateToAtendimento = (atendimento) => {
    navigate("/Atendimento", {state: {atendimento}});
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
                        <label >Tipos de Atendimentos</label>
                        <div className="Input__box">
                            <label>
                                <input type="radio" className='input__inner'/>Psicológico/Psicoterapia
                            </label>
                            <label>
                                <input type="radio" className='input__inner'/>Triagem
                            </label>
                            <label>
                                <input type="radio" className='input__inner'/>Pedagógico
                            </label>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Data do atendimento</label>
                            <input type="date" className='input__inner'/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">CEP</label>
                            <input type="text" className='input__inner'/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Rua</label>
                            <input type="text" className='input__inner'/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Bairro</label>
                            <input type="text" className='input__inner'/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Número da casa</label>
                            <input type="text" className='input__inner'/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Cidade</label>
                            <input type="text" className='input__inner'/>
                        </div>
                    </div>
                    <div className="container__two">
                        <div className="Input__box">
                            <label htmlFor="">Data de inscrição</label>
                            <input type="text" className='input__inner'/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Laudo</label>
                            <input type="text" className='input__inner'/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">CID</label>
                            <input type="text" className='input__inner'/>
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