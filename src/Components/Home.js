import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NotesList from "./NotesList";
import AddNote from "./AddNote";

const Home = (props) => {
const {showAlert} = props
  return (
    <div>
      <NotesList showAlert = {showAlert} />
    </div>
  );
};

export default Home;
