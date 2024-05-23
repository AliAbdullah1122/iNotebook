import React,{useState} from 'react'
import NoteContext from './NoteContext'
const NoteState = (props) => {
    const notesInitial= [
        {
          "_id": "664eef33f9129b91b35cab3e",
          "user": "664ed90bf120e02c748bc619",
          "title": "new Note",
          "description": "This is my first Note",
          "tag": "Personal",
          "date": "2024-05-23T07:24:35.328Z",
          "__v": 0
        },
        {
          "_id": "664eef33f9129b91b35cab40",
          "user": "664ed90bf120e02c748bc619",
          "title": "new Note",
          "description": "This is my first Note",
          "tag": "Personal",
          "date": "2024-05-23T07:24:35.924Z",
          "__v": 0
        },
        {
          "_id": "664eef33f9129b91b35chb40",
          "user": "664ed90bf120e02c748bc619",
          "title": "new Note",
          "description": "This is my first Note",
          "tag": "Personal",
          "date": "2024-05-23T07:24:35.924Z",
          "__v": 0
        },
        {
          "_id": "664eef33f9129b91b35ca240",
          "user": "664ed90bf120e02c748bc619",
          "title": "new Note",
          "description": "This is my first Note",
          "tag": "Personal",
          "date": "2024-05-23T07:24:35.924Z",
          "__v": 0
        },
        {
          "_id": "664eef33f9129b91b35c3b40",
          "user": "664ed90bf120e02c748bc619",
          "title": "new Note",
          "description": "This is my first Note",
          "tag": "Personal",
          "date": "2024-05-23T07:24:35.924Z",
          "__v": 0
        },
        {
          "_id": "664eef33f9129b91b35rab40",
          "user": "664ed90bf120e02c748bc619",
          "title": "new Note",
          "description": "This is my first Note",
          "tag": "Personal",
          "date": "2024-05-23T07:24:35.924Z",
          "__v": 0
        },
        {
          "_id": "664eef34f9129b91b35xab42",
          "user": "664ed90bf120e02c748bc619",
          "title": "new Note",
          "description": "This is my first Note",
          "tag": "Personal",
          "date": "2024-05-23T07:24:36.341Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = React.useState(notesInitial)
  return (
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
