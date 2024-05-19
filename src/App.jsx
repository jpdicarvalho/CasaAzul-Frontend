import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Paciente from './Paciente/Paciente';
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
