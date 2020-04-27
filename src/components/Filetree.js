 import React from 'react';
 import FolderIcon from '@material-ui/icons/Folder';
 import ExpansionPanel from '@material-ui/core/ExpansionPanel';
 import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
 import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
 import Grid from '@material-ui/core/Grid'
 import DescriptionIcon from '@material-ui/icons/Description'

class Filetree extends React.Component{

    constructor(props){
        super(props);
        console.log("constructor:", props);
        this.state = {
            files: this.props.files || {} ,
            path: this.props.path,
            value: null
        }
        console.log(this.state.path)
        this.addFile = this.addFile.bind(this)
        this.addFolder = this.addFolder.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.delFile = this.delFile.bind(this)
        this.handleChangeRename = this.handleChangeRename.bind(this)
        this.props.renderPath();
        console.log("cdsdsc:",this.props.files)
        
    }
    
    componentWillReceiveProps({path}) {
        console.log("statePath", this.props.files)
        this.setState({path: this.props.path})

        this.setState({files: this.props.files})
        
      }

    handleChange(event) {
        this.setState({value: event.target.value});

      }

    handleChangeRename(event){
        this.setState({newName: event.target.value});
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

    render() {
        const files = this.state.files;
        return (
            <div>
                {this.state.path}
                 <button type="submit" name="GoBack" onClick= {this.props.goBack} >GoBack</button>

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
                                return <li><DescriptionIcon/> {file} <button name="Delete"  onClick= {e => this.delFile(file)} ><DeleteForeverIcon/></button> </li>
                                
                            }
                            else{
                                return (<ExpansionPanel expanded={true} style={{backgroundColor: "lightgrey"}}  > 
                                <li > <button name="open"  onClick= {e => this.props.open(file)} ><FolderIcon/></button> {file}
                                
                                <form>
                                <input type="text" newName={this.state.newName} onChange={this.handleChangeRename} />
                                <button name="Rename"  onClick= {e => this.rename(file)} >Rename</button>
                                </form>


                                 <button  name="Delete" onClick= {e => this.delFile(file)} ><DeleteForeverIcon/></button>  </li>
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