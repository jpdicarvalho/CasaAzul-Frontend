import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Paciente from './Paciente/Paciente';
import EditPatient from './EditPatient/EditPatient';
import AddNewPatient from './AddNewPatient/AddNewPatient';
import Atendimento from './Atendimento/Atendimento';
import AddNewAtendimento from './AddNewAtendimento/AddNewAtendimento';
import Colaboradores from './Colaboradores/Coladoradores';
import Relatorios from './Relatorios/Relatorios';
import AddNewColaborador from './AddNewColaborador/AddNewColaborador';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Atendimento' element={<Atendimento/>}/>
        <Route path='/Paciente' element={<Paciente/>}/>
        <Route path='/EditPatient' element={<EditPatient/>}/>
        <Route path='/Colaboradores' element={<Colaboradores/>}/>
        <Route path='/Relatorios' element={<Relatorios/>}/>
        <Route path='/AddNewPatient' element={<AddNewPatient/>}/>
        <Route path='/AddNewColaborador' element={<AddNewColaborador/>}/>
        <Route path='/AddNewAtendimento' element={<AddNewAtendimento/>}/>
      </Routes>
    </Router>
  )
}

export default App
