import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';

function App() {
  return (
    <div>
      <NoteState>
     
       <BrowserRouter>
        <Navbar />
        <Alert message = "This is my Alert"/>
        <div className="container">
        <Routes>
         
          <Route  path="/" element={ <Home />}/>
          <Route  path="/about" element={ <About />}/>
         
          
        </Routes>
        </div>
        </BrowserRouter>
       
        </NoteState>
    </div>
  );
}

export default App;
