import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">

            <h5 className="card-title"> {note.title}</h5>

            <div className="ms-auto">
              <i
                className="fa-solid fa-trash mx-2"
                style={{ color: "red" }}
                onClick={() => {
                  deleteNote(note._id);
                    props.showAlert("Deleted Successfully", "success");
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => updateNote(note)}
                style={{ color: "blue" }}
              ></i>
            </div>
          </div>
          <p className="card-text"> {note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
