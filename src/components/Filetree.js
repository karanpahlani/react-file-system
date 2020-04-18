 import React from 'react';
 import FolderIcon from '@material-ui/icons/Folder';
 import DescriptionIcon from '@material-ui/icons/Description'

class Filetree extends React.Component{

    constructor(props){
        super(props);
        console.log(props.files);
        this.state = {
            files: this.props.files || {} ,
            value: null
        }
        this.addFile = this.addFile.bind(this)
        this.addFolder = this.addFolder.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.delFile = this.delFile.bind(this)
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
                <form onSubmit={this.handleSubmit} style={{ paddingLeft: '50px' , paddingBottom: '7px', paddingTop: '7px'}}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                        <button type="submit" name="Add Folder" onClick= {this.addFolder} >Add Folder</button>
                        <button type="submit" name="Add File" onClick= {this.addFile} >Add File</button>
                </form>
                    

                <ul style={{ listStyleType: "none" }} >
                    {
                        Object.keys(files).map( file => {
                            if (typeof files[file] !== 'object'){
                                return <li  > <DescriptionIcon/> {file} <button name="Delete"  onClick= {e => this.delFile(file)} >delete</button> </li>
                            }
                            else{
                                return <li > <FolderIcon/> {file} <button  name="Delete" onClick= {e => this.delFile(file)} >delete</button> <Filetree files = {files[file]} /></li>
                            }

                        })
                    }
                </ul>
             </div>
        );
     }
}


export default Filetree;