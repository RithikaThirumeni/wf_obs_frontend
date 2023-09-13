import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ErrorPage } from './components/ErrorPage';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Dashboard } from './components/Dashboard';
import { DisplayAccounts } from './components/DisplayAccounts';
import { CreateAccount } from './pages/CreateAccount/CreateAccount';

function App() {
  return (
    <div className="App">
      <div className='RouterPaths'>
        <h3>Routing to different paths</h3>
        <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/create-account" element={<CreateAccount/>} />
          <Route exact path="/displayaccounts" element={<DisplayAccounts/>} />
          <Route exact path="*" element={<ErrorPage/>} />
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
