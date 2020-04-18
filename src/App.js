import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Filetree from './components/Filetree'

function App() {
  return (
    <Fragment>
      <h1>File System</h1>
      <h2>Files and Folders list</h2>
      <h3>Root Directory</h3>
      
      <Filetree files =  {{"folder1": {"blah": {}, "dubra": ""} , "folder2": "", "sds": {}}} />
      </Fragment>
      
  );
}

export default App;
