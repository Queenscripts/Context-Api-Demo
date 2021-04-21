import React from 'react';
import './App.css';
import {UsersProvider} from './context'
import {Login} from './components'

function App() {
  
  return (
    <UsersProvider>
    <div className="App">
     <Login/>
    </div>
    </UsersProvider>
   
  );
}

export default App;
