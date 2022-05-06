import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import MainMint from '.MainMint';
import NavBar from './Navbar';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts}/>
      <MainMint accounts={accounts} setAccounts={setAccounts}/>
    </div>
  );
}

export default App;
