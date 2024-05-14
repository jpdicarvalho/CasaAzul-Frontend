import './AddNewPatient.css'

const AddNewPatient = () =>{

    return(
        <div className="container__form">
            <div className='main__form'>
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
                            <input type="text" className='input__inner'/>
                        </div>
                        <div className="Input__box">
                            <label htmlFor="">Data de nascimento</label>
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
export default AddNewPatient;