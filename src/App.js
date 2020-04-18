import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Filetree from './components/Filetree'

function App() {
  return (
    <div>

      <h1 align="center" >File System</h1>
      <h2 align="center"> Files and Folders list</h2>
      <h3>Root Directory</h3>
      
      <Filetree files =  {{"My Folder": {"New Folder": {}, "Text File": ""}, "Other": {} , "File 2": ""}} />
      
    </div>
      
  );
}

export default App;
