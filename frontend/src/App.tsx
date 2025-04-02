import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './pages/Landing'
import { Dashboard } from './pages/Dashboard'

function App() {

  return (
   <Router>
    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
    </Routes>
   </Router>
  )
}

export default App
