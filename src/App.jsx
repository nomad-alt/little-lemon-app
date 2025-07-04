import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import BookingPage from './components/BookingPage';
import './App.css'

function App() {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
