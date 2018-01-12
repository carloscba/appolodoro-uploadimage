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

  render() {
    return <div>
      <AppolodoroUploadImage onUpload = { this.handleUpload }/>
      <img ref={ this.setRef } />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
