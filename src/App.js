import React, { Fragment } from 'react';
import './App.css';
import Filetree from './components/Filetree'
//Redux
import { Provider } from 'react-redux';
import FolderIcon from '@material-ui/icons/Folder';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid'
import DescriptionIcon from '@material-ui/icons/Description'
import store from './store';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      path: "root/My Folder/",
      file_tree_json: {"root": {"My Folder": {"nestedFolder": {"more nesting": {}}, "nestedFile1":"", "nestedFile2":"" }, "myfile": ""}},
      files: {},
      value: null,
      renderFiles: {}
    }
  

    this.goBack = this.goBack.bind(this)
    this.open = this.open.bind(this)
    this.renderPath = this.renderPath.bind(this)
    this.addFile = this.addFile.bind(this)
    this.addFolder = this.addFolder.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.delFile = this.delFile.bind(this)
    this.refresh = this.refresh.bind(this)


}

refresh(){
  this.renderPath()
}

renderPath(){
  console.log("calling render")
  var file_tree =this.state.file_tree_json
  var temp_path = this.state.path
  console.log("mypath:", temp_path)
  while (temp_path.length > 1){
      var to = temp_path.indexOf("/")
      var temp = temp_path.slice(0, to)
      file_tree = file_tree[temp]
      temp_path = temp_path.slice(to+1 , )
  }
  console.log("will render", file_tree)
  this.setState({renderFiles: file_tree})
  this.setState({files: file_tree})
  this.forceUpdate();
}

handleChange(event) {
  this.setState({value: event.target.value});

}

addFile(event){
  var temp = this.state.files;
  var folderName = this.state.value;
  temp[folderName] = "";
  this.setState({ files: temp });
  event.preventDefault();
}

delFile(file){
  console.log(file)
  var temp = this.state.files;
  delete temp [file]
  this.setState({ files: temp });
}

rename(event, file){
  console.log(file)
  var temp = this.state.files;
  delete temp [file]
  this.setState({ files: temp });
  event.preventDefault();

}
addFolder(event){
  console.log("even:", event);
  var temp = this.state.files;
  var folderName = this.state.value;
  temp[folderName] = {};
  this.setState({ files: temp });
  event.preventDefault();
}




goBack(event){
  var path = this.state.path
  path = path.slice(0,-1)
  var i = path.lastIndexOf("/")
  path = path.slice(0, i+1)
  this.setState({path: path})
  this.forceUpdate();
  this.renderPath();
}

open(file){
  console.log("open file", file);
  var temp_path = this.state.path
  temp_path = temp_path + file + "/" 
  this.setState({path: temp_path})
  console.log("finsl oprn:", temp_path)
  this.forceUpdate();
  this.renderPath();
}

  render(){
    const files = this.state.files;
    return (
      <Provider store={store} >
  
        <div>
        <Paper style={{backgroundColor: "lightpink"}} elevation={5}>
          <h1 align="center" >File System</h1>
          <h2 align="center"> Files and Folders list</h2>
        </Paper>
          <Fab color="primary" variant="extended" onClick= {this.refresh} >
            Refresh
              </Fab>
          
          <Paper style={{backgroundColor: "lightgreen"}} elevation={5}>
            <h3 align="center" >Directory: {this.state.path}</h3>
          </Paper>
          
          <div>
                <Fab color="primary" variant="extended" onClick= {this.goBack} > Back </Fab> 

                <Paper style={{backgroundColor: "lightpink"}} elevation={5}>
                <form onSubmit={this.handleSubmit} style={{ paddingLeft: '50px' , paddingBottom: '17px', paddingTop: '7px'}}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                        <button type="submit" name="Add Folder" onClick= {this.addFolder} >Add Folder</button>
                        <button type="submit" name="Add File" onClick= {this.addFile} >Add File</button>
                </form>

                </Paper>
                
                    
                <Grid container spacing={3} direction="row">
                <ul style={{ listStyleType: "none" }} >
                    {
                        Object.keys(files).map( file => {
                            if (typeof files[file] !== 'object'){
                                return <li><DescriptionIcon/> {file} <button name="Delete"  onClick= {e => this.delFile(file)} ><DeleteForeverIcon/></button> </li>
                                
                            }
                            else{
                                return (<Paper style={{backgroundColor: "lightblue"}} elevation={3}>


                                <li > <button name="open"  onClick= {e => this.open(file)} ><FolderIcon/></button> {file}
                                
                                <form>
                                <input type="text" newName={this.state.newName} onChange={this.handleChangeRename} />
                                <button name="Rename"  onClick= {e => this.rename(file)} >Rename</button>
                                </form>


                                 <button  name="Delete" onClick= {e => this.delFile(file)} ><DeleteForeverIcon/></button>  </li>
                                
                                
                                </Paper>)
                            }

                        })
                    }
                </ul>

                </Grid>
                
             </div>




          
        </div>
  
      </Provider>      
    );
  }
}

export default App;
