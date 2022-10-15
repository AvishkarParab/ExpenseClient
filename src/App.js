import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
// import "../node_modules/bootstrap-icons"
import Expense from '../src/components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Add from './components/Add';

function App() {
  return <BrowserRouter>
     <Routes>
      <Route path="/" element= {<Login/>} />
      <Route path="/register" element= {<Register/>} />
      <Route path="/expense" element= {<Expense/>} />
      <Route path="/profile" element= {<Profile/>} />
      <Route path="/add" element= {<Add/>} />
     </Routes>
    </BrowserRouter>

}

export default App;
