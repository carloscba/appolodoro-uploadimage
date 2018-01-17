import React, {Component} from 'react'
import {render} from 'react-dom'

import AppolodoroUploadImage from '../../src'

class Demo extends Component {
  
  handleUpload = (imageData) => {
    this.image.src = imageData
  }

  setRef = (element) => {
    this.image = element
  }

  setUploader = (element) => {
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
      setRef={ this.setUploader }
      />
      <img ref={ this.setRef } />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
