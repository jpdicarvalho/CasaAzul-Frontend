import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Home/HomePage';

function App() {

  return (
    <Router>
      <Routes>

        <Route path='/HomePage' element={<HomePage/>}/>

      </Routes>
    </Router>
  )
}

export default App
