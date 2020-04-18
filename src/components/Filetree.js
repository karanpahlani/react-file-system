 import React from 'react';
 import FolderIcon from '@material-ui/icons/Folder';
 import ExpansionPanel from '@material-ui/core/ExpansionPanel';
 import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
 import Grid from '@material-ui/core/Grid'
 import DescriptionIcon from '@material-ui/icons/Description'

class Filetree extends React.Component{

    constructor(props){
        super(props);
        console.log(props.files);
        this.state = {
            files: this.props.files || {} ,
            value: null,
            newName: null
        }
        this.addFile = this.addFile.bind(this)
        this.addFolder = this.addFolder.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.delFile = this.delFile.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value});

      }

      handleChangeRename(event){
        this.setState({value: event.target.newName});
      }

    renameFile(file){
        var temp = this.state.files;
        delete temp [file]
        this.setState({ files: temp });
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

    addFolder(event){
        console.log("even:", event);
        console.log("bhag chodu", this.state.files);
        var temp = this.state.files;
        var folderName = this.state.value;
        temp[folderName] = {};
        this.setState({ files: temp });
        event.preventDefault();
    }

    render() {
        const files = this.state.files;
        return (
            <div>
                <form onSubmit={this.handleSubmit} style={{ paddingLeft: '50px' , paddingBottom: '17px', paddingTop: '7px'}}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                        <button type="submit" name="Add Folder" onClick= {this.addFolder} >Add Folder</button>
                        <button type="submit" name="Add File" onClick= {this.addFile} >Add File</button>
                </form>
                    
                <Grid container spacing={3} direction="row">
                <ul style={{ listStyleType: "none" }} >
                    {
                        Object.keys(files).map( file => {
                            if (typeof files[file] !== 'object'){
                                return <li><DescriptionIcon/> {file} <button name="Delete"  onClick= {e => this.delFile(file)} >delete</button> </li>
                                
                            }
                            else{
                                return (<ExpansionPanel expanded={true} style={{backgroundColor: "lightgrey"}}  > 
                                <li > <FolderIcon/> {file}

                                {/* <form onSubmit={this.handleSubmit} style={{ paddingLeft: '20px' , paddingBottom: '17px', paddingTop: '7px'}} >
                                    <label>
                                    new name:
                                    <input type="text" newName={this.state.newName} onChange={this.handleChangeRename} />
                                        </label>
                                        <button type="submit" name="Rename" onClick= {this.renameFile(file)} >Rename</button>
                                </form> */}


                                 <button  name="Delete" onClick= {e => this.delFile(file)} >delete</button>  <ExpansionPanelDetails> <Filetree files = {files[file]} /> </ExpansionPanelDetails></li>
                                </ExpansionPanel>)
                            }

                        })
                    }
                </ul>

                </Grid>
                
             </div>
        );
     }
}


export default Filetree;