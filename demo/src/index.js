import React, {Component} from 'react'
import {render} from 'react-dom'

import AppolodoroUploadImage from '../../src'

class Demo extends Component {
  
  constructor(props){
    super(props)
  }

  handleUpload = (imageData, visionData) => {
    this.refs.image.src = imageData
  }

  setRef = (element) => {
    this.image = element
  }

  handleSetUploader = (element) => {
    this.uploader = element
  }

  openFile = () => {
    this.uploader.click()
  }

  render() {
    return <div>
      <button 
      onClick={ this.openFile }>Open file</button>
      <hr/>
      <AppolodoroUploadImage 
        onUpload = { this.handleUpload } 
        setUploader ={ this.handleSetUploader }
        size = { [300,300] }
        vision_key = 'xxx'
        smartcrop
        
      />
      <hr/>
      <img ref="image" />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
