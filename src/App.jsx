import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './components/HomePage'
import './App.css'
import Footer from './components/Footer'

function App() {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
