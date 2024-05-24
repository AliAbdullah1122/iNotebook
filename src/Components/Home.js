import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NotesList from "./NotesList";
import AddNote from "./AddNote";

const Home = () => {
  return (
    <div>
      <NotesList />
    </div>
  );
};

export default Home;
