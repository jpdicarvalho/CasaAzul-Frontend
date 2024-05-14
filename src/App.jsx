import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Paciente from './Paciente/Paciente';
import AddNewPatient from './AddNewPatient/AddNewPatient';
import Atendimento from './Atendimento/Atendimento';

function App() {

  return (
    <Router>
      <Routes>

        <Route path='/Atendimento' element={<Atendimento/>}/>
        <Route path='/Paciente' element={<Paciente/>}/>
        <Route path='/AddNewPatient' element={<AddNewPatient/>}/>

      </Routes>
    </Router>
  )
}

export default App
