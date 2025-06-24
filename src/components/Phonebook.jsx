import { useState , useEffect } from 'react'
import axios from 'axios'
import Notification from './Notification'
import phoneBookService from '../services/phoneBookService'
const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search , setSearch] = useState('')
  const [message , setMessage] = useState(null)
  
  useEffect(() => {
     phoneBookService.getAll().then(initialPersons =>
      setPersons(initialPersons)
     )
    }, [])
    console.log('render', persons.length, 'notes')
  const addContact = (event) =>{
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(
        `${existingPerson.name} is already added to the phonebook. Replace the old number with the new one?`
      )) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        phoneBookService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => 
              p.id !== existingPerson.id ? p : returnedPerson
            ));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setMessage({ text: `Error: ${existingPerson.name} was already removed from server`, type: 'error' });
            setPersons(persons.filter(p => p.id !== existingPerson.id));
            setTimeout(() => setMessage(null), 5000);
          });
          
      }
    }
    else{
      const newContact = {
        name :newName ,
        number: newNumber  }
        phoneBookService.create(newContact).then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setMessage({text: `${newName} added to the phonebook` , type : 'success'})
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
      
  }
  const handleInput = (event) =>{
    setNewName(event.target.value)
  }
  const handleInputNum = (event) =>{
    setNewNumber(event.target.value)
  }
  const searchInput = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  const filterItems = (arr, query) => {
    return arr.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
  }
  const deleteContact = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person?.name || "this contact"}?`)) {
      phoneBookService.deleteContact(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setMessage({ text: `Deleted ${person.name}`, type: 'success' });
          setTimeout(() => setMessage(null), 5000);
        })
        .catch(error => {
          setMessage({ text: `Error: ${person.name} was already deleted`, type: 'error' });
          setPersons(persons.filter(p => p.id !== id));
          setTimeout(() => setMessage(null), 5000);
        });
        
    }
  };
  
  return (
    <div>
      <Notification message={message}/>
      <h2>Phonebook</h2>
      <div>
        filter shown with : <input value={search}
        onChange={searchInput} />  </div>
      <form onSubmit = {addContact}>
        <h2>Add new</h2>
        <div>
          name: <input value={newName}
          onChange={handleInput} />
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleInputNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {filterItems(persons , search).map(person =>
        
        <li key={person.name}>{person.name} {person.number} <button onClick={() => deleteContact(person.id)}>delete</button>

        
        </li>
      
    )}
      </ul>
    </div>
  )
}

export default Phonebook;