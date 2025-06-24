// import './App.css'
import { useState ,  useEffect } from 'react'
import Note from './components/Note'
import Notes from './components/Notes'
import axios from 'axios'
import Phonebook from './components/Phonebook'
import Currency from './components/Currency'
const App = () => {
  
  return (
   <div>
    <Phonebook/>
   </div>
  )
}

export default App
