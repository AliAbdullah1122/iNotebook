import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'

const NotesList = () => {
  const context = useContext(NoteContext)
  const {notes,setNotes} =context
  return (
    <div className="row my-3">
     <h2>Your Note</h2>
     {notes.map((note)=>{
return <NoteItem key={note._id} note ={note}/>
     })}
     </div>
  )
}

export default NotesList
