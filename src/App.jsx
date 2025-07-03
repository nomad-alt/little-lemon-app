import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './components/HomePage'
import './App.css'

function App() {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
