import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {

  return (
   <div>
    <Navbar />
    <Home />
    
    <Footer />
   </div>
  )
}

export default App
