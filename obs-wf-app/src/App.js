import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { ErrorPage } from './components/ErrorPage';
import { Login } from './pages/Login/Login';
import { AdminLogin } from './pages/AdminLogin/AdminLogin';
import { Register } from './pages/Register/Register';
import { CustomerDashboard } from './pages/Dashboard/CustomerDashboard';
import { CreateAccount } from './pages/CreateAccount/CreateAccount';
import { Switch } from '@mui/material';
import { Accounts } from './pages/Accounts/Accounts';
import { Transactions } from './pages/Transactions/Transactions';
import { AdminDashboard } from './pages/AdminDashboard/Dashboard/AdminDashboard';
import { UpdateProfile } from './pages/UpdateProfile/UpdateProfile';
function App() {
  return (
    <div className="App">
      <div className='RouterPaths'>
        <h3>Routing to different paths</h3>
        <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/customerdashboard" element={<CustomerDashboard/>} />
          <Route exact path="/createaccount" element={<CreateAccount/>} />
          <Route exact path="/updateprofile" element={<UpdateProfile/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/adminlogin" element={<AdminLogin/>} />
          <Route exact path="/admindashboard" element={<AdminDashboard/>} />
          
          <Route exact path="/logout" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />\
          <Route exact path="/accounts" element={<Accounts/>} />
          <Route exact path="/transactions" element={<Transactions/>} />
          <Route exact path="*" element={<ErrorPage/>} />
        </Routes>
        </BrowserRouter>
        {/* <Router>
          <Switch>
            <Route path="/">{<Login/>}</Route>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/customerdashboard" element={<Dashboard/>}/>
            <Route path="/item1">{<CustomerDashboard/>}</Route>
            <Route path="/item2">{<AccountsDetails/>}</Route>
            <Route path="/item3">{<MakeTransactions/>}</Route>
            <Route path="/item4">{<CreateAccount/>}</Route>
            <Route path="/item5">{<ChangePassword/>}</Route>
            <Route path="/item6">{<Logout/>}</Route> 
          </Switch>
        </Router> */}
      </div>
    </div>
  );
}

export default App;
