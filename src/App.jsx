import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Home/HomePage';
import AddNewPatient from './AddNewPatient/AddNewPatient';

function App() {

  return (
    <Router>
      <Routes>

        <Route path='/HomePage' element={<HomePage/>}/>
        <Route path='/AddNewPatient' element={<AddNewPatient/>}/>

      </Routes>
    </Router>
  )
}

export default App
