// import './App.css'
import { useState ,  useEffect } from 'react'
import Note from './Note'
import axios from 'axios'
import NotesService from '../services/NotesService'


const Notes = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    NotesService.create(noteObject).then(returnedNote => {
        setNotes(notes.concat(returnedNote)) 
        setNewNote('') 
      })
  }
useEffect(() => {
    console.log('effect')
    
      NotesService.getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const toggleImportanceOf = id => {
    
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    NotesService.update(id , changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
  }


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>  
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}
export default Notes;
